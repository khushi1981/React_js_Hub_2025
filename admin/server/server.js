// const http = require("http");
// const { MongoClient, ObjectId } = require("mongodb");

// const PORT = 5001;
// const MONGO_URL = "mongodb://127.0.0.1:27017";
// const DB_NAME = "admin";

// async function startServer() {
//   const client = new MongoClient(MONGO_URL);

//   try {
//     await client.connect();
//     console.log("✅ Connected to MongoDB");

//     const db = client.db(DB_NAME);
    
//     // Collections
//     const usersCollection = db.collection("users");
//     const formatsCollection = db.collection("formats");

//     const server = http.createServer(async (req, res) => {
//       // ---------------- CORS ----------------
//       res.setHeader("Access-Control-Allow-Origin", "*");
//       res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//       res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//       if (req.method === "OPTIONS") {
//         res.writeHead(204);
//         return res.end();
//       }

//       const fullUrl = new URL(req.url, `http://localhost:${PORT}`);
//       const pathname = fullUrl.pathname;
//       const searchName = fullUrl.searchParams.get("name");

//       const parts = pathname.split("/");
//       const id = parts[3] || null;

//       // ============================================================
//       // ⭐ USERS CRUD (Existing – unchanged)
//       // ============================================================
//       if (pathname.startsWith("/api/users")) {

//         // GET ALL USERS
//         if (req.method === "GET" && pathname === "/api/users") {
//           let query = {};

//           if (searchName) {
//             query = { name: { $regex: searchName, $options: "i" } };
//           }

//           const list = await usersCollection.find(query).toArray();
//           res.writeHead(200, { "Content-Type": "application/json" });
//           return res.end(JSON.stringify(list));
//         }

//         // ADD USER
//         if (req.method === "POST" && pathname === "/api/users") {
//           let body = "";
//           req.on("data", chunk => (body += chunk));
//           req.on("end", async () => {
//             try {
//               const data = JSON.parse(body);

//               if (!data.name || !data.email || !data.userId) {
//                 res.writeHead(400, { "Content-Type": "application/json" });
//                 return res.end(JSON.stringify({
//                   success: false,
//                   message: "name, email & userId required"
//                 }));
//               }

//               await usersCollection.insertOne(data);

//               res.writeHead(200, { "Content-Type": "application/json" });
//               res.end(JSON.stringify({ success: true, message: "User added" }));
//             } catch (err) {
//               res.writeHead(500, { "Content-Type": "application/json" });
//               res.end(JSON.stringify({ success: false, message: "Invalid JSON" }));
//             }
//           });
//           return;
//         }

//         // UPDATE USER
//         if (req.method === "PUT" && pathname.startsWith("/api/users/") && id) {
//           let body = "";
//           req.on("data", chunk => (body += chunk));
//           req.on("end", async () => {
//             try {
//               const data = JSON.parse(body);

//               await usersCollection.updateOne(
//                 { _id: new ObjectId(id) },
//                 { $set: data }
//               );

//               res.writeHead(200, { "Content-Type": "application/json" });
//               res.end(JSON.stringify({ success: true, message: "User updated" }));
//             } catch (err) {
//               res.writeHead(500, { "Content-Type": "application/json" });
//               res.end(JSON.stringify({ success: false, message: "Update error" }));
//             }
//           });
//           return;
//         }

//         // DELETE USER
//         if (req.method === "DELETE" && pathname.startsWith("/api/users/") && id) {
//           const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

//           res.writeHead(200, { "Content-Type": "application/json" });
//           return res.end(JSON.stringify({
//             success: result.deletedCount > 0,
//             message: result.deletedCount > 0 ? "User deleted" : "User not found"
//           }));
//         }

//         // INVALID USERS ROUTE
//         res.writeHead(404, { "Content-Type": "application/json" });
//         return res.end(JSON.stringify({ success: false, message: "Users route not found" }));
//       }

//       // ============================================================
//       // ⭐ FORMATS CRUD API (New – for Explore component)
//       // ============================================================
//       if (pathname.startsWith("/api/formats")) {

//         // GET ALL FORMATS
//         if (req.method === "GET" && pathname === "/api/formats") {
//           const list = await formatsCollection.find({}).toArray();
//           res.writeHead(200, { "Content-Type": "application/json" });
//           return res.end(JSON.stringify(list));
//         }

