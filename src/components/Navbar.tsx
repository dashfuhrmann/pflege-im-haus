"use client";

import { Content, KeyTextField } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FiAlignJustify,
  FiArrowDown,
  FiArrowRight,
  FiArrowUp,
  FiX,
} from "react-icons/fi";
import A11yAccordion from "./A11yAccordion";

type NavbarProps = {
  settings: Content.SettingsDocument;
};

function AccordionTitle(props: { label: KeyTextField; openingState: boolean }) {
  return (
    <span className="flex w-full flex-row items-center justify-between font-bold uppercase text-lg">
      {props.label}

      {props.openingState === false ? <FiArrowDown /> : <FiArrowUp />}
    </span>
  );
}

function AccordionContent(props: {
  openingState: boolean;
  settings: Content.SettingsDocumentDataNavigationMenuItem[];
}) {
  return (
    <div className={`flex flex-col w-[90%] ml-auto`}>
      <ul>
        {props.settings.map((item) => (
          <li key={item.label} className="block">
            <Link
              href={"/"}
              className="flex flex-row gap-4 p-6 justify-between font-bold uppercase text-base hover:decoration-slate-700 hover:decoration-offset-2 hover:underline"
            >
              <span>{item.label}</span>
              <FiArrowRight />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Navbar({ settings }: NavbarProps) {
  const container = useRef(null);
  const [navBarState, setNavbarState] = useState(false);
  const [openingState, setOpeningState] = useState(false);

  return (
    <nav className="relative" ref={container}>
      {/* Desktop Navbar */}
      <div className="flex flex-row px-8">
        <ul className="mx-auto hidden w-full flex-row items-center gap-4 lg:flex lg:flex-row">
          <Link href="/">
            <div className="w-32 h-24 items-center flex mr-12">
              <PrismicNextImage
                field={settings.data.fallback_image}
                className=""
              />
            </div>

            <span className="sr-only">Pflege im Haus Sandrock-Höhle</span>
          </Link>
          {settings.data.navigation.map((link) => {
            if (link.label === "Leistungen") {
              return (
                <li
                  className="group cursor-pointer font-bold uppercase text-lg hover:decoration-slate-700 hover:decoration-offset-2 hover:underline"
                  key={link.label}
                >
                  {link.label}
                  <div className="opacity-0 absolute z-50 mt-4 flex max-w-full flex-wrap gap-8 bg-white p-12 shadow-[0_4px_6px_-1px_#0000001a] transition-all duration-500 ease-in group-hover:opacity-100">
                    <ul className="grid grid-cols-3 gap-12 mr-auto">
                      {settings.data.navigation_menu.map(
                        (productGroup, index) => (
                          <li key={index}>
                            <PrismicNextLink
                              field={productGroup.link}
                              className="font-normal normal-case text-lg hover:decoration-slate-700 hover:decoration-offset-2 hover:underline flex flex-row items-center justify-between gap-4"
                            >
                              {productGroup.label}
                              <FiArrowRight />
                            </PrismicNextLink>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </li>
              );
            }

            if (link.label !== "Impressum" && link.label !== "Datenschutz") {
              return (
                <li key={link.label}>
                  <PrismicNextLink
                    field={link.link}
                    className="font-bold uppercase text-lg hover:text-slate-700 hover:decoration-slate-700 hover:decoration-offset-2 hover:underline"
                  >
                    {link.label}
                  </PrismicNextLink>
                </li>
              );
            }
          })}
        </ul>
        <ul className="flex-row items-center gap-4 hidden lg:flex lg:flex-row">
          {settings.data.navigation.map((link) => {
            if (link.label === "Impressum" || link.label === "Datenschutz") {
              return (
                <li key={link.label}>
                  <PrismicNextLink
                    field={link.link}
                    className="font-bold uppercase text-lg hover:decoration-slate-700 hover:decoration-offset-2 hover:underline"
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
          className="absolute z-30 h-screen w-full"
          onClick={() => {
            setNavbarState(false);
          }}
        />
      )}

      <div className="z-40 mx-auto flex w-full flex-row items-center gap-4 bg-white lg:hidden ml-6">
        <button
          onClick={() => {
            console.log("setNavbarState(true)");
            setNavbarState(true);
          }}
        >
          <FiAlignJustify className="h-8 w-8" />
        </button>
        <Link href="/">
          <div className="w-32 h-24 items-center flex mr-12">
            <PrismicNextImage field={settings.data.fallback_image} />
          </div>

          <span className="sr-only">Pflege im Haus Sandrock-Höhle</span>
        </Link>
      </div>

      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-[85%] flex-col overflow-auto bg-white transition-all duration-500 ease-in lg:hidden ${navBarState ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6">
          <Link href="/">
            <div className="w-32 h-24 items-center flex">
              <PrismicNextImage field={settings.data.fallback_image} />
            </div>

            <span className="sr-only">Pflege im Haus Sandrock-Höhle</span>
          </Link>
          <button
            onClick={() => {
              console.log("setNavbarState(false)");
              setNavbarState(false);
            }}
          >
            <FiX className="h-8 w-8" />
          </button>
        </div>
        <ul className="h-full">
          <li></li>
          {settings.data.navigation.map((heading, index) => (
            <>
              <li
                key={index}
                className="flex border-b-2 border-solid border-slate-500 p-6"
              >
                {heading.label !== "Leistungen" ? (
                  <PrismicNextLink
                    field={heading.link}
                    className="flex w-full flex-row items-center justify-between font-bold uppercase text-lg hover:decoration-slate-700 hover:decoration-offset-2 hover:underline"
                  >
                    {heading.label}
                    <FiArrowRight />
                  </PrismicNextLink>
                ) : (
                  <A11yAccordion
                    title={AccordionTitle({
                      label: heading.label,
                      openingState,
                    })}
                    content={AccordionContent({
                      settings: settings.data.navigation_menu,
                      openingState,
                    })}
                    id={"test"}
                    isOpenCallback={setOpeningState}
                  />
                )}
              </li>
            </>
          ))}
        </ul>
      </div>
    </nav>
  );
}
