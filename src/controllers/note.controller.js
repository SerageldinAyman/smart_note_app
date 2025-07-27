import Note from "../../models/note.model.js";
import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";
import APIFeatures from "../../utils/apiFeatures.js";

export const getNotes = asyncHandler(async (req, res, next) => {
  const features = new APIFeatures(
    Note.find({ ownerId: req.user.id }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const notes = await features.query;
  const total = await Note.countDocuments({ ownerId: req.user.id });

  res.status(200).json({
    status: "success",
    results: notes.length,
    total,
    data: { notes },
  });
});

export const createNote = asyncHandler(async (req, res, next) => {
  const note = await Note.create({
    title: req.body.title,
    content: req.body.content,
    ownerId: req.user.id,
  });

  res.status(201).json({
    status: "success",
    data: { note },
  });
});

export const deleteNote = asyncHandler(async (req, res, next) => {
  const note = await Note.findOneAndDelete({
    _id: req.params.id,
    ownerId: req.user.id,
  });

  if (!note) {
    return next(new AppError("Note not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
