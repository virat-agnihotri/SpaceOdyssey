import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import "./App.css";
import { Suspense, useState } from "react";
import { Model } from "./components/EngineViewer";
import Sidebar from "./components/Sidebar";
import EnginePanel from "./components/EnginePanel";


function Workspace() {
  return (
    <>
      {/* Lights make the object visible */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={2} />

      
      {/* Temporary object: replace this with the rocket later */}
      {/* <mesh position={[0, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color="#D8DEE8"
          roughness={0.45}
          metalness={0.35}
        />
      </mesh> */}
      

      {/* Ground reference grid */}
      <Grid
        position={[0, -0.01, 0]}
        args={[20, 20]}
        cellSize={1}
        cellThickness={0.6}
        sectionSize={5}
        sectionThickness={1}
        
        cellColor="#d7dae0"
        sectionColor="#994b72"
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
  const [enginePanelOpen, setEnginePanelOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
        enginePanelOpen={enginePanelOpen}
        onEngineClick={() => {
          setEnginePanelOpen((previous) => !previous);
        }}
      />

      <main className="workspace" aria-label="3D workspace">
      <Canvas camera={{ position: [8, 6, 8], fov: 50 }}>
        <color attach="background" args={["#090B10"]} />

        <Suspense fallback={null}>
          <Model
            modelPath="/models/Solid Rocket Booster.glb"
            fitCamera={false}
            height={5}
          />
        </Suspense>

        <Workspace />
      </Canvas>

        <header className="workspace-heading">
          <span className="status-dot" />
          ROCKET ENGINE · 3D WORKSPACE
        </header>

        <div className="controls-guide">
          <span>Left drag: Rotate</span>
          <span>Scroll: Zoom</span>
          <span>Right drag: Pan</span>
        </div>
      </main>

      {enginePanelOpen && (
        <EnginePanel onClose={() => setEnginePanelOpen(false)} />
      )}
    </div>
  );
}