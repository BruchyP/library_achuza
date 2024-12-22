import { Router } from "express";

import { addBook, deleteBook, getAllBooks, getBookById, updateBook } from "../controllers/book.js";


const router = Router();
router.get("/", getAllBooks)
router.get("/:id", getBookById)
router.delete("/:id", deleteBook)
router.put("/:id", updateBook)
router.post("/", addBook);

export default router;