import { ReactNode } from "react";

export type LayoutProps = {
  header: string;
  footer?: string;
  children: ReactNode | ReactNode[] | JSX.Element | JSX.Element[];
};

function Layout({ header, footer, children }: LayoutProps) {
  return (
    <div className="grid grid-rows-[100px,1fr,50px] w-[90dvw] h-[100dvh] items-start text-stone-400">
      <div id="header" className="flex w-full h-full justify-center items-center p-2"><h1 className="text-xl font-bold">{header}</h1></div>
      <div id="middle" className="flex w-full h-full overflow-hidden">{children}</div>
      <div id="footer" className="flex w-full h-full justify-center items-center">{footer}</div>
    </div>
  );
}

export default Layout;
