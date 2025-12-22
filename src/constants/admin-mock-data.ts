// Admin Mock Data
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'staff' | 'content';
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  isActive: boolean;
  appointmentSlots: AppointmentSlot[];
}

export interface AppointmentSlot {
  id: string;
  date: string;
  time: string;
  isAvailable: boolean;
  staffId: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productName: string;
  variant: string;
  quantity: number;
  price: number;
  total: number;
}

export interface LensPackage {
  id: string;
  name: string;
  brand: string;
  material: string;
  index: number;
  coating: string[];
  price: number;
  isActive: boolean;
  description: string;
  specifications: {
    sphRange: { min: number; max: number };
    cylRange: { min: number; max: number };
    axisRange: { min: number; max: number };
  };
}

export interface Promotion {
  id: string;
  name: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  applicableProducts: string[];
}

export interface ContentPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock Data
export const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Nguyễn Văn Admin',
    email: 'admin@quangvu.com',
    role: 'super_admin',
    isActive: true,
    lastLogin: '2024-01-15 14:30',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Trần Thị Staff',
    email: 'staff@quangvu.com',
    role: 'staff',
    isActive: true,
    lastLogin: '2024-01-15 10:15',
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    name: 'Lê Văn Content',
    email: 'content@quangvu.com',
    role: 'content',
    isActive: true,
    lastLogin: '2024-01-14 16:45',
    createdAt: '2024-01-03',
  },
];

export const mockStores: Store[] = [
  {
    id: '1',
    name: 'Cửa hàng Quận 1',
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    phone: '028 1234 5678',
    email: 'q1@quangvu.com',
    hours: '8:00 - 22:00',
    isActive: true,
    appointmentSlots: [
      { id: '1', date: '2024-01-16', time: '09:00-10:00', isAvailable: true, staffId: '1' },
      { id: '2', date: '2024-01-16', time: '10:00-11:00', isAvailable: false, staffId: '1' },
      { id: '3', date: '2024-01-16', time: '14:00-15:00', isAvailable: true, staffId: '1' },
    ],
  },
  {
    id: '2',
    name: 'Cửa hàng Quận 3',
    address: '456 Võ Văn Tần, Quận 3, TP.HCM',
    phone: '028 2345 6789',
    email: 'q3@quangvu.com',
    hours: '8:00 - 22:00',
    isActive: true,
    appointmentSlots: [
      { id: '4', date: '2024-01-16', time: '09:00-10:00', isAvailable: true, staffId: '2' },
      { id: '5', date: '2024-01-16', time: '11:00-12:00', isAvailable: true, staffId: '2' },
    ],
  },
  {
    id: '3',
    name: 'Cửa hàng Quận 7',
    address: '789 Nguyễn Thị Thập, Quận 7, TP.HCM',
    phone: '028 3456 7890',
    email: 'q7@quangvu.com',
    hours: '8:00 - 22:00',
    isActive: false,
    appointmentSlots: [],
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    customer: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
    },
    items: [
      {
        id: '1',
        productName: 'Kính cận Ray-Ban RB3025',
        variant: 'Đen, Size M',
        quantity: 1,
        price: 2500000,
        total: 2500000,
      },
    ],
    total: 2500000,
    status: 'processing',
    paymentMethod: 'COD',
    shippingAddress: '123 Đường ABC, Quận 1, TP.HCM',
    createdAt: '2024-01-15 10:30',
    updatedAt: '2024-01-15 14:20',
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    customer: {
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0902345678',
    },
    items: [
      {
        id: '2',
        productName: 'Kính râm Gucci GG0061S',
        variant: 'Nâu, Size L',
        quantity: 1,
        price: 3200000,
        total: 3200000,
      },
    ],
    total: 3200000,
    status: 'delivered',
    paymentMethod: 'Credit Card',
    shippingAddress: '456 Đường DEF, Quận 3, TP.HCM',
    createdAt: '2024-01-14 15:45',
    updatedAt: '2024-01-15 09:30',
  },
];

export const mockLensPackages: LensPackage[] = [
  {
    id: '1',
    name: 'Essilor Varilux Comfort',
    brand: 'Essilor',
    material: 'Plastic',
    index: 1.5,
    coating: ['Chống tia UV', 'Chống trầy', 'Chống phản quang'],
    price: 800000,
    isActive: true,
    description: 'Tròng kính đa tiêu cự cao cấp',
    specifications: {
      sphRange: { min: -8, max: +6 },
      cylRange: { min: 0, max: -4 },
      axisRange: { min: 0, max: 180 },
    },
  },
  {
    id: '2',
    name: 'Zeiss Individual 2',
    brand: 'Zeiss',
    material: 'Plastic',
    index: 1.6,
    coating: ['Chống tia UV', 'Chống trầy', 'Chống phản quang', 'Chống bám nước'],
    price: 1200000,
    isActive: true,
    description: 'Tròng kính cá nhân hóa cao cấp',
    specifications: {
      sphRange: { min: -10, max: +8 },
      cylRange: { min: 0, max: -6 },
      axisRange: { min: 0, max: 180 },
    },
  },
];

export const mockPromotions: Promotion[] = [
  {
    id: '1',
    name: 'Giảm giá 20% cho đơn hàng đầu tiên',
    code: 'WELCOME20',
    type: 'percentage',
    value: 20,
    minOrderAmount: 1000000,
    maxDiscountAmount: 500000,
    usageLimit: 1000,
    usedCount: 234,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
    applicableProducts: ['all'],
  },
  {
    id: '2',
    name: 'Miễn phí ship cho đơn từ 2 triệu',
    code: 'FREESHIP2M',
    type: 'free_shipping',
    value: 0,
    minOrderAmount: 2000000,
    usageLimit: undefined,
    usedCount: 89,
    startDate: '2024-01-01',
    endDate: '2024-06-30',
    isActive: true,
    applicableProducts: ['all'],
  },
];

export const mockContentPages: ContentPage[] = [
  {
    id: '1',
    title: 'Chính sách bảo hành',
    slug: 'chinh-sach-bao-hanh',
    content: 'Nội dung chính sách bảo hành...',
    metaTitle: 'Chính sách bảo hành - QuangVu Store',
    metaDescription: 'Thông tin chi tiết về chính sách bảo hành sản phẩm tại QuangVu Store',
    isPublished: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Điều khoản sử dụng',
    slug: 'dieu-khoan-su-dung',
    content: 'Nội dung điều khoản sử dụng...',
    metaTitle: 'Điều khoản sử dụng - QuangVu Store',
    metaDescription: 'Điều khoản và điều kiện sử dụng website QuangVu Store',
    isPublished: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-10',
  },
  {
    id: '3',
    title: 'Hướng dẫn chọn kính',
    slug: 'huong-dan-chon-kinh',
    content: 'Nội dung hướng dẫn chọn kính...',
    metaTitle: 'Hướng dẫn chọn kính phù hợp - QuangVu Store',
    metaDescription: 'Hướng dẫn chi tiết cách chọn kính mắt phù hợp với khuôn mặt',
    isPublished: false,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-12',
  },
];
