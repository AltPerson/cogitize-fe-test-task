"use client";

import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { SwapFormInput } from "./swap-form-input";
import { SwapSuccessModal } from "./swap-success-modal";
import { useSwapForm } from "../model";

export const SwapForm = () => {
  const t = useTranslations("swap");
  const {
    fromAsset,
    toAsset,
    fromValue,
    toValue,
    isPreviewLoading,
    isSuccessModalOpen,
    canConfirm,
    setAsset,
    setValue,
    swapAssets,
    confirmSwap,
    closeSuccessModal,
  } = useSwapForm();

  return (
    <motion.section
      className="w-full max-w-[500px] rounded-[20px] bg-[#1b1b1b] px-8 py-8 text-white"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <h1 className="mb-4 text-[17px] font-medium">{t("title")}</h1>

      <div className="relative rounded-[18px] border border-[#2a2a2a] px-4 py-4">
        <motion.div
          className="pb-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.25 }}
        >
          <SwapFormInput
            label={t("fromLabel")}
            asset={fromAsset}
            amount={fromValue}
            searchPlaceholder={t("searchPlaceholder")}
            loadingText={t("loading")}
            errorText={t("loadError")}
            fallbackSymbol={t("selectSymbol")}
            fallbackName={t("selectName")}
            onAmountChange={(value) => {
              setValue("from", value);
            }}
            onAssetChange={(asset) => {
              setAsset("from", asset);
            }}
          />
        </motion.div>

        <div className="relative border-t border-[#777]">
          <button
            type="button"
            className="absolute right-4 top-0 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#242424] text-[#42d83a]"
            aria-label={t("swapCurrencies")}
            onClick={swapAssets}
          >
            <ArrowUpDown className="size-4" />
          </button>
        </div>

        <motion.div
          className="pt-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.25 }}
        >
          <SwapFormInput
            label={t("toLabel")}
            asset={toAsset}
            amount={toValue}
            searchPlaceholder={t("searchPlaceholder")}
            loadingText={t("loading")}
            errorText={t("loadError")}
            fallbackSymbol={t("selectSymbol")}
            fallbackName={t("selectName")}
            onAmountChange={(value) => {
              setValue("to", value);
            }}
            onAssetChange={(asset) => {
              setAsset("to", asset);
            }}
          />
        </motion.div>
      </div>

      {isPreviewLoading && (
        <p className="mt-3 text-center text-xs text-[#b7b7b7]">
          {t("calculating")}
        </p>
      )}

      <button
        type="button"
        disabled={!canConfirm}
        onClick={confirmSwap}
        className="mt-6 h-[31px] w-full rounded-[6px] bg-[#43d83b] text-[13px] font-medium text-black disabled:cursor-not-allowed disabled:bg-[#356f32] disabled:text-[#a8a8a8]"
      >
        {t("submit")}
      </button>

      <SwapSuccessModal
        isOpen={isSuccessModalOpen && Boolean(fromAsset && toAsset)}
        message={
          fromAsset && toAsset
            ? t("successMessage", {
                fromSymbol: fromAsset.symbol,
                fromAmount: fromValue,
                toSymbol: toAsset.symbol,
                toAmount: toValue,
              })
            : ""
        }
        okLabel={t("modalOk")}
        onClose={closeSuccessModal}
      />
    </motion.section>
  );
};
