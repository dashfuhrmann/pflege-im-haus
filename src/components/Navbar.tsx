"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { useRef, useState } from "react";
import { FiAlignJustify, FiArrowRight, FiX } from "react-icons/fi";

type NavbarProps = {
  settings: Content.SettingsDocument;
};

type Data = keyof Content.SettingsDocumentData;

export default function Navbar({ settings }: NavbarProps) {
  const container = useRef(null);
  const [navBarState, setNavbarState] = useState(false);
  const [openingState, setOpeningState] = useState(false);

  return (
    <nav className="relative" ref={container}>
      {/* Desktop Navbar */}
      <div className="flex flex-row px-8">
        <ul className="flex-row items-center hidden w-full gap-4 mx-auto lg:flex lg:flex-row">
          <Link href="/">
            <div className="flex items-center w-32 h-24 mr-12">
              <PrismicNextImage
                field={settings.data.fallback_image}
                className=""
              />
            </div>

            <span className="sr-only">Pflege im Haus Sandrock-Höhle</span>
          </Link>
          {settings.data.navigation.map((link, index) => {
            if (link.label === "Leistungen" || link.label === "Jobs") {
              const keyToSelect: Data =
                link.label === "Leistungen" ? "leistungen_menu" : "jobs_menu";
              const arrayToSelect:
                | Content.SettingsDocumentDataJobsMenuItem[]
                | Content.SettingsDocumentDataLeistungenMenuItem[] =
                settings.data[keyToSelect];
              return (
                <PrismicNextLink field={link.link} key={index}>
                  <li className="relative text-lg font-bold uppercase cursor-pointer group hover:decoration-slate-700 hover:decoration-offset-2 hover:underline">
                    {link.label}
                    <div className="flex min-w-max max-w-max invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute top-[62px] left-[50%] translate-x-[-50%] z-50 min-w-content flex-wrap bg-white p-8 shadow-[0_4px_6px_-1px_#0000001a] transition-all duration-500 ease-in">
                      <ul className="flex flex-col gap-4">
                        {arrayToSelect.map((item, index) => (
                          <li key={item.label}>
                            <PrismicNextLink
                              key={index}
                              field={item.link}
                              className="flex flex-row items-center min-w-full gap-6 text-lg font-normal normal-case hover:decoration-slate-700 hover:decoration-offset-2 hover:underline"
                            >
                              {item.label}
                              <FiArrowRight className="ml-auto" />
                            </PrismicNextLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </PrismicNextLink>
              );
            }

            if (link.label !== "Impressum" && link.label !== "Datenschutz") {
              return (
                <li key={index}>
                  <PrismicNextLink
                    field={link.link}
                    className="text-lg font-bold uppercase hover:text-slate-700 hover:decoration-slate-700 hover:decoration-offset-2 hover:underline"
                  >
                    {link.label}
                  </PrismicNextLink>
                </li>
              );
            }
          })}
        </ul>
        <ul className="flex-row items-center hidden gap-4 lg:flex lg:flex-row">
          {settings.data.navigation.map((link) => {
            if (link.label === "Impressum" || link.label === "Datenschutz") {
              return (
                <li key={link.label}>
                  <PrismicNextLink
                    field={link.link}
                    className="text-lg font-bold uppercase hover:decoration-slate-700 hover:decoration-offset-2 hover:underline"
                  >
                    {link.label}
                  </PrismicNextLink>
                </li>
              );
            }
          })}
        </ul>
      </div>
      {/* Mobile Navbar */}
      {navBarState && (
        <div
          className="absolute z-30 w-full h-screen"
          onClick={() => {
            setNavbarState(false);
          }}
        />
      )}

      <div className="z-40 flex flex-row items-center w-full gap-4 mx-auto ml-6 bg-white lg:hidden">
        <button
          onClick={() => {
            setNavbarState(true);
          }}
        >
          <FiAlignJustify className="w-8 h-8" />
        </button>
        <PrismicNextLink href="/" onClick={() => setNavbarState(false)}>
          <div className="flex items-center w-32 h-24 mr-12">
            <PrismicNextImage field={settings.data.fallback_image} />
          </div>

          <span className="sr-only">Pflege im Haus Sandrock-Höhle</span>
        </PrismicNextLink>
      </div>

      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-[85%] flex-col overflow-auto bg-white transition-all duration-500 ease-in lg:hidden ${navBarState ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6">
          <PrismicNextLink href="/" onClick={() => setNavbarState(false)}>
            <div className="flex items-center w-32 h-24">
              <PrismicNextImage field={settings.data.fallback_image} />
            </div>

            <span className="sr-only">Pflege im Haus Sandrock-Höhle</span>
          </PrismicNextLink>
          <button
            onClick={() => {
              setNavbarState(false);
            }}
          >
            <FiX className="w-8 h-8" />
          </button>
        </div>
        <ul className="h-full">
          {settings.data.navigation.map((heading, index) => {
            if (heading.label === "Leistungen" || heading.label === "Jobs") {
              const keyToSelect: Data =
                heading.label === "Leistungen"
                  ? "leistungen_menu"
                  : "jobs_menu";
              const arrayToSelect:
                | Content.SettingsDocumentDataLeistungenMenuItem[]
                | Content.SettingsDocumentDataJobsMenuItem[] =
                settings.data[keyToSelect];
              return (
                <li
                  key={index}
                  className="flex flex-col p-6 border-b-2 border-solid border-slate-500"
                >
                  <PrismicNextLink
                    field={heading.link}
                    className="flex flex-row items-center justify-between w-full text-lg font-bold uppercase hover:decoration-slate-700 hover:decoration-offset-2 hover:underline"
                  >
                    {heading.label}
                    <FiArrowRight />
                  </PrismicNextLink>
                  <ul>
                    {arrayToSelect.map((item, index) => (
                      <li
                        key={item.label}
                        className="block"
                        onClick={() => setNavbarState(false)}
                      >
                        <PrismicNextLink
                          field={item.link}
                          className="flex flex-row justify-between gap-4 p-6 pr-0 text-lg font-bold uppercase hover:decoration-slate-700 hover:decoration-offset-2 hover:underline"
                        >
                          <span>{item.label}</span>
                          <FiArrowRight />
                        </PrismicNextLink>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }

            return (
              <li
                key={index}
                className="flex p-6 border-b-2 border-solid border-slate-500"
              >
                <PrismicNextLink
                  field={heading.link}
                  className="flex flex-row items-center justify-between w-full text-lg font-bold uppercase hover:decoration-slate-700 hover:decoration-offset-2 hover:underline"
                >
                  {heading.label}
                  <FiArrowRight />
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
