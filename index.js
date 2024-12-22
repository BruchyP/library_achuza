import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import bookRouter from "./routers/book.js";
import userRouter from "./routers/user.js";
import borrowRouter from "./routers/borrow.js";
import { logToFileMidddleware } from "./middlewares/logToFile.js";
import { connectToDb } from "./config/db.js";

dotenv.config();
connectToDb();
const app = express();
app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json())
app.use(logToFileMidddleware)

app.use("/api/book", bookRouter);
app.use("/api/user", userRouter);
app.use("/api/borrow", borrowRouter);


const port = process.env.PORT
app.listen(port, "localhost", () => {
    console.log("app is listening onkk port " + port)
})


//higher oreder function-
//פונקציה מסדר גבוה
//פונקציה שבונה ומחזירה פונקציה אחרת


// function a() {
//     return function () {
//         console.log("hello")
//     }

// }
// a()()