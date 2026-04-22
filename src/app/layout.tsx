
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "P-SCMR 计算器 | 个人硅碳代谢率",
  description: "量化你与 AI 的共生效率 — Personal Silicon-Carbon Metabolic Rate Calculator. By Raymone Huang × MINJI.",
  openGraph: {
    title: "P-SCMR 计算器",
    description: "个人硅碳代谢率 — 量化你每 $1 token 投入的真实回报",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
