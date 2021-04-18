declare module "src/index" {
    import { GLTFAsset } from "gltf-js-utils";
    import * as THREE from "three";
    /**
     * Creates a GLTF asset from a Three.js object/scene.
     * The GLTFAsset can be turned into a glTF file via `gltf-js-utils`.
     * @param obj Three.js object or scene.
     * @returns GLTFAsset equivalent.
     */
    export function glTFAssetFromTHREE(obj: THREE.Object3D): GLTFAsset;
}
declare module "test/square.spec" { }
