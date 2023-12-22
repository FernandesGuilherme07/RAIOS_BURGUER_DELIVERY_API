import { serverHttp } from "./app";

import connectDB from "../infraestructure/configs/ConnectionMongoDb";

import "./webSocket";
import "dotenv/config";

const {APP_PORT, APP_URL } = process.env;

serverHttp.listen(APP_PORT, async () => {
  await connectDB();

  console.log(`Servidor executando na porta ${APP_PORT}`);
  console.log(`Ctrl + click: ${APP_URL}:${APP_PORT}`);
});
