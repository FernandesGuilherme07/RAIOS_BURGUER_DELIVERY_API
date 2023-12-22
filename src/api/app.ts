import express from "express";
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./swagger.json"
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";

import productRouter from "./routes/Product.Routes";
import categoryRouter from "./routes/Category.Routes";
import aditionalRouter from "./routes/Aditional.Routes";
import productAditionalsRouter from "./routes/ProductAditionals.Routes";
import client from "./routes/Client.Routes";
import authRouter from "./routes/Auth.Routes";

const { APP_VERSION } = process.env;

const app = express();

const serverHttp = createServer(app)

const io = new Server(serverHttp)

app.use(express.json());

app.use(`${APP_VERSION}-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(`${APP_VERSION}/product`, productRouter);
app.use(`${APP_VERSION}/category`, categoryRouter);
app.use(`${APP_VERSION}/aditional`, aditionalRouter);
app.use(`${APP_VERSION}/productAditionals`, productAditionalsRouter);
app.use(`${APP_VERSION}/client`,client);
app.use(`${APP_VERSION}/authenticate`, authRouter)

export {serverHttp, io  };
