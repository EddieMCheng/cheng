# Property Reference

This is a practical guide, not a strict specification. Existing documents are the source of truth.

## Core Properties

- `s`: string/status/name-like role in some rules.
- `l`: length/count/repetition.
- `i`: index/input-like role where used.
- `p`: presence/point/text/visibility style.
- `x y z`: position.
- `r g b`: color channels.
- `u`: scale/radius/magnitude.
- `o v w`: orientation/orbit/phase angles in **turns** (modulus 1), not degrees. `v` is the usual spin/orbit used by clock hands and planets.
- `d`: data selector, phase, index, or stored numeric state.
- `t`: time/sample/memory stamp.
- `a`: draw/type/alpha/render mode role.

## Primary And Secondary Values

`D` holds primary values. `E` holds secondary/spread values. In `F`, `±` typically sets the secondary side. In `G`, paired assignments can update both primary and secondary behavior.

## Common Runtime Values

- `time`: current timestamp in milliseconds (`Date.getTime()`).
- `dT`: update interval in seconds. `dT=0.04` is a typical clock/simulation tick. `dT===0` snaps instead of easing. Do not treat empty string as zero.
- `Mx`, `My`: pointer position in normalized viewport space.
- `touch`, `drag`, `click`: interaction state.
- `Ev`: keyboard state.
- `Vx`, `Vy`, `Vz`, `Vw`, `Vo`, `Vu`, `VP`, `Vzu`: viewport/camera/projection state.
- `LAT`, `LON`, `ALT`, `GPS`: geolocation state when available.

## Helper Accessors

Use the idioms already present in documents:

- `D(name.property)` and `E(name.property)` for authored state.
- `X(name)`, `Y(name)`, `Z(name)` for derived positions.
- `B(name.property)(i)` for buffered/sample history patterns.
- `Math.` or symbolic `≝` depending on whether working before or after `outG()` prettification.
- `∞` for modulo, converted to `%` at eval. `a∞1` is `a%1`.
