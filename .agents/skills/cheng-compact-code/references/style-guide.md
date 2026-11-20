# Cheng Compact Code Style Guide

## 1. Architectural character

The reference code is a self-contained browser runtime rather than a conventional web application. Its defining traits are:

- one principal HTML file containing markup, JavaScript, shaders, UI, and runtime setup;
- direct use of WebGL, Canvas 2D, Web Audio, WebSocket, Geolocation, WebXR, BLE, File APIs, and DOM events;
- a compact serialized language for geometry and behavior;
- conversion into indexed arrays used by the render/evaluation loop;
- global state used deliberately as the shared runtime memory;
- no framework, bundler, component system, dependency injection layer, or object hierarchy.

This is appropriate when deployment simplicity, low source size, experimentation speed, and exact control matter more than independent team ownership of many modules.

## 2. The readability/size balance

The code is compact at several levels:

### Representation compression

Store many related properties by index instead of repeating object keys. A property alphabet can map symbols to numeric positions. This makes parsing, serialization, and iteration share the same structure.

Use this when:

- records are homogeneous;
- hot loops read properties by index;
- serialized size matters;
- the index map is stable and visible nearby.

Avoid it for small business objects passed across many unrelated modules.

### Concept compression

A single conversion function should own one representation boundary. Examples:

- serialized form to normalized arrays;
- normalized arrays back to serialized form;
- evaluated state to vertex/color buffers;
- compact behavior expressions to executable update instructions.

This is preferable to spreading parser logic across models, DTOs, adapters, and services.

### Syntax compression

Compact adjacent operations when they form one thought:

```js
V.width=SW;V.height=SH
I.width=SW;I.height=SH
U.width=SW;U.height=SH
```

Do not compress unrelated effects merely because they fit on one line.

## 3. Naming

Use two naming zones.

### Boundary and orchestration names

Use readable names for platform-facing and lifecycle functions:

```js
function start(){}
function loop(){}
function readFile(file){}
function updateImage(index){}
```

### Mathematical and indexed runtime names

Use short names for values whose meaning is local, repeated, or domain-mathematical:

```js
let x,y,z,u,v,w,r,g,b
for(let i=0;i<count;i++){}
```

For compressed domain state, define the mapping near its declaration:

```js
const properties='slipxyzrgbuovwdta'
```

Add a short representation note when a new reader cannot reasonably infer the mapping.

## 4. Control flow formatting

Use compact one-line branches for one obvious action:

```js
if(gl)draw()
if(!xrOn)requestAnimationFrame(loop)
```

Use braces when the branch changes multiple values or contains a semantic sequence:

```js
if(type<0){
  gl.blendEquation(gl.FUNC_REVERSE_SUBTRACT)
  type=Math.abs(type)
}
```

Prefer early direct checks over deeply abstracted guard utilities.

## 5. Data-driven behavior

Prefer data and parsing over repeated custom functions when users or files must define behavior. A compact grammar can encode names, dimensions, transforms, colors, interpolation, or links.

Requirements for a mini-language:

- one canonical parser;
- one canonical serializer where round-tripping matters;
- defaults stored centrally;
- symbols mapped centrally;
- malformed input handled predictably;
- sample strings included near documentation or test fixtures.

Do not invent symbolic syntax for ordinary CRUD code.

## 6. Runtime state

Global mutable state is acceptable when the artifact is a single runtime with one event loop and tightly coupled rendering state. Keep it disciplined:

- declare shared state together near the top;
- group by subsystem;
- use a small number of authoritative update functions;
- avoid hidden mutation inside generic helpers;
- use dirty flags such as `go` to avoid unnecessary rebuilding or drawing;
- separate slow periodic work from animation-frame work.

When concurrency, workers, server requests, or multiple independent views grow, introduce subsystem boundaries rather than continuing to expand undifferentiated global state.

## 7. Platform-first implementation

Prefer direct browser APIs:

- `requestAnimationFrame` for rendering;
- `FileReader` and object URLs for local files;
- WebSocket directly for small protocols;
- Canvas/WebGL directly for custom rendering;
- native geolocation, orientation, motion, media, XR, and BLE APIs.

Add a dependency only when it removes substantially more code and complexity than it introduces.

## 8. Review checklist

### Correctness

- Are numeric shortcuts valid for every supported value?
- Are operator precedence and truthy/falsy assumptions unambiguous?
- Are array indexes and default records consistent?
- Does serialization round-trip?
- Does a compact condition accidentally rely on side effects?

### Readability

- Can the main lifecycle be found quickly?
- Can a reader identify the authoritative state?
- Are representation maps visible?
- Are dense expressions limited to locally understandable formulas?
- Are branch bodies formatted according to semantic weight?

### Size

- Can repeated code become one loop or table?
- Can a native API replace a library?
- Can a computed numeric relationship replace a long branch chain?
- Is a helper adding more names and jumps than code saved?
- Are files split for a real boundary rather than fashion?

### Change discipline

- Preserve existing serialized formats unless migration is requested.
- Avoid broad renaming during functional changes.
- Keep diffs local.
- Do not beautify the whole file while fixing one behavior.
- Test both the compact representation and the visible runtime effect.

## 9. Example transformation

Verbose but over-abstracted:

```js
function setCanvasDimensions(canvas, width, height) {
  canvas.width = width
  canvas.height = height
}

setCanvasDimensions(viewCanvas, screenWidth, screenHeight)
setCanvasDimensions(imageCanvas, screenWidth, screenHeight)
setCanvasDimensions(uiCanvas, screenWidth, screenHeight)
```

Cheng-style compact and readable:

```js
V.width=SW;V.height=SH
I.width=SW;I.height=SH
U.width=SW;U.height=SH
```

The second form is better when these are the only canvases, the names are established runtime symbols, and no independent dimension behavior is expected.

For a reusable application framework, the first form may be better. Optimize the total system, not each line in isolation.
