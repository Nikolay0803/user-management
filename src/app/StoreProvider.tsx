"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div className={inter.className}>{children}</div>
    </Provider>
  );
}
