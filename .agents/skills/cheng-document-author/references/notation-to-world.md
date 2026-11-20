# Notation To World

Use these five lenses when creating or explaining documents.

## Drawing

`F` names visible things and gives them shape. It defines what exists, where it is, what color it has, how many samples it uses, and how parts relate.

Examples:

- A point is the smallest visible idea.
- A line is a relation between positions.
- A circle/ring/surface is repetition over phase.
- A group is a named concept made of smaller concepts.

## Simulation

`G` makes the document live. It can update positions, colors, labels, phases, and camera from time, input, GPS, XR, or previous state.

Prefer equations over procedures. A good simulation rule reads like a compact physical or conceptual relation.

`∞` is modulo. Clock seconds are `sec.v=time/1000/60∞1`: milliseconds → minutes, then wrap to `[0,1)` so `v` is the second-hand turn. Minutes and hours use the same pattern with longer periods. These live angles belong in G. Putting the current `v` into F makes the hand jump when F is parsed or focused.

## Interface

Interface is not separate from the document. UI can be written in the same notation as objects:

- visual controls are `F` objects.
- active modes and highlights are `G` state.
- touch/mouse distance and click rules select or edit.
- labels explain current values.

## Memory

Memory lives in saved values:

- document title and timestamp.
- viewport/camera variables.
- defaults and property arrays.
- object properties carried from previous interaction.
- `D` and `E` values that preserve authored primary/secondary state.
- Live G values are not F memory. A clock's `sec.v` is computed each tick; saving F should keep the hand's form (`*0.5u±0.5*2a`) without the current angle.

## Explanation

A document explains by being inspectable. The notation should let a reader move from visible result back to spatial rules. Progressive documents are preferred: each one should teach one new relation or behavior before combining many.
