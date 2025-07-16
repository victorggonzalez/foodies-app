import React, { Suspense } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMeal } from "@/lib/meals-supabase";

export async function generateMetadata({ params }) {
  const meal = await getMeal(params.mealSlug);
  if (!meal) {
    notFound();
  }
  return {
    title: `Meal: ${meal.title}`,
    description: meal.summary,
  };
}

async function Meal({ params }) {
  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={meal.image} fill />
        </div>
        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${meal.creatorEmail}`}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions.replace(/\n/g, "<br>"),
          }}
        />
      </main>
    </>
  );
}

const MealDetailsPage = ({ params }) => {
  return (
    <>
      <Suspense fallback={<p className={styles.loading}>Fetching meal...</p>}>
        <Meal params={params} />
      </Suspense>
    </>
  );
};

export default MealDetailsPage;
