import {atomWithQuery} from 'jotai-tanstack-query';
import {infoLocationApi, nhomSanPhamApi} from "../../services/api.ts";
import {AddressState} from "../../types";
import {atom} from "jotai";

export const nhomSanPhamxQueryAtom = atomWithQuery(() =>({
    queryKey:['nhomSanPham'],
    queryFn: nhomSanPhamApi.getAll
}));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const quocGiaAtom = atomWithQuery((_get) => ({
    queryKey: ['quoc-gia'],
    queryFn: infoLocationApi.getNationalities
}));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
export const tinhThanhAtom = atomWithQuery((get) => {
    const {quocGia} = get(addressSelectionAtom);
    return {
        queryKey: ['tinh-thanh', quocGia],
        queryFn: () => infoLocationApi.getProvince(quocGia?.CountryCode),
        enabled: !!quocGia // Only fetch when quocGia is not null
    }
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
export const phuongXaAtom = atomWithQuery((get) => {
    const {quocGia, tinhThanh, quanHuyen} = get(addressSelectionAtom);
    return {
        queryKey: ['phuong-xa', quanHuyen, tinhThanh, quocGia],
        queryFn: () => infoLocationApi.getWard(tinhThanh?.StateCode, quocGia?.CountryCode, quanHuyen?.DistrictCode),
        enabled: !!tinhThanh && !!quocGia && !!quanHuyen // Only fetch when tinhThanh and quocGia is not null
    }
});
export const addressSelectionAtom = atom<AddressState>({
    quocGia: null,
    tinhThanh: null,
    quanHuyen: null,
    phuongXa: null,
    diaChi: null
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
export const quanHuyenAtom = atomWithQuery((get) => {
    const {quocGia, tinhThanh} = get(addressSelectionAtom);
    return {
        queryKey: ['quan-huyen', tinhThanh, quocGia],
        queryFn: () => infoLocationApi.getDistrict(tinhThanh?.StateCode, quocGia?.CountryCode),
        enabled: !!tinhThanh && !!quocGia // Only fetch when tinhThanh and quocGia is not null
    }
});
