import React, { useEffect, useState } from "react";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [editId, setEditId] = useState(null);

  // --------------------------
  // Load All Plans
  // --------------------------
  const loadPlans = () => {
    fetch("http://localhost:5001/api/plans")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPlans(data);
        } else {
          console.error("API did NOT return array:", data);
          setPlans([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setPlans([]);
      });
  };

  useEffect(() => {
    loadPlans();
  }, []);

  // --------------------------
  // Add Plan
  // --------------------------
  const addPlan = () => {
    fetch("http://localhost:5001/api/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan_name: planName,
        price,
        duration,
      }),
    }).then(() => {
      setPlanName("");
      setPrice("");
      setDuration("");
      loadPlans();
    });
  };

  // --------------------------
  // Update Plan
  // --------------------------
  const updatePlan = () => {
    fetch(`http://localhost:5001/api/plans/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan_name: planName,
        price,
        duration,
      }),
    }).then(() => {
      setEditId(null);
      setPlanName("");
      setPrice("");
      setDuration("");
      loadPlans();
    });
  };

  // --------------------------
  // Delete Plan
  // --------------------------
  const deletePlan = (id) => {
    fetch(`http://localhost:5001/api/plans/${id}`, {
      method: "DELETE",
    }).then(() => loadPlans());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Subscription Plans</h1>

      {/* Form */}
      <input
        placeholder="Plan Name"
        value={planName}
        onChange={(e) => setPlanName(e.target.value)}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      {editId ? (
        <button onClick={updatePlan}>Update</button>
      ) : (
        <button onClick={addPlan}>Add</button>
      )}

      <hr />

      {/* LIST PLANS SAFELY */}
      <h2>Available Plans</h2>
      {plans.length === 0 ? (
        <p>No plans found.</p>
      ) : (
        plans.map((p) => (
          <div key={p._id} style={{ marginBottom: "10px" }}>
            <b>{p.plan_name}</b> — ₹{p.price} — {p.duration} days
            <button
              onClick={() => {
                setEditId(p._id);
                setPlanName(p.plan_name);
                setPrice(p.price);
                setDuration(p.duration);
              }}
            >
              Edit
            </button>

            <button onClick={() => deletePlan(p._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
