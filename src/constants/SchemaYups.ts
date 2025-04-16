import * as yup from 'yup'
import {numberNormal, stringNormal, stringRequired} from "./YupValidation.ts";
import {IBaseInfoAccount} from "../types";

export const formLoginSchema = () => {
    return yup.object().shape({
        account: stringRequired,
        password: stringRequired,
        // keyEnv: stringRequired,
    })
}
export const formAddEditStore = () => {
    return yup.object().shape({
        storeCode: stringRequired,
        storeName: stringRequired,
        storeRepresentative: stringRequired,
        storeLevel: stringRequired,
        storeDependent: stringRequired,
        national: stringRequired,
        province: stringRequired,
        district: stringNormal,
        ward: stringNormal,
        address: stringRequired,
        phoneNumber: stringRequired,
        website: stringNormal,
        email: stringNormal,
        URLImage: stringNormal,
    })
}
export const formAddEditCustomer = () => {
    return yup.object().shape({
        title: stringNormal,
        firstName: stringRequired,
        lastName: stringNormal,
        phoneNumber: stringNormal,
        email: stringNormal,
        gender: stringNormal,
        dateOfBirth: stringNormal,
        national: stringRequired,
        province: stringRequired,
        district: stringNormal,
        ward: stringNormal,
        address: stringNormal,
    });
}
export const formAddEditCustomerDefault = {
     // Generate all fields with default values
    title: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    national: '',
    province: '',
    district: '',
    ward: '',
    address: '',
}
export const formAddEditProduct = () => {
    return yup.object().shape({
        productName: stringRequired,
        store: stringNormal,
        warranty: stringNormal,
        unit: stringRequired,
        importPrice: stringRequired,
        salePrice: stringRequired,
        discount: stringRequired,
        priceAfterDiscount: stringNormal,
        quantity: stringNormal,
        weight: stringRequired,
        length: stringRequired,
        width: stringRequired,
        height: stringRequired,
        isContactPrice: yup.boolean(),
        isOnlineSale: yup.boolean(),
        description: stringNormal,
        shortDescription: stringNormal,
        URLImage: stringNormal,
        URLImage2: stringNormal,
        URLImage3: stringNormal,
        URLImage4: stringNormal,
        URLImage5: stringNormal,
        idsGroupProduct: yup.array().of(yup.number()).nullable(),
    })
}
export const formAddEditStoreDefault = {
    storeCode: '',
    storeName: '',
    storeRepresentative: '',
    storeLevel: '',
    storeDependent: '',
    national: '',
    province: '',
    district: '',
    ward: '',
    address: '',
    phoneNumber: '',
    website: '',
    email: '',
    URLImage: '',
}
export const formBaseInfoAccount = () => {
    return yup.object().shape({
        ho: stringNormal,
        ten: stringRequired,
        taiKhoan: stringRequired,
        email: stringNormal,
        dienThoai: stringNormal,
        cmnd: stringNormal,
        ngaySinhNhat: stringNormal,
        gioiTinh: numberNormal,
        idVaiTro: numberNormal,
        idCuaHang: numberNormal,
    })
}
export const formImportWarehouseProduct = () => {
    return yup.object().shape({
        productName: stringRequired,
        remainingQuantity: stringNormal,
        additionalQuantity: stringNormal,
    })
}
export const formImportWarehouseProductDefault = {
    productName: '',
    remainingQuantity: '',
    additionalQuantity: '',
}
export const formBaseInfoAccountDefault: IBaseInfoAccount = {
    idNguoiDung: -1,
    ho: '',
    ten: '',
    taiKhoan: '',
    email: '',
    dienThoai: '',
    cmnd: '',
    ngaySinhNhat: '',
    gioiTinh: -1,
    idVaiTro: -1,
    idCuaHang: -1,
}
export const formAddEditProductDefault = {
    productName: '',
    store: '',
    warranty: '',
    unit: '',
    importPrice: '',
    salePrice: '',
    discount: '0',
    priceAfterDiscount: '',
    quantity: '0',
    weight: '0',
    length: '0',
    width: '0',
    height: '0',
    isContactPrice: false,
    isOnlineSale: true,
    description: '',
    shortDescription: '',
    URLImage: '',
    URLImage2: '',
    URLImage3: '',
    URLImage4: '',
    URLImage5: '',
    idsGroupProduct: [],
}
export const formLoginDefault = {
    account: '',
    password: '',
    // keyEnv: '',
}
