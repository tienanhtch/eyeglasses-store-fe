"use client";

import { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  Product,
  ProductCreatePayload,
} from "@/services/admin/products";
import { getAllCategories, Category } from "@/services/admin/categories";
import { Plus, Edit, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 20;

  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    description: "",
    brand: "",
    material: "",
    frameShape: "",
    seoTitle: "",
    seoDescription: "",
    categoryIds: [] as string[],
  });

  // Load products
  const loadProducts = async (page = 0) => {
    try {
      setLoading(true);
      const data = await getProducts({
        page,
        size: pageSize,
        sortBy: "createdAt",
        sortOrder: "desc",
      });
      setProducts(data.content);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (error) {
      console.error("Error loading products:", error);
      alert("Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  // Load categories
  const loadCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // Update
        await updateProduct(editingProduct.id, formData);
        alert("Cập nhật sản phẩm thành công!");
      } else {
        // Create
        const payload: ProductCreatePayload = {
          ...formData,
          categoryIds:
            formData.categoryIds.length > 0 ? formData.categoryIds : undefined,
        };
        await createProduct(payload);
        alert("Tạo sản phẩm thành công!");
      }
      setShowModal(false);
      setEditingProduct(null);
      resetForm();
      loadProducts(currentPage);
    } catch (error: any) {
      console.error("Error saving product:", error);
      alert(error?.response?.data?.error || "Có lỗi xảy ra khi lưu sản phẩm");
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

    try {
      await deleteProduct(id);
      alert("Xóa sản phẩm thành công!");
      loadProducts(currentPage);
    } catch (error: any) {
      console.error("Error deleting product:", error);
      alert(error?.response?.data?.error || "Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  const resetForm = () => {
    setFormData({
      slug: "",
      name: "",
      description: "",
      brand: "",
      material: "",
      frameShape: "",
      seoTitle: "",
      seoDescription: "",
      categoryIds: [],
    });
  };

  // Open modal for create
  const openCreateModal = () => {
    setEditingProduct(null);
    resetForm();
    setShowModal(true);
  };

  // Open modal for edit
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      slug: product.slug,
      name: product.name,
      description: product.description || "",
      brand: product.brand || "",
      material: product.material || "",
      frameShape: product.frameShape || "",
      seoTitle: product.seoTitle || "",
      seoDescription: product.seoDescription || "",
      categoryIds: product.categories?.map((c) => c.id) || [],
    });
    setShowModal(true);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }));
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-gray-600">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Sản phẩm</h1>
          <p className="text-sm text-gray-600 mt-1">
            Tổng số: {totalElements} sản phẩm
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Thêm sản phẩm
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thương hiệu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chất liệu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Chưa có sản phẩm nào
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.slug}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.brand || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.material || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.isPublished
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.isPublished ? "Đã xuất bản" : "Nháp"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800 inline-flex items-center"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => loadProducts(currentPage - 1)}
                disabled={currentPage === 0}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              <button
                onClick={() => loadProducts(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Trang <span className="font-medium">{currentPage + 1}</span> /{" "}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => loadProducts(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => loadProducts(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/30 flex items-center justify-center z-[60] p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative my-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {!editingProduct && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Slug <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      placeholder="gong-kinh-titan"
                    />
                  </div>
                )}

                <div className={!editingProduct ? "" : "col-span-2"}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên sản phẩm <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Gọng kính Titan cao cấp"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Mô tả chi tiết sản phẩm"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thương hiệu
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Ray-Ban"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chất liệu
                  </label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) =>
                      setFormData({ ...formData, material: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Titanium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hình dáng gọng
                  </label>
                  <input
                    type="text"
                    value={formData.frameShape}
                    onChange={(e) =>
                      setFormData({ ...formData, frameShape: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    placeholder="Oval"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Danh mục
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={formData.categoryIds.includes(category.id)}
                        onChange={() => handleCategoryToggle(category.id)}
                        className="rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                      />
                      <span className="text-sm text-gray-700">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, seoTitle: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SEO Description
                  </label>
                  <input
                    type="text"
                    value={formData.seoDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seoDescription: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  {editingProduct ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
