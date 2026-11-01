
import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Bounds
} from "@react-three/drei";
import * as THREE from "three";


export function Model({
  modelPath,
  fitCamera = true,
  height = 5,
}) {
  const { scene } = useGLTF(modelPath);

  const model = useMemo(() => {
    const group = new THREE.Group();
    group.add(scene.clone(true));

    // Measure the original model.
    const box = new THREE.Box3().setFromObject(group);
    const size = box.getSize(new THREE.Vector3());

    // Turn its longest axis toward the vertical Y axis.
    if (size.x > size.y && size.x >= size.z) {
      group.rotation.z = Math.PI / 2;
    } else if (size.z > size.y && size.z > size.x) {
      group.rotation.x = -Math.PI / 2;
    }

    group.updateMatrixWorld(true);

    // Measure again after rotating.
    box.setFromObject(group);
    box.getSize(size);

    const center = box.getCenter(new THREE.Vector3());
    const factor = height / Math.max(size.y, 0.000001);

    // Resize, centre horizontally, and place the bottom on Y = 0.
    group.scale.setScalar(factor);
    group.position.set(
      -center.x * factor,
      -box.min.y * factor,
      -center.z * factor
    );

    return group;
  }, [scene, height]);

  const rocket = <primitive object={model} />;

  if (!fitCamera) {
    return rocket;
  }

  return (
    <Bounds fit clip observe margin={1.3}>
      {rocket}
    </Bounds>
  );
}

export default function EngineViewer({ modelPath }) {
  return (
    <Canvas
      camera={{
        position: [3, 2, 5],
        fov: 45
      }}
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#17232c"]} />

      <ambientLight intensity={1.8} />

      <directionalLight
        position={[5, 8, 5]}
        intensity={2.5}
      />

      <Suspense fallback={null}>
        <Model modelPath={modelPath} />
      </Suspense>

      <OrbitControls
        makeDefault
        enableZoom
        enablePan={false}
        minDistance={0.5}
        maxDistance={50}
      />
    </Canvas>
  );
}
