import { bookModel } from "../models/book.js";


export async function getAllBooks(req, res) {

    try {
        let result = await bookModel.find();
        res.json(result)
    }
    catch (err) {
        res.status(400).json({ title: "לא הצלחיח להביא את כל ספרים", message: err.message })
    }
}
export async function getBookById(req, res) {
    let { id } = req.params;
    try {
        let result = await bookModel.findById(id);
        if (!result)
            return res.status(404).json({ title: "cannot get by id", message: "no book with such id" })
        res.json(result)
    }
    catch (err) {
        res.status(400).json({ title: "לא הצלחיח להביא  ספר לפי קוד ", message: err.message })
    }
}
export async function deleteBook(req, res) {
    let { id } = req.params;
    try {
        let result = await bookModel.findByIdAndDelete(id);
        if (!result)
            return res.status(404).json({ title: "cannot delete by id", message: "no book with such id" })
        res.json(result)
    }
    catch (err) {
        res.status(400).json({ title: "לא הצלחיח למחוק  ספר לפי קוד ", message: err.message })
    }
}
export async function updateBook(req, res) {
    let { id } = req.params;
    try {
        let result = await bookModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!result)
            return res.status(404).json({ title: "cannot update by id", message: "no book with such id" })
        res.json(result)
    }
    catch (err) {
        res.status(400).json({ title: "לא הצלחיח לעדכן  ספר לפי קוד ", message: err.message })
    }
}
export async function addBook(req, res) {

    let { body } = req;
    if (!body.name || !body.numPages)
        return res.status(404).json({ title: "missing data in body", message: "name and numPages are required" })
    try {
        let newBook = new bookModel(req.body);
        await newBook.save();
        res.json(newBook)


    }
    catch (err) {
        res.status(400).json({ title: "לא הצלחיח להוסיף ספר", message: err.message })
    }
}