import express from "express";
import cors from "cors";
import { quizzesRouter } from "./routes/quizzes.routes";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/quizzes", quizzesRouter);

app.get("/health", (_req, res) => {
    res.json({ ok: true });
});
