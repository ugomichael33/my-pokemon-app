import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";

import { LayoutProps } from "@/types";

/**
 * The Layout component wraps around pages to provide a consistent structure.
 * It includes a <Head> section for SEO, a header with navigation, and a footer.
 *
 * @param {ReactNode} children - The content to be displayed within the main layout.
 * @param {string} [title="Pokémon App"] - The default title to display in the browser tab.
 */

const Layout = ({ children, title = "Pokémon App" }: LayoutProps) => (
  <>
    {/* SEO metadata and document title */}
    <Head>
      <title>{title}</title>
      <meta name="description" content="Explore the world of Pokémon" />
    </Head>
    <header className="bg-blue-500 text-white py-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/">
          <span className="font-semibold text-xl hover:text-blue-300 transition duration-150 ease-in-out">
            Home
          </span>
        </Link>
      </nav>
    </header>
    <main className="container mx-auto py-8 flex-grow">{children}</main>
    <footer className="bg-gray-700 text-white text-center py-4 mt-8">
      <p>© 2024 Pokémon App. All rights reserved.</p>
    </footer>
  </>
);

export default Layout;
