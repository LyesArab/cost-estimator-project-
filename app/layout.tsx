import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CostEstimatorProvider } from "@/contexts/CostEstimatorContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calculateur de Coûts pour Freelance",
  description: "Estimez le coût réel de vos projets et générez des devis professionnels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-slate-50`}>
        <CostEstimatorProvider>
          {children}
          <Toaster />
        </CostEstimatorProvider>
      </body>
    </html>
  );
} 