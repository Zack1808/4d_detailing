import {
  Html,
  Head,
  Body,
  Font,
  Container,
  Section,
  Text,
  Heading,
  Img,
  Row,
  Column,
  // Button,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

import { type AppointmentType } from "../../types/data";

const NotifyAdmin = (props: Omit<AppointmentType, "id">) => {
  const { fullName, phone, email, vehicle, dateFrom, service, remark } = props;

  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <Font
          fontFamily="Montserrat"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://develop--deft-bonbon-4f3314.netlify.app/fonts/Montserrat-VariableFont_wght.woff2",
            format: "woff2",
          }}
          fontStyle="normal"
        />
      </Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              fontFamily: {
                sans: ["YourFont", "Arial", "sans-serif"],
              },
            },
          },
        }}
      >
        <Body className="bg-light dark:bg-dark font-sans">
          <Container className="w-full p-3 flex flex-col gap-3">
            <Section className="p-3 border-b border-gray-400">
              <Row>
                <Column width={70}>
                  <Img
                    src="https://develop--deft-bonbon-4f3314.netlify.app/images/logo_light.svg"
                    alt="4D Detailing"
                    width="70"
                    height="60"
                  />
                </Column>
                <Column className="pl-3">
                  <Text className="text-2xl font-bold text-dark dark:text-light m-0">
                    4D Detailing
                  </Text>
                </Column>
              </Row>
            </Section>

            <Heading className="text-dark dark:text-light">Pozdrav,</Heading>
            <Text className="text-dark dark:text-light">
              Zaprimljen je novi upit za termin putem web stranice.
            </Text>

            <Text className="text-dark dark:text-light">
              <span className="text-lg font-medium">Podaci o klijentu:</span>
              <br />
              <ul>
                <li>Ime i prezime: {fullName}</li>
                <li>Kontakt email: {email}</li>
                <li>Kontakt telefon: {phone}</li>
              </ul>
            </Text>

            <Text className="text-dark dark:text-light">
              <span className="text-lg font-medium">Detalji upita:</span>
              <br />
              <ul>
                <li>Vozilo: {vehicle}</li>
                <li>Usluga: {service}</li>
                <li>Željeni termin: {dateFrom ? dateFrom : "Nije naveden."}</li>
                <li>
                  Napomena klijenta: {remark ? remark : "Nije navedena."}{" "}
                </li>
              </ul>
            </Text>

            {/* <Text className="text-dark dark:text-light">
              Prijavi se u admin panel da bi odobrio/odbio termin.
            </Text>
            <Button
              href="https://4d-detailing.hr/admin/dashboard"
              className="bg-dark text-light px-6 py-3 rounded-xs"
            >
              Idi na admin panel
            </Button> */}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NotifyAdmin;
