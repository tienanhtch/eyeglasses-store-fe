import { Product, Category } from '@/types';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Kính cận',
    slug: 'kinh-can',
    description: 'Kính cận thời trang và chất lượng cao'
  },
  {
    id: '2',
    name: 'Kính râm',
    slug: 'kinh-ram',
    description: 'Kính râm bảo vệ mắt khỏi tia UV'
  },
  {
    id: '3',
    name: 'Phụ kiện',
    slug: 'phu-kien',
    description: 'Phụ kiện kính mắt và chăm sóc'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'THE RULER 07',
    price: 2550000,
    originalPrice: 2550000,
    images: [
      '/images/placeholder.svg',
      '/images/placeholder.svg',
      '/images/placeholder.svg'
    ],
    colors: [
      {
        id: '1',
        name: 'Black',
        hex: '#000000',
        image: '/images/placeholder.svg',
        isAvailable: true
      },
      {
        id: '2',
        name: 'Grey',
        hex: '#808080',
        image: '/images/placeholder.svg',
        isAvailable: true
      },
      {
        id: '3',
        name: 'Beige',
        hex: '#F5F5DC',
        image: '/images/placeholder.svg',
        isAvailable: true
      },
      {
        id: '4',
        name: 'Green',
        hex: '#008000',
        image: '/images/placeholder.svg',
        isAvailable: true
      }
    ],
    category: 'Kính cận',
    description: 'Kính cận thời trang với thiết kế hiện đại, phù hợp cho mọi phong cách',
    isNew: true,
    material: 'Titanium',
    features: ['Chống tia UV', 'Lớp phủ chống trầy', 'Thiết kế nhẹ']
  },
  {
    id: '2',
    name: 'THE RULER 01',
    price: 2850000,
    originalPrice: 2850000,
    images: [
      '/images/placeholder.svg',
      '/images/placeholder.svg',
      '/images/placeholder.svg'
    ],
    colors: [
      {
        id: '5',
        name: 'Black',
        hex: '#000000',
        image: '/images/placeholder.svg',
        isAvailable: true
      },
      {
        id: '6',
        name: 'Dark Grey',
        hex: '#696969',
        image: '/images/placeholder.svg',
        isAvailable: true
      },
      {
        id: '7',
        name: 'Marble Black',
        hex: '#2F2F2F',
        image: '/images/placeholder.svg',
        isAvailable: true
      }
    ],
    category: 'Kính cận',
    description: 'Kính cận cao cấp với thiết kế sang trọng',
    isBestSeller: true,
    material: 'Titanium',
    features: ['Chống tia UV 100%', 'Lớp phủ chống trầy', 'Thiết kế nhẹ', 'Khung titanium']
  },
  {
    id: '3',
    name: 'THE RULER 02',
    price: 2750000,
    originalPrice: 2750000,
    images: [
      '/images/placeholder.svg',
      '/images/placeholder.svg',
      '/images/placeholder.svg'
    ],
    colors: [
      {
        id: '8',
        name: 'Silver',
        hex: '#C0C0C0',
        image: '/images/placeholder.svg',
        isAvailable: false
      },
      {
        id: '9',
        name: 'Gunmetal',
        hex: '#2C3539',
        image: '/images/placeholder.svg',
        isAvailable: true
      }
    ],
    category: 'Kính cận',
    description: 'Kính cận với thiết kế kim loại sang trọng',
    material: 'Titanium',
    features: ['Chống tia UV', 'Lớp phủ chống trầy', 'Thiết kế nhẹ'],
    isOutOfStock: true
  },
  {
    id: '4',
    name: 'THE RULER 05',
    price: 2550000,
    originalPrice: 2550000,
    images: [
      '/images/placeholder.svg',
      '/images/placeholder.svg',
      '/images/placeholder.svg'
    ],
    colors: [
      {
        id: '10',
        name: 'Faded Ash',
        hex: '#B2BEB5',
        image: '/images/placeholder.svg',
        isAvailable: true
      },
      {
        id: '11',
        name: 'Dark Grey',
        hex: '#696969',
        image: '/images/placeholder.svg',
        isAvailable: true
      }
    ],
    category: 'Kính cận',
    description: 'Kính cận với thiết kế tinh tế và màu sắc độc đáo',
    material: 'Titanium',
    features: ['Chống tia UV', 'Lớp phủ chống trầy', 'Thiết kế nhẹ']
  },
  {
    id: '5',
    name: 'THE RULER 06',
    price: 2550000,
    originalPrice: 2550000,
    images: [
      '/images/placeholder.svg',
      '/images/placeholder.svg',
      '/images/placeholder.svg'
    ],
    colors: [
      {
        id: '12',
        name: 'Black',
        hex: '#000000',
        image: '/images/placeholder.svg',
        isAvailable: false
      },
      {
        id: '13',
        name: 'Brown',
        hex: '#8B4513',
        image: '/images/placeholder.svg',
        isAvailable: true
      },
      {
        id: '14',
        name: 'Green',
        hex: '#008000',
        image: '/images/placeholder.svg',
        isAvailable: true
      },
      {
        id: '15',
        name: 'Grey',
        hex: '#808080',
        image: '/images/placeholder.svg',
        isAvailable: false
      }
    ],
    category: 'Kính cận',
    description: 'Kính cận với nhiều lựa chọn màu sắc',
    material: 'Titanium',
    features: ['Chống tia UV', 'Lớp phủ chống trầy', 'Thiết kế nhẹ']
  },
  {
    id: '6',
    name: 'THE PAPER KNIFE 01',
    price: 2500000,
    originalPrice: 2500000,
    images: [
      '/images/placeholder.svg',
      '/images/placeholder.svg',
      '/images/placeholder.svg'
    ],
    colors: [
      {
        id: '16',
        name: 'Black',
        hex: '#000000',
        image: '/images/placeholder.svg',
        isAvailable: true
      },
      {
        id: '17',
        name: 'Brown',
        hex: '#8B4513',
        image: '/images/placeholder.svg',
        isAvailable: true
      },
      {
        id: '18',
        name: 'Dark Grey',
        hex: '#696969',
        image: '/images/placeholder.svg',
        isAvailable: true
      }
    ],
    category: 'Kính cận',
    description: 'Kính cận với thiết kế độc đáo và phong cách',
    material: 'Titanium',
    features: ['Chống tia UV', 'Lớp phủ chống trầy', 'Thiết kế nhẹ']
  },
  {
    id: '7',
    name: 'THE PAPER KNIFE 02',
    price: 2500000,
    originalPrice: 2500000,
    images: [
      '/images/placeholder.svg',
      '/images/placeholder.svg',
      '/images/placeholder.svg'
    ],
    colors: [
      {
        id: '19',
        name: 'Black',
        hex: '#000000',
        image: '/images/placeholder.svg',
        isAvailable: true
      }
    ],
    category: 'Kính cận',
    description: 'Kính cận với thiết kế tinh tế và sang trọng',
    material: 'Titanium',
    features: ['Chống tia UV', 'Lớp phủ chống trầy', 'Thiết kế nhẹ']
  },
  // Sunglasses
  {
    id: '8',
    name: 'SUNGLASSES CLASSIC 01',
    price: 1800000,
    originalPrice: 1800000,
    images: [
      '/images/placeholder.svg',
      '/images/placeholder.svg',
      '/images/placeholder.svg'
    ],
    colors: [
      {
        id: '20',
        name: 'Black',
        hex: '#000000',
        image: '/images/placeholder.svg',
        isAvailable: true
      },
      {
        id: '21',
        name: 'Brown',
        hex: '#8B4513',
        image: '/images/placeholder.svg',
        isAvailable: true
      }
    ],
    category: 'sunglasses',
    description: 'Kính râm cổ điển với thiết kế thời trang',
    material: 'Acetate',
    features: ['Chống tia UV 100%', 'Tròng kính phân cực', 'Thiết kế cổ điển']
  },
  {
    id: '9',
    name: 'SUNGLASSES SPORT 01',
    price: 2200000,
    originalPrice: 2200000,
    images: [
      '/images/placeholder.svg',
      '/images/placeholder.svg',
      '/images/placeholder.svg'
    ],
    colors: [
      {
        id: '22',
        name: 'Black',
        hex: '#000000',
        image: '/images/placeholder.svg',
        isAvailable: true
      },
      {
        id: '23',
        name: 'Blue',
        hex: '#0000FF',
        image: '/images/placeholder.svg',
        isAvailable: true
      }
    ],
    category: 'sunglasses',
    description: 'Kính râm thể thao với thiết kế năng động',
    isNew: true,
    material: 'Polycarbonate',
    features: ['Chống tia UV 100%', 'Chống va đập', 'Thiết kế thể thao', 'Chống mồ hôi']
  },
  {
    id: '10',
    name: 'SUNGLASSES LUXURY 01',
    price: 3500000,
    originalPrice: 3500000,
    images: [
      '/images/placeholder.svg',
      '/images/placeholder.svg',
      '/images/placeholder.svg'
    ],
    colors: [
      {
        id: '24',
        name: 'Gold',
        hex: '#FFD700',
        image: '/images/placeholder.svg',
        isAvailable: true
      },
      {
        id: '25',
        name: 'Silver',
        hex: '#C0C0C0',
        image: '/images/placeholder.svg',
        isAvailable: true
      }
    ],
    category: 'sunglasses',
    description: 'Kính râm cao cấp với thiết kế sang trọng',
    isBestSeller: true,
    material: 'Titanium',
    features: ['Chống tia UV 100%', 'Tròng kính phân cực', 'Khung titanium', 'Thiết kế sang trọng']
  },
  // Accessories
  {
    id: '11',
    name: 'Hộp kính cao cấp',
    price: 150000,
    originalPrice: 150000,
    images: [
      '/images/placeholder.svg',
      '/images/placeholder.svg'
    ],
    colors: [
      {
        id: '26',
        name: 'Black',
        hex: '#000000',
        image: '/images/placeholder.svg',
        isAvailable: true
      },
      {
        id: '27',
        name: 'Brown',
        hex: '#8B4513',
        image: '/images/placeholder.svg',
        isAvailable: true
      }
    ],
    category: 'accessories',
    description: 'Hộp kính bảo vệ cao cấp với thiết kế sang trọng',
    material: 'Leather',
    features: ['Bảo vệ kính', 'Thiết kế sang trọng', 'Chất liệu da cao cấp']
  },
  {
    id: '12',
    name: 'Khăn lau kính chuyên dụng',
    price: 50000,
    originalPrice: 50000,
    images: [
      '/images/placeholder.svg'
    ],
    colors: [
      {
        id: '28',
        name: 'White',
        hex: '#FFFFFF',
        image: '/images/placeholder.svg',
        isAvailable: true
      }
    ],
    category: 'accessories',
    description: 'Khăn lau kính mềm mại, không làm trầy xước',
    material: 'Microfiber',
    features: ['Không làm trầy xước', 'Thấm hút tốt', 'Có thể giặt tái sử dụng']
  },
  {
    id: '13',
    name: 'Dây đeo kính thể thao',
    price: 80000,
    originalPrice: 80000,
    images: [
      '/images/placeholder.svg'
    ],
    colors: [
      {
        id: '29',
        name: 'Black',
        hex: '#000000',
        image: '/images/placeholder.svg',
        isAvailable: true
      },
      {
        id: '30',
        name: 'Blue',
        hex: '#0000FF',
        image: '/images/placeholder.svg',
        isAvailable: true
      }
    ],
    category: 'accessories',
    description: 'Dây đeo kính chắc chắn cho hoạt động thể thao',
    material: 'Silicone',
    features: ['Chống trượt', 'Điều chỉnh được', 'Chất liệu mềm mại']
  },
  {
    id: '14',
    name: 'Dung dịch vệ sinh kính',
    price: 120000,
    originalPrice: 120000,
    images: [
      '/images/placeholder.svg'
    ],
    colors: [
      {
        id: '31',
        name: 'Clear',
        hex: '#FFFFFF',
        image: '/images/placeholder.svg',
        isAvailable: true
      }
    ],
    category: 'accessories',
    description: 'Dung dịch vệ sinh kính chuyên dụng, an toàn cho mắt',
    material: 'Liquid',
    features: ['Không chứa cồn', 'An toàn cho mắt', 'Làm sạch hiệu quả', 'Không để lại vết']
  }
];

export const sortOptions = [
  { id: 'featured', name: 'Nổi bật', value: 'featured' },
  { id: 'bestseller', name: 'Bán chạy nhất', value: 'bestseller' },
  { id: 'name-asc', name: 'Thứ tự bảng chữ cái (từ A-Z)', value: 'name-asc' },
  { id: 'name-desc', name: 'Thứ tự bảng chữ cái (từ Z-A)', value: 'name-desc' },
  { id: 'price-asc', name: 'Giá (từ thấp đến cao)', value: 'price-asc' },
  { id: 'price-desc', name: 'Giá (từ cao xuống thấp)', value: 'price-desc' },
  { id: 'date-asc', name: 'Ngày (từ cũ đến mới)', value: 'date-asc' },
  { id: 'date-desc', name: 'Ngày (từ mới đến cũ)', value: 'date-desc' }
];
