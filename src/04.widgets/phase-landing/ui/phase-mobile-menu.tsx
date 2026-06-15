"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/04.widgets/language-switcher";

type PhaseMobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems = [
  { href: "#home", labelKey: "nav.home" },
  { href: "#how-it-works", labelKey: "nav.howItWorks" },
  { href: "#features", labelKey: "nav.features" },
  { href: "#for-whom", labelKey: "nav.forWhom" },
];

export const PhaseMobileMenu = ({ isOpen, onClose }: PhaseMobileMenuProps) => {
  const t = useTranslations("phaseLanding");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] bg-white px-5 py-6 text-black md:hidden"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-[#f7f7f7] px-4 py-2 text-sm font-black">
              {t("brand")}
            </span>

            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-md bg-[#f7f7f7]"
              onClick={onClose}
              aria-label="Close menu"
            >
              <X className="size-4" />
            </button>
          </div>

          <nav className="mt-20">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="flex border-b border-neutral-300 py-3 text-[28px] font-medium leading-none"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.22 }}
                onClick={onClose}
              >
                {t(item.labelKey)}
                <sup className="ml-3 text-xs text-[#b653ff]">
                  0{index + 1}
                </sup>
              </motion.a>
            ))}
          </nav>

          <div className="absolute bottom-8 left-5 right-5 space-y-3">
            <div className="flex justify-center pb-2">
              <LanguageSwitcher />
            </div>
            <button
              type="button"
              className="h-11 w-full rounded-md bg-[#ffd21f] text-sm font-semibold"
            >
              {t("mobileMenu.cta")}
            </button>
            <button
              type="button"
              className="h-10 w-full rounded-md border border-black text-sm"
            >
              {t("login")}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
