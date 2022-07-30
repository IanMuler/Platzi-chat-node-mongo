const db = require("mongoose");

db.Promise = global.Promise;

async function connect(url) {
  await db.connect(
    // "mongodb+srv://Ian:46527241@cluster0.xse42.mongodb.net/NodeJSPlatzi"
    url,
    {
      useNewUrlParser: true,
    }
  );
  console.log("[DB] Connected to MongoDB");
}

module.exports = connect;
