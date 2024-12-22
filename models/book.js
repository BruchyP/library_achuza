import { Schema, model } from "mongoose";


export const authorSchema = Schema({//-id-באופן כזה הוא יקבל אוטומטית קוד 
    firstName: String,
    lastName: String,
    address: String

})

export const bookSchema = Schema({

    name: String,
    numPages: Number,
    publishDate: { type: Date, default: new Date() },
    author: authorSchema//עם קוד
    // author: {
    //     firstName: String,
    //     lastName: String,
    //     address: String
    // }
    , categories: [String]

})
//שם של קולקשן ביחיד הוא ייהפך אוטמטית לרבים בדטה בייס
export const bookModel = model("book", bookSchema)


