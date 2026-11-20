# Evaluation Rubric

Use this when judging AI-created Cheng documents.

## Compactness

- Uses defaults instead of repeating unnecessary values.
- Uses composition and repetition rather than listing every point.
- Avoids verbose prose names unless needed for teaching.

## Readability In The Language

- Names reveal spatial/conceptual roles.
- `F` reads as form, not as hidden behavior.
- `G` reads as equations and state, not procedural clutter.
- Dense expressions are split when a named step would teach better.

## Visual Coherence

- Objects fit the intended viewport.
- Labels do not overwhelm form.
- Colors and alpha/type support the concept.
- Motion is stable enough to observe.

## Conceptual Faithfulness

- The document communicates the requested idea.
- The spatial structure matches the concept rather than decorating it.
- Interaction or simulation exists only when it adds meaning.

## Renderability

- Has recognizable `F:` and, when needed, `G:`.
- Referenced `F_`/`G_` files exist or are intentionally external.
- Should load through `V.html?D_Title` when saved as `eddie/D_Title.txt`, or through underscore-to-folder fallback (`?E/Clock`).
- Live time/angle rules stay in G; F does not snapshot current `v`.
- Motion that should match wall clock (`∞1` turns) does not jump when focusing F or G.

## Progressive Value

- Beginner examples teach one idea.
- Advanced examples remain inspectable as layers.
- The document can serve as a stepping stone to a more complex one.
