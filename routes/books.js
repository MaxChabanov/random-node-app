const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one book
router.get("/:id", getBook, (req, res) => {
  res.send(res.book);
});

// Create book :)
router.post("/", async (req, res) => {
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    publishDate: req.body.publishDate,
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Update book
router.patch("/:id", getBook, async (req, res) => {
  if (req.body.name != null) {
    res.book.name = req.body.name;
  }
  if (req.body.author != null) {
    res.book.author = req.body.author;
  }
  if (req.body.publishDate != null) {
    res.book.publishDate = req.body.publishDate;
  }

  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete book :(
router.delete("/:id", getBook, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: "Deleted book" });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);

    if (book == null)
      return res.status(404).json({ message: "Cannot find book" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.book = book;
  next();
}

module.exports = router;
