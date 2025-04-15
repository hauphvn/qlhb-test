export const ROUTES_PATH = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    PRODUCT: '/dashboard/management/products',
    SELL: '/dashboard/sell',
    ARTICLE: '/dashboard/management/articles',
    ORDER: '/dashboard/management/orders',
    CUSTOMER: '/dashboard/management/customers',
    NOTIFICATION: '/dashboard/management/notifications',
    EMPLOYEE: '/dashboard/management/employees',
    PROMOTION: '/dashboard/management/promotions',
    EXPENSE: '/dashboard/expense',
    REPORT: '/dashboard/report',
    STORE: '/dashboard/management/stories',
    ACCOUNT: '/dashboard/accounts',
    ACCOUNT_DETAIL: '/dashboard/accounts/detail/:id',
    LOGIN: '/login'
}

export const API_PATH = {
    EMPLOYEE_LOGIN: '/auth/employee/login',
    EMPLOYEE_LOGOUT: '/Auth/Employee/Logout',
    COMMONS: {
        ROLES_CATEGORIES: '/DanhSachCommon/GroupChuyenMucByVaiTro',
    },
    PRODUCT: {
        GET_ALL: '/Common/GetSanPham',
        GET_BY_ID: '/ProductWarehouse/GetProductForWarehouseById',
        RE_UPDATE: '/Common/ReUploadSanPham',
        RE_UPDATE_V2: '/ProductWarehouse/cap-nhat-thong-tin-san-pham',
        ADD_NEW: '/Common/UploadSanPham',
        ADD_INFO: '/ProductWarehouse/them-thong-tin-san-pham',
        DELETE: '/Common/DeleteSanPham',
        IMPORT: '/Common/NhapKhoSanPham',
    },
    CUSTOMER: {
        GET_ALL: '/Customer/GetListCustomer',
        GET_BY_ID: '/Customer/GetDetailById',
        LOCK_UNLOCK: '/Customer/Status/Action',
        UPDATE: '/Customer/UpdateCustomer',
        ADD_NEW: '/Customer/AddNew',
    },
    GROUP_PRODUCT:{
      ADD_GROUPS:'/ProductWarehouse/UpdateProductGroup'
    },
    ACCOUNT: {
        GET_ALL: '/Employee/GetListEmployeeWithoutPagination',
        GET_BY_ID: 'Employee/GetNhanVienChiTiet',
        ADD_NEW: '/Account/AddNewAccount',
        UPDATE: '/Employee/CapNhatThongTinNhanVien',
        LOCK: '/Common/GetThongTinKhachHang',
        RESET_PWD: '/Employee/DatLaiMatKhau',
        DELETE: '/Account/DeleteAccount',
    },
    STORE: {
        GET_ALL_BY_STORE_PARENT_ID: '/Store/GetAllStoreByParentId',
        GET_ALL: '/Common/GetThongTinCuaHang',
        ADD_NEW:'/Store/Create'
    }, ROLE: {
        GET_ALL: '/Common/GetThongTinCuaHang',
    },
    HANDLE_FILE: {
        UPLOAD_FILE_PRODUCT_IMAGE: '/Management/UploadFiles',
        UPLOAD_FILE_PRODUCT_IMAGE_V2: '/ProductImage/EditProductImage',
        ADD_NEW_FILE_PRODUCT_IMAGE_V2: '/ProductImage/AddNewProductImage',
        UPDATE_METADATA_PRODUCT_IMAGE: '/ProductImage/Metadata/Update',
    },
    GEOGRAPHICAL_INFORMATION: {
        COUNTRY: '/Common/GetThongTinDiaChinh',
        PROVINCE: '/Common/GetThongTinDiaChinh',
        DISTRICT: '/Common/GetThongTinDiaChinh',
        WARD: '/Common/GetThongTinDiaChinh',
    },
}
