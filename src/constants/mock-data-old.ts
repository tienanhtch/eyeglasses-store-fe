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
      '/images/products/ruler-01-black-1.jpg',
      '/images/products/ruler-01-black-2.jpg',
      '/images/products/ruler-01-black-3.jpg'
    ],
    colors: [
      {
        id: '5',
        name: 'Black',
        hex: '#000000',
        image: '/images/products/ruler-01-black.jpg',
        isAvailable: true
      },
      {
        id: '6',
        name: 'Dark Grey',
        hex: '#696969',
        image: '/images/products/ruler-01-dark-grey.jpg',
        isAvailable: true
      },
      {
        id: '7',
        name: 'Marble Black',
        hex: '#2F2F2F',
        image: '/images/products/ruler-01-marble-black.jpg',
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
      '/images/products/ruler-02-silver-1.jpg',
      '/images/products/ruler-02-silver-2.jpg',
      '/images/products/ruler-02-silver-3.jpg'
    ],
    colors: [
      {
        id: '8',
        name: 'Silver',
        hex: '#C0C0C0',
        image: '/images/products/ruler-02-silver.jpg',
        isAvailable: false
      },
      {
        id: '9',
        name: 'Gunmetal',
        hex: '#2C3539',
        image: '/images/products/ruler-02-gunmetal.jpg',
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
      '/images/products/ruler-05-faded-ash-1.jpg',
      '/images/products/ruler-05-faded-ash-2.jpg',
      '/images/products/ruler-05-faded-ash-3.jpg'
    ],
    colors: [
      {
        id: '10',
        name: 'Faded Ash',
        hex: '#B2BEB5',
        image: '/images/products/ruler-05-faded-ash.jpg',
        isAvailable: true
      },
      {
        id: '11',
        name: 'Dark Grey',
        hex: '#696969',
        image: '/images/products/ruler-05-dark-grey.jpg',
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
      '/images/products/ruler-06-black-1.jpg',
      '/images/products/ruler-06-black-2.jpg',
      '/images/products/ruler-06-black-3.jpg'
    ],
    colors: [
      {
        id: '12',
        name: 'Black',
        hex: '#000000',
        image: '/images/products/ruler-06-black.jpg',
        isAvailable: false
      },
      {
        id: '13',
        name: 'Brown',
        hex: '#8B4513',
        image: '/images/products/ruler-06-brown.jpg',
        isAvailable: true
      },
      {
        id: '14',
        name: 'Green',
        hex: '#008000',
        image: '/images/products/ruler-06-green.jpg',
        isAvailable: true
      },
      {
        id: '15',
        name: 'Grey',
        hex: '#808080',
        image: '/images/products/ruler-06-grey.jpg',
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
      '/images/products/paper-knife-01-black-1.jpg',
      '/images/products/paper-knife-01-black-2.jpg',
      '/images/products/paper-knife-01-black-3.jpg'
    ],
    colors: [
      {
        id: '16',
        name: 'Black',
        hex: '#000000',
        image: '/images/products/paper-knife-01-black.jpg',
        isAvailable: true
      },
      {
        id: '17',
        name: 'Brown',
        hex: '#8B4513',
        image: '/images/products/paper-knife-01-brown.jpg',
        isAvailable: true
      },
      {
        id: '18',
        name: 'Dark Grey',
        hex: '#696969',
        image: '/images/products/paper-knife-01-dark-grey.jpg',
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
      '/images/products/paper-knife-02-black-1.jpg',
      '/images/products/paper-knife-02-black-2.jpg',
      '/images/products/paper-knife-02-black-3.jpg'
    ],
    colors: [
      {
        id: '19',
        name: 'Black',
        hex: '#000000',
        image: '/images/products/paper-knife-02-black.jpg',
        isAvailable: true
      }
    ],
    category: 'Kính cận',
    description: 'Kính cận với thiết kế tinh tế và sang trọng',
    material: 'Titanium',
    features: ['Chống tia UV', 'Lớp phủ chống trầy', 'Thiết kế nhẹ']
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
