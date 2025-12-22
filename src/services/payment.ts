import { api } from '@/utils/fetch-api';

export interface CreatePaymentRequest {
  orderId: string;
  paymentMethod: 'VNPAY' | 'MOMO' | 'COD';
}

export interface CreatePaymentResponse {
  success: boolean;
  message: string;
  paymentUrl?: string;
  transactionId?: string;
}

export interface PaymentTransactionResponse {
  id: string;
  orderId: string;
  paymentMethod: string;
  transactionId: string;
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';
  paymentUrl?: string;
  responseData?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create a new payment and get payment URL
 */
export async function createPayment(
  request: CreatePaymentRequest
): Promise<CreatePaymentResponse> {
  const response = await api.post<CreatePaymentResponse>('/payment/create', request);
  return response;
}

/**
 * Get payment transaction by order ID
 */
export async function getPaymentTransaction(
  orderId: string
): Promise<PaymentTransactionResponse> {
  const response = await api.get<PaymentTransactionResponse>(
    `/payment/transaction/${orderId}`
  );
  return response;
}

/**
 * Handle VNPAY return parameters
 */
export function parseVNPayReturn(searchParams: URLSearchParams) {
  return {
    vnp_TxnRef: searchParams.get('vnp_TxnRef'),
    vnp_Amount: searchParams.get('vnp_Amount'),
    vnp_OrderInfo: searchParams.get('vnp_OrderInfo'),
    vnp_ResponseCode: searchParams.get('vnp_ResponseCode'),
    vnp_TransactionNo: searchParams.get('vnp_TransactionNo'),
    vnp_BankCode: searchParams.get('vnp_BankCode'),
    vnp_PayDate: searchParams.get('vnp_PayDate'),
    vnp_SecureHash: searchParams.get('vnp_SecureHash'),
  };
}

/**
 * Handle MoMo return parameters
 */
export function parseMoMoReturn(searchParams: URLSearchParams) {
  return {
    orderId: searchParams.get('orderId'),
    requestId: searchParams.get('requestId'),
    amount: searchParams.get('amount'),
    orderInfo: searchParams.get('orderInfo'),
    orderType: searchParams.get('orderType'),
    transId: searchParams.get('transId'),
    resultCode: searchParams.get('resultCode'),
    message: searchParams.get('message'),
    payType: searchParams.get('payType'),
    responseTime: searchParams.get('responseTime'),
    extraData: searchParams.get('extraData'),
    signature: searchParams.get('signature'),
  };
}

/**
 * Check if VNPAY payment is successful
 */
export function isVNPaySuccess(responseCode: string | null): boolean {
  return responseCode === '00';
}

/**
 * Check if MoMo payment is successful
 */
export function isMoMoSuccess(resultCode: string | null): boolean {
  return resultCode === '0';
}

/**
 * Get VNPAY response code message (Vietnamese)
 */
export function getVNPayResponseMessage(responseCode: string | null): string {
  const messages: Record<string, string> = {
    '00': 'Giao dịch thành công',
    '07': 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).',
    '09': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.',
    '10': 'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
    '11': 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.',
    '12': 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.',
    '13': 'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.',
    '24': 'Giao dịch không thành công do: Khách hàng hủy giao dịch',
    '51': 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.',
    '65': 'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá giới hạn giao dịch trong ngày.',
    '75': 'Ngân hàng thanh toán đang bảo trì.',
    '79': 'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch',
    '99': 'Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)',
  };
  
  return messages[responseCode || ''] || 'Lỗi không xác định';
}

/**
 * Get MoMo result code message (Vietnamese)
 */
export function getMoMoResultMessage(resultCode: string | null): string {
  const messages: Record<string, string> = {
    '0': 'Giao dịch thành công',
    '9000': 'Giao dịch được khởi tạo thành công',
    '8000': 'Giao dịch đang chờ thanh toán',
    '1000': 'Giao dịch đã được xác nhận thành công',
    '1001': 'Giao dịch thanh toán thất bại do tài khoản người dùng không đủ tiền',
    '1002': 'Giao dịch bị từ chối bởi nhà phát hành tài khoản người dùng',
    '1003': 'Giao dịch bị hủy',
    '1004': 'Giao dịch thất bại do số tiền thanh toán vượt quá hạn mức thanh toán của người dùng',
    '1005': 'Giao dịch thất bại do url hoặc QR code đã hết hạn',
    '1006': 'Giao dịch thất bại do người dùng từ chối xác nhận thanh toán',
    '1007': 'Giao dịch bị từ chối vì người dùng đã vượt quá số lần nhập sai mã xác thực',
    '2001': 'Giao dịch thất bại do sai định dạng dữ liệu',
    '2007': 'Giao dịch thất bại do không tìm thấy thông tin yêu cầu',
    '3001': 'Liên kết tài khoản/thẻ thất bại',
    '3002': 'Hủy liên kết tài khoản/thẻ thất bại',
    '3003': 'Tài khoản/thẻ đã được liên kết',
    '3004': 'Tài khoản/thẻ không được hỗ trợ',
    '4001': 'Giao dịch thất bại do tài khoản không tồn tại',
    '4010': 'Merchant không có quyền sử dụng',
    '4011': 'Yêu cầu bị từ chối vì không được phép truy cập',
    '4015': 'Giao dịch thất bại do tài khoản không tồn tại',
    '4100': 'Giao dịch thất bại do sai hoặc thiếu thông tin người dùng',
    '9999': 'Lỗi hệ thống',
  };
  
  return messages[resultCode || ''] || 'Lỗi không xác định';
}
