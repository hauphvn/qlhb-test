import {Drawer} from "antd";
import Button from "../../components/Button";
import ButtonGradient from "../../components/ButtonGradient";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {formAddEditCustomer, formAddEditCustomerDefault} from "../../constants/SchemaYups.ts";
import Input from "../../components/Input";
import SelectComp from "../../components/Select";
import {IconArrowLeft, IconSelectArrowLarge} from "../../assets/svgs/SVGIcon.tsx";
import {ICustomerDetail, Nationalities} from "../../types";
import {useTheme} from "../../context/ThemeContext.tsx";
import {GenderOptions} from "../../constants/AppContants.ts";
import Loading from "../../components/Loading/Loading.tsx";
import CurrencyInput from "../../components/CurrencyInput";
import {LoaderPinwheel} from "lucide-react";
import {useAtom} from "jotai/index";
import {
    addressSelectionAtom,
    phuongXaAtom,
    quanHuyenAtom,
    quocGiaAtom,
    tinhThanhAtom
} from "../../store/atom/commonAtom.ts";

const AddNewOrUpdateCustomer = (props: AddNewOrUpdateCustomerProps) => {
        const {isDarkMode} = useTheme();
        const {customerEdit, showAddNew} = props;
        const [tabIndex, setTabIndex] = useState<'info' | 'desc' | 'category'>('info');
        const [genderIndex, setGenderIndex] = useState<0 | 1 | -1>(-1);
        const [_, setAddressSelected] = useAtom(addressSelectionAtom);
        const [quocGiaState] = useAtom(quocGiaAtom);
        const [tinhThanhState] = useAtom(tinhThanhAtom);
        const [quanHuyenState] = useAtom(quanHuyenAtom);
        const [phuongXaState] = useAtom(phuongXaAtom);

        function preOnTabClick(type: 'info' | 'desc' | 'category') {
            setTabIndex(type);
        }

        function preOnGenderIndexClick(type: 0 | 1 | -1) {
            setGenderIndex(type);
        }

        const {
            formState: {errors},
            control: controlCustomer,
            getValues,
            setValue,
        } = useForm({
            resolver: yupResolver(formAddEditCustomer()),
            mode: 'all',
            defaultValues: formAddEditCustomerDefault
        })

        function onGetWardByDistrictCode(item: string | string[]) {
            const district = quanHuyenState.data?.find(x => x.DistrictCode === item);
            setAddressSelected(pre => ({
                ...pre,
                quanHuyen: district || null
            }));
            // Reset ward
            setValue('ward', '', {
                shouldValidate: true,
                shouldDirty: true
            })
        }

        function onGetDistrictByProvinceCode(item: string | string[]) {
            const province = tinhThanhState.data?.find(x => x.StateCode === item);
            setAddressSelected(pre => ({
                ...pre,
                tinhThanh: province
            }))

            // Reset district, ward
            setValue('district', '', {
                shouldValidate: true,
                shouldDirty: true
            });
            setValue('ward', '', {
                shouldValidate: true,
                shouldDirty: true
            })
        }

        function onGetProvinceByCountryCode(item: string | string[]) {
            const national = quocGiaState.data?.find(x => x.CountryName === item);
            setAddressSelected(pre => ({
                ...pre,
                quocGia: national
            }))
            // Reset province, district, ward
            setValue('province', '', {
                shouldValidate: true,
                shouldDirty: true
            });
            setValue('district', '', {
                shouldValidate: true,
                shouldDirty: true
            });
            setValue('ward', '', {
                shouldValidate: true,
                shouldDirty: true
            })

        }

        function preSubmit() {
            console.log('Submit', getValues());
            alert("Đang phát triển");
        }

        return (
            <Drawer
                width={489}
                className={'add-new-product-drawer transition-all duration-300'}
                styles={{
                    wrapper: {
                        maxHeight: 'calc(100vh - 1.625rem)',
                        margin: '1.625rem', // Space from right edge
                        borderRadius: '24px'
                    },
                    body: {background: isDarkMode ? 'var(--color-dark-2E2E)' : ''},
                    header: {
                        paddingBottom: 0,
                        background: isDarkMode ? 'var(--color-dark-2E2E)' : '',
                        borderBottomColor: isDarkMode ? 'var(--color-dark-2727)' : '--color-neutrals-50'
                    },
                }}
                title={<div className={'flex items-center gap-x-[1rem]'}>
                    <div className={'cursor-pointer'} onClick={() =>
                        (props.showAddNew ? props.onCloseAddNew(false) : props.onCloseUpdate(false))
                    }>
                        <IconArrowLeft isDarkMode={isDarkMode}/>
                    </div>
                    <div
                        className={`${isDarkMode ? 'text-neutrals-400' : 'text-semantics-grey01'}  text-[32px] font-[500]`}>
                        {props.showAddNew ? 'Thêm mới' : customerEdit?.FirstName}
                    </div>
                </div>}
                destroyOnClose maskClosable={false} closeIcon={null} onClose={() => props.onCloseAddNew}
                open={props.showAddNew || props.showEditCustomer}>
                <div id={'add-new-customer-container'}
                     className={`${isDarkMode ? 'bg-darkGrey-2E2E' : ''} add-new-customer-container flex justify-between flex-col h-full w-[435px]`}>
                    <div className="update-contents-container w-full  overflow-y-hidden">
                        <div className="actions-tab flex mb-[24px] fixed w-auto bg-white gap-x-[17px] z-20 ">
                            <div
                                onClick={() => preOnTabClick('info')}
                                className={`
                             ${tabIndex === 'info' ? (isDarkMode ? ' border-[1.5px] border-darkGrey-3838 bg-darkGrey-2E2E text-neutrals-400 font-[600]' : ' border-[1.5px] border-darkGrey-A804033-20 bg-brand01Tint40 text-brand01Shade40 font-[600]') : (isDarkMode ? 'bg-darkGrey-3333 text-neutrals-600 ' : 'bg-neutrals-50 text-neutrals-700')}'} 
                              hover:cursor-pointer rounded-[8px] flex justify-center items-center  w-[131px] h-[42px]`}>
                                Thông tin
                            </div>
                            <div
                                onClick={() => preOnTabClick('desc')}
                                className={`
                            ${tabIndex === 'desc' ? (isDarkMode ? ' border-[1.5px] border-darkGrey-3838 bg-darkGrey-2E2E text-neutrals-400 font-[600]' : ' border-[1.5px] border-darkGrey-A804033-20 bg-brand01Tint40 text-brand01Shade40  font-[600]') : (isDarkMode ? 'bg-darkGrey-3333 text-neutrals-600 ' : 'bg-neutrals-50 text-neutrals-700')}'} 
                                hover:cursor-pointer rounded-[8px] flex justify-center items-center  w-[131px] h-[42px]`}>
                                Mô tả
                            </div>
                            <div
                                onClick={() => preOnTabClick('category')}
                                className={`
                             ${tabIndex === 'category' ? (isDarkMode ? ' border-[1.5px] border-darkGrey-3838 bg-darkGrey-2E2E text-neutrals-400 font-[600]' : ' border-[1.5px] border-darkGrey-A804033-20 bg-brand01Tint40 text-brand01Shade40  font-[600]') : (isDarkMode ? 'bg-darkGrey-3333 text-neutrals-600 ' : 'bg-neutrals-50 text-neutrals-700')}'} 
                               hover:cursor-pointer  rounded-[8px] flex justify-center items-center  w-[131px] h-[42px]`}>
                                Nhóm sản phẩm
                            </div>
                        </div>
                        <div
                            className={`${tabIndex === 'info' ? 'visible' : 'hidden'} form-container mt-[70px] max-h-[75vh] overflow-y-scroll scroll-smooth pb-[70px]`}>

                            <Controller
                                control={controlCustomer}
                                name='title'
                                render={({field: {value, onChange}}) => (
                                    <div className={'control h-[92px]'}>
                                        <label htmlFor={'title'}
                                               className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                            Danh xưng
                                            <span className={'text-semantics-red02'}>*</span>
                                        </label>
                                        <div className={'relative flex px-[2px]'}>
                                            <div className={'w-full max-h-[50px]'}>
                                                <SelectComp
                                                    mode={'single'}
                                                    onChange={onChange}
                                                    value={value || ''}
                                                    suffixIcon={<IconSelectArrowLarge/>}
                                                    className={`control-add-product custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : 'bg-neutrals-100 '} h-[50px] text-[12px]`}
                                                    options={GenderOptions}
                                                    placeholder={'Chọn danh xưng'}/>
                                            </div>
                                            <span
                                                className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.title?.message || ''}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            />
                            <div className="form-row flex gap-x-[8px] w-full flex-auto items-center">

                                <div className={'flex-1'}>
                                    <Controller
                                        control={controlCustomer}
                                        name='lastName'
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <div className={'control h-[98px]'}>
                                                <label htmlFor={'lastName'}
                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                    Họ
                                                    <span className={'text-semantics-red02'}>*</span>
                                                </label>
                                                <div className={'relative flex px-[2px] '}>
                                                    <div className={'w-full max-h-[50px]'}>
                                                        <Input
                                                            warning={errors.lastName?.message}
                                                            id={'lastName'}
                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}

                                                            placeholder={'Nhập họ'}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value || ''}
                                                        />
                                                    </div>
                                                    <span
                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.lastName?.message || ''}
                                            </span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className={'flex-1'}>
                                    <Controller
                                        control={controlCustomer}
                                        name='firstName'
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <div className={'control h-[98px]'}>
                                                <label htmlFor={'firstName'}
                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                    Tên
                                                    <span className={'text-semantics-red02'}>*</span>
                                                </label>
                                                <div className={'relative flex px-[2px] '}>
                                                    <div className={'w-full max-h-[50px]'}>
                                                        <Input
                                                            warning={errors.firstName?.message}
                                                            id={'firstName'}
                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}

                                                            placeholder={'Nhập tên'}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value || ''}
                                                        />
                                                    </div>
                                                    <span
                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.firstName?.message || ''}
                                            </span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className={'flex gap-x-6 mb-3'}>
                                <div
                                    onClick={() => preOnGenderIndexClick(1)}
                                    className={`
                             ${genderIndex === 1 ? (isDarkMode ? ' border-[1.5px] border-darkGrey-3838 bg-darkGrey-2E2E text-neutrals-400 font-[600]' : ' border-[1.5px] border-darkGrey-A804033-20 bg-brand01Tint40 text-brand01Shade40 font-[600]') : (isDarkMode ? 'bg-darkGrey-3333 text-neutrals-600 ' : 'bg-neutrals-50 text-neutrals-700')}'} 
                              hover:cursor-pointer rounded-[8px] flex justify-center items-center max-w-fit px-[18px] py-[10px]`}>
                                    Nam
                                </div>
                                <div
                                    onClick={() => preOnGenderIndexClick(0)}
                                    className={`
                             ${genderIndex === 0 ? (isDarkMode ? ' border-[1.5px] border-darkGrey-3838 bg-darkGrey-2E2E text-neutrals-400 font-[600]' : ' border-[1.5px] border-darkGrey-A804033-20 bg-brand01Tint40 text-brand01Shade40 font-[600]') : (isDarkMode ? 'bg-darkGrey-3333 text-neutrals-600 ' : 'bg-neutrals-50 text-neutrals-700')}'} 
                              hover:cursor-pointer rounded-[8px] flex justify-center items-center max-w-fit px-[18px] py-[10px]`}>
                                    Nữ
                                </div>
                                <div
                                    onClick={() => preOnGenderIndexClick(-1)}
                                    className={`
                             ${genderIndex === -1 ? (isDarkMode ? ' border-[1.5px] border-darkGrey-3838 bg-darkGrey-2E2E text-neutrals-400 font-[600]' : ' border-[1.5px] border-darkGrey-A804033-20 bg-brand01Tint40 text-brand01Shade40 font-[600]') : (isDarkMode ? 'bg-darkGrey-3333 text-neutrals-600 ' : 'bg-neutrals-50 text-neutrals-700')}'} 
                              hover:cursor-pointer rounded-[8px] flex justify-center items-center max-w-fit px-[18px] py-[10px]`}>
                                    Không chọn
                                </div>
                            </div>
                            <div className="form-row flex gap-x-[8px] w-full flex-auto items-center">
                                <div className={'flex-1'}>
                                    <Controller
                                        control={controlCustomer}
                                        name='phoneNumber'
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <div className={'control h-[98px]'}>
                                                <label htmlFor={'phoneNumber'}
                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                    Điện thoại
                                                    <span className={'text-semantics-red02'}>*</span>
                                                </label>
                                                <div className={'relative flex px-[2px] '}>
                                                    <div className={'w-full max-h-[50px]'}>
                                                        <CurrencyInput
                                                            warning={errors.phoneNumber?.message}
                                                            id={'account'}
                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
                                                            placeholder={'Nhập số điện thoại'}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value || ''}
                                                        />
                                                    </div>
                                                    <span
                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.phoneNumber?.message || ''}
                                            </span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className={'flex-1'}>
                                    {/*<Controller*/}
                                    {/*    control={controlCustomer}*/}
                                    {/*    name='salePrice'*/}
                                    {/*    render={({field: {onChange, onBlur, value}}) => (*/}
                                    {/*        <div className={'control h-[98px]'}>*/}
                                    {/*            <label htmlFor={'salePrice'}*/}
                                    {/*                   className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>*/}
                                    {/*                Ngày sinh*/}
                                    {/*            </label>*/}
                                    {/*            <div className={'relative flex px-[2px] '}>*/}
                                    {/*                <div className={'w-full max-h-[50px]'}>*/}
                                    {/*                    <CurrencyInput*/}
                                    {/*                        disabled={getValues('isContactPrice')}*/}
                                    {/*                        warning={errors.salePrice?.message}*/}
                                    {/*                        id={'salePrice'}*/}
                                    {/*                        className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}*/}
                                    {/*                        placeholder={'Nhập tên đệm và tên'}*/}
                                    {/*                        onChange={onChange}*/}
                                    {/*                        onBlur={onBlur}*/}
                                    {/*                        value={value}*/}
                                    {/*                    />*/}
                                    {/*                </div>*/}
                                    {/*                <span*/}
                                    {/*                    className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>*/}
                                    {/*            {errors.salePrice?.message || ''}*/}
                                    {/*        </span>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    )}*/}
                                    {/*/>*/}
                                </div>
                            </div>
                            <Controller
                                control={controlCustomer}
                                name='email'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <div className={'control h-[98px] px-[2px]'}>
                                        <label htmlFor={'email'}
                                               className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                            Email
                                            <span className={'text-semantics-red02'}>*</span>
                                        </label>
                                        <div className={'relative flex '}>
                                            <div className={'w-full max-h-[50px]'}>
                                                <Input
                                                    warning={errors.email?.message}
                                                    id={'email'}
                                                    className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
                                                    placeholder={'Nhập email'}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value || ''}
                                                />
                                            </div>
                                            <span
                                                className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.email?.message || ''}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            />
                            <Controller
                                control={controlCustomer}
                                name='national'
                                render={({field: {value, onChange}}) => (
                                    <div className={'control h-[92px]'}>
                                        <label htmlFor={'national'}
                                               className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                            Quốc gia
                                            <span className={'text-semantics-red02'}>*</span>
                                        </label>
                                        <div className={' flex px-[2px]'}>
                                            <div className={'w-full max-h-[50px]'}>
                                                <SelectComp
                                                    mode={'single'}
                                                    onChange={(item) => {
                                                        // Get province by country code
                                                        onGetProvinceByCountryCode(item);
                                                        onChange(item);
                                                    }}
                                                    value={value || ''}
                                                    suffixIcon={<IconSelectArrowLarge/>}
                                                    className={`control-add-store custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : 'bg-neutrals-100 '} h-[50px] text-[12px]`}
                                                    options={props.nationalities.map(x => ({
                                                        label: x.CountryName,
                                                        value: x.CountryName
                                                    }))}
                                                    placeholder={'Chọn quốc gia'}/>
                                            </div>
                                            <span
                                                className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.national?.message || ''}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            />
                            <Controller
                                control={controlCustomer}
                                name='province'
                                render={({field: {value, onChange}}) => (
                                    <div className={'control h-[92px]'}>
                                        <label htmlFor={'provice'}
                                               className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                            Tỉnh/Thành phố
                                            <span className={'text-semantics-red02'}>*</span>
                                        </label>
                                        <div className={' flex px-[2px]'}>
                                            <div className={'w-full max-h-[50px]'}>
                                                <SelectComp
                                                    mode={'single'}
                                                    onChange={(item) => {
                                                        onGetDistrictByProvinceCode(item);
                                                        onChange(item);
                                                    }}
                                                    value={value || ''}
                                                    suffixIcon={<IconSelectArrowLarge/>}
                                                    className={`control-add-store custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : 'bg-neutrals-100 '} h-[50px] text-[12px]`}
                                                    options={tinhThanhState.data?.map(x => ({
                                                        label: x.StateName,
                                                        value: x.StateCode
                                                    }))}
                                                    placeholder={'Chọn tỉnh thành'}/>
                                            </div>
                                            <span
                                                className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.province?.message || ''}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            />
                            <Controller
                                control={controlCustomer}
                                name='district'
                                render={({field: {value, onChange}}) => (
                                    <div className={'control h-[92px]'}>
                                        <label htmlFor={'district'}
                                               className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                            Quận/Huyện
                                            <span className={'text-semantics-red02'}>*</span>
                                        </label>
                                        <div className={' flex px-[2px]'}>
                                            <div className={'w-full max-h-[50px]'}>
                                                <SelectComp
                                                    mode={'single'}
                                                    onChange={(item) => {
                                                        onGetWardByDistrictCode(item);
                                                        onChange(item);
                                                    }}
                                                    value={value || ''}
                                                    suffixIcon={<IconSelectArrowLarge/>}
                                                    className={`control-add-store custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : 'bg-neutrals-100 '} h-[50px] text-[12px]`}
                                                    options={quanHuyenState.data?.map(x => ({
                                                        label: x.DistrictName,
                                                        value: x.DistrictCode
                                                    })) || []}
                                                    placeholder={'Chọn quận huyện'}/>
                                            </div>
                                            <span
                                                className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.district?.message || ''}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            />
                            <Controller
                                control={controlCustomer}
                                name={'ward'}
                                render={({field: {value, onChange}}) => (
                                    <div className={'control h-[92px]'}>
                                        <label htmlFor={'ward'}
                                               className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                            Phường/Xã
                                        </label>
                                        <div className={' flex px-[2px]'}>
                                            <div className={'w-full max-h-[50px]'}>
                                                <SelectComp
                                                    mode={'single'}
                                                    onChange={(item) => {
                                                        onChange(item);
                                                    }}
                                                    value={value || ''}
                                                    suffixIcon={<IconSelectArrowLarge/>}
                                                    className={`control-add-store custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : 'bg-neutrals-100 '} h-[50px] text-[12px]`}
                                                    options={phuongXaState.data?.map(x => ({
                                                        label: x.WardName,
                                                        value: x.WardCode
                                                    })) || []}
                                                    placeholder={'Chọn phường xã'}/>
                                            </div>
                                            <span
                                                className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.ward?.message || ''}
                                            </span>
                                        </div>
                                    </div>
                                )}/>

                            {/*Địa chỉ*/}
                            <Controller
                                control={controlCustomer}
                                name='address'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <div className={'control h-[98px] px-[2px]'}>
                                        <label htmlFor={'address'}
                                               className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                            Địa chỉ
                                            <span className={'text-semantics-red02'}>*</span>
                                        </label>
                                        <div className={'relative flex '}>
                                            <div className={'w-full max-h-[50px]'}>
                                                <Input
                                                    warning={errors.address?.message}
                                                    id={'address'}
                                                    className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
                                                    placeholder={'Nhập địa chỉ'}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value || ''}
                                                />
                                            </div>
                                            <span
                                                className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.address?.message || ''}
                                            </span>
                                        </div>
                                    </div>
                                )}/>
                        </div>
                        <div
                            className={`${tabIndex === 'desc' ? 'visible' : 'hidden'} form-container pt-[70px] h-full pb-12 overflow-y-auto  flex flex-col gap-y-[1.25rem] `}>
                        </div>

                        <div
                            className={`${tabIndex === 'category' ? 'visible' : 'hidden'} form-container mt-[70px] max-h-[66vh] overflow-auto scroll-smooth`}>
                        </div>
                    </div>
                    <div className="submit-container flex gap-x-[8px] pt-[5px] ">
                        <Button onClick={() => {
                            if (showAddNew) {
                                props.onCloseAddNew(false)
                            } else {
                                props.onCloseUpdate(false)
                            }
                        }}
                                className={`${isDarkMode ? 'border-darkGrey-3838-important text-neutrals-50' : ''} h-[53px] w-[210px]`}
                                name={'Hủy'}/>
                        <ButtonGradient
                            icon={(false) ?
                                <LoaderPinwheel size={18} className={'animate-spin'}/> : null}
                            // disabled={!(isDirty && isValid)}
                            onClick={() => preSubmit()}
                            className={`${isDarkMode ? 'border-darkGrey-3838-important' : ''} h-[53px] w-[210px] gap-x-2`}
                            name={showAddNew ? 'Thêm khách hàng' : 'Cập nhật'}/>
                    </div>
                </div>
                {false && <Loading/>}
            </Drawer>
        );
    }
;

interface AddNewOrUpdateCustomerProps {
    showAddNew: boolean,
    showEditCustomer: boolean,
    onCloseAddNew: (isReload: boolean) => void,
    onCloseUpdate: (isReload: boolean) => void,
    onSubmit?: () => void,
    customerEdit: ICustomerDetail,
    nationalities: Nationalities

}

export default AddNewOrUpdateCustomer;
