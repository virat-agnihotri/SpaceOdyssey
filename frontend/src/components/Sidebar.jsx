import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">SPACE EXPLORER</div>

      <nav aria-label="Main navigation">
        <button
          type="button"
          className="sidebar-option active"
          aria-current="page"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 4h6l2 10H7L9 4Z" />
            <path d="m7 14-2 5h14l-2-5" />
            <path d="M10 21v1M14 21v1" />
          </svg>

          <span>Rocket Engine</span>
        </button>
      </nav>
    </aside>
  );
}