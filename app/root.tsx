import {
  LoaderFunctionArgs,
  type LinksFunction,
  type MetaFunction,
  json,
} from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { toast as notify } from "sonner";

import { Toaster } from "sonner";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./styles/tailwind.css";
import sonnerStyles from "~/styles/sonner.css?url";
import { getToast } from "remix-toast";
import { useEffect } from "react";
import TopLoader from "./components/topLoader";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "stylesheet", href: sonnerStyles },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap",
  },
];

export const meta: MetaFunction = () => {
  return [{ title: "Sticky Stuff" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { toast, headers } = await getToast(request);
  return json({ toast }, { headers });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { toast } = useLoaderData<typeof loader>();
  useEffect(() => {
    if (toast?.type === "error") {
      notify.error(toast.message);
    }
    if (toast?.type === "success") {
      notify.success(toast.message);
    }
  }, [toast]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <Navbar />
      <body className="font-jetbrains mt-16">
        <TopLoader />
        <Toaster richColors theme="light" position="top-right" />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
