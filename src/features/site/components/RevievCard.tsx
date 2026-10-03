import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

import { type ReviewType } from "@features/catalog/types";

type ReviewCardProps = {
  review: ReviewType;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="px-6 py-9 rounded-sm shadow-sm w-full bg-gray-light/15 dark:bg-gray-dark/20 flex flex-col gap-9 h-full">
      <header className="flex gap-3 text-dark dark:text-light text-2xl">
        {Array.from({ length: review.starCount }).map((_, index) => (
          <FaStar key={index} />
        ))}
        {Array.from({ length: 5 - review.starCount }).map((_, index) => (
          <FaRegStar key={index} />
        ))}
      </header>
      <blockquote className="text-dark dark:text-light flex flex-col gap-6 h-full">
        <p className="font-light">{review.review}</p>

        <span className="font-medium mt-auto">
          -{" "}
          <cite>
            {review.name} {review.surname}
          </cite>
        </span>
      </blockquote>
    </div>
  );
};

export default ReviewCard;
