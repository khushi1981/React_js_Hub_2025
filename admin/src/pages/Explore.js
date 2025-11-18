import React, { useEffect, useState } from "react";

export default function Explore() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(""); // dropdown
  const [logo, setLogo] = useState(""); // stores base64 image
  const [editId, setEditId] = useState(null);

  // Dropdown options
  const typeOptions = ["Image", "Video", "Audio", "Document"];

  // Load all formats
  const load = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/formats");
      const data = await res.json();
      setList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load formats:", err);
      setList([]);
    }
  };

  // Convert file to Base64
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  // Add new format
  const addFormat = async () => {
    if (!name || !description || !type || !logo) return alert("Enter all fields");

    try {
      const res = await fetch("http://localhost:5001/api/formats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, type, logo }),
      });
      const data = await res.json();
      if (!data.success) alert(data.message || "Failed to add format");
    } catch (err) {
      console.error("Failed to add format:", err);
    }

    reset();
    load();
  };

  // Delete format
  const deleteFormat = async (id) => {
    if (!id) return alert("Invalid ID");

    try {
      const res = await fetch(`http://localhost:5001/api/formats/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) alert(data.message || "Format not found");
    } catch (err) {
      console.error("Failed to delete format:", err);
    }

    load();
  };

  // Start editing a format
  const startEdit = (f) => {
    if (!f._id) return alert("Invalid format selected");
    setEditId(f._id);
    setName(f.name || "");
    setDescription(f.description || "");
    setType(f.type || "");
    setLogo(f.logo || "");
  };

  // Update format
  const updateFormat = async () => {
    if (!name || !description || !type || !logo) return alert("Enter all fields");
    if (!editId) return alert("Invalid format");

    try {
      const res = await fetch(`http://localhost:5001/api/formats/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, type, logo }),
      });
      const data = await res.json();
      if (!data.success) alert(data.message || "Format not found");
    } catch (err) {
      console.error("Failed to update format:", err);
    }

    reset();
    load();
  };

  // Reset form
  const reset = () => {
    setName("");
    setDescription("");
    setType("");
    setLogo("");
    setEditId(null);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Explore Formats</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Format Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        >
          <option value="">Select Type</option>
          {typeOptions.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          style={{ padding: 8, marginRight: 10 }}
        />
        {editId ? (
          <button onClick={updateFormat}>Update</button>
        ) : (
          <button onClick={addFormat}>Add</button>
        )}
      </div>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Logo</th>
            <th width="180">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((f) => (
              <tr key={f._id}>
                <td>{f.name}</td>
                <td>{f.description}</td>
                <td>{f.type}</td>
                <td>
                  {f.logo ? <img src={f.logo} alt={f.name} width="50" /> : "No Logo"}
                </td>
                <td>
                  <button onClick={() => startEdit(f)}>Edit</button>
                  <button
                    onClick={() => deleteFormat(f._id)}
                    style={{ marginLeft: 10, background: "red", color: "white" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No formats found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
