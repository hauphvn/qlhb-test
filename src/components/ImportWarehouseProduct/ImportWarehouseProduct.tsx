import {Drawer} from "antd";
import Button from "../Button";
import ButtonGradient from "../ButtonGradient";
import {useEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {formImportWarehouseProduct, formImportWarehouseProductDefault} from "../../constants/SchemaYups.ts";
import Input from "../Input";
import {IProductDetails} from "../../types";
import {useTheme} from "../../context/ThemeContext.tsx";
import {IconArrowLeft} from "../../assets/svgs/SVGIcon.tsx";
import {post} from "../../libs";
import {API_PATH} from "../../constants/Path.ts";
import {useMutation} from "@tanstack/react-query";
import toast from "react-simple-toasts";
import {STORAGE_ITEM} from "../../constants/StorageItem.ts";

interface importWarehouseProductProps {
    show: boolean,
    onClose: () => void,
    onSubmit?: () => void,
    productEdit?: IProductDetails
}

const ImportWarehouseProduct = (props: importWarehouseProductProps) => {
    const {isDarkMode} = useTheme();
    const {productEdit} = props;

    const userId:string = sessionStorage.getItem(STORAGE_ITEM.STORE_ID) || localStorage.getItem(STORAGE_ITEM.STORE_ID) || '';
    const {
        formState: {errors, isDirty, isValid},
        control: controlEditProduct,
        reset,
        getValues,
    } = useForm({
        resolver: yupResolver(formImportWarehouseProduct()),
        mode: 'all',
        defaultValues: formImportWarehouseProductDefault
    })
    const onImport = async (params: {
        idSanPham: number,
        idNguoiDung: number,
        soLuongNhap: number
    }) => {
        const res = await post(API_PATH.PRODUCT.IMPORT, {
            "idsanpham": params.idSanPham,
            "soluongnhap": params.soLuongNhap,
            "idnguoidung": params.idNguoiDung
        });
        return res?.data;
    }
    const mutateImport = useMutation({
        mutationKey:['import-product'],
        mutationFn: onImport,
        onError: () => {
            toast('Cập nhật số lượng thất bại',
                {
                    position: 'top-center',
                    theme: isDarkMode ? 'dark' : 'light',
                    className: 'shadow shadow-semantics-red03  text-semantics-red02'
                });
        },
        onSuccess:(data: any) =>{
            if(data && data[0]?.success === '01'){
                toast('Cập nhật số lượng thành công',
                    {
                        position: 'top-center',
                        theme: isDarkMode ? 'dark' : 'light',
                        className: 'shadow shadow-semantics-green03 text-semantics-green01'
                    });
                return props.onSubmit ? props.onSubmit() : null;
            }else{
                toast(data[0]?.msgErr || 'Cập nhật số lượng thất bại',
                    {
                        position: 'top-center',
                        theme: isDarkMode ? 'dark' : 'light',
                        className: 'shadow shadow-semantics-red03  text-semantics-red02'
                    });
            }
        }
    })
    useEffect(() => {
        return () => {
            reset();
        }
    }, [productEdit]);

    useEffect(() => {
        reset({
            productName: props.productEdit?.TenSanPham,
            remainingQuantity: props.productEdit?.SoLuong?.toString() || '',
        })
    }, [props.productEdit?.TenSanPham, props.productEdit?.SoLuong])
    return (
        <Drawer
            width={489}
            className={'import-warehouse-product-drawer transition-all duration-300'}
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
                <div onClick={props.onClose}>
                    <IconArrowLeft isDarkMode={isDarkMode}/>
                </div>
                <div
                    className={`${isDarkMode ? 'text-neutrals-400' : 'text-semantics-grey01'}  text-[32px] font-[500]`}
                >
                    {props?.productEdit?.MaSanPham}
                    {/*PKG00001*/}
                </div>
            </div>}
            destroyOnClose maskClosable={false} closeIcon={null} onClose={props.onClose}
            open={props.show}>
            <div id={'import-warehouse-product-container'}
                 className={`${isDarkMode ? 'bg-darkGrey-2E2E' : ''} add-new-product-container flex justify-between flex-col h-full w-[435px]`}>
                <div className="import-warehouse-content-container w-full">
                    <div className="actions-tab flex mb-[24px] fixed w-full gap-x-[17px] ">
                        <div
                            className={`
                             ${(isDarkMode ? ' border-[1.5px] border-darkGrey-3838 bg-darkGrey-2E2E text-neutrals-400 font-[600]' : ' border-[1.5px] border-darkGrey-A804033-20 bg-semantics-green03 text-semantics-green01 font-[600]')}'} 
                              font-bold hover:cursor-pointer rounded-[8px] flex justify-center items-center  w-[131px] h-[42px]`}>
                            Nhập kho
                        </div>
                    </div>
                    <div
                        className={`form-container mt-[70px] max-h-[75vh] overflow-y-scroll scroll-smooth`}>
                        <Controller
                            control={controlEditProduct}
                            name='productName'
                            render={({field: {onChange, onBlur, value}}) => (
                                <div className={'control h-[98px] px-[2px]'}>
                                    <label htmlFor={'productName'}
                                           className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                        Tên sản phẩm
                                    </label>
                                    <div className={'relative flex '}>
                                        <div className={'w-full max-h-[50px]'}>
                                            <Input
                                                disabled
                                                warning={errors.productName?.message}
                                                id={'productName'}
                                                className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey01 disabled:text-neutrals-500 disabled:border-darkGrey-2C2C ' : 'bg-neutrals-200 disabled:text-semantics-grey01'} h-[50px] pl-[11px]`}
                                                placeholder={'Nhập tên sản phẩm'}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value || ''}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                        <div className="form-row flex gap-x-[8px] w-full flex-auto items-center">
                            <div className={'flex-1'}>
                                <Controller
                                    control={controlEditProduct}
                                    name='remainingQuantity'
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <div className={'control h-[98px]'}>
                                            <label htmlFor={'productName'}
                                                   className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                Trong kho
                                            </label>
                                            <div className={'relative flex px-[2px] '}>
                                                <div className={'w-full max-h-[50px]'}>
                                                    <Input
                                                        disabled
                                                        warning={errors.remainingQuantity?.message}
                                                        id={'remainingQuantity'}
                                                        className={`${isDarkMode ? 'disabled:text-neutrals-500 disabled:border-darkGrey-2C2C bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-200'} h-[50px] pl-[11px]`}
                                                        placeholder={'Nhập số lượng'}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value || ''}
                                                    />
                                                </div>
                                                <span
                                                    className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.remainingQuantity?.message || ''}
                                            </span>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                            <div className={'flex-1'}>
                                <Controller
                                    control={controlEditProduct}
                                    name='additionalQuantity'
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <div className={'control h-[98px]'}>
                                            <label htmlFor={'salePrice'}
                                                   className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                Nhập thêm
                                                <span className={'text-semantics-red02'}>*</span>
                                            </label>
                                            <div className={'relative flex px-[2px] '}>
                                                <div className={'w-full max-h-[50px]'}>
                                                    <Input
                                                        warning={errors.additionalQuantity?.message}
                                                        id={'additionalQuantity'}
                                                        className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}

                                                        placeholder={'Nhập số lượng'}
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value || ''}
                                                    />
                                                </div>
                                                <span
                                                    className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.additionalQuantity?.message || ''}
                                            </span>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        {/*<div*/}
                        {/*    className={`${isDarkMode ? 'bg-darkGrey-3838' : 'bg-neutrals-300'} horizontal-line w-full h-[1px] mb-[16px]`}></div>*/}
                    </div>


                </div>
                <div className="submit-container flex gap-x-[8px] pt-[5px] ">
                    <Button onClick={props.onClose}
                            className={`${isDarkMode ? 'border-darkGrey-3838-important text-neutrals-50' : ''} h-[53px] w-[210px]`}
                            name={'Hủy'}/>
                    <ButtonGradient
                        onClick={() =>{
                            mutateImport.mutate({
                                idSanPham: productEdit?.IDSanPham || -1,
                                idNguoiDung: userId ? +userId : -1,
                                soLuongNhap: +(getValues('additionalQuantity') || -1)
                            });
                        }}
                        className={`${isDarkMode ? 'border-darkGrey-3838-important' : ''} h-[53px] w-[210px]`}
                        disabled={!(isDirty && isValid)}
                        name={'Cập nhật'}/>
                </div>
            </div>
        </Drawer>
    );
};

export default ImportWarehouseProduct;
