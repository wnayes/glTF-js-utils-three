gltf-js-utils-three
===================

A basic Three.js to glTF converter.

This converter uses [`gltf-js-utils`](https://github.com/wnayes/glTF-js-utils) under the hood. It was once
distributed as part of that library, but was separated out to remove the Three.js dependency.

Three.js itself includes a [GLTFExporter](https://threejs.org/docs/#examples/en/exporters/GLTFExporter)
that functions similarly to this library. It didn't exist when I originally wrote this, and I would
now generally recommend that you use GLTFExporter instead. It supports more features and is maintained
directly as part of Three.js. You may find that `gltf-js-utils-three` has a few niche strengths still
though.

## Usage

```javascript
import { glTFAssetFromTHREE } from "gltf-js-utils-three";
import { exportGLB } from "gltf-js-utils";

// Create a Three.js Scene or Object3D structure...
const scene = new THREE.Scene();
...

const gltfAsset = glTFAssetFromTHREE(scene);
const gltfArrayBuffer = await exportGLTF(gltfAsset);
```

The above `exportGLB` creates an ArrayBuffer containing a `.glb` model. `gltf-js-utils` also has other APIs that can export to JSON for example.

## Features
The following THREE types are supported:
* Object3D
    * Translation
    * Rotation
    * Scale
* Mesh
* MeshBasicMaterial
    * Transparency
    * Vertex/face colors
    * Image textures
        * Wrapping modes
* Geometry (from the `three/examples/jsm/deprecated/Geometry` module)
    * Face vertex UVs
    * Vertex normals

The following are not supported currently:
* BufferGeometry
* Cameras
* Animations
* Skinning
* Joints

## Development

To build:

    npm install
    npm run build

To test:

    npm run test

## License

MIT
