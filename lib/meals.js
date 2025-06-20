// this contains the code that server components use to reach out to a database and gets data from the database
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "fs";
import path from "path";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const stmt = db.prepare("SELECT * FROM meals");
  const meals = stmt.all();
  //   throw new Error("This is an error");

  return meals;
}

export function getMeal(slug) {
  const stmt = db.prepare("SELECT * FROM meals WHERE slug = ?");
  const meal = stmt.get(slug);

  return meal;
}

export function getFeaturedMeals() {
  const stmt = db.prepare("SELECT * FROM meals WHERE id IN (1, 2, 3)");
  const meals = stmt.all();

  return meals;
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, {
    lower: true, //forces all characters to be lowercase
  });
  meal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(path.join("public/images", filename));
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error(error);
    }
  });

  meal.image = `/images/${filename}`; // no need for public as this dir is served as root dir
  db.prepare(
    `INSERT INTO meals (title, summary, instructions, creator, creator_email, slug, image)
     VALUES (
     @title,
     @summary,
     @instructions,
     @creator,
     @creator_email,
     @slug,
     @image
     )`
  ).run(meal);

}
