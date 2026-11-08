import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import SEO from "../seo/SEO";
import Container from "../layout/Container";
import { PageTitle, Paragraph } from "../ui/Typography";

import { BUSINESS } from "../../config/business";

import type { PageMeta } from "../../config/seo";

type LegalPageProps = {
  meta: PageMeta;
  title: string;
  intro: ReactNode;
  children: ReactNode;
};

export const LegalPage = ({ meta, title, intro, children }: LegalPageProps) => (
  <main>
    <SEO {...meta} />
    <Container>
      <PageTitle>{title}</PageTitle>
      <Paragraph className="mt-6">{intro}</Paragraph>
      <ol className="mt-15 flex flex-col gap-12">{children}</ol>
    </Container>
  </main>
);

export const LegalSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <li className="flex flex-col gap-3">
    <h2 className="text-3xl font-semibold">{title}</h2>
    {children}
  </li>
);

export const LegalText = ({ children }: { children: ReactNode }) => (
  <p className="font-light">{children}</p>
);

export const MailLink = () => (
  <a href={`mailto:${BUSINESS.email}`} className="font-semibold underline">
    {BUSINESS.email}
  </a>
);

export const InlineLink = ({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) =>
  external ? (
    <a
      href={href}
      className="font-semibold underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <Link to={href} className="font-semibold underline">
      {children}
    </Link>
  );
