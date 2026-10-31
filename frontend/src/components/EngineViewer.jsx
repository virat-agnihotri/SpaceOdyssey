
import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Bounds
} from "@react-three/drei";
import * as THREE from "three";

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);

  // Clone so multiple viewers don't share the same scene object.
  const model = useMemo(() => scene.clone(true), [scene]);

  return (
    <Bounds fit clip observe margin={1.3}>
      <primitive object={model} />
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
