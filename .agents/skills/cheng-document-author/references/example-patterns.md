# Example Patterns

Use existing documents as idiom references.

## Minimal Runtime Defaults

`D_Tutorial.txt` and `D_New` show small documents with viewport/default values and a simple `F`.

Pattern:

- set title and core visual defaults.
- use one box/line primitive.
- keep navigation rules minimal.

## Shape Grammar

`F_Demo.txt` shows points, random, lines, dotted/dashed lines, polygons, tetrahedron, pyramids, cubes.

Pattern:

- one named parent per concept.
- child primitive names reveal visible form.
- repeated `*x`, `*y`, `*u`, `*v`, `*w`, `*a` transforms carry meaning.

## Clock And Cyclic Time

`eddie/D_clock.txt` loads as `eddie/V.html?D_clock`. `E/Clock.txt` is the older folder form (`?E/Clock` or `?E_Clock`).

Pattern:

- F names hands and face without live `v`: `clock=sec*0.5u±0.5*2a+min*...+hrs*...+face*...`.
- G sets turns from wall clock with modulus 1:
  - `sec.v=time/1000/60∞1`
  - `min.v=time/1000/60/60∞1`
  - `hrs.v=(time/1000/60/60-timeZone)/12∞1`
- `dT=0.04` keeps the loop ticking.
- Reveal save chrome from G if needed: `this.saveDButton.hidden=false`.
- `sec.v` must match the real second, including wrap through 0. If the hand jumps when focusing F or G, F smoothing is fighting G.

## Orbit And Scale

`E/SpaceTime.txt` and `E/All.txt` show time, orbital phase, scale references, planets, city positions, and labels.

Pattern:

- use `time` to update phase.
- put physical/conceptual scale in `u`.
- derive labels and visibility from current scale or touch.

## Drawing Interface

`E/Draw.txt` uses touch/mouse to change count, position, spread, and color.

Pattern:

- small UI labels are `F` objects.
- `G` maps pointer regions to mode and values.
- object state is edited through equations.

## Self-Editing UI

`E/UI.txt` is a dense advanced example of selection, highlighting, duplicated/removed form, property editing, and UI controls.

Pattern:

- selection is a visible object and a state.
- editing tools are regular document objects.
- ranges like `first→last` apply behavior over many parts.

## Simulation

`E/D/Simulator/Gravity.txt` shows sampled history and force-like updates.

Pattern:

- keep the visible system compact in `F`.
- put recurrence/history in `G`.
- use buffered access when a trace or sampled path matters.
