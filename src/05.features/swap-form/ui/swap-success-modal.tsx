"use client";

import { AnimatePresence, motion } from "framer-motion";

type SwapSuccessModalProps = {
  isOpen: boolean;
  message: string;
  okLabel: string;
  onClose: () => void;
};

export const SwapSuccessModal = ({
  isOpen,
  message,
  okLabel,
  onClose,
}: SwapSuccessModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-sm rounded-2xl bg-white p-6 text-center text-[#1b1b1b] shadow-xl"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <p className="text-sm leading-6">{message}</p>

            <button
              type="button"
              className="mt-5 h-9 min-w-24 rounded-md bg-[#43d83b] px-5 text-sm font-medium text-black"
              onClick={onClose}
            >
              {okLabel}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
