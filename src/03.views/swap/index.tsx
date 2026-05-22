const swapFields = [
  {
    label: "Otdayu",
    value: "1.2500",
    caption: "BTC",
  },
  {
    label: "Poluchayu",
    value: "81,425.00",
    caption: "USDT",
  },
];

const SwapView = () => {
  return (
    <section className="min-h-dvh bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_38%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)] px-4 py-16 text-slate-50">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-5">
          <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
            Placeholder
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Stranitsa konvertatsii kriptovalyuty
            </h1>
            <p className="text-base leading-7 text-slate-300 sm:text-lg">
              Zagotovka pod budushchiy vidzhet obmena s dvumya bazovymi polyami:
              chto polzovatel otdaet i chto poluchaet.
            </p>
          </div>
          <div className="grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              Kurs obnovlyaetsya
              <div className="mt-2 text-lg font-semibold text-white">
                ~ kazhdyye 30 sek
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              Komissiya
              <div className="mt-2 text-lg font-semibold text-white">0.25%</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              Status
              <div className="mt-2 text-lg font-semibold text-emerald-300">
                Demo mode
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-xl rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-sky-950/30 backdrop-blur sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Converter widget
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Otdayu / Poluchayu
              </h2>
            </div>
            <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
              Active
            </div>
          </div>

          <div className="space-y-4">
            {swapFields.map((field) => (
              <div
                key={field.label}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
                  <span>{field.label}</span>
                  <span>{field.caption}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-3xl font-semibold tracking-tight text-white">
                    {field.value}
                  </span>
                  <button
                    type="button"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200"
                  >
                    Vybrat aktiv
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center rounded-2xl bg-sky-400 px-4 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            Nachat konvertatsiyu
          </button>
        </div>
      </div>
    </section>
  );
};

export default SwapView;
