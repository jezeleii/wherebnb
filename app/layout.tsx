import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";
import RentModal from "./components/modals/RentModal";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";

import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "./components/modals/SearchModal";

//by default, layout is a server component

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "wherebnb",
  description: "wherebnb clone", 
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //getUser action here in the function , pass to the navbar
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="../public/images/wherebnb_logo.png" />
      </Head>
      <body className={font.className}>
        <ClientOnly>
        {/* <Modal actionLabel="Submit" secondaryActionLabel="secondary" title="Login Modal" isOpen/> */}
        <ToasterProvider/>
        <SearchModal/>
        <RentModal/>
        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
