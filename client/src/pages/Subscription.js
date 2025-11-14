import React, { useState, useEffect } from "react";
import "./Subscription.css";

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const plans = [
    {
      id: 1,
      name: "Free Plan",
      price: "$0 / month",
      features: [
        "Access to limited resources",
        "Community forum support",
        "Basic tutorials",
        "Download up to 3 resources per week",
      ],
      color: "#43cea2",
      thumbnail: "https://picsum.photos/400/250?random=31",
    },
    {
      id: 2,
      name: "Standard Plan",
      price: "$9.99 / month",
      features: [
        "Access to all eBooks & PDFs",
        "Priority customer support",
        "Ad-free experience",
        "Early access to new resources",
      ],
      color: "#2575fc",
      thumbnail: "https://picsum.photos/400/250?random=32",
    },
    {
      id: 3,
      name: "Premium Plan",
      price: "$19.99 / month",
      features: [
        "Unlimited downloads",
        "Exclusive premium resources",
        "Personal learning dashboard",
        "1-on-1 mentor sessions monthly",
      ],
      color: "#6a11cb",
      thumbnail: "https://picsum.photos/400/250?random=33",
    },
    {
      id: 4,
      name: "Enterprise Plan",
      price: "Custom",
      features: [
        "Team access and reporting",
        "Dedicated account manager",
        "Custom integrations",
        "Bulk licensing discounts",
      ],
      color: "#ff6a00",
      thumbnail: "https://picsum.photos/400/250?random=34",
    },
  ];

  return (
    <div className={`subscription-container ${visible ? "fade-in" : ""}`}>
      <h2 className="subscription-title">💎 Subscription Plans</h2>
      <p className="subscription-subtitle">
        Choose the plan that fits your learning journey. Upgrade anytime to
        unlock exclusive content and benefits.
      </p>

      <div className="subscription-grid">
        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className="subscription-card"
            style={{
              borderTop: `6px solid ${plan.color}`,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <img
              src={plan.thumbnail}
              alt={plan.name}
              className="subscription-thumbnail"
            />
            <div className="subscription-info">
              <h3 className="subscription-name">{plan.name}</h3>
              <p className="subscription-price">{plan.price}</p>
              <ul className="subscription-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>✅ {feature}</li>
                ))}
              </ul>

              <button
                className="subscription-btn"
                style={{ background: plan.color }}
                onClick={() => setSelectedPlan(plan)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div
          className="subscription-modal-overlay"
          onClick={() => setSelectedPlan(null)}
        >
          <div
            className="subscription-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPlan.thumbnail}
              alt={selectedPlan.name}
              className="modal-thumbnail"
            />
            <h2>{selectedPlan.name}</h2>
            <p className="modal-price">{selectedPlan.price}</p>
            <ul className="modal-features">
              {selectedPlan.features.map((f, i) => (
                <li key={i}>⭐ {f}</li>
              ))}
            </ul>

            <button
              className="subscribe-now"
              style={{ background: selectedPlan.color }}
            >
              Subscribe Now
            </button>

            <button
              className="close-btn"
              onClick={() => setSelectedPlan(null)}
            >
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
