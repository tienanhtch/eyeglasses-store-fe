"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryFilterProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    image: string;
    isActive?: boolean;
  }>;
  basePath: string;
}

export default function CategoryFilter({
  categories,
  basePath,
}: CategoryFilterProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4; // Số items hiển thị cùng lúc
  const maxIndex = Math.max(0, categories.length - itemsPerView);

  const scrollLeft = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const scrollRight = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };

  return (
    <div className="collection__category mb-8">
      <div className="collection__wrap">
        <div className="relative">
          {/* Navigation buttons */}
          {categories.length > itemsPerView && (
            <>
              <button
                onClick={scrollLeft}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={scrollRight}
                disabled={currentIndex >= maxIndex}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Categories */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerView)
                }%)`,
              }}
            >
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex-shrink-0 w-1/4 px-2"
                  style={{ minWidth: `${100 / itemsPerView}%` }}
                >
                  <Link
                    href={`${basePath}/${category.slug}`}
                    className="collection__filter__item block text-center group"
                  >
                    <div className="relative mb-2">
                      <img
                        src={category.image}
                        alt={category.name}
                        className={`collection__filter__image w-16 h-16 mx-auto rounded-full object-cover transition-all duration-200 ${
                          category.isActive
                            ? "ring-2 ring-gray-900 ring-offset-2"
                            : "group-hover:ring-2 group-hover:ring-gray-300 group-hover:ring-offset-2"
                        }`}
                        loading="lazy"
                      />
                    </div>
                    <span
                      className={`collection__filter__title text-sm font-medium transition-colors ${
                        category.isActive
                          ? "text-gray-900"
                          : "text-gray-600 group-hover:text-gray-900"
                      }`}
                    >
                      {category.name}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
