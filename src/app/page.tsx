"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/main/dashboard";
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-secondary p-4 rounded-lg"></div>
      <div className="bg-secondary p-4 rounded-lg"></div>
      <div className="bg-secondary p-4 rounded-lg text-accent">
        Nothing to see here
      </div>
      <div className="bg-secondary p-4 rounded-lg"></div>
    </div>
  );
}
