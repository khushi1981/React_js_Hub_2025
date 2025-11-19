const http = require("http");
const { MongoClient, ObjectId } = require("mongodb");

const PORT = 5001;
const MONGO_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "admin";

async function startServer() {
  const client = new MongoClient(MONGO_URL);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DB_NAME);
    const plansCollection = db.collection("plans");

    const server = http.createServer(async (req, res) => {
      const { method, url } = req;

      // CORS FIX
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      if (method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
      }

      const fullUrl = new URL(url, `http://localhost:${PORT}`);
      const pathname = fullUrl.pathname;

      // ---------------------------------------------------------
      // 🔹 GET ALL PLANS   (ALWAYS RETURNS ARRAY)
      // ---------------------------------------------------------
      if (method === "GET" && pathname === "/api/plans") {
        try {
          const list = await plansCollection.find({}).toArray();

          res.writeHead(200, { "Content-Type": "application/json" });

          // Ensure frontend ALWAYS receives an array
          if (!Array.isArray(list)) {
            return res.end(JSON.stringify([]));
          }

          return res.end(JSON.stringify(list));
        } catch (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify([]));
        }
      }

      // ---------------------------------------------------------
      // 🔹 CREATE PLAN
      // ---------------------------------------------------------
      if (method === "POST" && pathname === "/api/plans") {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", async () => {
          const { plan_name, price, duration } = JSON.parse(body);

          const newPlan = {
            plan_name,
            price,
            duration,
            createdAt: new Date(),
          };

          await plansCollection.insertOne(newPlan);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        });
        return;
      }

      // ---------------------------------------------------------
      // 🔹 UPDATE PLAN
      // ---------------------------------------------------------
      if (method === "PUT" && pathname.startsWith("/api/plans/")) {
        const id = pathname.split("/")[3];
        let body = "";

        req.on("data", (chunk) => (body += chunk));
        req.on("end", async () => {
          const data = JSON.parse(body);

          await plansCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: data }
          );

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        });
        return;
      }

      // ---------------------------------------------------------
      // 🔹 DELETE PLAN
      // ---------------------------------------------------------
      if (method === "DELETE" && pathname.startsWith("/api/plans/")) {
        const id = pathname.split("/")[3];

        await plansCollection.deleteOne({ _id: new ObjectId(id) });

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ success: true }));
      }

      // ---------------------------------------------------------
      // ❌ ROUTE NOT FOUND
      // ---------------------------------------------------------
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Route Not Found" }));
    });

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
  }
}

startServer();
