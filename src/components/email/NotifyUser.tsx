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
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

import { type AppointmentType } from "../../types/data";

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
            <Section className="p-3 flex gap-3 justify-start items-center w-full border-b border-gray-400">
              <Img
                src="https://develop--deft-bonbon-4f3314.netlify.app/images/logo_light.svg"
                alt="4D Detailing"
                width="40"
                height="40"
                className="w-24 block dark:hidden"
              />
              <Img
                src="https://develop--deft-bonbon-4f3314.netlify.app/images/logo_dark.svg"
                alt="4D Detailing"
                width="40"
                height="40"
                className="w-24 hidden dark:block"
              />
              <Text className="text-2xl font-semibold text-dark dark:text-light">
                4D Detailing
              </Text>
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
