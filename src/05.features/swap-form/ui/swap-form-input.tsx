"use client";
import type { Asset } from "@/06.entities";
import { useGetAssetsQuery } from "@/06.entities";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type SwapFormInputProps = {
  label: string;
  asset: Asset | null;
  amount?: string;
  placeholder?: string;
  searchPlaceholder: string;
  loadingText: string;
  errorText: string;
  fallbackSymbol: string;
  fallbackName: string;
  onAmountChange: (value: string) => void;
  onAssetChange: (asset: Asset) => void;
};

export const SwapFormInput = ({
  label,
  asset,
  amount,
  placeholder = "0.1",
  searchPlaceholder,
  loadingText,
  errorText,
  fallbackSymbol,
  fallbackName,
  onAmountChange,
  onAssetChange,
}: SwapFormInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const symbol = asset?.symbol ?? fallbackSymbol;
  const name = asset?.name ?? fallbackName;

  const { data, isFetching, isError } = useGetAssetsQuery(
    {
      search,
      page,
    },
    {
      skip: !isOpen,
    }
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleDocumentPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleDocumentPointerDown);

    return () => {
      document.removeEventListener("pointerdown", handleDocumentPointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;

    if (!isOpen || !loadMoreElement || !data?.hasNextPage || isFetching) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((currentPage) => currentPage + 1);
          observer.disconnect();
        }
      },
      {
        rootMargin: "48px",
      }
    );

    observer.observe(loadMoreElement);

    return () => {
      observer.disconnect();
    };
  }, [data?.hasNextPage, isFetching, isOpen]);

  return (
    <div
      ref={rootRef}
      className="relative flex items-center justify-between gap-4"
    >
      <div className="min-w-0">
        <p className="mb-3 text-[11px] text-[#b7b7b7]">{label}</p>

        <button
          type="button"
          onClick={() => {
            setPage(1);
            setSearch("");
            setIsOpen((currentValue) => !currentValue);
          }}
          className="flex min-w-0 items-center gap-2 text-left"
        >
          <span className="flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f7931a] text-[11px] font-bold text-white">
            {asset?.assetImage ? (
              <Image
                src={asset.assetImage}
                alt={symbol}
                width={20}
                height={20}
                className="size-full object-cover"
              />
            ) : (
              symbol.slice(0, 1)
            )}
          </span>

          <span className="min-w-0">
            <span className="flex items-center gap-2">
              <span className="truncate text-[20px] font-semibold leading-none text-white">
                {symbol}
              </span>

              {isOpen ? (
                <ChevronUp className="size-4 text-[#b7b7b7]" />
              ) : (
                <ChevronDown className="size-4 text-[#b7b7b7]" />
              )}
            </span>

            <span className="mt-1 block max-w-[120px] truncate text-[11px] leading-none text-[#b7b7b7]">
              {name}
            </span>
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute left-0 top-[calc(100%+10px)] z-20 w-64 overflow-hidden rounded-xl border border-[#d7d7d7] bg-white shadow-xl"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="p-3">
                <label className="flex h-11 items-center gap-2 rounded-lg border border-[#d7d7d7] px-3 text-[#a6a6a6]">
                  <Search className="size-5 shrink-0" />

                  <input
                    className="min-w-0 flex-1 bg-transparent text-sm text-[#1b1b1b] outline-none placeholder:text-[#a6a6a6]"
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(event) => {
                      setPage(1);
                      setSearch(event.target.value);
                    }}
                  />
                </label>
              </div>

              <div className="max-h-52 overflow-y-auto">
                {data?.data.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className="flex w-full items-center gap-3 border-t border-[#eeeeee] px-3 py-3 text-left hover:bg-[#f4f4f4]"
                    onClick={() => {
                      onAssetChange(option);
                      setIsOpen(false);
                    }}
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#f7931a] text-[12px] font-bold text-white">
                      {option.assetImage ? (
                        <Image
                          src={option.assetImage}
                          alt={option.symbol}
                          width={28}
                          height={28}
                          className="size-full object-cover"
                        />
                      ) : (
                        option.symbol.slice(0, 1)
                      )}
                    </span>

                    <span className="min-w-0">
                      <span className="block truncate text-[20px] font-medium leading-none text-[#1b1b1b]">
                        {option.symbol}
                      </span>

                      <span className="mt-1 block truncate text-[11px] text-[#777]">
                        {option.name}
                      </span>
                    </span>
                  </button>
                ))}

                {isError && (
                  <p className="border-t border-[#eeeeee] px-3 py-3 text-xs text-red-500">
                    {errorText}
                  </p>
                )}

                {isFetching && (
                  <p className="border-t border-[#eeeeee] px-3 py-3 text-xs text-[#777]">
                    {loadingText}
                  </p>
                )}

                <div ref={loadMoreRef} className="h-1" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <input
        className="w-28 bg-transparent text-right text-[18px] font-semibold text-white outline-none placeholder:text-gray"
        placeholder={placeholder}
        value={amount ?? ""}
        onChange={(event) => {
          onAmountChange(event.target.value);
        }}
      />
    </div>
  );
};
