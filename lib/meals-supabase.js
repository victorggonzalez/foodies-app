// this contains the code that server components use to reach out to a database and gets data from the database
import { createClient } from "@/utils/supabase";

export async function getMeals() {
  const supabase = await createClient();
  let { data: meals, error } = await supabase.from("meals").select("*");

  if (error){
    console.error(error);
    //   throw new Error("This is an error");
  }
  return meals;
}

export async function getMeal(slug) {
  const supabase = await createClient();
  let { data: meal, error } = await supabase.from("meals").select().match({slug}).single();
  if (error){
    console.error(error);
    //   throw new Error("This is an error");
  }

  return meal;
}
