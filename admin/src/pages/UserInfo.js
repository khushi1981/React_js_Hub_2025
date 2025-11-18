import React, { useEffect, useState } from "react";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({ name: "", email: "", userId: "" });
  const [editId, setEditId] = useState(null);

  // ----------------- GET ALL USERS -----------------
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5001/api/users");
    const data = await res.json();
    setUsers(data);
  };

  // ----------------- SEARCH USERS -----------------
  const searchUsers = async () => {
    if (search.trim() === "") return fetchUsers();

    const res = await fetch(`http://localhost:5001/api/users?name=${search}`);
    const data = await res.json();
    setUsers(data);
  };

  // ----------------- ADD USER -----------------
  const addUser = async () => {
    const res = await fetch("http://localhost:5001/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);

    setForm({ name: "", email: "", userId: "" });
    fetchUsers();
  };

  // ----------------- DELETE USER -----------------
  const deleteUser = async (id) => {
    const res = await fetch(`http://localhost:5001/api/users/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    alert(data.message);
    fetchUsers();
  };

  // ----------------- START EDIT -----------------
  const startEdit = (u) => {
    setEditId(u._id);
    setForm({ name: u.name, email: u.email, userId: u.userId });
  };

  // ----------------- UPDATE USER -----------------
  const updateUser = async () => {
    const res = await fetch(`http://localhost:5001/api/users/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);

    setEditId(null);
    setForm({ name: "", email: "", userId: "" });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ width: "90%", margin: "20px auto" }}>
      <h2>User Management</h2>

      {/* ---------------- Search Box ---------------- */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            marginRight: "10px",
            border: "1px solid #aaa",
            borderRadius: "5px",
          }}
        />
        <button onClick={searchUsers} style={{ padding: "8px 15px" }}>
          Search
        </button>
      </div>

      {/* ---------------- Add/Edit User Form ---------------- */}
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h3>{editId ? "Edit User" : "Add User"}</h3>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ padding: "8px", width: "200px", marginRight: "10px" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ padding: "8px", width: "200px", marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="User ID"
          value={form.userId}
          onChange={(e) => setForm({ ...form, userId: e.target.value })}
          style={{ padding: "8px", width: "150px", marginRight: "10px" }}
        />

        {!editId ? (
          <button onClick={addUser} style={{ padding: "8px 15px" }}>
            Add User
          </button>
        ) : (
          <button onClick={updateUser} style={{ padding: "8px 15px" }}>
            Update User
          </button>
        )}
      </div>

      {/* ---------------- USERS TABLE ---------------- */}
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead style={{ background: "#eee" }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.userId}</td>
                <td>
                  <button
                    onClick={() => startEdit(u)}
                    style={{
                      background: "blue",
                      color: "white",
                      padding: "5px 10px",
                      marginRight: "10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(u._id)}
                    style={{
                      background: "red",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
