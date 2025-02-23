import React, { useEffect, useState } from "react";
import "./Custom.css";
const MyList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/list")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} {}
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No users found</td> {}
            </tr>
          )}
        </tbody>
      </table>
      <p>{users.length}</p>
      <div className="count-box">
        <div className="label">Total Users</div>
        <div>{users.length}</div> 
      </div>
    </div>
  );
};

export default MyList;
