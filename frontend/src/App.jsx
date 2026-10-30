import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import "./App.css";

function Workspace() {
  return (
    <>
      {/* Lights make the object visible */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2} />

      {/* Temporary object: replace this with the rocket later */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Ground reference grid */}
      <Grid
        position={[0, -0.01, 0]}
        args={[20, 20]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#283241"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#526176"
        fadeDistance={70}
        infiniteGrid
      />

      {/* Red = X, green = Y, blue = Z */}
      <axesHelper args={[4]} />

      {/* Rotate, pan, and zoom using the mouse */}
      <OrbitControls
        makeDefault
        target={[0, 1, 0]}
        enableDamping
        dampingFactor={0.08}
        minDistance={2}
        maxDistance={100}
      />
    </>
  );
}

export default function App() {
  return (
    <main className="workspace">
      <Canvas camera={{ position: [8, 6, 8], fov: 50 }}>
        <color attach="background" args={["#080c14"]} />
        <Workspace />
      </Canvas>

      <header className="workspace-heading">
        <span className="status-dot" />
        ROCKET MISSION · 3D WORKSPACE
      </header>

      <div className="controls-guide">
        <span>Left drag: Rotate</span>
        <span>Scroll: Zoom</span>
        <span>Right drag: Pan</span>
      </div>
    </main>
  );
}