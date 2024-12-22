import { Router } from "express";

import {addBorrow,getAllBooksNotBack,getAllBorrows,getBorrowById,getBorrowsByUserId,pushDate,returnBook  } from "../controllers/borrow.js";


const router = Router();
router.get("/", getAllBorrows)
router.get("/:id", getBorrowById)
router.get("/byuser/:userid", getBorrowsByUserId)
router.get("/notback", getAllBooksNotBack)
router.put("/pushdate/:id", pushDate)
router.put("/:id", returnBook)
router.post("/", addBorrow);

export default router;