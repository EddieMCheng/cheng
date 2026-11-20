# Document Anatomy

Cheng documents are compact saved states for `V.html`.

## Shape

Most documents follow:

```text
D_Title.timestamp.gps;
Setting:value;
G:rule,rule,rule;
F:form,form,form;
source-url
```

Documents may be one line or multiple lines. The runtime removes newlines while loading.

## Where To Save And How To Load

- Put a document next to `eddie/V.html` as `D_Title.txt` so `eddie/V.html?D_Title` loads it.
- `?D_clock` fetches `eddie/D_clock.txt`.
- If that 404s and the name contains `_`, the first `_` becomes a folder: `E_Clock` → `E/Clock.txt`.
- `index.html` redirects to `?D_New`.
- The **save D** button downloads `Dout` to the user's Downloads folder. It does not write the repository. To keep a document in git, write the `.txt` file into `eddie/` (or the matching fallback folder).
- Reveal the button from G: `this.saveDButton.hidden=false`. The element id is `saveDButton`, not `saveFileButton`.

## Header And Settings

The first title-like part names the document and becomes `T`. Settings such as `SW`, `SH`, `Font`, `VS`, `LS`, `Va`, `Vw`, `Vo`, `VP`, `dT`, `C`, `CD`, and `CE` become runtime memory/defaults through `setVar()`. `G` can also set `T='Clock'` after load.

Treat these as authored memory: they preserve camera, timing, visual defaults, and context.

## G Section

`G:` contains behavior rules separated by commas.

Use it for:

- time-based motion, especially modulus-1 angles: `sec.v=time/1000/60∞1`.
- interaction with `Mx`, `My`, `touch`, `drag`, `click`, `Ev`.
- state updates through `D(...)`, `E(...)`, and direct object assignments.
- dynamic labels with `.name`, `.font`, `.align`, `.baseline`.
- simulation equations and UI state.
- revealing interpreter chrome (`this.saveDButton.hidden=false`).

If G drives a property every frame, omit that live value from F. F stays authored form; G supplies the living number.

## F Section

`F:` contains form definitions.

Use it for:

- points, lines, surfaces, rings, primitives, and groups.
- repetition/count through length/count properties.
- color and alpha/type.
- spatial transform through `x y z u o v w d`.
- composition through `=`, `+`, and `,`.

Do not snapshot live G angles into F (`*0.558v` on a clock hand). Focusing F serializes authored `targetD`, not the current second.

## Source URL

Many documents end with the URL they were saved from. Preserve it when editing existing documents; include it when useful, but do not let it dominate authoring.
