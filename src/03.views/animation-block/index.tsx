const AnimationBlockView = () => {
  return (
    <section className="min-h-dvh bg-[linear-gradient(135deg,_#fff7ed_0%,_#ffedd5_45%,_#fed7aa_100%)] px-4 py-16 text-slate-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <div className="max-w-2xl space-y-3">
          <span className="inline-flex rounded-full border border-slate-900/10 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700">
            Minimal block
          </span>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Zagotovka dlya budushchey verstki prostoy kartochki
          </h1>
          <p className="text-base leading-7 text-slate-700 sm:text-lg">
            Stranitsa s minimalnym blokom: ikonka, zagolovok i korotkiy tekst.
            Podkhodit kak baza dlya testovoy verstki i dalneyshey animatsii.
          </p>
        </div>

        <div className="max-w-xl rounded-[32px] border border-slate-900/10 bg-white/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3l7 4v10l-7 4-7-4V7l7-4z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
              <path
                d="M9.5 11.5l1.75 1.75 3.25-3.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </div>

          <div className="mt-6 space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Bazovaya kartochka
            </h2>
            <p className="text-base leading-7 text-slate-600">
              Zdes budet minimalnyy komponent s ponyatnoy strukturou, chtoby
              kandidat srazu pereshel k verstke, ne tratya vremya na podgotovku
              stranitsy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimationBlockView;
