import { FaRegStar, FaStar } from "react-icons/fa6";

import type { ReviewType } from "../../types/data";

const ReviewCard = ({ review }: { review: ReviewType }) => (
  <div className="surface flex h-full w-full flex-col gap-9 px-6 py-9">
    <div
      role="img"
      aria-label={`Ocjena ${review.starCount} od 5`}
      className="flex gap-3 text-2xl"
    >
      {[1, 2, 3, 4, 5].map((star) =>
        star <= review.starCount ? (
          <FaStar key={star} aria-hidden="true" />
        ) : (
          <FaRegStar key={star} aria-hidden="true" />
        ),
      )}
    </div>
    <blockquote className="flex h-full flex-col gap-6">
      <p className="font-light">{review.review}</p>
      <footer className="mt-auto font-medium">
        –{" "}
        <cite className="not-italic">
          {review.name} {review.surname}
        </cite>
      </footer>
    </blockquote>
  </div>
);

export default ReviewCard;
