import {IconMail, IconPhone, IconWeb} from "../../assets/svgs/SVGIcon.tsx";

export interface IItemStore{
    IDCuaHang: number;
    MaCuaHang: string;
    TenCuaHang: string;
    URLLogo: string;
    DiaChiCuaHang: string;
    DienThoaiCuaHang: string;
    EmailCuaHang: string;
    TenNguoiDaiDienCuaHang: string;
    DiaChiWebCuaHang: string;
    IDCuaHangCha: number;
    CapDoCuaHang: number;
    ThanhPho: string;
    MaBang: string;
    MaQuocGia: string;
    TenBang: string;
    TenQuocGia: string;
    TenQuan: string;
    MaMau: string;
    Latitude: number;
    Longitude: number;
    ThoiGianMoCua: string;
    ThoiGianDongCua: string;
    success: string;
}
interface IStoreItemProps {
    className?: string;
    isPending: boolean;
    data: IItemStore | null;
    domainImage: string;
}
const ItemSkeleton = () => {
    return (
        <div className="animate-pulse bg-white px-[32px] py-[24px] rounded-[24px] max-w-[760px] w-[48%] box-border flex flex-col gap-y-[40px]">
            <div className="flex gap-x-[32px] justify-between">
                <div className="image w-[100px] h-[100px] bg-gray-300 rounded-[8px]"/>
                <div className="info flex flex-col gap-y-[12px]">
                    <div className="name bg-gray-300 h-[20px] w-[200px] rounded-[8px]"/>
                    <div className="address bg-gray-300 h-[16px] w-[200px] rounded-[8px]"/>
                </div>
                <div className="action">
                    <div className="bg-gray-300 h-[40px] w-[100px] rounded-[8px]"/>
                </div>
            </div>
            <div className="flex flex-col gap-y-[12px] ]">
                <div className="phone flex gap-x-[18px]">
                    <div className="icon bg-gray-300 h-[20px] w-[20px] rounded-[8px]"/>
                    <div className="text-[#7C7C7C] bg-gray-300 h-[16px] w-[200px] rounded-[8px]"/>
                </div>
                <div className="mail flex gap-x-[18px]">
                    <div className="icon bg-gray-300 h-[20px] w-[20px] rounded-[8px]"/>
                    <div className="text-[#7C7C7C] bg-gray-300 h-[16px] w-[200px] rounded-[8px]"/>
                </div>
                <div className="web flex gap-x-[18px]">
                    <div className="icon bg-gray-300 h-[20px] w-[20px] rounded-[8px]"/>
                    <div className="text-[#7C7C7C] bg-gray-300 h-[16px] w-[200px] rounded-[8px]"/>
                </div>
            </div>
        </div>
    );
}
const StoreItem = (props: IStoreItemProps) => {
    const {className, isPending, data = null, domainImage} = props;

    if(isPending) {
        return (
            <ItemSkeleton/>
        )
    }
    return (
        <div className={`
        bg-white px-[32px] py-[24px] rounded-[24px] max-w-[760px] w-[48%] box-border 
        flex flex-col gap-y-[40px] 
         ${className}`}>
            <div className={'flex gap-x-[32px] justify-between border-b-[#EAEAEA] border-b-[2px]'}>
                <div className="image w-[100px] h-[100px]">
                    <img className={'w-full aspect-square'} src={domainImage+data?.URLLogo} alt="Lỗi hình ảnh"/>
                </div>
                <div className="info flex flex-col gap-y-[12px]">
                    <div className="name text-[20px] text-gray-700 font-semibold">{data?.TenCuaHang}</div>
                    <div className="address text-[16px] text-[#7C7C7C]">{data?.DiaChiCuaHang + ' ' + data?.ThanhPho}</div>
                </div>
                <div className="action min-w-[6rem]">
                    <button className={'text-[#0D0C22] text-[14px]  rounded-[8px] p-[12px]  border border-[#E7E7E9] hover:cursor-pointer hover:shadow transition-all duration-200 '}>Điều chỉnh</button>
                </div>
            </div>
            <div className={'flex flex-col gap-y-[12px] ]'}>
                <div className="phone flex gap-x-[18px]">
                    <div className="icon"><IconPhone/></div>
                    <div className="text-[#7C7C7C]">{data?.DienThoaiCuaHang}</div>
                </div>
                <div className="mail flex gap-x-[18px]">
                    <div className="icon"><IconMail/></div>
                    <div className="text-[#7C7C7C]">{data?.EmailCuaHang}</div>
                </div>
                <div className="web flex gap-x-[18px]">
                    <div className="icon"><IconWeb/></div>
                    <div className="text-[#7C7C7C] ">{data?.DiaChiWebCuaHang}</div>
                </div>
            </div>
        </div>
    );
};

export default StoreItem;
