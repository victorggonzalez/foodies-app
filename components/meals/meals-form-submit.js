"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const MealsFormSubmit = () => {
  const { pending } = useFormStatus(); // gives us the status of the form if it is inside a form tag

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Share meal"}
    </button>
  );
};

export default MealsFormSubmit;