//         // ADD FORMAT
//         if (req.method === "POST" && pathname === "/api/formats") {
//           let body = "";
//           req.on("data", chunk => (body += chunk));
//           req.on("end", async () => {
//             try {
//               const data = JSON.parse(body);

//               if (!data.name || !data.description || !data.type || !data.logo) {
//                 res.writeHead(400, { "Content-Type": "application/json" });
//                 return res.end(JSON.stringify({
//                   success: false,
//                   message: "All fields (name, description, type, logo) required"
//                 }));
//               }

//               await formatsCollection.insertOne(data);

//               res.writeHead(200, { "Content-Type": "application/json" });
//               res.end(JSON.stringify({ success: true, message: "Format added" }));
//             } catch (err) {
//               res.writeHead(500, { "Content-Type": "application/json" });
//               res.end(JSON.stringify({ success: false, message: "Invalid JSON" }));
//             }
//           });
//           return;
//         }

//         // UPDATE FORMAT
//         if (req.method === "PUT" && pathname.startsWith("/api/formats/") && id) {
//           let body = "";
//           req.on("data", chunk => (body += chunk));
//           req.on("end", async () => {
//             try {
//               const data = JSON.parse(body);

//               await formatsCollection.updateOne(
//                 { _id: new ObjectId(id) },
//                 { $set: data }
//               );

//               res.writeHead(200, { "Content-Type": "application/json" });
//               res.end(JSON.stringify({ success: true, message: "Format updated" }));
//             } catch (err) {
//               res.writeHead(500, { "Content-Type": "application/json" });
//               res.end(JSON.stringify({ success: false, message: "Update error" }));
//             }
//           });
//           return;
//         }

//         // DELETE FORMAT
//         if (req.method === "DELETE" && pathname.startsWith("/api/formats/") && id) {
//           const result = await formatsCollection.deleteOne({ _id: new ObjectId(id) });

//           res.writeHead(200, { "Content-Type": "application/json" });
//           return res.end(JSON.stringify({
//             success: result.deletedCount > 0,
//             message: result.deletedCount > 0 ? "Format deleted" : "Format not found"
//           }));
//         }

//         // INVALID FORMAT ROUTE
//         res.writeHead(404, { "Content-Type": "application/json" });
//         return res.end(JSON.stringify({ success: false, message: "Formats route not found" }));
//       }

//       // ============================================================
//       // FALLBACK
//       // ============================================================
//       res.writeHead(404, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ success: false, message: "Route not found" }));

//     });

//     server.listen(PORT, () =>
//       console.log(`🚀 Server running at http://localhost:${PORT}`)
//     );

//   } catch (err) {
//     console.error("❌ MongoDB Connection Error:", err);
//   }
// }

