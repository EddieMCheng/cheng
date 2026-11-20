---
name: cheng-document-author
description: Create, edit, explain, and evaluate Cheng D/F/G documents. Use when authoring Cheng visual language documents, mapping notation to drawing, simulation, interface, memory, or explanation, generating progressive examples, evaluating compactness and readability, helping AI produce documents that render through V.html, saving D documents, wiring ?D_Title URL load, or authoring clocks and other time-driven ∞1 angles.
---

# Cheng Document Author

## Core Model

Author Cheng documents as compact spatial thoughts:

- Start from the intended concept, then express it as spatial relations.
- Use `F` for visible/static structure: primitives, groups, repetitions, transforms, labels, colors, scale, orientation.
- Use `G` for living behavior: time, input, equations, state updates, labels, simulation, UI logic.
- Use document metadata and saved values as memory: title, viewport, timing, defaults, device context, and authored state.
- Keep documents inspectable as text and runnable through `V.html`.

## Authoring Workflow

1. State the concept in one sentence.
2. Build the smallest visible `F` that communicates it.
3. Add `G` only when motion, interaction, state, explanation, or memory is needed.
4. Prefer a learning ladder: point -> line -> shape -> group -> transform -> interaction -> simulation -> self-editing interface.
5. Keep the first version small. Add complexity by composing existing idioms, not by inventing verbose structures.
6. When explaining, translate the same notation through five lenses: drawing, simulation, interface, memory, explanation.
7. When evaluating, judge compactness, in-language readability, visual coherence, conceptual faithfulness, and renderability.

## Document Idiom

- Favor short ids that read spatially: `sun`, `earth`, `pt_0`, `line_1`, `UI`, `Selection`.
- Use `F` composition for meaning: parent groups, repeated points, rings, surfaces, paths, and connected parts.
- Use `G` equations for meaning that changes: `time`, `touch`, `Mx`, `My`, `Ev`, `LAT`, `LON`, `D(...)`, `E(...)`, `X(...)`, `Y(...)`, `Z(...)`.
- Minimize characters by using defaults and repeated transforms, but do not obscure the concept with one-off cleverness.
- Prefer progressive examples over full explanations inside a single document.
- Keep live angles and time in `G`. Do not bake current `v` into `F`. Save repo documents as `eddie/D_Title.txt` so `V.html?D_Title` loads them. Reveal chrome from G (`this.saveDButton.hidden=false`); the download button does not write the git repo.

## References

Load only the reference needed for the task:

- `references/document-anatomy.md`: saved document structure and `D/G/F` sections.
- `references/notation-to-world.md`: how notation becomes drawing, simulation, interface, memory, and explanation.
- `references/property-reference.md`: core letters and their practical meanings.
- `references/progressive-curriculum.md`: simple-to-complex teaching sequence.
- `references/evaluation-rubric.md`: checklist for judging AI-created documents.
- `references/example-patterns.md`: patterns from existing project documents.

## Helper Scripts

- `scripts/new_document.ps1 -Title <name>` creates a minimal `.txt` document skeleton.
- `scripts/extract_document_parts.ps1 -Path <file>` splits a document into header, `G`, `F`, and trailing URL.
- `scripts/render_smoke.ps1 -Repo <path> -Document <relative txt>` starts a local server and prints a `V.html?<document>` URL for manual/browser smoke testing.
