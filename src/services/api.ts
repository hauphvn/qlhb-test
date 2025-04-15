import {District, Nationality, NhomSanPham} from "../types";
import {post} from "../libs";
import {API_PATH} from "../constants/Path.ts";
import {convertProvinceDistrict} from "../utils/generateCommon.ts";

export const nhomSanPhamApi = {
    getAll: async (): Promise<NhomSanPham[]> => {
        const response = await post('/nhomSanPham/layTacCa', {});
        return response.data?.metadata || [];
    }
}

export const infoLocationApi = {
    getNationalities: async () => {
        const country = await post(API_PATH.GEOGRAPHICAL_INFORMATION.COUNTRY, {
            "loai": 'quocgia'
        });
        // Sort to 'VN' is first
        const sortCountry = country.data?.content.sort((a: Nationality, b: Nationality) => {
            if (a.CountryCode === 'VN') return -1;
            if (b.CountryCode === 'VN') return 1;
            return 0;
        })
        return sortCountry || [];
    },
    getProvince: async (countryCode: string | undefined) => {
        if (!countryCode) return [];
        const res = await post(API_PATH.GEOGRAPHICAL_INFORMATION.PROVINCE, {
            "loai": 'bang',
            "CountryCode": countryCode
        });
        return res.data?.content || [];
    },
    getDistrict: async (province: string | undefined, country: string | undefined) => {
        if (!province || !country) return [];
        const res = await post(API_PATH.GEOGRAPHICAL_INFORMATION.PROVINCE, {
            "loai": 'zipcode',
            "CountryCode": country,
            "StateCode": province
        });
        // Convert to array District
        const districts: District[] = res.data?.content?.map((item: any) => {
            return {
                DistrictCode: item.CityName,
                DistrictName: convertProvinceDistrict(item.CityName),
            }
        })
        // Create a list that item is unique
        const uniqueDistricts = districts.filter((item, index) => {
                return districts.findIndex((item2) => item2.DistrictCode === item.DistrictCode) === index;
            }
        )
        return uniqueDistricts.sort((a, b) => b.DistrictCode.toLowerCase().localeCompare(a.DistrictCode.toLowerCase())) || [];
    },
    getWard: async (province: string|undefined, country: string | undefined, district: string|undefined) => {
        if (!province || !country || !district) return [];
        const res = await post(API_PATH.GEOGRAPHICAL_INFORMATION.WARD, {
            "loai": 'zipcode',
            "CountryCode": country,
            "StateCode": province
        });
        const districtFilter: any = res.data?.content?.map((item: any) => {
            return {
                DistrictCode: item.CityName,
                WardCode: item.CityName2 ? item.CityName2 : item.CityName3,
                WardName: convertProvinceDistrict(item.CityName2 ? item.CityName2 : item.CityName3),
                ZipCode: item?.ZipCode || ''
            }
        })
        const wardByDistrict = districtFilter.filter((item) => item.DistrictCode === district);
        return wardByDistrict.sort((a, b) => b.WardCode.toLowerCase().localeCompare(a.WardCode.toLowerCase())) || [];
    }
}
