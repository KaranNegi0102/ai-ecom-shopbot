import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
  category: string;
};

type ProductDetailProps = {
  selectedProduct: Product;
  onClose: () => void;
};

export default function ProductDetail({
  selectedProduct,
  onClose,
}: ProductDetailProps) {
  return (
    <div className="fixed inset-0  backdrop-blur-sm bg-white/30  bg-opacity-50  z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-md  max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedProduct.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative h-[400px] w-full  rounded-lg overflow-hidden">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                className="object-contain p-1"
                sizes="(max-width: 668px) 100vw, 50vw"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-col space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Category: {selectedProduct.category}
                </p>
                <div className="text-2xl font-semibold text-gray-800">
                  ${selectedProduct.price.toLocaleString()}
                </div>
              </div>

              <div className="border-t border-b border-gray-200 py-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-600">{selectedProduct.desc}</p>
              </div>

              <div className="space-y-4">
                

                {/* In Stock Products */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 font-medium">
                        In Stock
                      </span>
                    </div>
                    <span className="text-gray-600">18 available</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-gray-500 text-sm">
                <p>Free shipping on orders over $50</p>
                <p>1 year warranty included</p>
                <p>30-day return policy</p>
              </div>


              {/* Reviews Section */}
              <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Customer Reviews
                    </h3>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600">
                        4.8 (1876 reviews)
                      </span>
                    </div>
                  </div>

                  {/* Review Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 w-12">5★</span>
                        <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-yellow-400 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">85%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 w-12">4★</span>
                        <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-yellow-400 rounded-full"
                            style={{ width: "10%" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">10%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 w-12">3★</span>
                        <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-yellow-400 rounded-full"
                            style={{ width: "3%" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">3%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 w-12">2★</span>
                        <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-yellow-400 rounded-full"
                            style={{ width: "1%" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">1%</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 w-12">1★</span>
                        <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-yellow-400 rounded-full"
                            style={{ width: "1%" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">1%</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Reviews */}
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600">
                          John D.
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          2 days ago
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        &ldquo;Excellent product! 
                      </p>
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600">
                          Sarah M.
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          1 week ago
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">
                        &ldquo;The
                        build quality is top-notch and controls are
                        intuitive.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
