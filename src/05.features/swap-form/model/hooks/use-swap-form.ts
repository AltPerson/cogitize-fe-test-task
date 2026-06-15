"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Asset } from "@/06.entities";
import { useGetAssetsQuery } from "@/06.entities";

import { usePreviewSwapMutation } from "../../api";
import { useDebouncedValue } from "./use-debounced-value";

const DEFAULT_FROM_SYMBOL = "USDT";
const DEFAULT_TO_SYMBOL = "BTC";
const PREVIEW_THROTTLE_MS = 600;

const findAssetBySymbol = (assets: Asset[] | undefined, symbol: string) => {
  return assets?.find((asset) => asset.symbol === symbol) ?? null;
};

type SwapFieldState = {
  entity: Asset | null;
  value: string;
};

type SwapFormState = {
  from: SwapFieldState;
  to: SwapFieldState;
};

type SwapField = "from" | "to";

export const useSwapForm = () => {
  const [activeField, setActiveField] = useState<SwapField>("from");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [swapState, setSwapState] = useState<SwapFormState>({
    from: {
      entity: null,
      value: "",
    },
    to: {
      entity: null,
      value: "",
    },
  });

  const lastPreviewKeyRef = useRef("");
  const { data: fromAssets } = useGetAssetsQuery({
    search: DEFAULT_FROM_SYMBOL,
    page: 1,
  });

  const { data: toAssets } = useGetAssetsQuery({
    search: DEFAULT_TO_SYMBOL,
    page: 1,
  });

  const defaultFromAsset = useMemo(
    () => findAssetBySymbol(fromAssets?.data, DEFAULT_FROM_SYMBOL),
    [fromAssets]
  );

  const defaultToAsset = useMemo(
    () => findAssetBySymbol(toAssets?.data, DEFAULT_TO_SYMBOL),
    [toAssets]
  );

  const fromAsset = swapState.from.entity ?? defaultFromAsset;
  const toAsset = swapState.to.entity ?? defaultToAsset;
  const fromAssetId = fromAsset?.id;
  const toAssetId = toAsset?.id;
  const activeValue = swapState[activeField].value;
  const debouncedActiveValue = useDebouncedValue(
    activeValue,
    PREVIEW_THROTTLE_MS
  );

  const [
    previewSwap,
    { data: preview, isLoading: isPreviewLoading, reset: resetPreview },
  ] = usePreviewSwapMutation();

  const updateSwapField = <Key extends keyof SwapFieldState>(
    field: SwapField,
    key: Key,
    value: SwapFieldState[Key]
  ) => {
    setSwapState((currentState) => ({
      ...currentState,
      [field]: {
        ...currentState[field],
        [key]: value,
      },
    }));
  };

  const resetValues = () => {
    lastPreviewKeyRef.current = "";
    resetPreview();

    setSwapState((currentState) => ({
      from: {
        ...currentState.from,
        value: "",
      },
      to: {
        ...currentState.to,
        value: "",
      },
    }));
  };

  const resetForm = () => {
    setActiveField("from");
    resetValues();
  };

  const setAsset = (field: SwapField, asset: Asset) => {
    resetValues();
    updateSwapField(field, "entity", asset);
  };

  const setValue = (field: SwapField, value: string) => {
    lastPreviewKeyRef.current = "";
    resetPreview();
    setActiveField(field);
    updateSwapField(field, "value", value);

    if (!value) {
      resetPreview();
      updateSwapField(field === "from" ? "to" : "from", "value", "");
    }
  };

  const swapAssets = () => {
    if (!fromAsset || !toAsset) {
      return;
    }

    lastPreviewKeyRef.current = "";

    setSwapState((currentState) => ({
      from: {
        ...currentState.from,
        entity: toAsset,
      },
      to: {
        ...currentState.to,
        entity: fromAsset,
      },
    }));
  };

  const confirmSwap = () => {
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    resetForm();
  };

  useEffect(() => {
    if (!fromAssetId || !toAssetId || !debouncedActiveValue || !activeValue) {
      return;
    }

    const previewKey = [
      fromAssetId,
      toAssetId,
      activeField,
      debouncedActiveValue,
    ].join("-");

    if (lastPreviewKeyRef.current === previewKey) {
      return;
    }

    lastPreviewKeyRef.current = previewKey;

    previewSwap({
      fromAssetId,
      toAssetId,
      direction: activeField,
      amount: debouncedActiveValue,
      balanceType: ["main", "trade"],
    })
      .unwrap()
      .then((preview) => {
        updateSwapField(
          activeField === "from" ? "to" : "from",
          "value",
          activeField === "from"
            ? preview.estimatedReceive
            : preview.estimatedGive
        );
      })
      .catch(() => {
        lastPreviewKeyRef.current = "";
        resetPreview();
        updateSwapField(activeField === "from" ? "to" : "from", "value", "");
      });
  }, [
    activeField,
    debouncedActiveValue,
    activeValue,
    fromAssetId,
    previewSwap,
    resetPreview,
    toAssetId,
  ]);

  return {
    fromAsset,
    toAsset,
    fromValue: swapState.from.value,
    toValue: swapState.to.value,
    isPreviewLoading,
    isSuccessModalOpen,
    canConfirm: Boolean(preview && swapState.from.value && swapState.to.value),
    setAsset,
    setValue,
    swapAssets,
    confirmSwap,
    closeSuccessModal,
  };
};
