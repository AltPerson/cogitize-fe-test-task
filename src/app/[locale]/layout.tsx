import { locales, routing } from "@/i18n";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { AppLayout } from "../layouts";
import { ReduxProvider, ThemeProvider } from "../providers";
import "../styles/globals.css";

const GEIST = Geist({
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-geist",
  subsets: ["cyrillic", "latin-ext"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GEIST.variable} ${GEIST.className} min-h-screen flex flex-col`}
      >
        <NextIntlClientProvider>
          <ReduxProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AppLayout>{children}</AppLayout>
            </ThemeProvider>
            <Toaster />
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
