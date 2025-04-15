// import Button from "../../components/Button";
// import {IconManageMenu, IconPlus} from "../../assets/svgs/SVGIcon.tsx";
// import ButtonGradient from "../../components/ButtonGradient";
// import {useTheme} from "../../context/ThemeContext.tsx";
// import StoreItem, {IItemStore} from "./StoreItem.tsx";
// import {post} from "../../libs";
// import {API_PATH} from "../../constants/Path.ts";
// import {STORE_TYPE_API} from "../../libs/constanst.ts";
// import {useQuery} from "@tanstack/react-query";
// import {useEffect, useState} from "react";
// import {quocGiaAtom} from "../../store/atom/commonAtom.ts";
// import {useAtom} from "jotai";
// import {STORAGE_ITEM} from "../../constants/StorageItem.ts";
//
// export interface IStoreLevel {
//     level: number;
//     name: string;
//     id?: number;
// }
//
// const Store = () => {
//     const {isDarkMode} = useTheme();
//     const {VITE_DOMAIN_IMAGE} = import.meta.env;
//     // const [showAddNew, setShowAddNew] = useState(false);
//     // const [showEdit, _] = useState(false);
//     // const [storeEdit, _] = useState(null);
//     // const [storeLevels, setStoreLevels] = useState<IStoreLevel[]>([]);
//     const apiGetStores = async () => {
//         const res = await post(API_PATH.STORE.GET_ALL, {
//             loai: STORE_TYPE_API.GET_ALL
//         });
//         return res.data;
//     }
//     const [{
//         data: nationalities,
//     }] = useAtom(quocGiaAtom);
//     const {data: dataStores, isPending: isPendingGetStores, isSuccess: isSuccessGetStores
//     } = useQuery({
//         queryKey: ['getStores'],
//         queryFn: apiGetStores,
//
//     })
//
//     function preOnCloseUpdate(_: boolean) {
//     }
//
//     function preOnCloseAddNew(_: boolean) {
//         setShowAddNew(false);
//     }
//
//     useEffect(() => {
//         if (!isPendingGetStores && isSuccessGetStores) {
//             // Filter dataStores for get store levels
//             const resultArray:IStoreLevel[] = dataStores?.map((item: any) => {
//                 return {
//                     level: item.CapDoCuaHang,
//                     name: item.TenCuaHang,
//                     id:item.IDCuaHang
//                 }
//             });
//             setStoreLevels(resultArray);
//             // Save session store levels
//             sessionStorage.setItem(STORAGE_ITEM.STORE_LEVEL, JSON.stringify(resultArray));
//         }
//     }, [isSuccessGetStores]);
//     return (
//         <div>
//             <div
//                 className={`${isDarkMode ? 'text-neutrals-400 border-b-darkGrey-2727' : 'text-semantics-grey01 border-b-neutrals-300'} titleContainer h-[88px] border-b-[1px] pl-[32px] pr-[33px] flex justify-between items-center`}>
//                 <div className="title text-[32px]">Cửa hàng</div>
//                 <div className={'flex gap-x-[25px]'}>
//                     <Button
//                         icon={<IconManageMenu isDarkMode={isDarkMode}/>}
//                         className={`${isDarkMode ? 'bg-[#f9f9fb] border-[#e7e7e9] text-neutrals-400' : ''} h-[40px]`}
//                         name={'Nhập theo danh sách'}/>
//                     <ButtonGradient
//                         onClick={() => setShowAddNew(true)}
//                         icon={<IconPlus/>}
//                         className={`${isDarkMode ? 'border-darkGrey-3838-important border' : ''} h-[40px] w-[165px] text-[16px]  px-[24px] gap-x-[14px]`}
//                         name={'Thêm mới'}/>
//                 </div>
//             </div>
//             <div
//                 className={'p-[32px] bg-backgroundContent h-[90vh] overflow-scroll  flex flex-wrap gap-x-[32px] gap-y-[32px]'}>
//
//                 {isPendingGetStores ? (
//                         [1, 2].map(item => (
//                             <StoreItem
//                                 domainImage={VITE_DOMAIN_IMAGE}
//                                 data={null}
//                                 isPending={true}
//                                 key={item}/>
//                         )))
//                     : (
//                         dataStores?.map((item: IItemStore) => (
//                             <StoreItem
//                                 domainImage={VITE_DOMAIN_IMAGE}
//                                 isPending={false}
//                                 key={item.IDCuaHang}
//                                 data={item}/>
//                         ))
//                     )}
//             </div>
//             {/*<AddNewEditStore*/}
//             {/*    storeLevels={storeLevels}*/}
//             {/*    nationalities={nationalities as Nationalities}*/}
//             {/*    showAddNew={showAddNew}*/}
//             {/*    showEditStore={false}*/}
//             {/*    onCloseAddNew={preOnCloseAddNew}*/}
//             {/*    onCloseUpdate={preOnCloseUpdate}*/}
//             {/*    storeEdit={false}/>*/}
//         </div>
//     );
// };
//
// export default Store;


const Store = () => {
    return (
        <div>
            Đang phát triển
        </div>
    );
};

export default Store;
