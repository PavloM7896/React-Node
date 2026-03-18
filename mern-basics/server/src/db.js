const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let memoryServer;

async function connectToDatabase() {
  const uriFromEnv = process.env.MONGODB_URI;
  const uri = uriFromEnv ? uriFromEnv.trim() : "";

  if (!uri) {
    memoryServer = await MongoMemoryServer.create();
  }

  const finalUri = uri || memoryServer.getUri();

  await mongoose.connect(finalUri, {
    dbName: "mern_basics",
  });

  return { uri: finalUri, inMemory: !uri };
}

async function disconnectFromDatabase() {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = undefined;
  }
}

module.exports = {
  connectToDatabase,
  disconnectFromDatabase,
};
