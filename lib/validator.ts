import * as z from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, {
    message: "Please enter a valid event name.",
  }),
  description: z
    .string()
    .min(3, {
      message: "Please enter a valid event description.",
    })
    .max(400, "Your event description must be less than 400 characters long."),
  location: z
    .string()
    .min(3, {
      message: "Please enter a valid event location.",
    })
    .max(400, "Your event location must be less than 400 characters long."),
  imageUrl: z.string().min(3, {
    message: "Please upload a valid event iamge.",
  }),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});
