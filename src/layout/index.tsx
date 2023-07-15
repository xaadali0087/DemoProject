// ** React Import
import React, { ReactNode } from "react";

// ** Custom Component
import Header from "@/components/common/header";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen min-h-screen h-screen">
      <Header />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Layout;
