const statusCodes = [
    { statusCode: 200, message: "Thành công" },
    { statusCode: 201, message: "Đã tạo" },
    { statusCode: 400, message: "Yêu cầu không hợp lệ" },
    { statusCode: 401, message: "Không được phép" },
    { statusCode: 403, message: "Bị cấm" },
    { statusCode: 404, message: "Không tìm thấy" },
    { statusCode: 500, message: "Lỗi máy chủ nội bộ" },
    { statusCode: 1000, message: "Lỗi đã tồn tại" },
    { statusCode: 1001, message: "Lỗi không tồn tại" },
    { statusCode: 1002, message: "Thông tin đăng nhập không chính xác" },
    { statusCode: 1003, message: "Lỗi mật khẩu sai" },
    { statusCode: 1004, message: "ID vai trò sai" },
    { statusCode: 1005, message: "ID cửa hàng sai" },
    { statusCode: 1006, message: "Token sai" },
    { statusCode: 1007, message: "Token làm mới sai" },
    { statusCode: 1008, message: "Giải mã sai" },
    { statusCode: 1009, message: "Đặt hàng thất bại" },
    { statusCode: 1010, message: "Sản phẩm không tìm thấy" },
    { statusCode: 1011, message: "Sản phẩm không đủ" },
    { statusCode: 1012, message: "Dịch vụ bổ sung không tìm thấy" },
    { statusCode: 1013, message: "Chi tiết dịch vụ bổ sung không tìm thấy" },
    { statusCode: 1014, message: "Khách hàng không tìm thấy" },
    { statusCode: 1015, message: "Tạo khách hàng thất bại" },
    { statusCode: 1016, message: "Khách hàng trùng khóa hoặc vi phạm khóa duy nhất" },
    { statusCode: 1017, message: "Lấy ZThongSoKetNoi thất bại" },
    { statusCode: 1018, message: "Tạo đơn hàng nháp thất bại" },
    { statusCode: 1019, message: "Cập nhật đơn hàng nháp thất bại" },
    { statusCode: 1020, message: "Xóa đơn hàng nháp thất bại" },
    { statusCode: 1021, message: "Lấy đơn hàng nháp thất bại" },
    { statusCode: 1022, message: "Đơn hàng nháp đã tồn tại" },
    { statusCode: 1023, message: "Nhân viên không tìm thấy" },
    { statusCode: 1024, message: "Cửa hàng không tìm thấy" },
    { statusCode: 1025, message: "Xóa tệp thất bại" },
    { statusCode: 1026, message: "Cập nhật tệp thất bại" },
    { statusCode: 1027, message: "Kích thước tệp quá lớn" },
    { statusCode: 1028, message: "Số điện thoại đã tồn tại" },
    { statusCode: 1029, message: "Tài khoản đã tồn tại" },
    { statusCode: 1030, message: "Email đã tồn tại" },
    { statusCode: 1031, message: "Bạn không có quyền thực hiện điều này" },
    { statusCode: 1032, message: "Loại tệp là bắt buộc" },
    { statusCode: 1033, message: "Tạo cửa hàng thất bại" },
    { statusCode: 1034, message: "Lưu hình ảnh thất bại" },
    { statusCode: 1035, message: "Mã cửa hàng trùng lặp" },
    { statusCode: 1036, message: "Quyền truy cập bị từ chối" },
    { statusCode: 1037, message: "Cập nhật nhãn in thất bại" },
    { statusCode: 1038, message: "Lấy nhãn in thất bại" },
    { statusCode: 1018, message: "Tạo nhãn in thất bại" },
    { statusCode: 1030, message: "Tạo nhãn in thất bại" },
    { statusCode: 1036, message: "Người dùng tồn tại trong cửa hàng" },
    { statusCode: 1037, message: "Sản phẩm tồn tại trong cửa hàng" },
    { statusCode: 1038, message: "Xóa cửa hàng thất bại" },
    { statusCode: 1039, message: "Môi trường không tìm thấy" },
    { statusCode: 1040, message: "Đầu vào không hợp lệ" },
    { statusCode: 1041, message: "Tài khoản này đã bị khóa" },
    { statusCode: 1042, message: "Lấy email thất bại" },
    { statusCode: 1043, message: "Gửi email thất bại" }
];
const error500 = 'Có lỗi xảy ra, vui lòng thử lại sau';
export {statusCodes, error500};
