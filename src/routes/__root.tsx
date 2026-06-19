import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav, Footer, Preloader, PageTransition, useCursorLight } from "../lib/portfolio/shared";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Signal lost</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This sector is offline. Return to mission control.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-hero">Go to Mission Control</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">System fault</h1>
        <p className="mt-2 text-sm text-muted-foreground">A subsystem failed to mount. Retry or return to base.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-hero">Retry</button>
          <a href="/" className="btn-ghost">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Jeet Soni — Mission Control" },
      { name: "description", content: "Jeet Soni — Co-Founder @ BinBuddy. A multi-page mission control built around AI, robotics, cybersecurity, and the web." },
      { name: "author", content: "Jeet Soni" },
      { property: "og:title", content: "Jeet Soni — Mission Control" },
      { property: "og:description", content: "Jeet Soni — Co-Founder @ BinBuddy. A multi-page mission control built around AI, robotics, cybersecurity, and the web." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Jeet Soni — Mission Control" },
      { name: "twitter:description", content: "Jeet Soni — Co-Founder @ BinBuddy. A multi-page mission control built around AI, robotics, cybersecurity, and the web." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fa0680b6-ec93-4085-8e86-2c3c97beb984/id-preview-895940f8--fbf92f56-349b-44b4-a463-a2930587839f.lovable.app-1781843216704.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/fa0680b6-ec93-4085-8e86-2c3c97beb984/id-preview-895940f8--fbf92f56-349b-44b4-a463-a2930587839f.lovable.app-1781843216704.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}

function AppShell() {
  const [booting, setBooting] = useState(true);
  const cursor = useCursorLight();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("js-booted")) {
      setBooting(false);
    }
  }, []);

  const dismissBoot = () => {
    setBooting(false);
    try { sessionStorage.setItem("js-booted", "1"); } catch {}
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground bg-noise">
      <Toaster theme="dark" position="bottom-right" />
      {booting && <Preloader onDone={dismissBoot} />}
      <div ref={cursor} className="cursor-light hidden md:block" aria-hidden />
      <Nav />
      <main>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