// startServer();

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
    
    // Collections
    const usersCollection = db.collection("users");
    const formatsCollection = db.collection("formats");
    const subjectsCollection = db.collection("subjects"); // ⭐ NEW COLLECTION

    const server = http.createServer(async (req, res) => {
      // ---------------- CORS ----------------
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");

      if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
      }

      const fullUrl = new URL(req.url, `http://localhost:${PORT}`);
      const pathname = fullUrl.pathname;
      const searchName = fullUrl.searchParams.get("name");

      const parts = pathname.split("/");
      const id = parts[3] || null;

      // ============================================================
      // ⭐ USERS CRUD 
      // ============================================================
      if (pathname.startsWith("/api/users")) {

        // GET ALL USERS
        if (req.method === "GET" && pathname === "/api/users") {
          let query = {};

          if (searchName) {
            query = { name: { $regex: searchName, $options: "i" } };
          }

          const list = await usersCollection.find(query).toArray();
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(list));
        }

        // ADD USER
        if (req.method === "POST" && pathname === "/api/users") {
          let body = "";
          req.on("data", chunk => (body += chunk));
          req.on("end", async () => {
            try {
              const data = JSON.parse(body);

              if (!data.name || !data.email || !data.userId) {
                res.writeHead(400, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({
                  success: false,
                  message: "name, email & userId required"
                }));
              }

              await usersCollection.insertOne(data);

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: true, message: "User added" }));
            } catch (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, message: "Invalid JSON" }));
            }
          });
          return;
        }

        // UPDATE USER
        if (req.method === "PUT" && pathname.startsWith("/api/users/") && id) {
          let body = "";
          req.on("data", chunk => (body += chunk));
          req.on("end", async () => {
            try {
              const data = JSON.parse(body);

              await usersCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: data }
              );

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: true, message: "User updated" }));
            } catch (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, message: "Update error" }));
            }
          });
          return;
        }

        // DELETE USER
        if (req.method === "DELETE" && pathname.startsWith("/api/users/") && id) {
          const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({
            success: result.deletedCount > 0,
            message: result.deletedCount > 0 ? "User deleted" : "User not found"
          }));
        }

        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ success: false, message: "Users route not found" }));
      }

      // ============================================================
      // ⭐ FORMATS CRUD 
      // ============================================================
      if (pathname.startsWith("/api/formats")) {

        // GET ALL FORMATS
        if (req.method === "GET" && pathname === "/api/formats") {
          const list = await formatsCollection.find({}).toArray();
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(list));
        }

        // ADD FORMAT
        if (req.method === "POST" && pathname === "/api/formats") {
          let body = "";
          req.on("data", chunk => (body += chunk));
          req.on("end", async () => {
            try {
              const data = JSON.parse(body);

              if (!data.name || !data.description || !data.type || !data.logo) {
                res.writeHead(400, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({
                  success: false,
                  message: "All fields (name, description, type, logo) required"
                }));
              }

              await formatsCollection.insertOne(data);

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: true, message: "Format added" }));
            } catch (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, message: "Invalid JSON" }));
            }
          });
          return;
        }

        // UPDATE FORMAT
        if (req.method === "PUT" && pathname.startsWith("/api/formats/") && id) {
          let body = "";
          req.on("data", chunk => (body += chunk));
          req.on("end", async () => {
            try {
              const data = JSON.parse(body);

              await formatsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: data }
              );

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: true, message: "Format updated" }));
            } catch (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, message: "Update error" }));
            }
          });
          return;
        }

        // DELETE FORMAT
        if (req.method === "DELETE" && pathname.startsWith("/api/formats/") && id) {
          const result = await formatsCollection.deleteOne({ _id: new ObjectId(id) });

          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({
            success: result.deletedCount > 0,
            message: result.deletedCount > 0 ? "Format deleted" : "Format not found"
          }));
        }

        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ success: false, message: "Formats route not found" }));
      }

      // ============================================================
      // ⭐ SUBJECTS CRUD (NEW)
      // ============================================================
      if (pathname.startsWith("/api/subjects")) {

        // GET ALL SUBJECTS
        if (req.method === "GET" && pathname === "/api/subjects") {
          const list = await subjectsCollection.find({}).toArray();
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(list));
        }

        // ADD SUBJECT
        if (req.method === "POST" && pathname === "/api/subjects") {
          let body = "";
          req.on("data", chunk => (body += chunk));
          req.on("end", async () => {
            try {
              const data = JSON.parse(body);

              if (!data.name || !data.description || !data.fileExtension) {
                res.writeHead(400, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({
                  success: false,
                  message: "name, description & fileExtension required"
                }));
              }

              await subjectsCollection.insertOne(data);

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: true, message: "Subject added" }));
            } catch (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, message: "Invalid JSON" }));
            }
          });
          return;
        }

        // UPDATE SUBJECT
        if (req.method === "PUT" && pathname.startsWith("/api/subjects/") && id) {
          let body = "";
          req.on("data", chunk => (body += chunk));
          req.on("end", async () => {
            try {
              const data = JSON.parse(body);

              await subjectsCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: data }
              );

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: true, message: "Subject updated" }));
            } catch (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: false, message: "Update error" }));
            }
          });
          return;
        }

        // DELETE SUBJECT
        if (req.method === "DELETE" && pathname.startsWith("/api/subjects/") && id) {
          const result = await subjectsCollection.deleteOne({ _id: new ObjectId(id) });

          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({
            success: result.deletedCount > 0,
            message: result.deletedCount > 0 ? "Subject deleted" : "Subject not found"
          }));
        }

        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ success: false, message: "Subjects route not found" }));
      }

      // ============================================================
      // FALLBACK
      // ============================================================
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, message: "Route not found" }));

    });

    server.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );

  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
}

startServer();
