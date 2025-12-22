"use client";

export type PaymentMethod = "VNPAY" | "MOMO" | "COD";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

export default function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) {
  const paymentMethods = [
    {
      id: "VNPAY" as PaymentMethod,
      name: "Thanh toán qua VNPAY",
      description: "Thanh toán qua cổng VNPAY (ATM, Visa, MasterCard)",
      icon: "/images/payment/vnpay.png",
      available: true,
    },
    {
      id: "COD" as PaymentMethod,
      name: "Thanh toán khi nhận hàng",
      description: "Thanh toán tiền mặt khi nhận hàng (COD)",
      icon: "/images/payment/cod.png",
      available: true,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Phương thức thanh toán
      </h3>

      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`
              relative flex items-center p-4 border-2 rounded-lg cursor-pointer
              transition-all duration-200
              ${
                selectedMethod === method.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }
              ${!method.available && "opacity-50 cursor-not-allowed"}
            `}
          >
            <input
              type="radio"
              name="payment-method"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={(e) => onMethodChange(e.target.value as PaymentMethod)}
              disabled={!method.available}
              className="sr-only"
            />

            <div className="flex items-center flex-1">
              {/* Payment Icon */}
              <div className="flex-shrink-0 w-16 h-16 relative mr-4">
                <div className="w-full h-full bg-white border border-gray-200 rounded-lg flex items-center justify-center p-2">
                  {method.id === "VNPAY" && (
                    <div className="text-blue-600 font-bold text-lg">VNPAY</div>
                  )}
                  {method.id === "MOMO" && (
                    <div className="text-pink-600 font-bold text-lg">MoMo</div>
                  )}
                  {method.id === "COD" && (
                    <div className="text-green-600 font-bold text-lg">💵</div>
                  )}
                </div>
              </div>

              {/* Payment Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">
                    {method.name}
                  </span>
                  {!method.available && (
                    <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded">
                      Không khả dụng
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {method.description}
                </p>
              </div>

              {/* Radio Circle */}
              <div
                className={`
                flex-shrink-0 w-5 h-5 rounded-full border-2 ml-4
                flex items-center justify-center
                ${
                  selectedMethod === method.id
                    ? "border-blue-600"
                    : "border-gray-300"
                }
              `}
              >
                {selectedMethod === method.id && (
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>

      {/* Payment Notes */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-sm text-blue-800">
            {selectedMethod === "VNPAY" && (
              <p>
                Bạn sẽ được chuyển đến cổng thanh toán VNPAY để hoàn tất giao
                dịch. Hỗ trợ thanh toán qua thẻ ATM, Visa, MasterCard và QR
                Code.
              </p>
            )}
            {selectedMethod === "COD" && (
              <p>
                Vui lòng chuẩn bị đủ tiền mặt khi nhận hàng. Shipper sẽ thu tiền
                và giao hàng cho bạn.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
