"use client";

import { motion } from "framer-motion";
import { Menu, MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

import { LanguageSwitcher } from "@/04.widgets/language-switcher";

import { PhaseMobileMenu } from "./phase-mobile-menu";

const marqueeItems = [
  "marquee.identity",
  "marquee.percent",
  "marquee.free",
  "marquee.share",
];

const navItems = [
  { href: "#home", labelKey: "nav.home" },
  { href: "#how-it-works", labelKey: "nav.howItWorks" },
  { href: "#features", labelKey: "nav.features" },
  { href: "#for-whom", labelKey: "nav.forWhom" },
];

export const PhaseHero = () => {
  const t = useTranslations("phaseLanding");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative flex min-h-screen overflow-hidden bg-white px-4 py-7 text-black md:px-14"
    >
      <motion.header
        className="absolute left-4 right-4 top-7 z-20 flex items-center justify-between md:left-14 md:right-14"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
      >
        <span className="rounded-md bg-[#f7f7f7] px-4 py-2 text-sm font-black">
          {t("brand")}
        </span>

        <nav className="hidden rounded-md bg-[#f7f7f7] p-1 text-xs md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded px-4 py-2 transition hover:bg-white"
            >
              {t(item.labelKey)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <button
            type="button"
            className="rounded-md border border-black px-5 py-2 text-sm"
          >
            {t("login")}
          </button>
        </div>

        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-md bg-[#f7f7f7] md:hidden"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="size-4" />
        </button>
      </motion.header>

      <div className="mx-auto flex w-full max-w-[1220px] flex-col items-center justify-center pt-20 text-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
        >
          <motion.span
            className="absolute -right-2 top-2 z-20 inline-flex w-max whitespace-nowrap rounded bg-[#bf5cff] px-2 py-1 text-[11px] font-semibold leading-none text-white md:-right-2 md:-top-7 md:text-sm"
            animate={{ y: [0, -5, 0], rotate: [-1, 1, -1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {t("hero.badge")}
          </motion.span>

          <Image
            src="/images/phase/hero-wordmark-smile.png"
            alt=""
            width={94}
            height={75}
            className="absolute -left-3 top-8 z-20 w-12 md:-left-1 md:top-12 md:w-[94px]"
          />

          <Image
            src="/images/phase/hero-wordmark.png"
            alt={t("brand")}
            width={1097}
            height={278}
            priority
            className="w-[min(78vw,1097px)] select-none"
          />
        </motion.div>

        <motion.p
          className="mt-5 text-sm md:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.3 }}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.button
          type="button"
          className="mt-5 inline-flex items-center gap-3 rounded-md bg-[#ffd21f] px-6 py-3 text-sm font-semibold"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <MoveRight className="size-4" />
          {t("hero.cta")}
        </motion.button>
      </div>

      <div className="absolute bottom-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden border-y border-[#d8b7ff] bg-white py-2 text-[11px] font-medium text-[#b653ff]">
        <motion.div
          className="flex w-[200vw] whitespace-nowrap"
          animate={{ x: ["0vw", "-100vw"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex w-screen shrink-0 items-center gap-6 px-4"
            >
              {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
                (item, index) => (
                  <span
                    key={`${item}-${group}-${index}`}
                    className="flex shrink-0 items-center gap-6"
                  >
                    <span
                      className={
                        item === "marquee.percent"
                          ? "rounded border border-[#d8b7ff] px-1.5 py-0.5"
                          : ""
                      }
                    >
                      {t(item)}
                    </span>
                    <span className="h-4 w-px bg-[#d8b7ff]" />
                  </span>
                )
              )}
            </div>
          ))}
        </motion.div>
      </div>

      <PhaseMobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </section>
  );
};
