import React, { useState } from "react";

import Tesseract from "../animated/Tessaract";
import Wheel from "../animated/Wheel";
import Polisher from "../animated/Polisher";

type PageLoaderProps = {
  isDark: boolean;
};

const PageLoader: React.FC<PageLoaderProps> = ({ isDark = false }) => {
  const loaders = [
    <Tesseract size={120} isDark={isDark} speed={5} thickness={10} />,
    <Wheel size={100} speed={2} isDark={isDark} />,
    <Polisher size={150} speed={7} isDark={isDark} className=" max-h-min" />,
  ];

  const [selectLoader] = useState<number>(() => {
    const randomIndex = Math.floor(Math.random() * loaders.length);
    return randomIndex;
  });

  return (
    <div className="flex flex-col items-center justify-center z-50 fixed bg-light dark:bg-dark h-svh w-full gap-4">
      {loaders[selectLoader]}
      <span className="text-dark dark:text-light font-bold text-2xl">
        Loading...
      </span>
    </div>
  );
};

export default PageLoader;
