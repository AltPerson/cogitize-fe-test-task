"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname, useRouter } from "@/i18n";
import { useTranslations } from "next-intl";

const pages = [
  {
    label: "Guide",
    href: "/guide",
  },
  {
    label: "Swap",
    href: "/swap",
  },
  {
    label: "Design",
    href: "/design",
  },
] as const;

export const PageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("pageSwitcher");

  const pathname = usePathname();
  const router = useRouter();

  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleNavigate = (href: (typeof pages)[number]["href"]) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <div ref={rootRef} className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="mb-3 w-44 rounded-2xl border border-neutral-200 bg-white p-2 text-sm shadow-xl">
          <div className="px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
            {t("pages")}
          </div>

          <div className="space-y-1">
            {pages.map((page) => {
              const isActive = pathname === page.href;

              return (
                <button
                  key={page.href}
                  type="button"
                  onClick={() => handleNavigate(page.href)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition ${
                    isActive
                      ? "bg-neutral-950 text-white"
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950"
                  }`}
                >
                  <span>{page.label}</span>

                  {isActive && <span className="text-xs">●</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex p-3 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white shadow-lg transition hover:scale-105 active:scale-95"
      >
        {t("pagesSwitcherTitle")}
      </button>
    </div>
  );
};
