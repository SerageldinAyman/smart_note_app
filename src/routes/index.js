import express from "express";
import authRouter from "./auth.routes.js";
import noteRouter from "./note.routes.js";
import summaryRouter from "./summary.routes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/notes", noteRouter);
router.use("/summarize", summaryRouter);

export default router;
