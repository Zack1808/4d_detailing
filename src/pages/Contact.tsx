import SEO from "../components/seo/SEO";
import Container from "../components/layout/Container";
import Reveal from "../components/ui/Reveal";
import { PageTitle } from "../components/ui/Typography";
import ContactDetails from "../features/contact/ContactDetails";
import ContactForm from "../features/contact/ContactForm";

import { PAGE_META } from "../config/seo";

const Contact = () => (
  <main>
    <SEO {...PAGE_META.contact} />
    <Container>
      <Reveal variant="left" delay={200}>
        <PageTitle>Rezervirajte svoj termin</PageTitle>
      </Reveal>

      <div className="mt-3 flex min-h-0 w-full flex-col gap-12 lg:flex-row">
        <ContactDetails />
        <Reveal variant="fade" delay={300} className="flex flex-col lg:flex-2">
          <ContactForm />
        </Reveal>
      </div>
    </Container>
  </main>
);

export default Contact;
