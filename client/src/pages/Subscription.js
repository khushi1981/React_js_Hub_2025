import React, { useState, useEffect } from "react";
import "./Subscription.css";

export default function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  // 👉 Function to make Subscribe button work
  const handleSubscribe = (plan) => {
    // You can replace this with actual Razorpay / Stripe / Backend API
    alert(`You selected the ${plan.name}. Redirecting to payment...`);

    // Example redirect (you can change)
    // window.location.href = "/checkout?plan=" + plan.id;
  };

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
      logo: "/images/FreePlan.jpg",
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
      logo: "/images/StandardPlan.jpg",
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
      logo: "/images/PremimumPlan.jpg",
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
      logo: "/images/EnterprisePlan.jpg",
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
              src={plan.logo}
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
              src={selectedPlan.logo}
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

            {/* WORKING SUBSCRIBE BUTTON */}
            <button
              className="subscribe-now"
              style={{ background: selectedPlan.color }}
              onClick={() => handleSubscribe(selectedPlan)}
            >
              Subscribe Now
            </button>

            <button className="close-btn" onClick={() => setSelectedPlan(null)}>
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
