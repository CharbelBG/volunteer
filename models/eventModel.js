import mongoose from "mongoose";
import Category from "./categoryModel.js";

const locationSchema = mongoose.Schema({
  lat: String,
  long: String,
});

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    date: {
      type: String,
      required: [true, "date is required"],
    },
    location: {
      type: locationSchema,
      required: [true, "location is required"],
    },
    image: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    volunteers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("eventSchema", eventSchema);
export default Event;
