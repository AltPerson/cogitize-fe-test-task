"use client";

import { locales, usePathname, useRouter } from "@/i18n";
import { useLocale } from "next-intl";

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1 text-xs font-medium text-neutral-900 shadow-sm">
      {locales.map((nextLocale) => {
        const isActive = nextLocale === locale;

        return (
          <button
            key={nextLocale}
            type="button"
            className={`rounded-full px-3 py-1 uppercase transition ${
              isActive
                ? "bg-neutral-950 text-white"
                : "text-neutral-500 hover:text-neutral-950"
            }`}
            aria-pressed={isActive}
            onClick={() => {
              router.replace(pathname, { locale: nextLocale });
            }}
          >
            {nextLocale}
          </button>
        );
      })}
    </div>
  );
};
