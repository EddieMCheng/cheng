---
name: cheng-language-maintainer
description: Maintain the Cheng visual language runtime, notation, examples, and documents. Use when working on Cheng/V.html, changing F/G/D notation, adding examples, refactoring the interpreter, preserving compressed symbolic scene documents, balancing minimum character count with readability, protecting the project's progressive artistic language from conventionalization, or debugging assignMean/targetD live state, time/modulus angles, URL document loading, or save D.
---

# Cheng Language Maintainer

## Core Stance

Treat Cheng as a personal visual language runtime, not a conventional web app. Preserve the model:

- `F` is form: visible structure, repetitions, transforms, names, color, scale, orientation.
- `G` is behavior: equations, interaction, simulation, state updates, labels, input, device values.
- `D` documents are saved thoughts: title, metadata, viewport, defaults, authored state, `G`, `F`, and origin URL.
- `V.html` is the interpreter that turns compact documents into drawing, simulation, interface, memory, and explanation.

Do not replace the symbolic language with JSON schemas, component trees, scene-graph boilerplate, or a normal UI framework unless the user explicitly asks to abandon the language.

## Maintenance Workflow

1. Classify the change before editing:
   - Runtime behavior belongs in `V.html`.
   - Idiom, examples, and learning material belong in `.txt` documents.
   - Language explanation belongs in skill references or project notes.
   - New concepts should usually start as documents before runtime changes.
2. Read the smallest relevant runtime functions and at least two nearby documents that already express the idea.
3. Preserve existing documents by default. Any parser/evaluator/rendering change must keep old `.txt` files valid unless the user explicitly approves a notation break.
4. Prefer compact notation, but optimize for recognizable local patterns over raw minification.
5. Keep additions teachable: every new construct should be explainable through simpler documents.

## Editing Rules

- Preserve symbolic consistency. New syntax should look like the existing language, not imported syntax from another ecosystem.
- Prefer short meaningful ids, repeated transforms, range-like relationships, and equation-like `G` rules.
- Keep runtime helpers small and close to the parser/evaluator/render path they support.
- Avoid unrelated cleanup in `V.html`; the file is dense and changes have broad document impact.
- When changing property letters or defaults, update compatibility notes and document examples.
- Use the existing corpus as source of truth for idiom, even when the runtime code is rough.
- Keep `F` as authored form (`targetD`) and `G` as live behavior (`D`). `assignMean` must not lerp G-owned properties. `∞1` angles such as `sec.v=time/1000/60∞1` must match wall-clock turns exactly, including wrap. After `F2DE()`, call `Geval()` and set `go=1` so URL-loaded documents draw.

## References

Load only the reference needed for the task:

- `references/language-principles.md`: philosophy, compression/readability, and what must be protected.
- `references/runtime-map.md`: `V.html` flow from URL/file to parse, live F/G layers, eval, buffers, draw, and save.
- `references/notation-style.md`: naming, property letters, symbols, and compact readability.
- `references/change-checklist.md`: compatibility checks before parser/evaluator/rendering changes.

## Helper Scripts

- `scripts/check_documents.ps1 -Repo <path>` scans `.txt` documents for basic `G:`/`F:` structure and unresolved `F_`/`G_` references.
- `scripts/list_examples.ps1 -Repo <path>` summarizes document size, presence of `G`/`F`, and rough feature signals.
