"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/mongodb/database";
import { handleError } from "../utils";

import {
  CreateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
  UpdateEventParams,
} from "@/types";

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

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
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

export const updateEvent = async ({
  userId,
  event,
  path,
}: UpdateEventParams) => {
  try {
    await connectToDatabase();

    const eventToUpdate = await Event.findById(event._id);
    if (!eventToUpdate || eventToUpdate.organiser.toHexString() !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true },
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
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

export const getAllEvents = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) => {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;

    const eventsQuery = Event.find()
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);
    const events = await populateEventOrganisersAndCategories(eventsQuery);
    const eventCount = await Event.countDocuments(conditions);

    if (!events) {
      throw new Error("Event not found");
    }

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventCount / limit),
    };
  } catch (err) {
    handleError(err);
  }
};

export const deleteEvent = async ({ eventId, path }: DeleteEventParams) => {
  try {
    await connectToDatabase();

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (deletedEvent) {
      revalidatePath(path);
    }
  } catch (err) {
    handleError(err);
  }
};

export const getEventsByUser = async ({
  userId,
  limit = 6,
  page,
}: GetEventsByUserParams) => {
  try {
    await connectToDatabase();

    const conditions = { organiser: userId };
    const skipAmount = (page - 1) * limit;

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEventOrganisersAndCategories(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

export const getRelatedEventsByCategory = async ({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) => {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
    };

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEventOrganisersAndCategories(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};
