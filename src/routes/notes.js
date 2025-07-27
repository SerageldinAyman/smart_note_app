import express from "express";
import {
  getNotes,
  createNote,
  deleteNote,
  summarizeNote,
} from "../controllers/note.controller.js";
import { authenticateToken } from "../middleware/auth.js";
import { validate } from "../middleware/validation.js";
import { noteSchema, notesQuerySchema } from "../utils/validation.js";

const router = express.Router();

/**
 * @route GET /notes
 * @desc Get notes with GraphQL-like filtering and pagination
 * @access Private
 */
router.get(
  "/",
  authenticateToken,
  validate(notesQuerySchema, "query"),
  getNotes
);

/**
 * @route POST /notes
 * @desc Create a new note
 * @access Private
 */
router.post("/", authenticateToken, validate(noteSchema), createNote);

/**
 * @route DELETE /notes/:id
 * @desc Delete a note by ID
 * @access Private
 */
router.delete("/:id", authenticateToken, deleteNote);

/**
 * @route POST /notes/:id/summarize
 * @desc Summarize a note using AI
 * @access Private
 */
router.post("/:id/summarize", authenticateToken, summarizeNote);

export default router;
