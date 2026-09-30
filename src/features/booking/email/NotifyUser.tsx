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
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

import { type AppointmentType } from "@features/booking/types";

const NotifyUser = (props: Omit<AppointmentType, "id">) => {
  const { fullName, phone, email, vehicle, dateFrom, service } = props;

  const name = fullName.split(" ");

  name.pop();

  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <Font
          fontFamily="Montserrat"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://4d-detailing.hr/fonts/Montserrat-VariableFont_wght.woff2",
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
                    src="https://4d-detailing.hr/images/logo_light.svg"
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

            <Heading className="text-dark dark:text-light">
              Poštovani/a {name.join(" ")},
            </Heading>
            <Text className="text-dark dark:text-light">
              Hvala vam što ste se obratili! Vaš upit smo uspiješno zaprimili i
              uskoro će biti pregledan.
            </Text>

            <Text className="text-dark dark:text-light">
              <span className="text-lg font-medium">Detalji vašeg upita:</span>
              <br />
              <ul>
                <li>Vozilo: {vehicle}</li>
                <li>Usluga: {service}</li>
                <li>Željeni termin: {dateFrom ? dateFrom : "Nije naveden"}</li>
                <li>Kontakt email: {email}</li>
                <li>Kontakt telefon: {phone}</li>
              </ul>
            </Text>

            <Text className="text-dark dark:text-light">
              Naš tim će obraditi vaš zahtijev i javiti vam se e-mailom s
              potvrdom termina u najkraćem mogućem roku.
            </Text>

            <Text className="text-dark dark:text-light">
              Ako imate dodatnih pitanja u međuvremenu, slobodno nam se javite.
            </Text>

            <Text className="text-dark dark:text-light">
              Srdačan pozdrav, <br />
              Vaš 4D Detailing tim.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NotifyUser;
