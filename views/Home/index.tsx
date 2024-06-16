"use client";
import React from "react";

import NFTList from "./components/NFTList";

const HomeView: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <NFTList />
    </section>
  );
};

export default HomeView;
