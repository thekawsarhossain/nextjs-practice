import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomeLayout = ({ children, title }) => {
  return (
    <div>
      {/* head title here  */}
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default HomeLayout;
