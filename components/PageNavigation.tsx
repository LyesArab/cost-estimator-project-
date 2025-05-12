"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SlideInFromLeft, SlideInFromRight } from "@/components/ui/motion";

// Define the page routes in order
const routes = [
  { path: "/expenses", label: "Dépenses", step: "01" },
  { path: "/features", label: "Fonctionnalités", step: "02" },
  { path: "/tax", label: "Taxes", step: "03" },
  { path: "/total", label: "Résultat", step: "04" },
];

export default function PageNavigation() {
  const pathname = usePathname();
  
  // Find the current page index
  const currentIndex = routes.findIndex(route => route.path === pathname);
  
  // Calculate previous and next page
  const prevPage = currentIndex > 0 ? routes[currentIndex - 1] : null;
  const nextPage = currentIndex < routes.length - 1 ? routes[currentIndex + 1] : null;
  
  return (
    <div className="flex justify-between items-center w-full">
      {prevPage ? (
        <SlideInFromLeft>
          <Link href={prevPage.path}>
            <Button variant="outline" className="flex items-center gap-2 py-2 px-4 h-auto transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">{prevPage.label}</span>
            </Button>
          </Link>
        </SlideInFromLeft>
      ) : (
        <SlideInFromLeft>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 py-2 px-4 h-auto transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-medium">Accueil</span>
            </Button>
          </Link>
        </SlideInFromLeft>
      )}
      
      {nextPage && (
        <SlideInFromRight>
          <Link href={nextPage.path}>
            <Button className="flex items-center gap-2 py-2 px-5 h-auto transition-all">
              <span className="font-medium">{nextPage.label}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>
        </SlideInFromRight>
      )}
    </div>
  );
} 