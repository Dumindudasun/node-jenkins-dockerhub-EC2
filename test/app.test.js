const http = require("http");

const options = {
  host: "localhost",
  port: 3000,
  path: "/",
  method: "GET"
};

const req = http.request(options, (res) => {
  console.log("✅ Test Passed: Server responded with status code", res.statusCode);
  process.exit(0);
});

req.on("error", (err) => {
  console.error("❌ Test Failed:", err.message);
  process.exit(1);
});

req.end();
