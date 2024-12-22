import { appendFile } from "fs/promises"

export const logToFileMidddleware = (req, res, next) => {

    appendFile("log.txt", `${req.method} ${req.url}`)
    next();
}