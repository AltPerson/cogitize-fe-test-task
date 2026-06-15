import { PageSwitcher } from "@/04.widgets/page-switcher/ui";

const AppLayout = ({ children }) => {
  return (
    <div className="mx-auto min-h-screen w-full">
      {children}
      <PageSwitcher />
    </div>
  );
};

export default AppLayout;
