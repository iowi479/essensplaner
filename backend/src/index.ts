import cors from "cors";
import express from "express";
import router from "./routes/routes";
import { preLoadData } from "./utils/storage";
import { API_PATH, PORT } from "./utils/env";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "routes", "frontend")));

app.use(API_PATH, router);

const server = app.listen(PORT, () => {
    console.log(`server started on port: ${PORT}/`);
    preLoadData();
});

// for fast container stop
process.on("SIGTERM", async () => {
    await server.close();
    process.exit();
});
