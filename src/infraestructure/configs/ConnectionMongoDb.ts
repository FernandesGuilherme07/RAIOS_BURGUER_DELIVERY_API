import "dotenv/config";
import mongoose from "mongoose";

const {
  DB_DATABASE,
  DB_HOSTNAME,
  DB_PORT,
  APP_PORT,
  APP_URL,
  ENVIRONMENT,
  // DB_ATLAS
} = process.env;

const dbUri: String =
  ENVIRONMENT === "development"
    ? `mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`
    : `mongodb://${DB_HOSTNAME}:${DB_PORT}/${DB_DATABASE}`;

async function connectDB() {
  await mongoose.connect(`${dbUri}`);
  try {
    return console.log("DB Connected.");
  } catch (e) {
    return console.log({ connection_db_error: e });
  }
}

export default connectDB;