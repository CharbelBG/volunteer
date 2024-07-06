import asyncHandler from "express-async-handler";
import Event from "../models/eventModel.js";

const createEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    address,
    date,
    location,
    owner,
    volunteers,
    image,
    category,
  } = req.body;

  if (
    !title ||
    !description ||
    !address ||
    !date ||
    !location ||
    !owner ||
    !category
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const event = await Event.create({
    title,
    description,
    address,
    date,
    location,
    owner,
    volunteers,
    image,
    category,
  });
  res.status(201).json(event);
});

const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({});
  res.json(events);
});

const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findOne({
    _id: req.params.id,
  });

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

const putVolunteer = asyncHandler(async (req, res) => {
  const event = await Event.findOne({
    _id: req.params.id,
  });
  if (event) {
    event.volunteers.push(req.user._id);
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

export { createEvent, getEvents, getEventById, putVolunteer };
