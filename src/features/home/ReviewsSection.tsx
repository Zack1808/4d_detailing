import { lazy, Suspense, useState } from "react";

import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import Reveal from "../../components/ui/Reveal";
import { Paragraph, SectionTitle } from "../../components/ui/Typography";
import {
  Skeleton,
  SkeletonRegion,
  SkeletonText,
} from "../../components/ui/Skeleton";
import ReviewCarousel from "../reviews/ReviewCarousel";

import { useData } from "../../context/DataContext";

const ReviewModal = lazy(() => import("../reviews/ReviewModal"));

const ReviewsSection = () => {
  const { reviews, status } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRequested, setModalRequested] = useState(false);

  const openModal = () => {
    setModalRequested(true);
    setModalOpen(true);
  };

  return (
    <Container id="reviews">
      <Reveal variant="left">
        <SectionTitle>Što kažu naši klijenti?</SectionTitle>
      </Reveal>
      <Reveal variant="left">
        <Paragraph>
          Vaše zadovoljstvo je naša najbolja preporuka.
          <br />
          Pogledajte iskustva onih koji su svoje vozilo već povjerili 4D
          Detailing timu.
        </Paragraph>
      </Reveal>

      <Reveal className="relative mt-3 w-full overflow-hidden">
        {status === "loading" ? (
          <SkeletonRegion
            label="Učitavanje recenzija..."
            className="mt-3 grid w-full gap-3 md:grid-cols-2"
          >
            {[0, 1].map((i) => (
              <div
                key={i}
                className="surface flex flex-col gap-9 px-6 py-9 max-md:nth-2:hidden"
              >
                <Skeleton className="h-7 w-40" />
                <SkeletonText lines={3} />
                <Skeleton className="h-5 w-32" />
              </div>
            ))}
          </SkeletonRegion>
        ) : (
          <ReviewCarousel reviews={reviews} />
        )}
      </Reveal>

      <div className="mt-3 flex w-full flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-col gap-3">
          <Reveal variant="left">
            <h3 className="text-xl font-semibold">
              Bili ste zadovoljni našom uslugom?
            </h3>
          </Reveal>
          <Reveal variant="left">
            <Paragraph>
              Vaše mišljenje nam puno znači. Ako ste već svoje vozilo povjerili
              našem timu, podijelite svoje iskustvo i pomozite drugima da nas
              lakše upoznaju.
            </Paragraph>
          </Reveal>
        </div>

        <Reveal variant="left">
          <Button variant="primary" onClick={openModal}>
            Ostavite recenziju
          </Button>
        </Reveal>
      </div>

      {modalRequested && (
        <Suspense fallback={null}>
          <ReviewModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </Suspense>
      )}
    </Container>
  );
};

export default ReviewsSection;
