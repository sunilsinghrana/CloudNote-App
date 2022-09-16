const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Note = require("../modles/Note");

// Route 1: get all the notes using: GET "/api/notes/fetchalluser". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

// Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a vaild title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;
    // if there are errors written bad errors and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveData = await note.save();

      res.json(saveData);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);
// Route 3: update an existing note using: PUT "/api/notes/updatenote/:id". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
  // create a newnote object
  const newnote = {};
  if (title) {
    newnote.title = title;
  }
  if (description) {
    newnote.description = description;
  }
  if (tag) {
    newnote.tag = tag;
  }

  // Find the note to be updated and update it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newnote },
    { new: true }
  );
  res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

// Route 4: delete and existing note using: DELETE "/api/notes/deletenote:id". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try { 
  // Find the note to be deleted and delete it
  let note = await Note.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not found");
  }

  // Allow user if user own this Note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  note = await Note.findByIdAndDelete(req.params.id);
  res.json({ success: "Note has been deleted", note: note });
} catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

module.exports = router;
