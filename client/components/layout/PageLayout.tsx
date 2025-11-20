import { ReactNode } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

type PageLayoutProps = {
  children: ReactNode;
  className?: string;
  mainClassName?: string;
  showFooter?: boolean;
};

const PageLayout = ({
  children,
  className,
  mainClassName,
  showFooter = true,
}: PageLayoutProps) => {
  return (
    <div className={cn("relative flex min-h-screen flex-col font-sora overflow-hidden", className)}>
      <Header />
      <main className={cn("flex-1", mainClassName)}>{children}</main>
      {showFooter ? <Footer /> : null}
    </div>
  );
};

export default PageLayout;
