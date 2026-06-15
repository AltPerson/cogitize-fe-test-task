"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const headlineWords = [
  "creators.headline.phase",
  "creators.headline.isSpace",
  "creators.headline.forCreators",
  "creators.headline.toBeSeen",
];

export const PhaseCreators = () => {
  const t = useTranslations("phaseLanding");

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#f4f4f4] pt-24 text-black md:min-h-[1010px] md:pt-28"
    >
      <p className="text-center text-sm">
        {t("creators.eyebrow")}
      </p>

      <motion.div
        className="relative z-10 mx-auto mt-6 max-w-[1200px] px-4 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06 } },
        }}
      >
        <Image
          src="/images/phase/our-mission-text.png"
          alt={t("creators.sticker")}
          width={176}
          height={52}
          className="absolute left-[21%] top-[-18px] z-10 w-[120px] md:top-[-24px] md:w-[176px]"
        />

        {headlineWords.map((wordKey) => (
          <motion.h2
            key={wordKey}
            className="text-[44px] font-black uppercase leading-[0.84] md:text-[96px] lg:text-[112px]"
            variants={{
              hidden: { y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {t(wordKey)}
          </motion.h2>
        ))}
      </motion.div>

      <motion.div
        className="absolute left-[5%] top-[47%] z-30 hidden w-[197px] bg-white shadow-xl md:block"
        animate={{ y: [0, -10, 0], rotate: [-1, 2, -1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/phase/girl-card.png"
          alt={t("creators.cardSticker")}
          width={197}
          height={207}
          className="w-full"
        />
        <Image
          src="/images/phase/girl-card-smile.png"
          alt=""
          width={70}
          height={70}
          className="absolute right-0 top-0 w-[70px]"
        />
      </motion.div>

      <motion.div
        className="relative z-30 mx-auto mt-6 w-[197px] bg-white shadow-xl md:hidden"
        initial={{ y: 20, rotate: -1 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Image
          src="/images/phase/girl-card.png"
          alt={t("creators.cardSticker")}
          width={197}
          height={207}
          className="w-full"
        />
        <Image
          src="/images/phase/girl-card-smile.png"
          alt=""
          width={70}
          height={70}
          className="absolute right-0 top-0 w-[70px]"
        />
      </motion.div>

      <motion.div
        className="absolute right-[13%] top-[24%] z-20 hidden md:block"
        animate={{ y: [0, 8, 0], rotate: [0, -1, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/phase/models-card.png"
          alt=""
          width={193}
          height={116}
          className="w-[193px]"
        />
        <Image
          src="/images/phase/models-card-text.png"
          alt=""
          width={141}
          height={53}
          className="absolute -right-24 top-24 w-[141px]"
        />
      </motion.div>

      <motion.div
        className="relative z-20 mx-auto mt-8 w-full max-w-[1440px]"
        initial={{ y: 34 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.42, ease: "easeOut" }}
      >
        <Image
          src="/images/phase/girls-bottom.png"
          alt=""
          width={1440}
          height={473}
          loading="eager"
          className="min-h-[360px] w-full object-cover object-center"
        />

        <div className="absolute bottom-8 left-5 max-w-sm text-white md:bottom-12 md:left-20">
          <div>
            <p className="inline bg-[#ffd21f] px-1 text-sm font-semibold text-black">
              {t("creators.highlightOne")}
            </p>
            <br />
            <p className="inline bg-[#ffd21f] px-1 text-sm font-semibold text-black">
              {t("creators.highlightTwo")}
            </p>
            <p className="mt-5 text-lg leading-tight">
              {t("creators.description")}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
