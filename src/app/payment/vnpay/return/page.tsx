"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  parseVNPayReturn,
  isVNPaySuccess,
  getVNPayResponseMessage,
  getPaymentTransaction,
} from "@/services/payment";
import { useToast } from "@/contexts/ToastContext";

function VNPayReturnContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState<{
    orderId: string;
    amount: number;
    transactionNo?: string;
    bankCode?: string;
    payDate?: string;
    responseCode?: string;
    message: string;
    status?: string;
  } | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const processPaymentReturn = async () => {
      try {
        // Parse VNPAY return parameters
        const vnpayData = parseVNPayReturn(searchParams);

        const success = isVNPaySuccess(vnpayData.vnp_ResponseCode);
        setIsSuccess(success);

        // Get transaction details from backend
        if (vnpayData.vnp_TxnRef) {
          try {
            const transaction = await getPaymentTransaction(
              vnpayData.vnp_TxnRef
            );
            setPaymentInfo({
              orderId: vnpayData.vnp_TxnRef,
              amount: vnpayData.vnp_Amount
                ? parseInt(vnpayData.vnp_Amount) / 100
                : 0,
              transactionNo: vnpayData.vnp_TransactionNo ?? undefined,
              bankCode: vnpayData.vnp_BankCode ?? undefined,
              payDate: vnpayData.vnp_PayDate ?? undefined,
              responseCode: vnpayData.vnp_ResponseCode ?? undefined,
              message: getVNPayResponseMessage(vnpayData.vnp_ResponseCode),
              status: transaction.status,
            });
          } catch (error) {
            console.error("Error fetching transaction:", error);
            setPaymentInfo({
              orderId: vnpayData.vnp_TxnRef,
              amount: vnpayData.vnp_Amount
                ? parseInt(vnpayData.vnp_Amount) / 100
                : 0,
              transactionNo: vnpayData.vnp_TransactionNo ?? undefined,
              bankCode: vnpayData.vnp_BankCode ?? undefined,
              payDate: vnpayData.vnp_PayDate ?? undefined,
              responseCode: vnpayData.vnp_ResponseCode ?? undefined,
              message: getVNPayResponseMessage(vnpayData.vnp_ResponseCode),
            });
          }
        }

        if (success) {
          showSuccess("Thanh toán thành công!");
        } else {
          showError(
            "Thanh toán thất bại: " +
              getVNPayResponseMessage(vnpayData.vnp_ResponseCode)
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
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
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

              {paymentInfo.transactionNo && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Mã giao dịch VNPAY:</span>
                  <span className="font-medium">
                    {paymentInfo.transactionNo}
                  </span>
                </div>
              )}

              {paymentInfo.bankCode && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Ngân hàng:</span>
                  <span className="font-medium">{paymentInfo.bankCode}</span>
                </div>
              )}

              {paymentInfo.payDate && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-medium">
                    {new Date(
                      paymentInfo.payDate.substring(0, 4) +
                        "-" +
                        paymentInfo.payDate.substring(4, 6) +
                        "-" +
                        paymentInfo.payDate.substring(6, 8) +
                        "T" +
                        paymentInfo.payDate.substring(8, 10) +
                        ":" +
                        paymentInfo.payDate.substring(10, 12) +
                        ":" +
                        paymentInfo.payDate.substring(12, 14)
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
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
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
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
              <Link href="/contact" className="text-blue-600 hover:underline">
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

export default function VNPayReturnPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">
              Đang xử lý kết quả thanh toán...
            </p>
          </div>
        </div>
      }
    >
      <VNPayReturnContent />
    </Suspense>
  );
}
