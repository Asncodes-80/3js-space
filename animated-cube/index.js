import * as THREE from "three";

function main() {
  const canvas = document.querySelector("#space");
  const renderer = new THREE.WebGLRenderer({ canvas });
  const scene = new THREE.Scene();
  const material = new THREE.MeshPhongMaterial({ color: 0x44aaff });

  // Light brightness intensity
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(-1, 2, 5);
  scene.add(light);

  const defaultCanvasConfig = {
    fov: 50,
    aspect: 2,
    near: 0.1,
    far: 5,
  };

  /** Square configurations */
  const objectConfig = {
    width: 0.5,
    height: 1,
    depth: 1,
  };

  const camera = new THREE.PerspectiveCamera(
    defaultCanvasConfig.fov,
    defaultCanvasConfig.aspect,
    defaultCanvasConfig.near,
    defaultCanvasConfig.far
  );
  camera.position.z = 2;

  const geometry = new THREE.BoxGeometry(
    objectConfig.width,
    objectConfig.height,
    objectConfig.depth
  );

  /**
   * # Cube
   *
   * - Needs proper geometry as {@link THREE.BoxGeometry}
   * - Needs proper material to have design cube
   */
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  function render(time) {
    time *= 0.001;

    cube.rotation.x = time;
    cube.rotation.y = time;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
