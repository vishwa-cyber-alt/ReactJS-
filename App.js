import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
          // Home component (optional)
import ListUsers from "./components/ListUsers";
import AddUser from "./components/AddUser";
import MyList from "./components/MyList";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/ListUsers">Dashboard</a>
            </li>
            <li>
              <a href="/AddUser">User List</a>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* Define routes */}
          <Route path="/" element={<MyList />} />
          <Route path="/ListUsers" element={<ListUsers />} />
          <Route path="/AddUser" element={<AddUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
