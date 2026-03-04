"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  uploadProductImage,
  addProductImage,
  deleteProductImage,
  addVariant,
  updateVariant,
  deleteVariant,
  setInventoryStock,
  Product,
  ProductCreatePayload,
  ProductImage,
  ProductVariant,
  VariantCreatePayload,
} from "@/services/admin/products";
import { getAllCategories, Category } from "@/services/admin/categories";
import { getStores, Store } from "@/services/admin/stores";
import {
  Plus,
  Edit,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Upload,
  ImageIcon,
  Loader2,
  Package,
  Warehouse,
} from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import Image from "next/image";

// ---- Types ----
type PendingImage = {
  tempId: string;
  file: File;
  previewUrl: string;
};

type ExistingImage = ProductImage & { id: string };

type VariantStockMap = Record<string, Record<string, number>>; // variantId -> storeId -> onHand

type ActiveTab = "info" | "images" | "variants";

// ---- Blank forms ----
const blankVariant = (): VariantCreatePayload & { id?: string } => ({
  sku: "",
  color: "",
  sizeMm: undefined,
  bridgeMm: undefined,
  templeMm: undefined,
  retailPrice: 0,
  salePrice: undefined,
  isActive: true,
});

export default function AdminProductsPage() {
  const toast = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("info");

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 20;

  // Form - basic info
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

  // Image state
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Variant state
  const [variants, setVariants] = useState<(ProductVariant & { id: string })[]>([]);
  const [variantForm, setVariantForm] = useState<VariantCreatePayload & { id?: string }>(blankVariant());
  const [editingVariantId, setEditingVariantId] = useState<string | null>(null);
  const [savingVariant, setSavingVariant] = useState(false);
  const [deletingVariantId, setDeletingVariantId] = useState<string | null>(null);

  // Inventory state: variantId -> storeId -> onHand
  const [stockMap, setStockMap] = useState<VariantStockMap>({});
  const [savingStock, setSavingStock] = useState(false);

  // ---- Loaders ----
  const loadProducts = async (page = 0) => {
    try {
      setLoading(true);
      const data = await getProducts({ page, size: pageSize, sortBy: "createdAt", sortOrder: "desc" });
      setProducts(data.content);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch {
      toast.showError("Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try { setCategories(await getAllCategories()); } catch { /* ignore */ }
  };

  const loadStores = async () => {
    try { setStores(await getStores()); } catch { /* ignore */ }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadStores();
  }, []);

  // ---- Image handlers ----
  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    Array.from(files).forEach((file) => {
      if (!allowed.includes(file.type)) return;
      const tempId = `${Date.now()}-${Math.random()}`;
      setPendingImages((prev) => [...prev, { tempId, file, previewUrl: URL.createObjectURL(file) }]);
    });
  }, []);

  const removePendingImage = (tempId: string) => {
    setPendingImages((prev) => {
      const img = prev.find((i) => i.tempId === tempId);
      if (img) URL.revokeObjectURL(img.previewUrl);
      return prev.filter((i) => i.tempId !== tempId);
    });
  };

  const removeExistingImage = async (imageId: string) => {
    try {
      await deleteProductImage(imageId);
      setExistingImages((prev) => prev.filter((i) => i.id !== imageId));
      toast.showSuccess("Đã xóa ảnh");
    } catch { toast.showError("Không thể xóa ảnh"); }
  };

  const uploadAndAttachImages = async (productId: string) => {
    if (pendingImages.length === 0) return;
    setUploadingImages(true);
    let idx = existingImages.length;
    for (const pending of pendingImages) {
      try {
        const res = await uploadProductImage(pending.file);
        if (res.success && res.url) {
          await addProductImage(productId, { url: res.url, alt: pending.file.name, sortOrder: idx++ });
        }
      } catch { toast.showError(`Lỗi upload: ${pending.file.name}`); }
    }
    pendingImages.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPendingImages([]);
    setUploadingImages(false);
  };

  // ---- Variant handlers ----
  const openVariantEdit = (v: ProductVariant & { id: string }) => {
    setEditingVariantId(v.id);
    setVariantForm({
      id: v.id,
      sku: v.sku,
      color: v.color || "",
      sizeMm: v.sizeMm,
      bridgeMm: v.bridgeMm,
      templeMm: v.templeMm,
      retailPrice: Number(v.retailPrice) || 0,
      salePrice: v.salePrice ? Number(v.salePrice) : undefined,
      isActive: v.isActive,
    });
  };

  const cancelVariantEdit = () => {
    setEditingVariantId(null);
    setVariantForm(blankVariant());
  };

  const handleSaveVariant = async () => {
    if (!editingProduct) return;
    if (!variantForm.sku.trim()) { toast.showError("SKU không được để trống"); return; }
    if (!variantForm.retailPrice || variantForm.retailPrice <= 0) { toast.showError("Giá bán phải > 0"); return; }
    setSavingVariant(true);
    try {
      if (editingVariantId) {
        // Update existing
        const updated = await updateVariant(editingVariantId, variantForm) as ProductVariant & { id: string };
        setVariants((prev) => prev.map((v) => (v.id === editingVariantId ? updated : v)));
        toast.showSuccess("Cập nhật variant thành công");
      } else {
        // Create new
        const created = await addVariant(editingProduct.id, variantForm) as ProductVariant & { id: string };
        setVariants((prev) => [...prev, created]);
        toast.showSuccess("Thêm variant thành công");
      }
      cancelVariantEdit();
    } catch (e: any) {
      toast.showError(e?.response?.data?.error || "Lỗi lưu variant");
    } finally {
      setSavingVariant(false);
    }
  };

  const handleDeleteVariant = async (variantId: string) => {
    setDeletingVariantId(variantId);
    try {
      await deleteVariant(variantId);
      setVariants((prev) => prev.filter((v) => v.id !== variantId));
      // Xóa stock entries của variant này
      setStockMap((prev) => { const n = { ...prev }; delete n[variantId]; return n; });
      toast.showSuccess("Đã xóa variant");
    } catch (e: any) {
      toast.showError(e?.response?.data?.error || "Không thể xóa variant");
    } finally {
      setDeletingVariantId(null);
    }
  };

  // ---- Inventory handlers ----
  const handleStockChange = (variantId: string, storeId: string, value: string) => {
    const num = parseInt(value, 10);
    setStockMap((prev) => ({
      ...prev,
      [variantId]: { ...(prev[variantId] || {}), [storeId]: isNaN(num) ? 0 : num },
    }));
  };

  // Lưu tồn kho cho tất cả cửa hàng của 1 variant
  const handleSaveAllStock = async (variantId: string) => {
    if (stores.length === 0) return;
    setSavingStock(true);
    try {
      await Promise.all(
        stores.map((store) =>
          setInventoryStock({ storeId: store.id, variantId, onHand: stockMap[variantId]?.[store.id] ?? 0 })
        )
      );
      toast.showSuccess("Đã cập nhật tồn kho");
    } catch {
      toast.showError("Lỗi cập nhật tồn kho");
    } finally {
      setSavingStock(false);
    }
  };

  // ---- Submit form ----
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        await uploadAndAttachImages(editingProduct.id);
        toast.showSuccess("Cập nhật sản phẩm thành công!");
      } else {
        const payload: ProductCreatePayload = {
          ...formData,
          categoryIds: formData.categoryIds.length > 0 ? formData.categoryIds : undefined,
        };
        const created = await createProduct(payload);
        const productId = (created as any)?.id || (created as any)?.data?.id;
        if (productId && pendingImages.length > 0) await uploadAndAttachImages(productId);
        toast.showSuccess("Tạo sản phẩm thành công!");
      }
      setShowModal(false);
      setEditingProduct(null);
      resetForm();
      loadProducts(currentPage);
    } catch (error: any) {
      toast.showError(error?.response?.data?.error || "Có lỗi xảy ra khi lưu sản phẩm");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.showSuccess("Xóa sản phẩm thành công!");
      setConfirmDelete(null);
      loadProducts(currentPage);
    } catch (error: any) {
      toast.showError(error?.response?.data?.error || "Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  const resetForm = () => {
    setFormData({ slug: "", name: "", description: "", brand: "", material: "", frameShape: "", seoTitle: "", seoDescription: "", categoryIds: [] });
    pendingImages.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPendingImages([]);
    setExistingImages([]);
    setVariants([]);
    setStockMap({});
    setVariantForm(blankVariant());
    setEditingVariantId(null);
    setActiveTab("info");
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    resetForm();
    setShowModal(true);
  };

  const openEditModal = async (product: Product) => {
    setLoadingModal(true);
    setShowModal(true);
    setActiveTab("info");
    // Fetch đầy đủ dữ liệu (images + variants) từ server
    let detail: Product = product;
    try {
      detail = await getProductDetail(product.id);
    } catch {
      toast.showError("Không thể tải chi tiết sản phẩm");
    } finally {
      setLoadingModal(false);
    }
    setEditingProduct(detail);
    setFormData({
      slug: detail.slug,
      name: detail.name,
      description: detail.description || "",
      brand: detail.brand || "",
      material: detail.material || "",
      frameShape: detail.frameShape || "",
      seoTitle: detail.seoTitle || "",
      seoDescription: detail.seoDescription || "",
      categoryIds: detail.categories?.map((c) => c.id) || [],
    });
    setExistingImages((detail.images || []) as ExistingImage[]);
    setVariants((detail.variants || []) as (ProductVariant & { id: string })[]);
    // Init stockMap từ dữ liệu thực tế (đã được backend trả về trong stockByStore field)
    const sMap: VariantStockMap = {};
    (detail.variants || []).forEach((v: any) => {
      sMap[v.id] = {};
      // Đọc stockByStore từ API, fallback về 0 nếu chưa có inventory
      const serverStock: Record<string, number> = v.stockByStore || {};
      stores.forEach((s) => {
        sMap[v.id][s.id] = serverStock[s.id] ?? 0;
      });
    });
    setStockMap(sMap);
    setPendingImages([]);
    setVariantForm(blankVariant());
    setEditingVariantId(null);
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }));
  };

  const generateSlug = (name: string) =>
    name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d").replace(/Đ/g, "D")
      .replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");

  const handleNameChange = (name: string) => {
    if (!editingProduct) setFormData({ ...formData, name, slug: generateSlug(name) });
    else setFormData({ ...formData, name });
  };

  const formatPrice = (v: number) => new Intl.NumberFormat("vi-VN").format(v);

  if (loading && products.length === 0) {
    return <div className="flex items-center justify-center h-96"><div className="text-lg text-gray-600">Đang tải...</div></div>;
  }

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: "info", label: "Thông tin", icon: null },
    { id: "images", label: `Hình ảnh (${existingImages.length + pendingImages.length})`, icon: <ImageIcon className="h-4 w-4" /> },
    { id: "variants", label: `Biến thể (${variants.length})`, icon: <Package className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Sản phẩm</h1>
          <p className="text-sm text-gray-600 mt-1">Tổng số: {totalElements} sản phẩm</p>
        </div>
        <button onClick={openCreateModal} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          <Plus className="h-5 w-5" /> Thêm sản phẩm
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-14">Ảnh</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thương hiệu</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Biến thể</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Chưa có sản phẩm nào</td></tr>
            ) : (
              products.map((product) => {
                const firstImage = product.images?.[0];
                const variantCount = (product as any).variantCount ?? product.variants?.length ?? 0;
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {firstImage ? (
                        <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-100">
                          <Image src={firstImage.url} alt={firstImage.alt || product.name} fill className="object-cover" unoptimized />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-400">{product.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{product.brand || "–"}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${variantCount > 0 ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-700"}`}>
                        {variantCount > 0 ? `${variantCount} biến thể` : "Chưa có biến thể"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                        {product.published ? "Đã xuất bản" : "Nháp"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                      <button onClick={() => openEditModal(product)} className="text-blue-600 hover:text-blue-800 inline-flex items-center"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => setConfirmDelete(product.id)} className="text-red-600 hover:text-red-800 inline-flex items-center"><Trash2 className="h-4 w-4" /></button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <p className="text-sm text-gray-700">Trang <span className="font-medium">{currentPage + 1}</span> / <span className="font-medium">{totalPages}</span></p>
            <nav className="inline-flex rounded-md shadow-sm -space-x-px">
              <button onClick={() => loadProducts(currentPage - 1)} disabled={currentPage === 0} className="px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50"><ChevronLeft className="h-5 w-5" /></button>
              <button onClick={() => loadProducts(currentPage + 1)} disabled={currentPage >= totalPages - 1} className="px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50"><ChevronRight className="h-5 w-5" /></button>
            </nav>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/40 flex items-start justify-center z-[60] p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full relative my-8 shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProduct ? `Chỉnh sửa: ${editingProduct.name}` : "Thêm sản phẩm mới"}
              </h2>
              <button onClick={() => { setShowModal(false); resetForm(); }} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  disabled={tab.id !== "info" && !editingProduct}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                    ${tab.id !== "info" && !editingProduct ? "text-gray-300 cursor-not-allowed border-transparent" : ""}
                    ${activeTab === tab.id && (tab.id === "info" || editingProduct) ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
              {!editingProduct && (
                <span className="ml-2 self-center text-xs text-amber-600 italic">Lưu sản phẩm trước để quản lý ảnh & biến thể</span>
              )}
            </div>

            <div className="px-6 py-5">
              {/* Loading overlay */}
              {loadingModal && (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
                  <p className="text-sm text-gray-500">Đang tải dữ liệu sản phẩm...</p>
                </div>
              )}

              {/* ======= TAB: Thông tin ======= */}
              {!loadingModal && activeTab === "info" && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {!editingProduct && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug <span className="text-red-500">*</span></label>
                        <input type="text" required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" placeholder="gong-kinh-titan" />
                      </div>
                    )}
                    <div className={!editingProduct ? "" : "col-span-2"}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm <span className="text-red-500">*</span></label>
                      <input type="text" required value={formData.name} onChange={(e) => handleNameChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" placeholder="Gọng kính Titan cao cấp" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" placeholder="Mô tả chi tiết" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Thương hiệu</label>
                      <input type="text" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" placeholder="Ray-Ban" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Chất liệu</label>
                      <input type="text" value={formData.material} onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" placeholder="Titanium" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hình dáng gọng</label>
                      <input type="text" value={formData.frameShape} onChange={(e) => setFormData({ ...formData, frameShape: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" placeholder="Oval" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((c) => (
                        <label key={c.id} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100">
                          <input type="checkbox" checked={formData.categoryIds.includes(c.id)} onChange={() => handleCategoryToggle(c.id)} className="rounded border-gray-300" />
                          <span className="text-sm text-gray-700">{c.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                      <input type="text" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
                      <input type="text" value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => { setShowModal(false); resetForm(); }}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Hủy</button>
                    <button type="submit" disabled={uploadingImages}
                      className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-60 flex items-center justify-center gap-2">
                      {uploadingImages && <Loader2 className="h-4 w-4 animate-spin" />}
                      {editingProduct ? "Cập nhật" : "Tạo sản phẩm"}
                    </button>
                  </div>
                </form>
              )}

              {/* ======= TAB: Hình ảnh ======= */}
              {!loadingModal && activeTab === "images" && editingProduct && (
                <div className="space-y-4">
                  {existingImages.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Ảnh hiện có ({existingImages.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {existingImages.map((img) => (
                          <div key={img.id} className="relative group w-24 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                            <Image src={img.url} alt={img.alt || ""} fill className="object-cover" unoptimized />
                            <button type="button" onClick={() => removeExistingImage(img.id)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {pendingImages.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Ảnh chờ upload ({pendingImages.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {pendingImages.map((img) => (
                          <div key={img.tempId} className="relative group w-24 h-24 rounded-lg overflow-hidden border-2 border-blue-300 bg-blue-50">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img.previewUrl} alt={img.file.name} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removePendingImage(img.tempId)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setIsDragOver(false); addFiles(e.dataTransfer.files); }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragOver ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"}`}
                  >
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Kéo thả hoặc <span className="text-blue-600 font-medium">chọn file</span></p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP</p>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} className="hidden" />

                  {pendingImages.length > 0 && (
                    <button
                      type="button"
                      disabled={uploadingImages}
                      onClick={async () => { await uploadAndAttachImages(editingProduct.id); loadProducts(currentPage); }}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {uploadingImages ? <><Loader2 className="h-4 w-4 animate-spin" /> Đang upload...</> : <><Upload className="h-4 w-4" /> Upload {pendingImages.length} ảnh</>}
                    </button>
                  )}
                </div>
              )}

              {/* ======= TAB: Biến thể & Tồn kho ======= */}
              {!loadingModal && activeTab === "variants" && editingProduct && (
                <div className="space-y-5">
                  {/* Form thêm/sửa variant */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-800 mb-3">
                      {editingVariantId ? "✏️ Chỉnh sửa biến thể" : "✚ Thêm biến thể mới"}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">SKU <span className="text-red-500">*</span></label>
                        <input type="text" value={variantForm.sku} onChange={(e) => setVariantForm({ ...variantForm, sku: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500" placeholder="SP001-DEN-M" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Màu sắc</label>
                        <input type="text" value={variantForm.color || ""} onChange={(e) => setVariantForm({ ...variantForm, color: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500" placeholder="Đen / Vàng gold..." />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Giá bán (₫) <span className="text-red-500">*</span></label>
                        <input type="number" min={0} value={variantForm.retailPrice || ""} onChange={(e) => setVariantForm({ ...variantForm, retailPrice: Number(e.target.value) })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500" placeholder="1500000" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Giá sale (₫)</label>
                        <input type="number" min={0} value={variantForm.salePrice || ""} onChange={(e) => setVariantForm({ ...variantForm, salePrice: e.target.value ? Number(e.target.value) : undefined })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500" placeholder="(để trống nếu không sale)" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Kích thước gọng (mm)</label>
                        <input type="number" value={variantForm.sizeMm || ""} onChange={(e) => setVariantForm({ ...variantForm, sizeMm: e.target.value ? Number(e.target.value) : undefined })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500" placeholder="52" />
                      </div>
                      <div className="flex items-end gap-2">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-600 mb-1">Trạng thái</label>
                          <select value={variantForm.isActive ? "true" : "false"} onChange={(e) => setVariantForm({ ...variantForm, isActive: e.target.value === "true" })}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500">
                            <option value="true">Đang bán</option>
                            <option value="false">Ngừng bán</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {editingVariantId && (
                        <button type="button" onClick={cancelVariantEdit} className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-100">Hủy</button>
                      )}
                      <button type="button" onClick={handleSaveVariant} disabled={savingVariant}
                        className="flex-1 px-3 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-60 flex items-center justify-center gap-2">
                        {savingVariant && <Loader2 className="h-3 w-3 animate-spin" />}
                        {editingVariantId ? "Lưu thay đổi" : "Thêm biến thể"}
                      </button>
                    </div>
                  </div>

                  {/* Danh sách variants + tồn kho */}
                  {variants.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">Chưa có biến thể nào. Thêm biến thể để quản lý tồn kho.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {variants.map((v) => (
                        <div key={v.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          {/* Variant header */}
                          <div className="flex items-center justify-between px-4 py-3 bg-white">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{v.sku}</span>
                              {v.color && <span className="text-sm text-gray-700">• {v.color}</span>}
                              <span className="text-sm font-semibold text-gray-900">
                                {formatPrice(Number(v.retailPrice))}₫
                                {v.salePrice && <span className="ml-1 text-red-600 line-through text-xs">{formatPrice(Number(v.salePrice))}₫</span>}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${v.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                                {v.isActive ? "Đang bán" : "Ngừng bán"}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <button type="button" onClick={() => openVariantEdit(v)} className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 border border-blue-200 rounded">Sửa</button>
                              {stores.length > 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleSaveAllStock(v.id)}
                                  disabled={savingStock}
                                  className="text-green-700 hover:text-green-900 text-xs px-2 py-1 border border-green-200 rounded flex items-center gap-1 disabled:opacity-50"
                                >
                                  {savingStock ? <Loader2 className="h-3 w-3 animate-spin" /> : <Warehouse className="h-3 w-3" />}
                                  Lưu tồn kho
                                </button>
                              )}
                              <button type="button" onClick={() => handleDeleteVariant(v.id)} disabled={deletingVariantId === v.id}
                                className="text-red-600 hover:text-red-800 text-xs px-2 py-1 border border-red-200 rounded disabled:opacity-50">
                                {deletingVariantId === v.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Xóa"}
                              </button>
                            </div>
                          </div>

                          {/* Inventory per store */}
                          {stores.length > 0 && (
                            <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
                              <div className="flex items-center gap-1 mb-2">
                                <Warehouse className="h-3.5 w-3.5 text-gray-500" />
                                <span className="text-xs font-medium text-gray-600">Tồn kho theo cửa hàng</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {stores.map((store) => (
                                  <div key={store.id} className="flex items-center gap-2">
                                    <span className="text-xs text-gray-600 flex-1 truncate" title={store.name}>{store.name}</span>
                                    <input
                                      type="number"
                                      min={0}
                                      value={stockMap[v.id]?.[store.id] ?? 0}
                                      onChange={(e) => handleStockChange(v.id, store.id, e.target.value)}
                                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded text-center focus:outline-none focus:ring-1 focus:ring-gray-500"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {stores.length === 0 && (
                            <div className="bg-amber-50 px-4 py-2 border-t border-amber-100 text-xs text-amber-700">
                              ⚠️ Chưa có cửa hàng nào. Tạo cửa hàng trước để nhập tồn kho.
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Xác nhận xóa sản phẩm</h3>
            <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Hủy</button>
              <button onClick={() => handleDelete(confirmDelete)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
