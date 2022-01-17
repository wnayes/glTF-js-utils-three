/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = gltf-js-utils;

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = three;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "glTFAssetFromTHREE": () => (/* binding */ glTFAssetFromTHREE)
/* harmony export */ });
/* harmony import */ var gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var gltf_js_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Creates a GLTF asset from a Three.js object/scene.
 * The GLTFAsset can be turned into a glTF file via `gltf-js-utils`.
 * @param obj Three.js object or scene.
 * @returns GLTFAsset equivalent.
 */
function glTFAssetFromTHREE(obj) {
    var asset = new gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__.GLTFAsset();
    var scene = new gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__.Scene();
    scene.name = obj.name;
    asset.addScene(scene);
    scene.addNode(NodeFromTHREE(obj));
    return asset;
}
function NodeFromTHREE(obj) {
    var node = new gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__.Node();
    node.name = obj.name;
    if (isTHREEMesh(obj)) {
        node.mesh = MeshFromTHREE(obj);
    }
    else {
        node.setTranslation(obj.position.x, obj.position.y, obj.position.z);
        node.setRotationRadians(obj.rotation.x, obj.rotation.y, obj.rotation.z);
        node.setScale(obj.scale.x, obj.scale.y, obj.scale.z);
        for (var _i = 0, _a = obj.children; _i < _a.length; _i++) {
            var child = _a[_i];
            node.addNode(NodeFromTHREE(child));
        }
    }
    return node;
}
function MeshFromTHREE(obj) {
    var mesh = new gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__.Mesh();
    var threeGeometry = obj.geometry;
    if (isTHREEGeometry(threeGeometry)) {
        for (var i = 0; i < threeGeometry.faces.length; i++) {
            var face = threeGeometry.faces[i];
            var faceColor = new gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__.RGBColor();
            faceColor.r = face.color.r;
            faceColor.g = face.color.g;
            faceColor.b = face.color.b;
            mesh.addFace(VertexFromTHREE(threeGeometry, i, face.a, 0), VertexFromTHREE(threeGeometry, i, face.b, 1), VertexFromTHREE(threeGeometry, i, face.c, 2), faceColor, face.materialIndex);
        }
        mesh.material = MaterialsFromTHREE(obj.material);
    }
    else {
        throw new Error("BufferGeometry (or other type) not supported.");
    }
    return mesh;
}
function MaterialsFromTHREE(threeMaterial) {
    var materials = [];
    if (!Array.isArray(threeMaterial)) {
        threeMaterial = [threeMaterial];
    }
    for (var _i = 0, threeMaterial_1 = threeMaterial; _i < threeMaterial_1.length; _i++) {
        var mat = threeMaterial_1[_i];
        materials.push(MaterialFromTHREE(mat));
    }
    return materials;
}
function MaterialFromTHREE(threeMaterial) {
    var material = new gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__.Material();
    material.doubleSided = threeMaterial.side === three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide;
    if (isTHREEMeshBasicMaterial(threeMaterial)) {
        material.pbrMetallicRoughness.metallicFactor = 0;
        material.pbrMetallicRoughness.roughnessFactor = 0;
        if (threeMaterial.transparent) {
            material.alphaMode = gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__.AlphaMode.MASK;
            material.alphaCutoff = threeMaterial.alphaTest;
        }
        material.vertexColorMode = threeMaterial.vertexColors ? gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__.VertexColorMode.VertexColors : gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__.VertexColorMode.NoColors;
        if (threeMaterial.color && !threeMaterial.vertexColors) {
            material.pbrMetallicRoughness.baseColorFactor = [
                threeMaterial.color.r,
                threeMaterial.color.g,
                threeMaterial.color.b,
                1
            ];
        }
        if (threeMaterial.map) {
            var texture = new gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__.Texture(threeMaterial.map.image);
            texture.wrapS = WrappingModeFromTHREE(threeMaterial.map.wrapS);
            texture.wrapT = WrappingModeFromTHREE(threeMaterial.map.wrapT);
            material.pbrMetallicRoughness.baseColorTexture = texture;
        }
    }
    else {
        throw new Error("".concat(threeMaterial.type, " is currently not supported."));
    }
    return material;
}
function VertexFromTHREE(threeGeometry, faceIndex, vertexIndex, vertexRelIndex) {
    var vertex = new gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__.Vertex();
    var threeVertex = threeGeometry.vertices[vertexIndex];
    vertex.x = threeVertex.x;
    vertex.y = threeVertex.y;
    vertex.z = threeVertex.z;
    if (threeGeometry.faceVertexUvs[0] && threeGeometry.faceVertexUvs[0][faceIndex]
        && threeGeometry.faceVertexUvs[0][faceIndex][vertexRelIndex]) {
        vertex.u = threeGeometry.faceVertexUvs[0][faceIndex][vertexRelIndex].x;
        vertex.v = threeGeometry.faceVertexUvs[0][faceIndex][vertexRelIndex].y;
    }
    var threeFace = threeGeometry.faces[faceIndex];
    if (threeFace.vertexNormals[vertexRelIndex]) {
        vertex.normalX = threeFace.vertexNormals[vertexRelIndex].x;
        vertex.normalY = threeFace.vertexNormals[vertexRelIndex].y;
        vertex.normalZ = threeFace.vertexNormals[vertexRelIndex].z;
    }
    if (threeFace.vertexColors[vertexRelIndex]) {
        vertex.color = new gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__.RGBColor();
        vertex.color.r = threeFace.vertexColors[vertexRelIndex].r;
        vertex.color.g = threeFace.vertexColors[vertexRelIndex].g;
        vertex.color.b = threeFace.vertexColors[vertexRelIndex].b;
    }
    return vertex;
}
function WrappingModeFromTHREE(mode) {
    switch (mode) {
        case three__WEBPACK_IMPORTED_MODULE_1__.RepeatWrapping:
            return gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__.WrappingMode.REPEAT;
        case three__WEBPACK_IMPORTED_MODULE_1__.MirroredRepeatWrapping:
            return gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__.WrappingMode.MIRRORED_REPEAT;
        case three__WEBPACK_IMPORTED_MODULE_1__.ClampToEdgeWrapping:
        default:
            return gltf_js_utils__WEBPACK_IMPORTED_MODULE_0__.WrappingMode.CLAMP_TO_EDGE;
    }
}
function isTHREEMesh(obj) {
    return obj.type === "Mesh";
}
function isTHREEGeometry(obj) {
    return obj.type === "Geometry";
}
function isTHREEMeshBasicMaterial(obj) {
    return obj.type === "MeshBasicMaterial";
}

})();

/******/ })()
;