"use server";
import { connectToDatabase } from "@/mongodb/database";
import { handleError } from "../utils";

import { CreateEventParams } from "@/types";

// Models
import User from "@/mongodb/database/models/user.model";
import Event from "@/mongodb/database/models/event.model";

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
