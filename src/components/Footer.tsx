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
    <footer className="flex flex-col p-24 bg-secondary bg-opacity-50 justify-center gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-between">
        <div className="flex flex-col items-center gap-8">
          <PrismicNextImage
            field={settings.data.fallback_image}
            width={250}
            height={140}
          />

          <div className="flex flex-row gap-8 justify-center">
            {settings.data.social_media.map((social, index) => (
              <PrismicNextLink field={social.link} key={index}>
                {social.icon && icons[social.icon]}
              </PrismicNextLink>
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-8">
          <ul className="flex flex-col gap-2">
            {settings.data.navigation_menu.map((link, index) => (
              <li key={index}>
                <PrismicNextLink
                  field={link.link}
                  className="text-xl text-gray-700 hover:underline hover:decoration-slate-700 hover:decoration-offset-2"
                >
                  {link.label}
                </PrismicNextLink>
              </li>
            ))}
          </ul>

          <ul className="flex flex-row gap-8">
            {settings.data.navigation.map((link, index) => {
              if (link.label === "Jobs" || link.label === "Kontakt") {
                return (
                  <li key={index}>
                    <PrismicNextLink
                      field={link.link}
                      className="text-xl text-gray-700 hover:underline hover:decoration-slate-700 hover:decoration-offset-2"
                    >
                      {link.label}
                    </PrismicNextLink>
                  </li>
                );
              }
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl text-bold underline decoration-slate-700 decoration-offset-2">
            Adresse
          </h1>
          <ul className="flex flex-row gap-4">
            {settings.data.addresses.map((address, index) => (
              <li key={index}>
                <span key={index} className="text-lg">
                  {address.name}
                </span>
                <span className="text-lg">
                  {address.plz} {address.street}
                </span>
                <span className="text-lg">{address.town}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl text-bold underline decoration-slate-700 decoration-offset-2">
            Kontakt
          </h1>
          <span className="text-lg">{settings.data.phone_number}</span>
          <span className="text-lg">{settings.data.email}</span>
        </div>
      </div>
      <hr className="mt-12 h-1 bg-gray-700 border-0 w-full" />
      <div className="flex flex-row justify-between">
        <span className="text-xl text-gray-700 text-center">
          {settings.data.copyright}
        </span>
        <ul className="flex flex-row gap-4">
          {settings.data.navigation.map((link, index) => {
            if (link.label === "Impressum" || link.label === "Datenschutz") {
              return (
                <li key={index}>
                  <PrismicNextLink
                    field={link.link}
                    className="text-xl text-gray-700 hover:underline hover:decoration-slate-700 hover:decoration-offset-2"
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
