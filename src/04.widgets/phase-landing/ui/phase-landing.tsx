import { PhaseCreators } from "./phase-creators";
import { PhaseHero } from "./phase-hero";
import { PhaseSteps } from "./phase-steps";

export const PhaseLanding = () => {
  return (
    <main className="bg-white">
      <PhaseHero />
      <PhaseCreators />
      <PhaseSteps />
    </main>
  );
};
