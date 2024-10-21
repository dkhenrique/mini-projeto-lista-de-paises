import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lista de países",
  description: "Uma lista de países criada com Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <main className="min-h-screen flex flex-col items-center bg-gray-100 ">
          <nav className="flex justify-center w-full bg-white h-16">
            <section className="container flex items-center gap-3">
              
              <Image
                src="/logo.svg"
                width={46}
                height={46}
                alt="Icone do mundo"
              />
              <h1 className="font-bold text-2xl">Lista de Países</h1>
            </section>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
