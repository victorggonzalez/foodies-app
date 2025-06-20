import Link from "next/link";
import React, { Suspense } from "react";
import styles from "./page.module.css";
import MealsGrid from "../../components/meals/meals-grid";
import { getMeal, getMeals } from "@/lib/meals";

export const metadata = {
  title: "All meals",
  description: "Delicious meals, shared by a food-loving community.",
};


async function Meals() {
  const dummyMeals = await getMeals();
  console.log(dummyMeals); // this code is not being executed in production 
  return <MealsGrid meals={dummyMeals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Foodies <span>by you</span>
        </h1>
        <p className={styles.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={styles.main}>
        <Suspense fallback={<p className={styles.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
