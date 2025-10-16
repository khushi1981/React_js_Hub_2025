// server.js
import http from "http";
import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "Hub";

// Connect once when server starts
async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Stop server if DB connection fails
  }
}

// Function to insert a user
async function insertUser(user) {
  try {
    const db = client.db(dbName);
    const collection = db.collection("Users");

    // Check if userId or email already exists
    const existingUser = await collection.findOne({
      $or: [{ userId: user.userId }, { email: user.email }],
    });

    if (existingUser) {
      return { success: false, message: "User ID or Email already exists" };
    }

    await collection.insertOne(user);
    return { success: true, message: "Registration successful!" };
  } catch (err) {
    return { success: false, message: "Error: " + err.message };
  }
}

// Function to check login
async function loginUser(identifier, password) {
  try {
    const db = client.db(dbName);
    const collection = db.collection("Users");

    const user = await collection.findOne({
      $or: [{ userId: identifier }, { email: identifier }],
    });

    if (!user) {
      return { success: false, message: "Invalid User ID or Email" };
    }

    if (user.password !== password) {
      return { success: false, message: "Incorrect password" };
    }

    return { success: true, token: "FAKE_TOKEN", message: "Login successful" };
  } catch (err) {
    return { success: false, message: "Error: " + err.message };
  }
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Register endpoint
  if (req.method === "POST" && req.url === "/api/register") {
    let body = "";
    req.on("data", chunk => (body += chunk.toString()));
    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const result = await insertUser(data);

        res.writeHead(result.success ? 200 : 400, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: err.message }));
      }
    });
    return;
  }

  // Login endpoint
  if (req.method === "POST" && req.url === "/api/login") {
    let body = "";
    req.on("data", chunk => (body += chunk.toString()));
    req.on("end", async () => {
      try {
        const { identifier, password } = JSON.parse(body);
        const result = await loginUser(identifier, password);

        res.writeHead(result.success ? 200 : 401, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, message: err.message }));
      }
    });
    return;
  }

  // 404 for other requests
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ success: false, message: "Not Found" }));
});

// Start server
connectDB().then(() => {
  server.listen(5000, () => {
    console.log("✅ Server running on http://localhost:5000");
  });
});
