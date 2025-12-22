"use client";

import { useState, useEffect } from "react";
import {
  getPrescriptions,
  createPrescription,
  Prescription,
  CreatePrescriptionDto,
} from "@/services/staff/prescriptions";
import { FileText, Calendar, User, Phone, Plus, Eye } from "lucide-react";

export default function StaffPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [newPrescription, setNewPrescription] = useState<CreatePrescriptionDto>({
    userId: "",
    sphereRight: 0,
    cylinderRight: 0,
    axisRight: 0,
    sphereLeft: 0,
    cylinderLeft: 0,
    axisLeft: 0,
    pd: 62.5,
    note: "",
  });

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async () => {
    try {
      setLoading(true);
      // TODO: Filter by current user's store
      const data = await getPrescriptions({});
      setPrescriptions(data);
    } catch (error) {
      console.error("Error loading prescriptions:", error);
      alert("Không thể tải danh sách toa kính");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePrescription = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createPrescription(newPrescription);
      alert("Tạo toa kính thành công!");
      setShowCreateModal(false);
      setNewPrescription({
        userId: "",
        sphereRight: 0,
        cylinderRight: 0,
        axisRight: 0,
        sphereLeft: 0,
        cylinderLeft: 0,
        axisLeft: 0,
        pd: 62.5,
        note: "",
      });
      loadPrescriptions();
    } catch (error: any) {
      console.error("Error creating prescription:", error);
      alert(error?.response?.data?.error || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Toa kính</h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý toa kính và kết quả đo mắt
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Tạo toa mới
        </button>
      </div>

      {/* Prescriptions List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Danh sách toa kính ({prescriptions.length})
          </h2>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {prescriptions.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                Chưa có toa kính nào
              </div>
            ) : (
              prescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedPrescription(prescription);
                    setShowDetailModal(true);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Eye className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {prescription.userName}
                          </h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Phone className="h-4 w-4 mr-1" />
                              {prescription.userPhone || "N/A"}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(prescription.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          </div>
                          <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-4">
                            <div>
                              <strong>Mắt phải:</strong> SPH{" "}
                              {prescription.sphereRight > 0 ? "+" : ""}
                              {prescription.sphereRight} | CYL{" "}
                              {prescription.cylinderRight} | AXIS{" "}
                              {prescription.axisRight}°
                            </div>
                            <div>
                              <strong>Mắt trái:</strong> SPH{" "}
                              {prescription.sphereLeft > 0 ? "+" : ""}
                              {prescription.sphereLeft} | CYL{" "}
                              {prescription.cylinderLeft} | AXIS{" "}
                              {prescription.axisLeft}°
                            </div>
                          </div>
                          {prescription.note && (
                            <p className="mt-1 text-sm text-gray-600">
                              <strong>Ghi chú:</strong> {prescription.note}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowCreateModal(false)}
            ></div>

            <div className="relative bg-white rounded-lg max-w-2xl w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tạo toa kính mới
              </h3>

              <form onSubmit={handleCreatePrescription} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID Khách hàng
                  </label>
                  <input
                    type="text"
                    value={newPrescription.userId}
                    onChange={(e) =>
                      setNewPrescription({
                        ...newPrescription,
                        userId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    required
                    placeholder="UUID của khách hàng"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Right Eye */}
                  <div className="col-span-2">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Mắt phải (OD)
                    </h4>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SPH (Cầu)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={newPrescription.sphereRight}
                      onChange={(e) =>
                        setNewPrescription({
                          ...newPrescription,
                          sphereRight: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CYL (Trụ)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={newPrescription.cylinderRight}
                      onChange={(e) =>
                        setNewPrescription({
                          ...newPrescription,
                          cylinderRight: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      AXIS (Trục)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      value={newPrescription.axisRight}
                      onChange={(e) =>
                        setNewPrescription({
                          ...newPrescription,
                          axisRight: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {/* Left Eye */}
                  <div className="col-span-2 mt-4">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Mắt trái (OS)
                    </h4>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SPH (Cầu)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={newPrescription.sphereLeft}
                      onChange={(e) =>
                        setNewPrescription({
                          ...newPrescription,
                          sphereLeft: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CYL (Trụ)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={newPrescription.cylinderLeft}
                      onChange={(e) =>
                        setNewPrescription({
                          ...newPrescription,
                          cylinderLeft: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      AXIS (Trục)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      value={newPrescription.axisLeft}
                      onChange={(e) =>
                        setNewPrescription({
                          ...newPrescription,
                          axisLeft: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {/* PD */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PD (Khoảng cách đồng tử)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={newPrescription.pd}
                      onChange={(e) =>
                        setNewPrescription({
                          ...newPrescription,
                          pd: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>

                  {/* Note */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ghi chú
                    </label>
                    <textarea
                      value={newPrescription.note}
                      onChange={(e) =>
                        setNewPrescription({
                          ...newPrescription,
                          note: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Tạo toa
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedPrescription && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowDetailModal(false)}
            ></div>

            <div className="relative bg-white rounded-lg max-w-2xl w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Chi tiết toa kính
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Khách hàng
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedPrescription.userName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Số điện thoại
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedPrescription.userPhone || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ngày tạo
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(
                        selectedPrescription.createdAt
                      ).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      PD (Khoảng cách đồng tử)
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedPrescription.pd} mm
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Mắt phải (OD)
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        SPH (Cầu)
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedPrescription.sphereRight > 0 ? "+" : ""}
                        {selectedPrescription.sphereRight}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CYL (Trụ)
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedPrescription.cylinderRight}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        AXIS (Trục)
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedPrescription.axisRight}°
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Mắt trái (OS)
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        SPH (Cầu)
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedPrescription.sphereLeft > 0 ? "+" : ""}
                        {selectedPrescription.sphereLeft}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CYL (Trụ)
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedPrescription.cylinderLeft}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        AXIS (Trục)
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedPrescription.axisLeft}°
                      </p>
                    </div>
                  </div>
                </div>

                {selectedPrescription.note && (
                  <div className="border-t pt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Ghi chú
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedPrescription.note}
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

