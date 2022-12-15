const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Route 1 : Get All the notes using : GET "/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    // Find all the notes for that user who is logged in.
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: "Some error occurred" });
  }
});

// Route 2 : Add notes using : POST "/api/notes/addnote". Login required.
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characteres").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // Destructuring the value from body that user provided for update.
      const { title, description, tag } = req.body;
      // Validate the request if there is any validation error so it will send the error.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //   Create a new object note
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      //   Saved the note into db.
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: "Some error occurred" });
    }
  }
);

module.exports = router;
