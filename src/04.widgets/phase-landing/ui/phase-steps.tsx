"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SLIDE_INTERVAL_MS = 3000;

const stepCards = [
  {
    id: "01",
    color: "bg-[#ffd91f]",
    stickerKey: "steps.cards.create.sticker",
    titleKey: "steps.cards.create.title",
    descriptionKey: "steps.cards.create.description",
  },
  {
    id: "02",
    color: "bg-[#bd59ed]",
    stickerKey: "steps.cards.add.sticker",
    titleKey: "steps.cards.add.title",
    descriptionKey: "steps.cards.add.description",
  },
  {
    id: "03",
    color: "bg-[#ffd91f]",
    stickerKey: "steps.cards.share.sticker",
    titleKey: "steps.cards.share.title",
    descriptionKey: "steps.cards.share.description",
  },
];

export const PhaseSteps = () => {
  const t = useTranslations("phaseLanding");
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.35, once: false });
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = stepCards[activeStepIndex];

  useEffect(() => {
    if (!isSectionInView) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveStepIndex(
        (currentIndex) => (currentIndex + 1) % stepCards.length
      );
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [isSectionInView]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="grid min-h-screen overflow-hidden bg-[#1a1a1a] px-5 py-16 text-white md:min-h-[835px] md:grid-cols-[0.9fr_1.1fr] md:px-16 md:py-24"
    >
      <div className="flex items-center justify-center md:min-w-[560px] md:justify-start">
        <motion.div
          initial={{ x: -26 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <h2 className="text-center text-[42px] font-black uppercase leading-[0.93] md:text-left md:text-[104px] lg:text-[118px]">
            {t("steps.titleLineOne")}
            <br />
            {t("steps.titleLineTwo")}
            <br />
            {t("steps.titleLineThree")}
          </h2>
          <span className="ml-20 rounded bg-[#bf5cff] px-2 py-1 text-xs font-semibold">
            {t("steps.badge")}
          </span>
        </motion.div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-8 md:mt-0 md:flex-row">
        <motion.div
          className="relative w-full max-w-[330px] overflow-hidden border-4 border-white text-black shadow-2xl md:max-w-[430px] md:overflow-visible"
          initial={{ y: 34, rotate: -2 }}
          whileInView={{ y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              className={`relative min-h-[520px] overflow-hidden p-6 md:min-h-[610px] md:p-8 ${activeStep.color}`}
              initial={{ opacity: 0, x: 42, rotate: 1 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -42, rotate: -1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="absolute inset-0 opacity-25 [background:linear-gradient(90deg,transparent_0_28%,#fff_28%_31%,transparent_31%_58%,#fff_58%_61%,transparent_61%)]" />

              <div className="relative">
                <div className="mb-7 grid grid-cols-3 gap-3">
                  {stepCards.map((step, index) => (
                    <button
                      key={step.id}
                      type="button"
                      className="h-1 rounded-full bg-white"
                      aria-label={`Show step ${step.id}`}
                      onClick={() => setActiveStepIndex(index)}
                    >
                      <motion.span
                        className="block h-full rounded-full bg-black"
                        initial={false}
                        animate={{
                          width:
                            index <= activeStepIndex ||
                            index === activeStepIndex
                              ? "100%"
                              : "0%",
                        }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                      />
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-base font-medium md:text-xl">
                  <Image
                    src="/images/phase/gifty-icon.png"
                    alt=""
                    width={36}
                    height={36}
                    className="size-9"
                  />
                  {t("steps.productName")}
                </div>

                <motion.span
                  className="absolute -left-6 top-32 rotate-[-8deg] text-4xl font-black uppercase text-[#ffd91f] [text-shadow:_-3px_-3px_0_#000,3px_-3px_0_#000,-3px_3px_0_#000,3px_3px_0_#000] md:-left-7 md:top-36 md:text-5xl md:[text-shadow:_-4px_-4px_0_#000,4px_-4px_0_#000,-4px_4px_0_#000,4px_4px_0_#000]"
                  animate={{ rotate: [-8, -2, -8], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                >
                  {t(activeStep.stickerKey)}
                </motion.span>

                <motion.span
                  className="absolute -right-12 top-64 rotate-[10deg] text-4xl font-black uppercase text-[#ffd91f] [text-shadow:_-3px_-3px_0_#000,3px_-3px_0_#000,-3px_3px_0_#000,3px_3px_0_#000] md:-right-16 md:top-72 md:text-5xl md:[text-shadow:_-4px_-4px_0_#000,4px_-4px_0_#000,-4px_4px_0_#000,4px_4px_0_#000]"
                  animate={{ rotate: [10, 3, 10], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.7, repeat: Infinity }}
                >
                  {t(activeStep.stickerKey)}
                </motion.span>

                <p className="mt-32 text-base font-medium md:mt-40 md:text-xl">
                  {activeStep.id}
                </p>
                <h3 className="mt-5 max-w-[260px] text-[34px] font-medium leading-none md:mt-6 md:max-w-[310px] md:text-[44px]">
                  {t(activeStep.titleKey)}
                </h3>
                <p className="mt-9 max-w-[270px] text-[20px] leading-none md:mt-12 md:max-w-[340px] md:text-[26px]">
                  {t(activeStep.descriptionKey)}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="max-w-[210px] text-center md:text-left"
          initial={{ x: 20 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1, duration: 0.32 }}
        >
          <h3 className="text-base font-semibold">{t("steps.sideTitle")}</h3>
          <p className="mt-3 text-sm text-white/80">
            {t("steps.sideDescription")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
