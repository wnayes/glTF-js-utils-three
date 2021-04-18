import { glTFAssetFromTHREE } from "../src/index";
import * as THREE from "three";
import { Face3, Geometry } from "three/examples/jsm/deprecated/Geometry";

function createSquare(x1: number, y1: number, x2: number, y2: number): Geometry {
    const square = new Geometry();

	square.vertices.push(new THREE.Vector3(x1, y1, 0));
    square.vertices.push(new THREE.Vector3(x1, y2, 0));
    square.vertices.push(new THREE.Vector3(x2, y1, 0));
    square.vertices.push(new THREE.Vector3(x2, y2, 0));

    square.faces.push(new Face3(0, 1, 2));
    square.faces.push(new Face3(1, 2, 3));

    return square;
}

describe("Square example model", () => {
  it("produces expected output", () => {
    const scene = new THREE.Scene();
    scene.add(new THREE.Mesh(
        createSquare(0, 0, 10, 10) as any,
        new THREE.MeshBasicMaterial({ color: 0x009900, side: THREE.DoubleSide })
    ))

    const gltfAsset = glTFAssetFromTHREE(scene);
    expect(gltfAsset).toMatchSnapshot();
  });
});
