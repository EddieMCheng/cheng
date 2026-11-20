# Runtime Map

This is a practical map of `eddie/V.html`.

## Load Flow

- `index.html` redirects to `eddie/V.html?D_New`.
- `init()` reads URL parts after `?` and `;`.
- `readTextUrl()` loads `.txt` documents relative to `eddie/V.html`.
  - `?D_clock` fetches `eddie/D_clock.txt`.
  - If the fetch 404s and the name contains `_`, the first `_` becomes `/` (`D_Clock` → `D/Clock.txt`, `E_Clock` → `E/Clock.txt`).
- `updateD()` applies document parts:
  - title-like parts (`D_clock`) update `T`.
  - `F:` replaces form.
  - `G:` replaces behavior rules.
  - other `key:value` pairs update globals through `setVar()`.
- File load is async. After `F2DE()`/`outG()`, set `go=1` or the first draw stays the previous/default document.

## F And D Layers

There are two form layers:

- `targetD` / `targetE`: authored F, filled by `F2DE()`.
- `D` / `E`: live values used for drawing.

`assignMean(targetD, D, GD)` lerps live values toward authored F so F edits can ease in. It must **skip G-owned cells** (`GD` / `GE` from `Geval()`). Time-driven properties such as `sec.v=time/1000/60∞1` belong to G, not F smoothing.

`o`, `v`, and `w` are turns (modulus 1). For F-smoothed angles, interpolate the short way around the circle. G-owned angles skip smoothing and stay exact.

## F Parsing

`F2DE()` parses the form string into `targetD`/`targetE`.

- Commas separate larger definitions/groups.
- `=` separates parent/group definition from children, but parsing treats it like `+`.
- `+` separates parts inside a group.
- `*` applies numeric multipliers or named properties.
- `±` stores spread/error/secondary values in `E`.
- Names become ids and are indexed through `L`.
- Properties follow `C`: `s l i p x y z r g b u o v w d t a`.

After parse: `updateL(); Geval();` copy non-G-owned `targetD` into `D`; `go=1`. Do not copy CD/CE defaults over live G values. Do not leave `go=0` after a URL/file load.

`DE2F()` serializes authored `targetD` back to F text (live `D` only when `updateF` is on). Focusing F must not bake live G angles such as `0.558v` into F.

## G Evaluation

`Geval()` compiles behavior equations into `GV` and marks owned cells in `GD`/`GE`.

- `id.property=value` assigns document object properties on `D` (and `E` with `±`).
- `from→to.property=value` applies a rule over a range.
- `←` expands to the current object name in range rules.
- `∞` becomes `%` (modulo). `time/1000/60∞1` is the fraction of the current minute.
- Other symbols are converted by `vdScript()`.

`Gexec()` runs compiled `GV` at the **start** of `DE2B()`, after `assignMean` and before buffers, so this frame's `time` is what gets drawn. Run G once per frame; incremental rules must not double-step.

When compiling globals, test `this[Gi0]===undefined`. `dT=0` is falsy; `if(!this[Gi0])` would turn it into `""`. Use `dT===0` (strict) when deciding whether to snap instead of lerp. `""==0` is true and would wipe `D` every frame.

Compare with legacy `www.cheng.se`: that runtime writes F directly into `D` and has no `assignMean`. Local `targetD` smoothing is extra and must not fight G.

## Draw Pipeline

`DE2B()`:

1. `assignMean` toward authored F, skipping G-owned cells.
2. `Gexec()` so live G wins for this frame.
3. Build `Bdv`/`Bdc` from `D`/`E`.
4. `drawUP()` overlays labels/text.

`draw()` uploads buffers to WebGL.

## Inputs And State

The runtime exposes device and interaction state to `G`:

- mouse/touch: `Mx`, `My`, `touch`, `drag`, `click`, `MxB`, `MyB`.
- keyboard: `Ev`, `key`, `keyB`.
- time: `time` (ms), `date`, `dT` (seconds between updates).
- viewport/camera: `Vx`, `Vy`, `Vz`, `Vw`, `Vo`, `Vu`, `VP`, `Vzu`.
- sensors/XR/GPS/BLE/WebSocket values where available.

Maintain these as language vocabulary, not hidden app internals.

## Save And Chrome

- `Dout` is rebuilt about once a second while the F/G editors are not focused: `D_Title.timestamp.gps;G:...;F:...;origin`.
- `#saveDButton` downloads `Dout` to the user's Downloads folder. It does not write the git repo. Repo documents are `.txt` files beside `eddie/V.html` (or under `eddie/E/`, `eddie/D/`).
- Chrome starts hidden. Reveal from G: `this.saveDButton.hidden=false`. Same pattern for `saveFButton`, `saveGButton`, `loadFileButton`, `fullscreenButton`. The id is `saveDButton`, not `saveFileButton`.

## Editor Focus

- F focus: `DE2F();inF()`.
- F blur: `outF()` → `F2DE()` (recompile G, `go=1`).
- G blur: `outG()` → `Geval();go=1`.

Switching F↔G re-parses F. Live G properties must survive that without jumping.
