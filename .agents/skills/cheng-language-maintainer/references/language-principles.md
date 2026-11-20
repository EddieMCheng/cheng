# Cheng Language Principles

## What To Protect

Cheng is an artistic visual language where a small text document can become a drawing, simulation, interface, memory, and explanation. Its value is not conventional maintainability first; its value is the ability to think spatially in compressed notation.

Protect these invariants:

- `F` is the compact material/form layer.
- `G` is the equation/behavior layer.
- `D` documents are saved thoughts, not data records.
- `V.html` is an interpreter, not an app shell.
- The corpus teaches the language by progressively more complex examples.

## Compression With Readability

Compression is good when it exposes pattern:

- Reusing property letters.
- Repeating transforms.
- Naming objects by spatial role.
- Using equations instead of procedural code.
- Relying on defaults that are already idiomatic.

Compression is bad when it hides intent:

- One-off abbreviations that do not recur.
- New symbols that duplicate existing meaning.
- Long `G` expressions that should become two stable named steps.
- Runtime changes that make older documents ambiguous.

## AI Maintenance Bias

When uncertain, preserve the language and add a small example rather than making a broad runtime change. A good AI contribution should feel as if it belongs beside files such as `F_Demo.txt`, `E/SpaceTime.txt`, `E/Draw.txt`, `E/UI.txt`, and `E/D/Simulator/Gravity.txt`.

Avoid translating Cheng into:

- JSON scene descriptions.
- React/component UI.
- verbose class models.
- external rendering frameworks that replace `F/G/D`.

Those may be useful around the project, but they should not become the language.
