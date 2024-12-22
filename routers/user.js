import { Router } from "express";

import { updateFine,getAllUsers,addUser_signUp,getUseByUsernamePassword_login,getUserById,updateUser } from "../controllers/user.js";


const router = Router();
router.get("/",getAllUsers )
router.get("/:id", getUserById);

router.put("/:id", updateUser);
router.put("/fine/:id", updateFine);
router.post("/", addUser_signUp);
router.post("/login/", getUseByUsernamePassword_login);

export default router;