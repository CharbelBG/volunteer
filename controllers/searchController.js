import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";
import Category from "../models/categoryModel.js";

const search = asyncHandler(async (req, res) => {
  const { keyword } = req.body;

  if (!keyword) {
    res.status(400);
    throw new Error("keyword is required");
  }

  //find in categories
  const categories = await Category.find({
    name: {
      $regex: keyword,
      $options: "i",
    },
  });
    const events = await Event.find({
    $or: [
      {
        title: {
          $regex: keyword,
          $options: "i",
        },
      },
      {
        description: {
          $regex: keyword,
          $options: "i",
        },
      },
    ],
    });

  res.json({ categories, events });
});

export { search };
