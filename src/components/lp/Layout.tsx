import React from "react";
import Navbar from "./Navbar";
import Footer from "../Footer";
import Sec1 from "./Sec1";
import Sec2 from "./Sec2";
import Sec3 from "./Sec3";
import Sec5 from "./Sec5";
import Sec4 from "./Sec4";

interface Props {
  session: SessionModel | null;
}

function Layout({ session }: Props) {
  return (
    <>
      <div className="min-h-screen bg-[#F7FAF8]">
        <Navbar session={session} />
        <Sec1 session={session} />
        <Sec4 />
        <Sec3 />
        <Sec2 />
        <Sec5 session={session} />
        <Footer />
      </div>
    </>
  );
}

export default Layout;
