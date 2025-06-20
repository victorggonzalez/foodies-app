"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.length === 0;
}

export async function shareMeal(prevState, formData) {
  const newMeal = {
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  };

  // Check valid text fields
  if (
    isInvalidText(newMeal.creator) ||
    isInvalidText(newMeal.creator_email) ||
    isInvalidText(newMeal.title) ||
    isInvalidText(newMeal.summary) ||
    isInvalidText(newMeal.instructions) ||
    isInvalidText(newMeal.image)
  ) {
    return {
      message: "Please fill out all fields.", // this message will be displayed on the page
    }
  }

  // Check if the email is valid
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(newMeal.creator_email)) {
    throw new Error("Invalid email format.");
  }

  // Check if the image is valid
  if (
    newMeal.image.size === 0 ||
    newMeal.image.size > 1024 * 1024
  ) {
    throw new Error(
      "Invalid image format. Only jpeg, jpg, gif, and png are allowed."
    );
  }

  console.log("Meal shared successfully:", newMeal);
  await saveMeal(newMeal);
  revalidatePath("/meals");
  redirect("/meals");
}
