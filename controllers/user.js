import { userModel } from "../models/user.js";


export async function getAllUsers(req, res) {
    try {

        let result = await userModel.find();
        res.json(result)
    } catch (err) {
        res.status(400).json({ title: "לא הצלחיח להביא את כל המשתמשים ", message: err.message })
    }

}
export async function getUserById(req, res) {
    let { id } = req.params;
    try {
        let result = await userModel.findById(id);
        if (!result)
            return res.status(404).json({ title: "cannot get by id", message: "no user with such id" })
        res.json(result)
    }
    catch (err) {
        res.status(400).json({ title: "לא הצלחיח להביא  משתמש לפי קוד ", message: err.message })
    }

}

export async function addUser_signUp(req, res) {

    let { body } = req;
    if (!body.username || !body.password || !body.phone || !body.email)
        return res.status(404).json({ title: "missing data in body", message: "username password email phone are required" })
    try {
        let alreadyUser = await userModel.findOne({ username: body.username })
        if (alreadyUser)
            return res.status(409).json({ title: "username already exists", message: "change user name" })

        let newU = new userModel(req.body);
        await newU.save();
        res.json(newU)


    }
    catch (err) {
        res.status(400).json({ title: "לא הצלחיח להוסיף משתמש", message: err.message })
    }

}
export async function updateUser(req, res) {
    let { id } = req.params;
    if (body.username || body.password)
        return res.status(404).json({ title: "cannot update these details in body", message: "username password cannot be changed here" })
    try {

        let result = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!result)
            return res.status(404).json({ title: "cannot update by id", message: "no user with such id" })
        res.json(result)
    }
    catch (err) {
        res.status(400).json({ title: "לא הצלחיח לעדכן  משתמש לפי קוד ", message: err.message })
    }

}
export async function getUseByUsernamePassword_login(req, res) {
    let { username, password } = req.body;

    if (!username || !password)
        return res.status(404).json({ title: "missing data in body", message: "username password  are required" })
    try {
        let result = await userModel.findOne({ username: username });
        if (!result)
            return res.status(404).json({ title: "cannot login", message: "no user with such username" })
        if (result.password != password)
            return res.status(404).json({ title: "cannot login", message: "wrong password" })
        res.json(result)
    }
    catch (err) {
        res.status(400).json({ title: "לא הצלחיח להביא  משתמש עם פרטים אלה ", message: err.message })
    }

}
export async function updateFine(req, res) {
    let id = req.params.id;
    let sum = req.body.sum;
    try {
        let result = await userModel.findByIdAndUpdate(id, { $set: { fine: 0 } }, { new: true });
        if (!result)
            return res.status(404).json({ title: "cannot pay fima", message: "no user with such username" })

        res.json(result)
    }
    catch (err) {
        res.status(400).json({ title: "error in paying fine", message: err.message })
    }

}