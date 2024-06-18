"use client";
import React from "react";

import GetUmbrellas from "./components/GetUmbrellas";
import NFTList from "./components/NFTList";

const HomeView: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <NFTList />
      <GetUmbrellas />
    </section>
  );
};

export default HomeView;
