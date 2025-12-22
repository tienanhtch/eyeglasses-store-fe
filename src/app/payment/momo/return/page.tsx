"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  parseMoMoReturn,
  isMoMoSuccess,
  getMoMoResultMessage,
  getPaymentTransaction,
} from "@/services/payment";
import { useToast } from "@/contexts/ToastContext";

export default function MoMoReturnPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState<{
    orderId: string;
    requestId?: string;
    amount: number;
    transId?: string;
    resultCode?: string;
    message: string;
    payType?: string;
    responseTime?: string;
    status?: string;
  } | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const processPaymentReturn = async () => {
      try {
        // Parse MoMo return parameters
        const momoData = parseMoMoReturn(searchParams);

        const success = isMoMoSuccess(momoData.resultCode);
        setIsSuccess(success);

        // Get transaction details from backend
        if (momoData.orderId) {
          try {
            const transaction = await getPaymentTransaction(momoData.orderId);
            setPaymentInfo({
              orderId: momoData.orderId,
              requestId: momoData.requestId ?? undefined,
              amount: momoData.amount ? parseInt(momoData.amount) : 0,
              transId: momoData.transId ?? undefined,
              resultCode: momoData.resultCode ?? undefined,
              message: getMoMoResultMessage(momoData.resultCode),
              payType: momoData.payType ?? undefined,
              responseTime: momoData.responseTime ?? undefined,
              status: transaction.status,
            });
          } catch (error) {
            console.error("Error fetching transaction:", error);
            setPaymentInfo({
              orderId: momoData.orderId,
              requestId: momoData.requestId ?? undefined,
              amount: momoData.amount ? parseInt(momoData.amount) : 0,
              transId: momoData.transId ?? undefined,
              resultCode: momoData.resultCode ?? undefined,
              message: getMoMoResultMessage(momoData.resultCode),
              payType: momoData.payType ?? undefined,
              responseTime: momoData.responseTime ?? undefined,
            });
          }
        }

        if (success) {
          showSuccess("Thanh toán thành công!");
        } else {
          showError(
            "Thanh toán thất bại: " + getMoMoResultMessage(momoData.resultCode)
          );
        }
      } catch (error) {
        console.error("Error processing payment return:", error);
        showError("Có lỗi xảy ra khi xử lý kết quả thanh toán");
      } finally {
        setLoading(false);
      }
    };

    processPaymentReturn();
  }, [searchParams, showSuccess, showError]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang xử lý kết quả thanh toán...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success/Failure Icon */}
        <div className="text-center mb-8">
          {isSuccess ? (
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}

          <h1
            className={`text-3xl font-bold mt-6 ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại"}
          </h1>

          {paymentInfo && (
            <p className="text-gray-600 mt-2">{paymentInfo.message}</p>
          )}
        </div>

        {/* Payment Details */}
        {paymentInfo && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Chi tiết giao dịch</h2>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <span className="font-medium">{paymentInfo.orderId}</span>
              </div>

              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Số tiền:</span>
                <span className="font-medium text-lg">
                  {paymentInfo.amount?.toLocaleString("vi-VN")} ₫
                </span>
              </div>

              {paymentInfo.transId && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Mã giao dịch MoMo:</span>
                  <span className="font-medium">{paymentInfo.transId}</span>
                </div>
              )}

              {paymentInfo.requestId && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Mã yêu cầu:</span>
                  <span className="font-medium text-sm break-all">
                    {paymentInfo.requestId}
                  </span>
                </div>
              )}

              {paymentInfo.payType && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Phương thức:</span>
                  <span className="font-medium">{paymentInfo.payType}</span>
                </div>
              )}

              {paymentInfo.responseTime && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-medium">
                    {new Date(
                      parseInt(paymentInfo.responseTime)
                    ).toLocaleString("vi-VN")}
                  </span>
                </div>
              )}

              <div className="flex justify-between py-2">
                <span className="text-gray-600">Trạng thái:</span>
                <span
                  className={`font-medium ${
                    isSuccess ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {paymentInfo.status || (isSuccess ? "SUCCESS" : "FAILED")}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isSuccess ? (
            <>
              <Link
                href={`/profile?tab=orders`}
                className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors text-center"
              >
                Xem đơn hàng
              </Link>
              <Link
                href="/products/kinh-can"
                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-center"
              >
                Tiếp tục mua sắm
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => router.back()}
                className="px-8 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                Thử lại
              </button>
              <Link
                href="/"
                className="px-8 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors text-center"
              >
                Về trang chủ
              </Link>
            </>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center text-sm text-gray-600">
          {isSuccess ? (
            <p>
              Đơn hàng của bạn đang được xử lý. Chúng tôi sẽ gửi email xác nhận
              trong giây lát.
            </p>
          ) : (
            <p>
              Nếu bạn gặp vấn đề, vui lòng liên hệ{" "}
              <Link href="/contact" className="text-pink-600 hover:underline">
                bộ phận hỗ trợ
              </Link>{" "}
              của chúng tôi.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
