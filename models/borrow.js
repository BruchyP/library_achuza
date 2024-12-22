import { Schema, model, Types } from "mongoose";
import { bookSchema, authorSchema } from "./book.js";

const smallBookSchema = Schema({
  _id: { required: true, type: Types.ObjectId },
  name: String,
  author: authorSchema,
});

const borrowSchema = Schema({
  date: { type: Date, default: new Date() },
  userId: { type: Types.ObjectId },
  dateToReturn: {
    type: Date,
    default: () => {
      let d = new Date();
      d.setDate(d.getDate() + 7);
      return d;
    },
  },
  books: [smallBookSchema],
  isBack:{type:Boolean,default:false}
  //books:[bookSchema]
});

export const borrowModel = model("borrow", borrowSchema);
