"use client";

type ThemeProviderProps = {
  children: React.ReactNode;
} & Record<string, unknown>;

function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>;
}

export default ThemeProvider;
