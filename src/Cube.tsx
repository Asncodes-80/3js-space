import * as React from "react";
import * as THREE from "three";

interface CanvasConfigParameters {
  fov: number;
  aspectRatio: number;
  near: number;
  farDistance: number;
}

const CubeThree = (): JSX.Element => {
  const canvasRefMount: React.MutableRefObject<any> = React.useRef(null);
  const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();

  /**
   * # Cube Canvas
   *
   * Renders a rectangle cube in case of Web App.
   */
  const cubeCanvas = (): void => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const scene: THREE.Scene = new THREE.Scene();
    const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
      color: 0x44aaff,
    });

    // Light brightness intensity
    const light: THREE.DirectionalLight = new THREE.DirectionalLight(
      0xffffff,
      1
    );
    light.position.set(-1, 2, 5);
    scene.add(light);

    const defaultCanvasConfig: CanvasConfigParameters = {
      fov: 100,
      aspectRatio: window.innerWidth / window.innerHeight,
      near: 0.1,
      farDistance: 10,
    };

    /** Square configurations */
    const objectConfig = {
      width: 0.4,
      height: 0.4,
      depth: 0.1,
    };

    const camera = new THREE.PerspectiveCamera(
      defaultCanvasConfig.fov,
      defaultCanvasConfig.aspectRatio,
      defaultCanvasConfig.near,
      defaultCanvasConfig.farDistance
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

    function render(time: number) {
      time *= 0.001;

      cube.rotation.x = time;
      cube.rotation.y = time;

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize, false);
  };

  React.useEffect(() => {
    cubeCanvas();

    return () => canvasRefMount.current.removeChild(renderer.domElement);
  }, []);

  return (
    <>
      <div ref={canvasRefMount} />
    </>
  );
};

export default CubeThree;
