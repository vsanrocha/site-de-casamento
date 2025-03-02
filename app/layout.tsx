  import type { Metadata } from "next";
import { Montserrat, Lora } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ivan & Mirela | Nosso Casamento",
  description: "Site do casamento de Ivan e Mirela. Junte-se a nós nesse dia especial!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${lora.variable}`}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
