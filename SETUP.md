# Hướng dẫn Setup và Chạy Frontend

## Yêu cầu
- Node.js 18+ 
- npm hoặc yarn

## Cài đặt

1. **Cài đặt dependencies:**
```bash
npm install
```

2. **Cấu hình environment:**

Tạo file `.env.local` từ `.env.example`:
```bash
cp .env.example .env.local
```

Nội dung file `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

3. **Chạy development server:**
```bash
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:3000`

## Cấu trúc API Endpoints

Frontend đã được tích hợp với các API sau:

### Admin APIs (yêu cầu ADMIN role)

**Categories Management** (`/admin/categories`)
- GET - Lấy danh sách danh mục
- POST - Tạo danh mục mới
- PATCH - Cập nhật danh mục
- DELETE - Xóa danh mục

**Products Management** (`/admin/products`)
- GET - Lấy danh sách sản phẩm (có phân trang)
- POST - Tạo sản phẩm mới
- PATCH - Cập nhật sản phẩm
- DELETE - Xóa sản phẩm
- POST `/admin/images/upload` - Upload ảnh sản phẩm

**Orders Management** (`/admin/orders`)
- GET - Lấy danh sách đơn hàng (có filter)
- GET `/:id` - Chi tiết đơn hàng
- PATCH `/:id/status` - Cập nhật trạng thái
- POST `/:id/process` - Xử lý đơn hàng
- POST `/:id/ship` - Giao hàng

**Users Management** (`/admin/users`)
- GET - Lấy danh sách người dùng
- POST - Tạo người dùng mới
- POST `/:id/lock` - Khóa tài khoản
- POST `/:id/unlock` - Mở khóa
- POST `/:id/reset-password` - Reset mật khẩu

**Stores Management** (`/admin/stores`)
- GET - Lấy danh sách cửa hàng
- POST - Tạo cửa hàng
- PATCH - Cập nhật cửa hàng
- DELETE - Xóa cửa hàng

### Authentication APIs (public)
- POST `/auth/register` - Đăng ký
- POST `/auth/login` - Đăng nhập

## Đăng nhập Admin

Để truy cập trang admin, cần:
1. Đăng nhập với tài khoản có role ADMIN
2. Backend sẽ trả về JWT token
3. Token tự động được lưu vào localStorage
4. Các API call tự động attach token vào header

**Thông tin đăng nhập mặc định (nếu có trong database):**
- Email: `admin@eyeglasses.com`
- Password: `admin123`

## Cấu trúc Frontend

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin pages
│   │   ├── categories/    # Quản lý danh mục
│   │   ├── products/      # Quản lý sản phẩm
│   │   ├── orders/        # Quản lý đơn hàng
│   │   ├── users/         # Quản lý người dùng
│   │   └── stores/        # Quản lý cửa hàng
│   ├── auth/              # Login/Register pages
│   └── products/          # Public product pages
├── components/            # Reusable components
├── services/              # API services
│   ├── admin/            # Admin API services
│   │   ├── categories.ts
│   │   ├── products.ts
│   │   ├── orders.ts
│   │   ├── users.ts
│   │   └── stores.ts
│   └── auth.ts           # Auth service
├── utils/                 # Utilities
│   └── fetch-api.ts      # API client (axios wrapper)
└── types/                 # TypeScript types

```

## Tính năng đã hoàn thành

### Admin Dashboard
- ✅ **Categories Management**: CRUD đầy đủ cho danh mục
- ✅ **Products Management**: CRUD sản phẩm với phân trang, filter theo categories
- ✅ **Orders Management**: Xem danh sách, chi tiết, cập nhật trạng thái, xử lý đơn hàng
- ✅ **Users Management**: CRUD người dùng, khóa/mở khóa tài khoản, reset password
- ✅ **Stores Management**: CRUD cửa hàng với thông tin địa lý

### Features
- ✅ JWT Authentication với auto token injection
- ✅ Role-based access control
- ✅ Responsive UI với Tailwind CSS
- ✅ Loading states và error handling
- ✅ Pagination cho danh sách dài
- ✅ Modal forms cho create/edit
- ✅ Confirmation dialogs cho delete actions

## Troubleshooting

**Lỗi CORS:**
- Đảm bảo backend đã enable CORS cho `http://localhost:3000`
- Check `SecurityConfig.java` trong backend

**API không hoạt động:**
- Kiểm tra backend đang chạy tại `http://localhost:8080`
- Kiểm tra `.env.local` có đúng URL không
- Check console browser để xem error messages

**Authentication failed:**
- Đảm bảo JWT token còn valid
- Clear localStorage và login lại
- Check backend logs để xem lỗi authentication

## Next Steps

Để hoàn thiện project, cần:
1. Implement upload ảnh cho products
2. Tạo public pages (product listing, detail, cart)
3. Implement Staff dashboard
4. Implement Customer features (profile, orders history)
5. Add more validation và error handling
6. Add loading skeletons
7. Implement search functionality
8. Add pagination controls
9. Image management system

## Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

