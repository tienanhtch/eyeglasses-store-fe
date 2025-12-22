"use client";

import Link from "next/link";

interface CollectionCategoriesProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    image: string;
    isActive?: boolean;
  }>;
  basePath: string;
  title?: string;
  onCategoryClick?: (categoryId: string) => void;
}

export default function CollectionCategories({
  categories,
  basePath,
  title,
  onCategoryClick,
}: CollectionCategoriesProps) {
  return (
    <div className="collection__categories mb-12">
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
      )}

      <div className="collection__wrap max-w-6xl mx-auto">
        <div className="flex justify-center items-center gap-12 flex-wrap">
          {categories.map((category) => (
            <div key={category.id} className="flex-shrink-0">
              {onCategoryClick ? (
                <button
                  onClick={() => onCategoryClick(category.id)}
                  className="collection-filter-item text-center group flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="relative mb-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className={`collection-filter-image w-16 h-16 mx-auto rounded-full object-cover transition-all duration-200 ${
                        category.isActive
                          ? "ring-2 ring-gray-900 ring-offset-1"
                          : "group-hover:ring-2 group-hover:ring-gray-300 group-hover:ring-offset-1"
                      }`}
                      loading="lazy"
                    />
                  </div>
                  <span
                    className={`collection-filter-title text-sm font-medium transition-colors ${
                      category.isActive
                        ? "text-gray-900"
                        : "text-gray-600 group-hover:text-gray-900"
                    }`}
                  >
                    {category.name}
                  </span>
                </button>
              ) : (
                <Link
                  href={`${basePath}/${category.slug}`}
                  className="collection-filter-item text-center group flex flex-col items-center justify-center"
                >
                  <div className="relative mb-3">
                    <img
                      src={category.image}
                      alt={category.name}
                      className={`collection-filter-image w-16 h-16 mx-auto rounded-full object-cover transition-all duration-200 ${
                        category.isActive
                          ? "ring-2 ring-gray-900 ring-offset-1"
                          : "group-hover:ring-2 group-hover:ring-gray-300 group-hover:ring-offset-1"
                      }`}
                      loading="lazy"
                    />
                  </div>
                  <span
                    className={`collection-filter-title text-sm font-medium transition-colors ${
                      category.isActive
                        ? "text-gray-900"
                        : "text-gray-600 group-hover:text-gray-900"
                    }`}
                  >
                    {category.name}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
