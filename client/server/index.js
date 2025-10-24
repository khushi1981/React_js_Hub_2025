// server.js
import http from "http";
import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "Hub";

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

// Register user
async function insertUser(user) {
  const db = client.db(dbName);
  const collection = db.collection("Users");

  const existing = await collection.findOne({
    $or: [{ email: user.email }, { userId: user.userId }],
  });
  if (existing) {
    return { success: false, message: "User ID or Email already exists" };
  }

  await collection.insertOne(user);
  return { success: true, message: "Registration successful!" };
}

// Login user
async function loginUser(identifier, password) {
  const db = client.db(dbName);
  const collection = db.collection("Users");

  const user = await collection.findOne({
    $or: [{ userId: identifier }, { email: identifier }],
  });

  if (!user) return { success: false, message: "Invalid User ID or Email" };
  if (user.password !== password)
    return { success: false, message: "Incorrect password" };

  return {
    success: true,
    token: user._id.toString(),
    message: "Login successful",
  };
}

// Get user by ID
async function getUserById(id) {
  const db = client.db(dbName);
  const collection = db.collection("Users");
  const user = await collection.findOne({ _id: new ObjectId(id) });
  if (!user) return { success: false, message: "User not found" };
  return { success: true, user };
}

// Change password
async function changePassword(userId, currentPassword, newPassword) {
  const db = client.db(dbName);
  const collection = db.collection("Users");

  const user = await collection.findOne({ _id: new ObjectId(userId) });
  if (!user) return { success: false, message: "User not found" };
  if (user.password !== currentPassword)
    return { success: false, message: "Incorrect current password" };

  await collection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { password: newPassword } }
  );
  return { success: true, message: "Password updated successfully" };
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/register") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const data = JSON.parse(body);
      const result = await insertUser(data);
      res.writeHead(result.success ? 200 : 400, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/login") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const { identifier, password } = JSON.parse(body);
      const result = await loginUser(identifier, password);
      res.writeHead(result.success ? 200 : 401, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    });
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/api/user/")) {
    const userId = req.url.split("/").pop();
    const result = await getUserById(userId);
    res.writeHead(result.success ? 200 : 404, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(result));
    return;
  }

  if (req.method === "POST" && req.url === "/api/change-password") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const { userId, currentPassword, newPassword } = JSON.parse(body);
      const result = await changePassword(userId, currentPassword, newPassword);
      res.writeHead(result.success ? 200 : 400, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify(result));
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: false, message: "Not Found" }));
});

connectDB().then(() => {
  server.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
});
