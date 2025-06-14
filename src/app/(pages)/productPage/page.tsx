"use client";
import React, { Suspense } from "react";
import ProductDetails from "./ProductDetails";

//Suspense Boundary: Next.js requires components using certain hooks (like useSearchParams) to be wrapped in a Suspense boundary.
// The page.tsx file provides this boundary.

export default function ProductPageDetails() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg">Loading...</p>
          </div>
        </div>
      }
    >
      <ProductDetails />
    </Suspense>
  );
}
