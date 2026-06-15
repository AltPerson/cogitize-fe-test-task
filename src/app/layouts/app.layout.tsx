import { LanguageSwitcher } from "@/04.widgets";

const AppLayout = ({ children }) => {
  return (
    <div className="mx-auto min-h-screen w-full">
      <div className="fixed right-4 top-4 z-50">
        <LanguageSwitcher />
      </div>

      {children}
    </div>
  );
};

export default AppLayout;
