import { bookModel } from "../models/book.js";
import { borrowModel } from "../models/borrow.js";
import { userModel } from "../models/user.js";

export const getAllBorrows = async (req, res) => {
  try {
    let data = await borrowModel.find();
    res.json(data);
  } catch (err) {
    res
      .status(400)
      .json({ title: "לא הצלחיח להביא את כל  ההשאלות", message: err.message });
  }
};
export const getBorrowById = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await borrowModel.findById(id);
    if (!data)
      return res.status(404).json({ title: "no borrow with such id", message: "wrong id" });
    res.json(data);
  } catch (err) {
    res.status(400).json({ title: "לא הצלחיח להביא את ההשאלה לפי קוד", message: err.message });
  }
};
export const getBorrowsByUserId = async (req, res) => {
  let { userid } = req.params;
  try {
    let data = await borrowModel.find({ userId: userid });
    res.json(data);
  } catch (err) {
    res.status(400).json({ title: "error occurd when quering all borrows of this userid", message: err.message });
  }
};
export const pushDate = async (req, res) => {
  let { id } = req.params;
  let { days } = req.body;

  if (!days)
    return res.status(404).json({ title: "missing days details", message: "day to push is required" });

  try {
    let data = await borrowModel.findById(id)
    if (!data)
      return res.status(404).json({ title: "wrong id", message: "no borrow with such id" });
    let dateToReturn = new Date(data.dateToReturn);
    data.dateToReturn = dateToReturn.setDate(dateToReturn.getDate() + days);
    await data.save();
    return res.json(data);


  } catch (err) {
    res
      .status(400)
      .json({ title: "error occurd when pushing date", message: err.message });
  }
};
export const returnBook = async (req, res) => {
  let id = req.params.id;
  try {//אובייקט ראשון תנאי הסינון אובייקט שני הוראות הדכון למה לעדכן אובייקט שלישי הגדרות כגון האם להחזיר אובייקט חדש אחרי העדכון
    let data = await borrowModel.findOneAndUpdate({ _id: id, isBack: false }, { $set: { isBack: true } }, { new: true });
    if (!data)
      return res.status(400).json({ title: "caanot return this borrow", message: "wrong id or maybe this borrow already back" });
    let overDates = new Date() - new Date(data.dateToReturn);
    overDates = Math.floor(overDates / (24 * 60 * 60 * 1000));
    if (overDates > 0) {


      let user = await userModel.findByIdAndUpdate(data.userId, { $set: { fine: 2 * overDates * data.books.length } }, { new: true });
      if (!user)
        return res.status(400).json({ title: "user not found", message: "wrong userid " });
      return res.status(200).json({ title: "החזרתך כרוכה בקנס", message: "הקנס הוא" + user.fine });

    }
    return res.json(data);




  }
  catch (err) {
    return res.status(404).json({ title: "not retutn borrow", message: err.message });

  }
}
export const addBorrow = async (req, res) => {
  let { userid, books } = req.body;
  if (!userid || !books || !books.length)
    return res.status(404).json({ title: "user id and books array are required", message: "missing data" });
  try {
    let user = await userModel.findById(userid);
    if (!user)
      return res.status(404).json({ title: "not fpundand books array are required", message: "missing data" });
    if (user.fine)
      return res.status(403).json({ title: "ypu are not allowed to borrow until you pay your fine", message: "first pay ..." });
    let borrows = await borrowModel.find({ userId: userid, isBack: false });
    if (borrows.length)
      return res.status(403).json({ title: "you are not allowed to borrow until you return another borrow", message: "first return ..." });

    /*let arr = [];
    books.forEach(async (item) => {
      let b = await bookModel.findById(item._id);
      if (!b)
        return res.status(403).json({ title: "one of these books are not valid", message: "" });
      arr.push(b);
    })*/

    let bookIds = books.map(item => item._id)
    let arr = await bookModel.find({ _id: { $in: bookIds } });
    if (books.length != arr.length)
      return res.status(403).json({ title: "one of these books are not valid", message: "" });

    let newBorrow = new borrowModel({ userId: userid, books: arr });
    await newBorrow.save();
    res.json(newBorrow)
  }
  catch (err) {
    return res.status(404).json({ title: "not caanot add a borrow", message: err.message });

  }

  //קודם נבדוק שיש כזה משתמש שעליו רוצים להוסיף את השהשאלה
  //נבדוק גם שאין לו ספרים מושאלים וגם שאין לו קנס
  //אחכ נבדוק שכל הזסרפים שרוצים הלשאיל הם אכן קיימים
  //ואז בשעה טובה נוסיך את ההשאלה למערכת


};
//רק נצטרך להוסיך פוקנציה של תשלום קנס ביוזר
export const getAllBooksNotBack = async (req, res) => {


  try {
    let data = await borrowModel.find({ isBack: false });
    res.json(data);
  } catch (err) {
    res.status(400).json({ title: "error occurd when quering all borrows not back of this userid", message: err.message });
  }
};
