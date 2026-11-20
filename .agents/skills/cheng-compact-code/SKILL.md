---
name: cheng-compact-code
description: Review, design, implement, or refactor browser-based and embedded-style code using Eddie Cheng's compact readable coding approach from the EddieMCheng/cheng repository. Use when asked to follow the Cheng/VD coding style, minimize source size without conventional minification, preserve direct human traceability, build self-contained vanilla JavaScript/HTML tools, design compact data-driven runtimes or mini-languages, or balance terse code with practical maintainability.
---

# Cheng Compact Code

Apply a readability-first form of manual compression: keep the program small by reducing concepts, indirection, repetition, dependencies, and representation overhead—not by making every expression cryptic.

## Workflow

1. Inspect the surrounding code before editing.
2. Identify the program's direct execution path, persistent state, data representation, and platform APIs.
3. Preserve existing compact conventions unless they materially obstruct correctness.
4. Make the smallest coherent change that solves the request.
5. Review the result using the checklist in `references/style-guide.md`.
6. Explain architecture or tradeoffs plainly when requested; do not expand the code merely to match mainstream style guides.

## Core priorities

Apply these priorities in order:

1. Correct behavior.
2. Human traceability: a reader can follow state from input to output.
3. Small total system: few files, few dependencies, little framework overhead.
4. Compact source representation.
5. Conventional abstraction only where it reduces total cognitive and source cost.

## Coding rules

- Prefer vanilla platform APIs over libraries when the native API is sufficient.
- Prefer one direct implementation over layered wrappers, service classes, adapters, and factories.
- Keep closely related state together, often in compact arrays or parallel arrays when this reflects the runtime model.
- Use short identifiers for hot-path mathematical, graphical, protocol, and indexed data. Use descriptive names at boundaries and for non-obvious orchestration.
- Use single quotes in JavaScript. Keep HTML attributes in double quotes.
- Keep small assignments and tightly coupled operations on one line when this improves scanning.
- Break lines around branches, loops, parsing phases, and semantic transitions.
- Omit braces only for a single, unmistakable statement. Add braces as soon as a branch contains state mutation plus another operation.
- Prefer direct event handlers and direct DOM references when elements are few and ownership is obvious.
- Prefer data tables, compact encodings, and generated behavior over repeated imperative code.
- Avoid comments that merely restate syntax. Comment representations, invariants, units, aliases, and surprising formulas.
- Avoid premature modules. Split files only when a subsystem has a stable boundary or can be reused/tested independently.
- Preserve self-contained artifacts when practical: HTML, JavaScript, shaders, UI, and runtime data may coexist in one file if that makes deployment and understanding simpler.

## Compactness test

Before shortening code, ask:

- Does this remove repeated logic or only remove whitespace?
- Does the shorter form preserve the execution story?
- Is the representation documented or inferable nearby?
- Would a helper reduce total code and mental jumps, or merely rename one expression?
- Can native numeric relationships replace a lookup or branch chain safely?

Do not manually minify code into unreadable token soup. The target is authored compact code, not machine-minified output.

## Architecture guidance

Favor a compact pipeline:

`input or serialized text -> parser -> normalized indexed state -> evaluation/update -> render/output`

Use explicit conversion functions between representations. Keep the runtime state format optimized for repeated evaluation and the serialized format optimized for editing, sharing, and size.

For detailed conventions, architecture patterns, and examples, read `references/style-guide.md`.
