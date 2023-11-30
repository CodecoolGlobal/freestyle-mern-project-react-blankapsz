import { NavLink, Outlet } from "react-router-dom";

import "./App.css";

function App() {
    return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>My Book Collection</h1>
          <NavLink to="/collection">Collection</NavLink>
          <NavLink to="/edit">Edit Collection</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
    )
}

export default App;