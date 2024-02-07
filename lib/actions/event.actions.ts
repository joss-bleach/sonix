"use server";
import { connectToDatabase } from "@/mongodb/database";
import { handleError } from "../utils";

import { CreateEventParams } from "@/types";

// Models
import User from "@/mongodb/database/models/user.model";
import Event from "@/mongodb/database/models/event.model";
import Category from "@/mongodb/database/models/category.model";

const populateEventOrganisersAndCategories = async (query: any) => {
  return query
    .populate({
      path: "organiser",
      model: User,
      select: "_id firstName lastName ",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();
    const eventOrganiser = await User.findById(userId);
    if (!eventOrganiser) {
      throw new Error("Invalid event organiser.");
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organiser: userId,
    });

    if (!newEvent) {
      throw new Error("Unable to create event.");
    }

    return JSON.parse(JSON.stringify(newEvent));
  } catch (err) {
    handleError(err);
  }
};

export const getEventById = async (eventId: string) => {
  try {
    await connectToDatabase();

    const event = await populateEventOrganisersAndCategories(
      Event.findById(eventId),
    );
    if (!event) {
      throw new Error("Event not found");
    }

    return JSON.parse(JSON.stringify(event));
  } catch (err) {
    handleError(err);
  }
};
