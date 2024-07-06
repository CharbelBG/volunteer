import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

const createCategory = asyncHandler(async (req, res) => {
  const categories = await Category.create({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
  });
  res.json(categories);
});
 
export { getCategories, createCategory };
