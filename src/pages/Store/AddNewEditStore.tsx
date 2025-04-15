// import {Drawer} from "antd";
// import Button from "../../components/Button";
// import ButtonGradient from "../../components/ButtonGradient";
// import {useEffect, useState} from "react";
// import {IconArrowLeft, IconSelectArrowLarge} from "../../assets/svgs/SVGIcon.tsx";
// import {useTheme} from "../../context/ThemeContext.tsx";
// import Loading from "../../components/Loading/Loading.tsx";
// import {LoaderPinwheel} from "lucide-react";
// import {Controller, useForm} from "react-hook-form";
// import {yupResolver} from "@hookform/resolvers/yup";
// import {formAddEditStore, formAddEditStoreDefault} from "../../constants/SchemaYups.ts";
// import SelectComp from "../../components/Select";
// import {IImageStoreFile, Nationalities} from "../../types";
// import {useAtom} from "jotai/index";
// import {
//     addressSelectionAtom,
//     phuongXaAtom,
//     quanHuyenAtom,
//     quocGiaAtom,
//     tinhThanhAtom
// } from "../../store/atom/commonAtom.ts";
// import Input from "../../components/Input";
// import {IStoreLevel} from "./Store.tsx";
// import {SelectOption} from "../../components/Select/SelectComp.tsx";
// import {STORAGE_ITEM} from "../../constants/StorageItem.ts";
// import ImageStoreImport from "./ImageStoreImport/ImageStoreImport.tsx";
//
// const AddNewEditStore = (props: AddNewEditStoreProps) => {
//         const {isDarkMode} = useTheme();
//         const {storeEdit, showAddNew} = props;
//         const [tabIndex, setTabIndex] = useState<'info' | 'image'>('info');
//         // const {VITE_DOMAIN_IMAGE} = import.meta.env;
//         const [addressSelect, setAddressSelected] = useAtom(addressSelectionAtom);
//         const [quocGiaState] = useAtom(quocGiaAtom);
//         const [tinhThanhState] = useAtom(tinhThanhAtom);
//         const [quanHuyenState] = useAtom(quanHuyenAtom);
//         const [phuongXaState] = useAtom(phuongXaAtom);
//         const [imageChange, setImageChange] = useState<IImageStoreFile | null>(null)
//     const [storeImg, setStoreImg] = useState<{ id: string, urlImg: string | File, keyName: string }>();
//     const [levelOptions, setLevelOptions] = useState<SelectOption[]>([]);
//         const [dependentOptions, setDependentOptions] = useState<SelectOption[]>([]);
//         const {
//             formState: {errors, isDirty, isValid},
//             control: controlStore,
//             setValue,
//             getValues,
//             watch,
//             reset
//         } = useForm({
//             resolver: yupResolver(formAddEditStore()),
//             mode: 'all',
//             defaultValues: formAddEditStoreDefault
//         })
//
//         function preOnTabClick(type: 'info' | 'image') {
//             setTabIndex(type);
//         }
//
//         function onGetProvinceByCountryCode(item: string | string[]) {
//             const national = quocGiaState.data?.find(x => x.CountryName === item);
//             setAddressSelected(pre => ({
//                 ...pre,
//                 quocGia: national
//             }))
//             // Reset province, district, ward
//             setValue('province', '', {
//                 shouldValidate: true,
//                 shouldDirty: true
//             });
//             setValue('district', '', {
//                 shouldValidate: true,
//                 shouldDirty: true
//             });
//             setValue('ward', '', {
//                 shouldValidate: true,
//                 shouldDirty: true
//             })
//
//         }
//
//         function onGetDistrictByProvinceCode(item: string | string[]) {
//             const province = tinhThanhState.data?.find(x => x.StateCode === item);
//             setAddressSelected(pre => ({
//                 ...pre,
//                 tinhThanh: province
//             }))
//
//             // Reset district, ward
//             setValue('district', '', {
//                 shouldValidate: true,
//                 shouldDirty: true
//             });
//             setValue('ward', '', {
//                 shouldValidate: true,
//                 shouldDirty: true
//             })
//         }
//
//         function onGetWardByDistrictCode(item: string | string[]) {
//             const district = quanHuyenState.data?.find(x => x.DistrictCode === item);
//             setAddressSelected(pre => ({
//                 ...pre,
//                 quanHuyen: district || null
//             }));
//             // Reset ward
//             setValue('ward', '', {
//                 shouldValidate: true,
//                 shouldDirty: true
//             })
//         }
//
//         useEffect(() => {
//             if (props.storeLevels?.length > 0) {
//                 // Create a list store dependent
//                 const uniqueDependent = props.storeLevels.map(x => ({
//                     label: x.name + '',
//                     value: x.id + ''
//                 }))
//                 setDependentOptions([
//                     ...uniqueDependent
//                 ]);
//                 // Create a list that item is unique by level
//                 const uniqueLevel = props.storeLevels.filter((item, index) => {
//                         return props.storeLevels.findIndex((item2) => item2.level === item.level) === index;
//                     }
//                 )
//                 setLevelOptions([
//                     ...uniqueLevel.map(x => ({
//                         label: 'Cấp ' + (x.level + 1),
//                         value: x.level + ''
//                     })), {
//                         label: 'Cấp ' + (uniqueLevel.length + 1),
//                         value: (uniqueLevel.length) + ''
//                     }
//                 ]);
//             }
//         }, [props.storeLevels]);
//         useEffect(() => {
//             const subscription = watch((value, {name}) => {
//                 if (name === 'storeLevel') {
//                     // Filter props.storeLevels by level that level <= store level to get store dependent
//                     const levelFromSession = JSON.parse(sessionStorage.getItem(STORAGE_ITEM.STORE_LEVEL) || '[]');
//                     const dependent = levelFromSession.filter(x => (x.level) < +(value?.storeLevel || 0));
//                     const uniqueDependent = dependent.map(x => ({
//                         label: x.name + '',
//                         value: x.id + ''
//                     }));
//                     setDependentOptions([
//                         ...uniqueDependent
//                     ]);
//                     setValue('storeDependent', '', {
//                         shouldValidate: true,
//                         shouldDirty: true
//                     })
//                 }
//
//             });
//             return () => subscription.unsubscribe();
//         }, [watch, getValues, setValue]);
//
//         async function handleReaderFileBinary(binary: ArrayBuffer | null, keyName: string, fileType: string) {
//             setImageChange({
//                 image: binary,
//                 fileType: fileType
//             })
//         }
//     function handleOnChangeImg(file: File | undefined, id: string, keyName: string) {
//         if (file === undefined) { // Delete image
//         } else { // Change image
//             const newImg: string | File  = file ? URL.createObjectURL(file) : '';
//             setStoreImg({
//                 id: id,
//                 urlImg: newImg,
//                 keyName: keyName
//             });
//         }
//     }
//         return (
//             <Drawer
//                 width={489}
//                 className={'add-new-store-drawer transition-all duration-300'}
//                 styles={{
//                     wrapper: {
//                         maxHeight: 'calc(100vh - 1.625rem)',
//                         margin: '1.625rem', // Space from right edge
//                         borderRadius: '24px'
//                     },
//                     body: {background: isDarkMode ? 'var(--color-dark-2E2E)' : ''},
//                     header: {
//                         paddingBottom: 0,
//                         background: isDarkMode ? 'var(--color-dark-2E2E)' : '',
//                         borderBottomColor: isDarkMode ? 'var(--color-dark-2727)' : '--color-neutrals-50'
//                     },
//                 }}
//                 title={<div className={'flex items-center gap-x-[1rem]'}>
//                     <div className={'cursor-pointer'} onClick={() =>
//                         (props.showAddNew ? props.onCloseAddNew(false) : props.onCloseUpdate(false))
//                     }>
//                         <IconArrowLeft isDarkMode={isDarkMode}/>
//                     </div>
//                     <div
//                         className={`${isDarkMode ? 'text-neutrals-400' : 'text-semantics-grey01'}  text-[32px] font-[500]`}>
//                         {props.showAddNew ? 'Thêm mới' : storeEdit?.MaSanPham}
//                     </div>
//                 </div>}
//                 destroyOnClose maskClosable={false} closeIcon={null} onClose={() => null}
//                 open={props.showAddNew || props.showEditStore}>
//                 <div id={'add-new-store-container'}
//                      className={`${isDarkMode ? 'bg-darkGrey-2E2E' : ''} add-new-product-container flex justify-between flex-col h-full w-[435px]`}>
//                     <div className="update-contents-container w-full  overflow-y-hidden">
//                         <div className="actions-tab flex mb-[24px] fixed w-auto bg-white gap-x-[17px] z-20 ">
//                             <div
//                                 onClick={() => preOnTabClick('info')}
//                                 className={`
//                              ${tabIndex === 'info' ? (isDarkMode ? ' border-[1.5px] border-darkGrey-3838 bg-darkGrey-2E2E text-neutrals-400 font-[600]' : ' border-[1.5px] border-darkGrey-A804033-20 bg-semantics-green03 text-semantics-green01 font-[600]') : (isDarkMode ? 'bg-darkGrey-3333 text-neutrals-600 ' : 'bg-neutrals-50 text-neutrals-700')}'}
//                               hover:cursor-pointer rounded-[8px] flex justify-center items-center  w-[131px] h-[42px]`}>
//                                 Thông tin
//                             </div>
//                             <div
//                                 onClick={() => preOnTabClick('image')}
//                                 className={`
//                             ${tabIndex === 'image' ? (isDarkMode ? ' border-[1.5px] border-darkGrey-3838 bg-darkGrey-2E2E text-neutrals-400 font-[600]' : ' border-[1.5px] border-darkGrey-A804033-20 bg-semantics-green03  font-[600]') : (isDarkMode ? 'bg-darkGrey-3333 text-neutrals-600 ' : 'bg-neutrals-50 text-neutrals-700')}'}
//                                 hover:cursor-pointer rounded-[8px] flex justify-center items-center  w-[131px] h-[42px]`}>
//                                 Hình ảnh
//                             </div>
//                         </div>
//                         <div
//                             className={`${tabIndex === 'info' ? 'visible' : 'hidden'} form-container h-full overflow-auto mt-[70px]   scroll-smooth pb-[70px]`}>
//                             <Controller
//                                 control={controlStore}
//                                 name='storeCode'
//                                 render={({field: {onChange, onBlur, value}}) => (
//                                     <div className={'control h-[98px] px-[2px]'}>
//                                         <label htmlFor={'storeCode'}
//                                                className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
//                                             Mã cửa hàng
//                                             <span className={'text-semantics-red02'}>*</span>
//                                         </label>
//                                         <div className={'relative flex '}>
//                                             <div className={'w-full max-h-[50px]'}>
//                                                 <Input
//                                                     warning={errors.storeCode?.message}
//                                                     id={'storeCode'}
//                                                     className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
//                                                     placeholder={'Nhập mã cửa hàng'}
//                                                     onChange={onChange}
//                                                     onBlur={onBlur}
//                                                     value={value || ''}
//                                                 />
//                                             </div>
//                                             <span
//                                                 className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
//                                                 {errors.storeCode?.message || ''}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )}
//                             />
//                             {/*Tên cửa hàng*/}
//                             <Controller
//                                 control={controlStore}
//                                 name='storeName'
//                                 render={({field: {onChange, onBlur, value}}) => (
//                                     <div className={'control h-[98px] px-[2px]'}>
//                                         <label htmlFor={'storeName'}
//                                                className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
//                                             Tên cửa hàng
//                                             <span className={'text-semantics-red02'}>*</span>
//                                         </label>
//                                         <div className={'relative flex '}>
//                                             <div className={'w-full max-h-[50px]'}>
//                                                 <Input
//                                                     warning={errors.storeName?.message}
//                                                     id={'storeName'}
//                                                     className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
//                                                     placeholder={'Nhập tên cửa hàng'}
//                                                     onChange={onChange}
//                                                     onBlur={onBlur}
//                                                     value={value || ''}
//                                                 />
//                                             </div>
//                                             <span
//                                                 className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
//                                                 {errors.storeName?.message || ''}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )}/>
//                             {/*Người dại diện*/}
//                             <Controller
//                                 control={controlStore}
//                                 name='storeRepresentative'
//                                 render={({field: {onChange, onBlur, value}}) => (
//                                     <div className={'control h-[98px] px-[2px]'}>
//                                         <label htmlFor={'storeRepresentative'}
//                                                className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
//                                             Người đại diện
//                                             <span className={'text-semantics-red02'}>*</span>
//                                         </label>
//                                         <div className={'relative flex '}>
//                                             <div className={'w-full max-h-[50px]'}>
//                                                 <Input
//                                                     warning={errors.storeRepresentative?.message}
//                                                     id={'storeRepresentative'}
//                                                     className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
//                                                     placeholder={'Nhập tên người đại diện'}
//                                                     onChange={onChange}
//                                                     onBlur={onBlur}
//                                                     value={value || ''}
//                                                 />
//                                             </div>
//                                             <span
//                                                 className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
//                                                 {errors.storeRepresentative?.message || ''}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )}/>
//                             {/*Cấp độ cửa hàng*/}
//                             <Controller
//                                 control={controlStore}
//                                 name='storeLevel'
//                                 render={({field: {value, onChange}}) => (
//                                     <div className={'control h-[92px]'}>
//                                         <label htmlFor={'storeLevel'}
//                                                className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
//                                             Cấp độ
//                                             <span className={'text-semantics-red02'}>*</span>
//                                         </label>
//                                         <div className={' flex px-[2px]'}>
//                                             <div className={'w-full max-h-[50px]'}>
//                                                 <SelectComp
//                                                     mode={'single'}
//                                                     onChange={onChange}
//                                                     value={value || ''}
//                                                     suffixIcon={<IconSelectArrowLarge/>}
//                                                     className={`control-add-store custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : 'bg-neutrals-100 '} h-[50px] text-[12px]`}
//                                                     options={levelOptions}
//                                                     placeholder={'Chọn cấp độ'}/>
//                                             </div>
//                                             <span
//                                                 className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
//                                                 {errors.national?.message || ''}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )}
//                             />
//                             {/*Cửa hàng phụ thuộc*/}
//                             <Controller
//                                 control={controlStore}
//                                 name='storeDependent'
//                                 render={({field: {value, onChange}}) => (
//                                     <div className={'control h-[92px]'}>
//                                         <label htmlFor={'storeDependent'}
//                                                className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
//                                             Thuộc cửa hàng
//                                         </label>
//                                         <div className={' flex px-[2px]'}>
//                                             <div className={'w-full max-h-[50px]'}>
//                                                 <SelectComp
//                                                     disabled={dependentOptions?.length === 0}
//                                                     mode={'single'}
//                                                     onChange={(item) => {
//                                                         // Get province by country code
//                                                         onChange(item);
//                                                     }}
//                                                     value={value || ''}
//                                                     suffixIcon={<IconSelectArrowLarge/>}
//                                                     className={`control-add-store custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : 'bg-neutrals-100 '} h-[50px] text-[12px]`}
//                                                     options={dependentOptions}
//                                                     placeholder={'Chọn cửa hàng phụ thuộc'}/>
//                                             </div>
//                                             <span
//                                                 className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
//                                                 {errors.storeDependent?.message || ''}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )}/>
//                             <Controller
//                                 control={controlStore}
//                                 name='national'
//                                 render={({field: {value, onChange}}) => (
//                                     <div className={'control h-[92px]'}>
//                                         <label htmlFor={'national'}
//                                                className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
//                                             Quốc gia
//                                             <span className={'text-semantics-red02'}>*</span>
//                                         </label>
//                                         <div className={' flex px-[2px]'}>
//                                             <div className={'w-full max-h-[50px]'}>
//                                                 <SelectComp
//                                                     mode={'single'}
//                                                     onChange={(item) => {
//                                                         // Get province by country code
//                                                         onGetProvinceByCountryCode(item);
//                                                         onChange(item);
//                                                     }}
//                                                     value={value || ''}
//                                                     suffixIcon={<IconSelectArrowLarge/>}
//                                                     className={`control-add-store custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : 'bg-neutrals-100 '} h-[50px] text-[12px]`}
//                                                     options={props.nationalities.map(x => ({
//                                                         label: x.CountryName,
//                                                         value: x.CountryName
//                                                     }))}
//                                                     placeholder={'Chọn quốc gia'}/>
//                                             </div>
//                                             <span
//                                                 className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
//                                                 {errors.national?.message || ''}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )}
//                             />
//                             <Controller
//                                 control={controlStore}
//                                 name='province'
//                                 render={({field: {value, onChange}}) => (
//                                     <div className={'control h-[92px]'}>
//                                         <label htmlFor={'provice'}
//                                                className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
//                                             Tỉnh/Thành phố
//                                             <span className={'text-semantics-red02'}>*</span>
//                                         </label>
//                                         <div className={' flex px-[2px]'}>
//                                             <div className={'w-full max-h-[50px]'}>
//                                                 <SelectComp
//                                                     mode={'single'}
//                                                     onChange={(item) => {
//                                                         onGetDistrictByProvinceCode(item);
//                                                         onChange(item);
//                                                     }}
//                                                     value={value || ''}
//                                                     suffixIcon={<IconSelectArrowLarge/>}
//                                                     className={`control-add-store custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : 'bg-neutrals-100 '} h-[50px] text-[12px]`}
//                                                     options={tinhThanhState.data?.map(x => ({
//                                                         label: x.StateName,
//                                                         value: x.StateCode
//                                                     }))}
//                                                     placeholder={'Chọn tỉnh thành'}/>
//                                             </div>
//                                             <span
//                                                 className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
//                                                 {errors.province?.message || ''}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )}
//                             />
//                             <Controller
//                                 control={controlStore}
//                                 name='district'
//                                 render={({field: {value, onChange}}) => (
//                                     <div className={'control h-[92px]'}>
//                                         <label htmlFor={'district'}
//                                                className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
//                                             Quận/Huyện
//                                             <span className={'text-semantics-red02'}>*</span>
//                                         </label>
//                                         <div className={' flex px-[2px]'}>
//                                             <div className={'w-full max-h-[50px]'}>
//                                                 <SelectComp
//                                                     mode={'single'}
//                                                     onChange={(item) => {
//                                                         onGetWardByDistrictCode(item);
//                                                         onChange(item);
//                                                     }}
//                                                     value={value || ''}
//                                                     suffixIcon={<IconSelectArrowLarge/>}
//                                                     className={`control-add-store custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : 'bg-neutrals-100 '} h-[50px] text-[12px]`}
//                                                     options={quanHuyenState.data?.map(x => ({
//                                                         label: x.DistrictName,
//                                                         value: x.DistrictCode
//                                                     })) || []}
//                                                     placeholder={'Chọn quận huyện'}/>
//                                             </div>
//                                             <span
//                                                 className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
//                                                 {errors.district?.message || ''}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )}
//                             />
//                             <Controller
//                                 control={controlStore}
//                                 name={'ward'}
//                                 render={({field: {value, onChange}}) => (
//                                     <div className={'control h-[92px]'}>
//                                         <label htmlFor={'ward'}
//                                                className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
//                                             Phường/Xã
//                                         </label>
//                                         <div className={' flex px-[2px]'}>
//                                             <div className={'w-full max-h-[50px]'}>
//                                                 <SelectComp
//                                                     mode={'single'}
//                                                     onChange={(item) => {
//                                                         onChange(item);
//                                                     }}
//                                                     value={value || ''}
//                                                     suffixIcon={<IconSelectArrowLarge/>}
//                                                     className={`control-add-store custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : 'bg-neutrals-100 '} h-[50px] text-[12px]`}
//                                                     options={phuongXaState.data?.map(x => ({
//                                                         label: x.WardName,
//                                                         value: x.WardCode
//                                                     })) || []}
//                                                     placeholder={'Chọn phường xã'}/>
//                                             </div>
//                                             <span
//                                                 className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
//                                                 {errors.ward?.message || ''}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )}/>
//
//                             {/*Địa chỉ*/}
//                             <Controller
//                                 control={controlStore}
//                                 name='address'
//                                 render={({field: {onChange, onBlur, value}}) => (
//                                     <div className={'control h-[98px] px-[2px]'}>
//                                         <label htmlFor={'address'}
//                                                className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
//                                             Địa chỉ
//                                             <span className={'text-semantics-red02'}>*</span>
//                                         </label>
//                                         <div className={'relative flex '}>
//                                             <div className={'w-full max-h-[50px]'}>
//                                                 <Input
//                                                     warning={errors.address?.message}
//                                                     id={'address'}
//                                                     className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
//                                                     placeholder={'Nhập địa chỉ'}
//                                                     onChange={onChange}
//                                                     onBlur={onBlur}
//                                                     value={value || ''}
//                                                 />
//                                             </div>
//                                             <span
//                                                 className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
//                                                 {errors.address?.message || ''}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )}/>
//                             {/*Số điện thoại*/}
//                             <Controller
//                                 control={controlStore}
//                                 name='phoneNumber'
//                                 render={({field: {onChange, onBlur, value}}) => (
//                                     <div className={'control h-[98px] px-[2px]'}>
//                                         <label htmlFor={'phoneNumber'}
//                                                className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
//                                             Số điện thoại
//                                             <span className={'text-semantics-red02'}>*</span>
//                                         </label>
//                                         <div className={'relative flex '}>
//                                             <div className={'w-full max-h-[50px]'}>
//                                                 <Input
//                                                     warning={errors.phoneNumber?.message}
//                                                     id={'phoneNumber'}
//                                                     className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
//                                                     placeholder={'Nhập số điện thoại'}
//                                                     onChange={onChange}
//                                                     onBlur={onBlur}
//                                                     value={value || ''}
//                                                 />
//                                             </div>
//                                             <span
//                                                 className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
//                                                 {errors.phoneNumber?.message || ''}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )}/>
//                             {/*Website*/}
//                             <Controller
//                                 control={controlStore}
//                                 name='website'
//                                 render={({field: {onChange, onBlur, value}}) => (
//                                     <div className={'control h-[98px] px-[2px]'}>
//                                         <label htmlFor={'website'}
//                                                className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
//                                             Website
//                                         </label>
//                                         <div className={'relative flex '}>
//                                             <div className={'w-full max-h-[50px]'}>
//                                                 <Input
//                                                     warning={errors.website?.message}
//                                                     id={'website'}
//                                                     className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
//                                                     placeholder={'Nhập website'}
//                                                     onChange={onChange}
//                                                     onBlur={onBlur}
//                                                     value={value || ''}
//                                                 />
//                                             </div>
//                                             <span
//                                                 className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
//                                                 {errors.website?.message || ''}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )}/>
//                             {/*Email*/}
//                             <Controller
//                                 control={controlStore}
//                                 name='email'
//                                 render={({field: {onChange, onBlur, value}}) => (
//                                     <div className={'control h-[98px] px-[2px]'}>
//                                         <label htmlFor={'email'}
//                                                className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
//                                             Email
//                                         </label>
//                                         <div className={'relative flex '}>
//                                             <div className={'w-full max-h-[50px]'}>
//                                                 <Input
//                                                     warning={errors.email?.message}
//                                                     id={'email'}
//                                                     className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
//                                                     placeholder={'Nhập email'}
//                                                     onChange={onChange}
//                                                     onBlur={onBlur}
//                                                     value={value || ''}
//                                                 />
//                                             </div>
//                                             <span
//                                                 className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
//                                                 {errors.email?.message || ''}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 )}/>
//                             {/*Mô tả*/}
//                         </div>
//                         <div
//                             className={`${tabIndex === 'image' ? 'visible' : 'hidden'} form-container pt-[70px] h-full pb-12 overflow-y-auto  flex flex-col gap-y-[1.25rem] `}>
//                             <div className={'image-wrapper'}>
//                                 <div className={'text-[#6E6D7A] text-[0.75rem] pb-[0.313rem]'}>Hình ảnh</div>
//                                 <div className={'text-semantics-red02 text-[12px] font-[500] mb-[24px]'}>(*) Dung lượng
//                                     hình {'<300KB'}</div>
//                                 <div className={'flex gap-[9px] flex-wrap'}>
//                                     <ImageStoreImport
//                                         isSubmitted={false}
//                                         onReaderFileBinary={handleReaderFileBinary}
//                                         keyName={'storeImage'}
//                                         onChange={handleOnChangeImg}
//                                         id={'storeImage'}
//                                         caption={'Ảnh đại diện'}
//                                         key={'storeImage'}
//                                         urlImg={storeImg?.urlImg || ''}/>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="submit-container flex gap-x-[8px] pt-[5px] ">
//                         <Button onClick={() => {
//                             if (showAddNew) {
//                                 props.onCloseAddNew(false)
//                             } else {
//                                 props.onCloseUpdate(false)
//                             }
//                         }}
//                                 className={`${isDarkMode ? 'border-darkGrey-3838-important text-neutrals-50' : ''} h-[53px] w-[210px]`}
//                                 name={'Hủy'}/>
//                         <ButtonGradient
//                             icon={1 === 1 ?
//                                 <LoaderPinwheel size={18} className={'animate-spin'}/> : null}
//                             onClick={() => null}
//                             className={`${isDarkMode ? 'border-darkGrey-3838-important' : ''} h-[53px] w-[210px] gap-x-2`}
//                             name={showAddNew ? 'Thêm sản phẩm' : 'Cập nhật'}/>
//                     </div>
//                 </div>
//                 {false && <Loading/>}
//             </Drawer>
//         );
//     }
// ;
//
// interface AddNewEditStoreProps {
//     showAddNew: boolean,
//     showEditStore: boolean,
//     onCloseAddNew: (isReload: boolean) => void,
//     onCloseUpdate: (isReload: boolean) => void,
//     onSubmit?: () => void,
//     storeEdit: any,
//     nationalities: Nationalities,
//     storeLevels: IStoreLevel[]
// }
//
// export default AddNewEditStore;



const AddNewEditStore = () => {
    return (
        <div>
            Doing something...
        </div>
    );
};

export default AddNewEditStore;
