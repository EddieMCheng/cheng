# Notation Style

## Naming

Use names that carry spatial or conceptual role:

- Good: `sun`, `earth`, `line_0`, `pt_3`, `UI`, `Selection`, `orbit_`, `paint_`.
- Avoid: long prose ids, framework-like component names, ids that only describe implementation.

Use short names when the pattern is obvious. Use slightly longer names when the concept is educational.

## Property Letters

Preserve the existing property-letter feel:

- `p`: visibility/point/text presence style.
- `l`: count/length/repetition.
- `x y z`: spatial position.
- `r g b`: color.
- `u`: scale/radius.
- `o v w`: orientation/orbit angles.
- `d`: phase/index/data selector.
- `t`: time/sample/memory stamp.
- `a`: draw/type/alpha-like rendering role.

Do not add a new letter unless it earns its place across multiple documents.

## Symbols

Prefer existing symbolic vocabulary:

- `*` for applying numeric/property modifiers.
- `+` for composing parts.
- `=` for defining grouped form.
- `,` for separating definitions/rules.
- `±` for spread/secondary value.
- `→` for ranges.
- `←` for current object in a range rule.
- `?` and `!` for compact conditional behavior.
- `∞` for modulo (`time/1000/60∞1` is fraction of a minute). `o v w` are turns, modulus 1, not degrees.

## When To Split

Split a dense expression when:

- A subexpression has conceptual value and can be named.
- The same calculation appears twice.
- A beginner document needs to teach one idea at a time.
- A future maintainer would not know what visual behavior changed.

Keep a dense expression when the repetition itself is the explanation.
