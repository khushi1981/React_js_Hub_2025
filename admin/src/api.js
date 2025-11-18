const BASE = "http://localhost:5001";

// ---------- USERS ----------
export async function fetchUsers() {
  const res = await fetch(`${BASE}/api/users`);
  return res.json();
}

// ---------- FORMATS ----------
export async function fetchFormats() {
  const res = await fetch(`${BASE}/api/formats`);
  return res.json();
}

export async function addFormat(data) {
  const res = await fetch(`${BASE}/api/formats`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateFormat(id, data) {
  const res = await fetch(`${BASE}/api/formats/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteFormat(id) {
  const res = await fetch(`${BASE}/api/formats/${id}`, {
    method: "DELETE"
  });
  return res.json();
}
