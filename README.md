# 🎓 **Môn học: Phát triển ứng dụng Web**

# 🎓 ExamReg – Hệ thống Đăng ký Dự thi Trực tuyến

## 📌 Giới thiệu

**ExamReg** là hệ thống hỗ trợ sinh viên **đăng ký dự thi các học phần** theo hình thức **thi trắc nghiệm trên máy tính**, được xây dựng trong khuôn khổ học phần **Phát triển ứng dụng Web**.

Hệ thống cho phép sinh viên chủ động lựa chọn **kỳ thi – ca thi – phòng thi** phù hợp, đồng thời đảm bảo **giới hạn số lượng thí sinh** dựa trên số máy tính thực tế của từng ca thi.

---

## 👥 Nhóm thực hiện

* **Trần Thành Nguyên - 23021651**
* **Nguyễn Đình Quốc - 23021675**
* **Nguyễn Hà An - 20020277**

---

## 🏫 Bối cảnh & Bài toán

Trường đại học **ABCUni** tổ chức thi kết thúc học phần bằng **hình thức thi trắc nghiệm trên máy tính**.

Các yêu cầu chính:

* Mỗi **kỳ thi** gồm nhiều **ca thi**
* Mỗi **ca thi** gồm nhiều **phòng thi**
* Mỗi **phòng thi** có số lượng máy tính xác định
* Tổng số sinh viên đăng ký **không vượt quá tổng số máy** của các phòng trong ca thi
* Khi ca thi đã đủ chỗ, sinh viên **không thể đăng ký thêm**

---

## 👨‍🎓 Quy trình đăng ký dự thi của sinh viên

1. Sinh viên **đăng nhập** vào hệ thống ExamReg (thông tin sinh viên đã được quản trị viên nhập sẵn từ danh sách lớp học phần).
2. Sinh viên **chọn học phần** cần đăng ký dự thi.
3. Xem **lịch thi chi tiết**, bao gồm:

   * Kỳ thi
   * Các ca thi
   * Phòng thi
   * Số chỗ còn trống
4. Sinh viên **chọn ca thi mong muốn** và xác nhận đăng ký.
5. Sau khi đăng ký thành công, hệ thống sinh **Phiếu báo dự thi (PDF)**:

   * Có thể tải về hoặc in ra
   * Có giá trị xác nhận để tham gia dự thi

---

## ⚙️ Công nghệ sử dụng

### 🖥️ Frontend

* **ReactJS**
* REST API integration
* Responsive UI

### 🛠️ Backend

* **Spring Boot**
* Spring Security + JWT
* Spring Data JPA
* Redis Cache

### 🗄️ Cơ sở dữ liệu

* **MySQL** (Railway)
* **Redis** (Render)

---

## ☁️ Triển khai (Deployment)

### 🌐 Frontend

* Deploy trên **Render**
* URL: 👉 **[https://examreg.onrender.com](https://examreg.onrender.com)**

### 🔙 Backend

* Deploy trên **Render**
* API Base URL: 👉 **[https://examreg-aqn.onrender.com](https://examreg-aqn.onrender.com)**

### 📘 API Documentation

* Swagger UI: 👉
  **[https://examreg-aqn.onrender.com/swagger-ui/index.html](https://examreg-aqn.onrender.com/swagger-ui/index.html)**

---

## 🔐 Các chức năng chính

* Đăng nhập / xác thực người dùng (JWT)
* Xem lịch thi theo học phần
* Đăng ký / hủy đăng ký ca thi
* Kiểm soát số lượng thí sinh theo ca thi
* Xuất **Phiếu báo dự thi (PDF)**
* Cache dữ liệu bằng Redis để tăng hiệu năng

---

## 📄 Ghi chú

Dự án được xây dựng phục vụ mục đích **học tập và nghiên cứu**, tuân thủ kiến trúc Web hiện đại, tách biệt Frontend – Backend, dễ mở rộng và bảo trì.

---

✨ *ExamReg – Đơn giản hóa quy trình đăng ký dự thi cho sinh viên*
