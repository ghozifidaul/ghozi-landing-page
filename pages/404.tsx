import Head from "next/head";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function NotFound() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      <Head>
        <title>404 -- Page Not Found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-sm text-muted">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-fg">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 text-sm underline underline-offset-4 transition-colors hover:text-muted"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
