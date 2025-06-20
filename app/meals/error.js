"use client";
import React from "react";

const Error = ({ error }) => {
  console.log(error);
  return (
    <main className="error">
      <h1 style={{ color: "red", fontWeight: "bold" }}>
        An error has occurred!
      </h1>
    </main>
  );
};

export default Error;
