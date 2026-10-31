
import "./EnginePanel.css";
import EngineViewer from "./EngineViewer";

const engines = [
  {
    id: "engine-1",
    name: "Rocket Engine 01",
    model: "/models/Solid Rocket Booster.glb",
    description: "Interactive 3D rocket engine"
  },
  {
    id: "engine-2",
    name: "Rocket Engine 02",
    model: null,
    description: "Model coming soon"
  },
  {
    id: "engine-3",
    name: "Rocket Engine 03",
    model: null,
    description: "Model coming soon"
  },
  {
    id: "engine-4",
    name: "Rocket Engine 04",
    model: null,
    description: "Model coming soon"
  },
  {
    id: "engine-5",
    name: "Rocket Engine 05",
    model: null,
    description: "Model coming soon"
  },
  {
    id: "engine-6",
    name: "Rocket Engine 06",
    model: null,
    description: "Model coming soon"
  }
];

export default function EnginePanel({ onClose }) {
  return (
    <aside
      id="engine-panel"
      className="engine-panel"
      aria-labelledby="engine-panel-title"
    >
      <header className="engine-panel-header">
        <div>
          <h2 id="engine-panel-title">Rocket Engines</h2>
          <p>Your 3D model collection</p>
        </div>

        <button
          type="button"
          className="engine-panel-close"
          onClick={onClose}
          aria-label="Close rocket engines panel"
        >
          ×
        </button>
      </header>

      <div className="engine-grid">
        {engines.map((engine) => (
          <article className="engine-card" key={engine.id}>
            <div className="engine-preview">
              {engine.model ? (
                <EngineViewer modelPath={engine.model} />
              ) : (
                <span>3D preview coming soon</span>
              )}
            </div>

            <div className="engine-card-info">
              <h3>{engine.name}</h3>
              <p>{engine.description}</p>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}
