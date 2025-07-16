import Link from "next/link";
import React, { Suspense } from "react";
import styles from "./page.module.css";
import MealsGrid from "../../components/meals/meals-grid";
import { getMeals } from "@/lib/meals-supabase";

export const metadata = {
  title: "All meals",
  description: "Delicious meals, shared by a food-loving community.",
};

async function Meals() {
  const meals = await getMeals();

  if (!meals) {
    return <p>No meals found.</p>;
  }
  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Foodies <span className={styles.highlight}>by you</span>
        </h1>
        <p className={styles.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        <Suspense
          fallback={<p className={styles.loading}>Fetching meals...</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
