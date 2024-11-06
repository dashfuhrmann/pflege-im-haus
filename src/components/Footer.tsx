import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const icons = {
  Facebook: <FaFacebook size={32} />,
  Instagram: <FaInstagram size={32} />,
  LinkedIn: <FaLinkedin size={32} />,
};

export default async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  return (
    <footer className="flex flex-col justify-center gap-4 p-12 bg-opacity-50 bg-secondary">
      <div className="flex flex-row justify-between gap-8 md:gap-4">
        <div className="flex flex-col items-center gap-4">
          <PrismicNextImage
            field={settings.data.fallback_image}
            width={250}
            height={140}
          />

          <div className="flex flex-row justify-center gap-2">
            {settings.data.social_media.map((social, index) => (
              <PrismicNextLink field={social.link} key={index}>
                {social.icon && icons[social.icon]}
              </PrismicNextLink>
            ))}
          </div>
        </div>

        <div className="flex-col hidden gap-4 md:flex">
          <h1 className="text-lg font-bold">Adresse:</h1>
          <ul className="flex flex-col gap-12">
            {settings.data.addresses.map((address, index) => (
              <li key={index}>
                <div className="flex flex-col">
                  <span key={index} className="font-bold text-md">
                    {address.name}
                  </span>
                  <span className="text-md">
                    {address.plz + " " + address.street}
                  </span>
                  <span className="text-md">{address.town}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold">Kontakt:</h1>
          <div className="flex flex-col">
            <span className="text-md">{settings.data.phone_number}</span>
            <span className="text-md">{settings.data.email}</span>
            <span className="text-md">{settings.data.fax}</span>
          </div>
        </div>
      </div>
      <hr className="w-full h-1 bg-black border-0" />
      <div className="flex flex-row justify-between gap-4">
        <span className="text-xl text-center text-black">
          {settings.data.copyright}
        </span>
        <ul className="flex flex-col gap-4 md:flex-row">
          {settings.data.navigation.map((link, index) => {
            if (link.label === "Impressum" || link.label === "Datenschutz") {
              return (
                <li key={index}>
                  <PrismicNextLink
                    field={link.link}
                    className="text-xl text-black hover:underline hover:decoration-slate-700 hover:decoration-offset-2"
                  >
                    {link.label}
                  </PrismicNextLink>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </footer>
  );
}
