# Change Checklist

Use this before modifying parser, evaluator, rendering, or notation behavior.

## Compatibility

- Load representative documents: `D_clock.txt`, `D_Tutorial.txt`, `F_Demo.txt`, `E/SpaceTime.txt`, `E/Draw.txt`, `E/UI.txt`, `E/D/Simulator/Gravity.txt`.
- Check whether the change alters existing meanings of `*`, `+`, `=`, `,`, `±`, `→`, `←`, `∞`, or property letters.
- Preserve URL-loaded documents (`?D_clock` → `eddie/D_clock.txt`, underscore-to-folder fallback) and file-loaded documents.
- Preserve both compact one-line documents and multiline saved documents.
- If the change touches `assignMean`, `targetD`, `F2DE()`, `DE2F()`, `Geval()`, `Gexec()`, or `dT`, smoke `D_clock`: `sec.v` must stay `(time/1000/60)%1` while focusing F and G, including wrap through 0. F text must not bake the live second angle.

## Language Fit

- Does the change strengthen `F=form`, `G=behavior`, `D=memory`?
- Could the idea be expressed as a document instead of runtime code?
- Can a simpler document teach the new feature?
- Does the syntax feel local to Cheng?

## Runtime Fit

- Keep parser changes close to `F2DE()`, `Geval()`, `vdScript()`, or `setVar()` as appropriate.
- Keep draw changes close to `DE2B()`, `Gexec()`, `drawUP()`, or `draw()`.
- Avoid broad refactors unless they are required for the requested behavior.
- Check old documents after any change to defaults, property indexing, or `D/E` assignment.
- Do not lerp G-owned `D`/`E` cells toward F. Do not eval G twice in one frame. Use strict `dT===0`. After parse/load, `Geval()` and `go=1`.

## Delivery

- Summarize the language effect, not only the code effect.
- Name any documents used for smoke testing.
- If compatibility is uncertain, say which notation or document type is at risk.
