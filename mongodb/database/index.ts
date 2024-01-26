import mongoose from "mongoose";

const mongoConnectionString = process.env.MONGO_URI;

let cachedDatabaseConnection = (global as any).mongoose || {
  conn: null,
  promise: null,
};

export const connectToDatabase = async () => {
  if (cachedDatabaseConnection.conn) return cachedDatabaseConnection.conn;
  if (!mongoConnectionString)
    throw new Error("Missing database connection string.");
  cachedDatabaseConnection.promise =
    cachedDatabaseConnection.promise ||
    mongoose.connect(mongoConnectionString, {
      dbName: "sonix",
      bufferCommands: false,
    });
  cachedDatabaseConnection.conn = await cachedDatabaseConnection.promise;
  return cachedDatabaseConnection.conn;
};
