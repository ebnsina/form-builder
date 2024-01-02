import DesignerContextProvider from "@/context/DesignerContext";
import { font } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div
      className={cn("flex min-h-screen flex-col bg-slate-100", font.className)}
    >
      <DesignerContextProvider>
        <Component {...pageProps} />
      </DesignerContextProvider>
    </div>
  );
}
