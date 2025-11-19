import React, { useEffect, useState } from "react";

export default function UserSubscription() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/plans")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPlans(data);
        } else {
          console.error("Invalid API response:", data);
          setPlans([]);
        }
      })
      .catch(() => setPlans([]));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Choose Your Subscription</h1>

      {plans.length === 0 ? (
        <p>No plans available right now.</p>
      ) : (
        plans.map((p) => (
          <div
            key={p._id}
            style={{
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h3>{p.plan_name}</h3>
            <p>Price: ₹{p.price}</p>
            <p>Duration: {p.duration} days</p>
            <button>Subscribe</button>
          </div>
        ))
      )}
    </div>
  );
}
