import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Subjects() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(""); // base64
  const [editId, setEditId] = useState(null);

  // Convert File → Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const load = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/subjects");
      setList(res.data);
    } catch (err) {
      console.error("Load error", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!name || !description || !logo) {
      alert("All fields required!");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/subjects", {
        name,
        description,
        logo,
      });

      alert("Added Successfully");
      reset();
      load();
    } catch (err) {
      console.error("Add error", err);
    }
  };

  const del = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/subjects/${id}`);
      alert("Deleted Successfully");
      load();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const edit = (item) => {
    setEditId(item._id);
    setName(item.name);
    setDescription(item.description);
    setLogo(item.logo);
  };

  const update = async () => {
    if (!name || !description || !logo) {
      alert("All fields required!");
      return;
    }

    try {
      await axios.put(`http://localhost:5001/api/subjects/${editId}`, {
        name,
        description,
        logo,
      });

      alert("Updated Successfully");
      reset();
      load();
    } catch (err) {
      console.error("Update error", err);
    }
  };

  const reset = () => {
    setName("");
    setDescription("");
    setLogo("");
    setEditId(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h2>Manage Subjects</h2>

      <div style={{ padding: "20px", border: "1px solid #ddd", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Subject Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (file) {
              const base64 = await convertToBase64(file);
              setLogo(base64);
            }
          }}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        {editId ? (
          <button onClick={update} style={{ padding: "10px 20px", background: "orange" }}>
            Update Subject
          </button>
        ) : (
          <button onClick={add} style={{ padding: "10px 20px", background: "green", color: "white" }}>
            Add Subject
          </button>
        )}

        {editId && (
          <button onClick={reset} style={{ padding: "10px 20px", marginLeft: "10px" }}>
            Cancel
          </button>
        )}
      </div>

      <h3>Subject List</h3>
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Logo</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <img src={item.logo} alt="logo" width="60" height="60" style={{ objectFit: "contain" }} />
              </td>
              <td>
                <button onClick={() => edit(item)}>Edit</button>
              </td>
              <td>
                <button
                  style={{ background: "red", color: "#fff" }}
                  onClick={() => del(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
