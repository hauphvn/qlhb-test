import './tableProductStyle.css';
import 'react-simple-toasts/dist/theme/dark.css';
import 'react-simple-toasts/dist/theme/light.css';
import Button from "../../components/Button";
import ButtonGradient from "../../components/ButtonGradient";
import {
    IconFilter,
    IconInputSearch,
    IconManageMenu,
    IconPen,
    IconPlus,
    IconPrinter,
    IconRecycling, IconSelectArrowButton,
    IconWarehouse
} from "../../assets/svgs/SVGIcon.tsx";
import Input from "../../components/Input";
import {Skeleton, Table, TableProps} from "antd";
import {useEffect, useRef, useState} from "react";
import {IProductDetails, IResProduct, NhomSanPham} from "../../types";
import FilterProduct from "../../components/FilterProduct";
import ErrorModal from "../../components/ErrorModal/ErrorModal.tsx";
import {useTheme} from "../../context/ThemeContext.tsx";
import ImportWarehouseProduct from "../../components/ImportWarehouseProduct";
import CreateItemProductPrinter from "../../components/CreateItemProductPrinter";
import {error500, FormatCurrency, ProductGet} from "../../constants";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {get, post} from "../../libs";
import {API_PATH} from "../../constants/Path.ts";
import {STORAGE_ITEM} from "../../constants/StorageItem.ts";
import toast from "react-simple-toasts";
import Loading from "../../components/Loading";
import {FilterProductType} from "../../components/FilterProduct/FilterProduct.tsx";
import CurrencyInput from "../../components/CurrencyInput";
import {useAtom} from "jotai/index";
import {nhomSanPhamxQueryAtom} from "../../store/atom/commonAtom.ts";
import TextSkeleton from "../../components/TextSkeleton/TextSkeleton.tsx";
import SelectComp from "../../components/Select";
import {SelectOption} from "../../components/Select/SelectComp.tsx";
import AddNewOrUpdateProduct from "./AddNewOrUpdateProduct.tsx";

export interface StoreOptions {
    label: string,
    value: string
}

interface ISearchParam {
    productName: string,
    categoryId: string,
    page?: number,
    total?: number,
    typeGet?: number,
    outOfStockValue?: number | undefined
}

const Product = () => {
    const {VITE_DOMAIN_IMAGE} = import.meta.env;
    const {isDarkMode} = useTheme();
    const [showAddNew, setShowAddNew] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [stores, setStores] = useState<StoreOptions[]>([]);
    const [delayInputSearch, setDelayInputSearch] = useState('');
    const [valuesPrinter, setValuesPrinter] = useState<{
        [key: string]: {
            productId: string,
            goldRate: string,
            goldRateFormat: string,
            laborCost: string,
            laborCostFormat: string,
            productName: string
        }
    }>({});
    // const [page, setPage] = useState(1);
    const [paramSearch, setParamSearch] = useState<ISearchParam>({
        productName: '',
        categoryId: '-1',
        typeGet: ProductGet.TypeGetAll,
        page: 1,
        total: 20
    });
    const [showPrinterPDF, setShowPrinterPDF] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [products, setProducts] = useState<IResProduct[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [printerIdCurrent, setPrinterIdCurrent] = useState(-1);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const getAllStoreByParentId = async () => {
        const res = await get(API_PATH.STORE.GET_ALL_BY_STORE_PARENT_ID + `?id=${localStorage.getItem(STORAGE_ITEM.STORE_PARENT_ID) || sessionStorage.getItem(STORAGE_ITEM.STORE_PARENT_ID)}`);
        return res.data;
    }
    const getProductDetail = async (productID: string) => {
        const res = await post(API_PATH.PRODUCT.GET_BY_ID,{
            idSanPham: productID
        });
        return res.data;
    }
    const [{data: nhomSanPhams, isLoading: isLoadingNhomSanPhams}] = useAtom(nhomSanPhamxQueryAtom);
    const [optionsNhomSanPham, setOptionsNhomSanPham] = useState<SelectOption[]>([]);
    const [nameProduceDelete, setNameProduceDelete] = useState('');
    const [productIdDelete, setProductIdDelete] = useState(-1);
    const [categorySelected, setCategorySelected] = useState<string | undefined>(undefined);
    const {
        data: infiniteData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: loadingProducts,
        isError: errorProducts,
        isSuccess: successProducts,
        isFetching: fetchingProducts,
        refetch
    } = useInfiniteQuery({
        queryKey: ['products', paramSearch],
        queryFn: async ({pageParam = 1}) => {
            const res = await post(API_PATH.PRODUCT.GET_ALL, {
                "loai": paramSearch.typeGet,
                "idcuahang": localStorage.getItem(STORAGE_ITEM.STORE_ID) || sessionStorage.getItem(STORAGE_ITEM.STORE_ID),
                "keyword": paramSearch.productName,
                "idnhomsanpham": categorySelected ? +categorySelected : -1,
                "idvaitro": localStorage.getItem(STORAGE_ITEM.ROLE_ID) || sessionStorage.getItem(STORAGE_ITEM.ROLE_ID),
                "sotrang": pageParam,
                "soitem": 10,
                "soluongsanpham": paramSearch.outOfStockValue ? paramSearch.outOfStockValue : null
            });
            return res.data;
        },
        getNextPageParam: (lastPage, allPages) => {
            // Return next page number if there's more data, undefined if no more data
            return lastPage?.length === 10 ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1,
        // enabled: !paramSearch.categoryId,
    });

    const {
        data: dataStores,
        isSuccess: successStores,
        isLoading: loadingStores,
    } = useQuery({
        queryKey: ['stores'],
        queryFn: getAllStoreByParentId,
    });
    const {
        mutate: mutateUpdateProduct,
        isPending: isPendingUpdateProduct,
    } = useMutation({
        mutationKey: ['updateProduct'],
        mutationFn: getProductDetail,
        onSuccess: (data) => {
            if (data?.metadata) {
                setProductEdit({
                    Cao: data?.metadata?.Cao,
                    Dai: data?.metadata?.Dai,
                    GiaBan: data?.metadata?.GiaBan,
                    GiaSauGiam: data?.metadata?.GiaSauGiam,
                    GiaTriTienTe: data?.metadata?.GiaTriTienTe,
                    GiamGia: data?.metadata?.GiamGia,
                    IDCuaHang: data?.metadata?.IDCuaHang,
                    IDDonViTinh: data?.metadata?.IDDonViTinh,
                    IDSanPham: data?.metadata?.IDSanPham,
                    KhoiLuong: data?.metadata?.KhoiLuong,
                    KhoiLuong1: data?.metadata?.KhoiLuong1,
                    MaSanPham: data?.metadata?.MaSanPham,
                    MoTa: data?.metadata?.MoTa,
                    MoTaNgan: data?.metadata?.MoTaNgan,
                    Rong: data?.metadata?.Rong,
                    SanPhamTrucTuyen: data?.metadata?.SanPhamTrucTuyen,
                    SoLuong: data?.metadata?.SoLuong,
                    TenSanPham: data?.metadata?.TenSanPham,
                    ThoiGianBaoHanh: data?.metadata?.ThoiGianBaoHanh,
                    TriGia: data?.metadata?.TriGia,
                    URLImage: data?.metadata?.URLImage,
                    URLImage2: data?.metadata?.URLImage2,
                    URLImage3: data?.metadata?.URLImage3,
                    URLImage4: data?.metadata?.URLImage4,
                    URLImage5: data?.metadata?.URLImage5,
                    IdsNhomSanPham: data?.metadata?.IdsNhomSanPham,
                    actionType: 'update'
                });
                setShowUpdate(true);
            }
        }
    })

    // call api to delete product by productID
    const deleteProduct = async (id: number) => {
        const res = await post(API_PATH.PRODUCT.DELETE, {"idsanpham": id});
        return res.data;
    }

    function resetVariableDelete() {
        setNameProduceDelete('');
        setProductIdDelete(-1);
    }

    const {mutate: mutationDeleteProduct, isPending: isPendingDelete} = useMutation({
        mutationKey: ['deleteProduct'],
        mutationFn: deleteProduct,
        onSuccess: (data: any) => {
            if (data && data[0]?.success !== '01') {
                toast(data[0]?.msgErr || 'Xoá sản phẩm thất bại',
                    {
                        position: 'top-center',
                        theme: isDarkMode ? 'dark' : 'light',
                        className: 'shadow shadow-semantics-red03  text-semantics-red02'
                    });
            } else {
                queryClient.invalidateQueries({
                    queryKey: ['products', paramSearch]
                });
                toast('Xoá sản phẩm thành công',
                    {
                        position: 'top-center',
                        theme: isDarkMode ? 'dark' : 'light',
                        className: 'shadow shadow-semantics-green03  text-semantics-green02'
                    });
            }
        },
        onError: () => {
            toast('Xoá sản phẩm thất bại',
                {
                    position: 'top-center',
                    theme: isDarkMode ? 'dark' : 'light',
                    className: 'shadow shadow-semantics-red03  text-semantics-red02'
                });
        },
        onSettled: () => {
            setShowModalDelete(false);
            resetVariableDelete();
        }
    });
    const onResetProductEdit = () => {
        setProductEdit({
            actionType: 'unknown'
        })
    }


    // function prePrintItem(productName: string, productID: string) {
    //     console.log('prePrintItem', productName, productID);
    //     setShowPrinterPDF(true);
    //
    // }

    function saveSessionPrinterValue(dataPrinter: {
        goldRate?: string,
        laborCost?: string,
        productName?: string,
        productId?: string
    }) {
        const {
            goldRate,
            laborCost,
            productName,
            productId
        } = getPrinterValue();
        sessionStorage.setItem(STORAGE_ITEM.PRINTER_VALUE, JSON.stringify({
            goldRate,
            laborCost,
            productName,
            productId,
            ...dataPrinter
        }));
    }

    function getPrinterValue() {
        const printerValue = sessionStorage.getItem(STORAGE_ITEM.PRINTER_VALUE);
        return printerValue ? JSON.parse(printerValue) : {};
    }

    function preOnDeleteProduct(param: { productID: string; productName: string }) {
        setNameProduceDelete(param.productName);
        setProductIdDelete(+param.productID);
        setShowModalDelete(true);
    }

    const columns: TableProps<IResProduct>['columns'] = [
        {
            title: () => (<div className={`${isDarkMode ? 'dark-mode' : ' '} w-[116px]`}>Hình ảnh</div>),
            dataIndex: 'image',
            key: 'image',
            align: 'center',
            render: (_, {image}) => {
                return (
                    <div className={' flex justify-center'}>
                        <img className={'w-[88px] h-[88px] rounded'} src={image} alt={'product'}/>
                    </div>
                )
            },
        },
        {
            title: () => (<div className={`${isDarkMode ? 'dark-mode' : ' '} `}>Sản phẩm</div>),
            dataIndex: 'productName',
            key: 'productName',
            align: 'center',
            sorter: (a, b) => a.productName.localeCompare(b.productName),
            render: (_, {productName, price}) => {
                return (
                    <div className={'text-left flex flex-col gap-y-[8px] justify-center'}>
                        <div className={' font-[600] text-[20px]'}>
                            {productName}
                        </div>
                        <div className={'text-[14px]'}><span
                            className={`${isDarkMode ? 'text-neutrals-400' : 'text-semantics-grey02'}`}>Giá bán: </span>
                            <span
                                className={'text-accent-a01'}>{+price <= 0 ? "Liên hệ" : FormatCurrency(price)}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            title: () => (<div className={`${isDarkMode ? 'dark-mode' : ' '} `}>Mã sản phẩm</div>),
            dataIndex: 'productCode',
            key: 'productCode',
            align: 'center',
            sorter: (a, b) => a.productCode.localeCompare(b.productCode),
            render: (_, {productCode}) => {
                return (
                    <div className={' font-[500] text-[18px]'}>
                        {productCode}
                    </div>
                )
            }
        },
        {
            title: () => (<div className={`${isDarkMode ? 'dark-mode' : ' '} `}>Số lượng</div>),
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
            sorter: (a, b) => (a.amount + '').localeCompare(b.amount + ''),
            render: (_, {amount}) => {
                return (
                    <div className={' font-[500] text-[18px]'}>
                        {amount}
                    </div>
                )
            }
        },
        {
            title: () => (<div className={`${isDarkMode ? 'dark-mode' : ' '} `}>Chỉnh sửa</div>),
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_, {productID, productName, price, productCode, amount}) => {
                return (
                    <div className={' flex flex-col gap-y-[10px] w-full justify-center items-center'}>
                        <div className="print-container gap-x-[12px] flex items-center">
                            <div
                                className={`${isDarkMode ? 'border-darkGrey-3838 bg-darkGrey-3333' : 'border-neutrals-500'} print-data w-[187px] flex  gap-x-[8px] h-[38px] px-[18px] py-[12px] items-center justify-between border-[0.5px] rounded-[8px]`}>
                                <input
                                    value={valuesPrinter[productID]?.goldRate || ''}
                                    onChange={(e) => {
                                        setValuesPrinter(pre => ({
                                            ...pre,
                                            [productID]: {
                                                ...pre[productID],
                                                goldRate: e.target.value,
                                                goldRateFormat: e.target.value + '%'
                                            }
                                        }));
                                        saveSessionPrinterValue({
                                            productName: productName,
                                            productId: productID,
                                            goldRate: e.target.value
                                        });
                                    }}
                                    className={`${isDarkMode ? 'bg-darkGrey-3333' : ''} w-[50px] outline-0 text-[12px] p-0 m-0 leading-none`}
                                    placeholder={'TL Vàng'} type="text"/>
                                <div className={`border-semantics-grey01 border-l-[1px] h-[14px]`}></div>
                                {/*<input*/}
                                {/*    value={valuesPrinter[productID]?.laborCost || ''}*/}
                                {/*    onChange={(e) =>{*/}
                                {/*        setValuesPrinter(pre => ({*/}
                                {/*            ...pre,*/}
                                {/*            [productID]: {*/}
                                {/*                ...pre[productID],*/}
                                {/*                laborCost: e.target.value,*/}
                                {/*                laborCostFormat: FormatCurrency(e.target.value)*/}
                                {/*            }*/}
                                {/*        }))*/}
                                {/*        saveSessionPrinterValue({*/}
                                {/*            productName: productName,*/}
                                {/*            productId: productID,*/}
                                {/*            laborCost: e.target.value*/}
                                {/*        })*/}
                                {/*    }}*/}
                                {/*    className={`${isDarkMode ? 'bg-darkGrey-3333' : ''} w-[84px] outline-0 text-[12px] p-0 m-0 leading-none`}*/}
                                {/*    placeholder={'Tiền công'} type="text"/>*/}
                                <CurrencyInput
                                    id={'laborCost-' + productID}
                                    onChange={(e) => {
                                        setValuesPrinter(pre => ({
                                            ...pre,
                                            [productID]: {
                                                ...pre[productID],
                                                laborCost: e ? e : '',
                                                laborCostFormat: FormatCurrency(e)
                                            }
                                        }))
                                        saveSessionPrinterValue({
                                            productName: productName,
                                            productId: productID,
                                            laborCost: e ? e : ''
                                        })
                                    }}
                                    className={`${isDarkMode ? 'bg-darkGrey-3333' : ''} w-[84px] outline-0 text-[12px] p-0 m-0 leading-none border-none`}
                                    placeholder={'Tiền công'}
                                    value={valuesPrinter[productID]?.laborCost || ''}
                                />
                            </div>
                            <div
                                onClick={() => {
                                    // setPrinterIdCurrent(+productID || -1);
                                    // setValuesPrinter(pre => ({
                                    //     ...pre,
                                    //     [productID]: {
                                    //         ...pre[productID],
                                    //         productName: productName,
                                    //     }
                                    // }));
                                    if (getPrinterValue()?.productId) {
                                        setShowPrinterPDF(true);
                                    }
                                }}
                                className={`${isDarkMode ? 'bg-darkGrey-2E2E' : ''} printer hover:cursor-pointer shadow-button-1 w-[40px] h-[40px] flex justify-center items-center rounded-[8px]`}>
                                <IconPrinter isDarkMode={isDarkMode}/>
                            </div>
                        </div>
                        <div className="actions-container flex gap-x-[12px] ">
                            <div
                                onClick={() => {
                                    mutateUpdateProduct(productID);
                                }}
                                className={` ${isDarkMode ? 'bg-darkGrey-2E2E' : ''} icon rounded-[8px] py-[8px] px-[24px] shadow-button-1 hover:cursor-pointer w[72px] h-[40px] `}>
                                <IconPen isDarkMode={isDarkMode}/>
                            </div>
                            <div
                                onClick={() => onEditProduct({
                                    productID,
                                    productName,
                                    price,
                                    productCode,
                                    quantity: amount,
                                    actionType: 'import-warehouse'
                                })}
                                className={` ${isDarkMode ? 'bg-darkGrey-2E2E' : ''} icon rounded-[8px] py-[8px] px-[24px] shadow-button-1 hover:cursor-pointer w[72px] h-[40px] `}>
                                <IconWarehouse isDarkMode={isDarkMode}/>
                            </div>
                            <div
                                onClick={() => preOnDeleteProduct({
                                    productID,
                                    productName,
                                })}
                                className={` ${isDarkMode ? 'bg-darkGrey-2E2E' : ''} icon rounded-[8px] py-[8px] px-[24px] shadow-button-1 hover:cursor-pointer w[72px] h-[40px] `}>
                                <IconRecycling isDarkMode={isDarkMode}/>
                            </div>
                        </div>
                    </div>
                )
            }
        },
    ];
    const [productEdit, setProductEdit] = useState<IProductDetails>({
        actionType: 'unknown'
    })
    const [showUpdate, setShowUpdate] = useState(false);
    const [showImportWarehouseProduct, setShowImportWarehouseProduct] = useState(false);

    function onEditProduct(param: {
        productID: string;
        price: string;
        productName: string,
        productCode: string,
        quantity: string,
        actionType: 'update' | 'delete' | 'import-warehouse' | 'printer'
    }) {
        setProductEdit({
            actionType: param.actionType,
            IDSanPham: +param.productID,
            TenSanPham: param.productName,
            GiaBan: +param.price,
            MaSanPham: param.productCode,
            SoLuong: +param.quantity

        });
    }

    function preOnShowAddNew() {
        setShowAddNew(true);
    }

    function preOnCloseAddNew(isReload: boolean) {
        setShowAddNew(false);
        if (isReload) {
            // queryClient.invalidateQueries({
            //     queryKey: ['products', paramSearch],
            //     type: 'all'
            // });
            refetch();
        }
    }

    function preOnCloseUpdate(isReload: boolean) {
        onResetProductEdit();
        setShowUpdate(false);
        if (isReload) {
            queryClient.invalidateQueries({
                queryKey: ['products', paramSearch]
            });
        }
    }

    function preOnCloseImportWarehouseProduct() {
        onResetProductEdit();
        setShowImportWarehouseProduct(false);
    }

    function preHandlerSearch(value: string) {
        setDelayInputSearch(value);
        if (value === '') {
            setParamSearch(pre => ({
                ...pre,
                typeGet: ProductGet.TypeGetAll
            }));
        }
    }

    function onHandleDelete() {
        mutationDeleteProduct(productIdDelete);
    }

    function preOnCloseDelete() {
        onResetProductEdit();
        setShowModalDelete(false);
    }


    async function handleScrollTable(e: any) {
        const {scrollTop, scrollHeight, clientHeight} = e.target;
        if (!isLoadingMore && scrollHeight - scrollTop <= clientHeight + 60) {
            if (hasNextPage && !isFetchingNextPage) {
                try {
                    setIsLoadingMore(true);
                    await fetchNextPage();
                } finally {
                    setIsLoadingMore(false);
                }
            }
        }
    }

    function onHandleFilter(filterValues: FilterProductType) {

        const {outOfStockValue} = filterValues;
        if (outOfStockValue) {
            setParamSearch(pre => ({
                ...pre,
                outOfStockValue: outOfStockValue,
                typeGet: ProductGet.TypeFilterAmount,
            }));
        } else {
            setParamSearch(pre => ({
                ...pre,
                outOfStockValue: undefined,
                typeGet: ProductGet.TypeGetAll,
            }));
        }
        setShowFilter(false);
    }

    useEffect(() => {
        if (productEdit?.actionType === 'import-warehouse') {
            setShowImportWarehouseProduct(true);
        }
    }, [productEdit?.actionType]);
    useEffect(() => {
        if (successStores && dataStores) {
            const stores = dataStores?.metadata?.map((item: any) => ({
                label: item.TenCuaHang,
                value: item.IdcuaHang.toString()
            }));
            setStores(stores);
        }
    }, [successStores]);
    useEffect(() => {
        setTimeout(() => {
            setParamSearch(pre => ({
                ...pre,
                typeGet: ProductGet.TypeGetAll,
                productName: delayInputSearch
            }));
        }, 300);
    }, [delayInputSearch]);
    useEffect(() => {
        if (errorProducts) {
            toast(error500,
                {
                    position: 'top-center',
                    theme: isDarkMode ? 'dark' : 'light',
                    className: 'shadow shadow-semantics-red03  text-semantics-red02'
                });
        }
    }, [errorProducts]);
    useEffect(() => {
        if (successProducts && infiniteData) {
            const allProducts = infiniteData.pages.flatMap(page =>
                page?.map((product: any) => ({
                    key: product.IDSanPham,
                    productID: product.IDSanPham,
                    productName: product.TenSanPham,
                    image: `${VITE_DOMAIN_IMAGE}${product?.URLImage || product?.URLImage2 || product?.URLImage3 || product?.URLImage4 || product?.URLImage5}`,
                    productCode: product.MaSanPham,
                    amount: product.SoLuong,
                    price: product.GiaBan
                }))
            );
            setProducts(allProducts);
        }
    }, [infiniteData, successProducts]);
    useEffect(() => {
        if (productEdit?.actionType === 'delete') {
            setShowModalDelete(true);
        }
    }, [productEdit])
    // Reset products when search params change
    useEffect(() => {
        // setProducts([]);
        // Call api by queryClient to get products
        // queryClient.invalidateQueries({
        //     queryKey: ['products', paramSearch]
        // });
    }, [paramSearch.productName, paramSearch.outOfStockValue, paramSearch.categoryId]);
    useEffect(() => {
        sessionStorage.removeItem(STORAGE_ITEM.PRINTER_VALUE);
    }, [products]);
    useEffect(() => {
        return () => {
            sessionStorage.removeItem(STORAGE_ITEM.PRINTER_VALUE);
        }
    }, []);
    useEffect(() => {
        if (nhomSanPhams && nhomSanPhams?.length > 0) {
            const options: SelectOption[] = nhomSanPhams?.map((item: NhomSanPham) => {
                return {
                    value: item.IDNhomSanPham + '',
                    label: item.MoTa,
                }
            });
            setOptionsNhomSanPham([
                {value: '', label: 'Tấc cả'},
                ...options,
            ]);
        }
    }, [nhomSanPhams]);
    useEffect(() => {
        refetch()
    }, [paramSearch]);

    function onSubmitImport() {
        queryClient.invalidateQueries({
            queryKey: ['products', paramSearch]
        });
        setShowImportWarehouseProduct(false);
        onResetProductEdit();
    }

    function onSelectCategory(value: string | string[]) {
        if (typeof value === 'string') {
            setCategorySelected(value);
        } else {
            setCategorySelected('')
        }
    }

    function onDropdownVisibleChange(open: boolean) {
        if (!open) {
            setParamSearch(prevState => ({
                ...prevState,
                categoryId: categorySelected ? categorySelected : '-1',
            }))
        }
    }

    return (
        <div>
            <div
                className={`${isDarkMode ? 'text-neutrals-400 border-b-darkGrey-2727' : 'text-semantics-grey01 border-b-neutrals-300'} titleContainer h-[88px] border-b-[1px] pl-[32px] pr-[33px] flex justify-between items-center`}>
                <div className="title  text-[32px]">Sản phẩm</div>
                <div className={'flex gap-x-[25px]'}>
                    <Button
                        icon={<IconManageMenu isDarkMode={isDarkMode}/>}
                        className={`${isDarkMode ? 'bg-[#f9f9fb] border-[#e7e7e9] text-neutrals-400' : ''} h-[40px]`}
                        name={'Nhập theo danh sách'}/>
                    <ButtonGradient
                        onClick={preOnShowAddNew}
                        icon={<IconPlus/>}
                        className={`${isDarkMode ? 'border-darkGrey-3838-important border' : ''} h-[40px] w-[165px] text-[16px]  px-[24px] gap-x-[14px]`}
                        name={'Thêm mới'}/>
                </div>
            </div>
            <div
                className={`${isDarkMode ? 'text-neutrals-400' : 'text-neutrals-700'} action-filter-container h-[88px] px-[24px] py-[32px] flex  justify-between`}>
                <div className={'flex gap-x-[20px] w-[325px] items-center'}>
                    <label className={' text-[14px]'} htmlFor="categories">Danh sách:</label>
                    <div className={' w-[230px] flex items-center'}>
                        {isLoadingNhomSanPhams ? <TextSkeleton/> : (
                            <SelectComp
                                isDarkMode={isDarkMode}
                                maxTagCount={2}
                                allowClear
                                mode={'single'}
                                suffixIcon={<IconSelectArrowButton/>}
                                className={`custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : ''} h-[38px] text-[12px]`}
                                id={'categories'}
                                value={categorySelected}
                                options={optionsNhomSanPham}
                                onChange={onSelectCategory}
                                onDropdownVisibleChange={onDropdownVisibleChange}
                                placeholder={'Tất cả sản phẩm'}/>
                        )}

                    </div>
                </div>
                <div className={'flex items-center gap-x-[20px]'}>
                    <Input
                        onChange={(e) => preHandlerSearch(e?.target?.value)}
                        suffix={<IconInputSearch isDarkMode={isDarkMode}/>}
                        className={`text-[12px]  h-[40px] w-[230px] rounded-[8px] ${!isDarkMode ? 'shadow-button-1 focus-within:shadow-button-1' : ' text-neutrals-400 border-dark placeholder-dark'}`}
                        placeholder={'Tìm kiếm sản phẩm'}/>
                    <div className={'relative'}>
                        <Button
                            onClick={() => setShowFilter(!showFilter)}
                            className={` ${isDarkMode ? 'text-neutrals-400 border-none hover:bg-darkGrey-2E2E ' : ''} text-[16px] h-[40px] shadow-button-1`}
                            icon={<IconFilter isDarkMode={isDarkMode}/>}
                            name={'Bộ lộc'}/>
                        <div className={'absolute top-[3rem] right-0 z-20'}>
                            <FilterProduct
                                showFilter={showFilter}
                                onFilter={onHandleFilter}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-container mt-[24px] pl-[24px] pr-[32px]">
                {loadingProducts ? (<Skeleton active/>) : (
                    <div className="table-container mt-[24px] pl-[24px] pr-[32px]">
                        {loadingProducts ? (
                            <Skeleton active/>
                        ) : (
                            <div
                                ref={tableContainerRef}
                                // onScroll={handleScrollTable}
                                // className={'h-[70vh] overflow-auto'}
                            >
                                <Table
                                    rootClassName={'table-product'}
                                    onScroll={handleScrollTable}
                                    rowKey={(record) => record.productID}
                                    id={`${isDarkMode ? 'table-product-dark-mode' : 'table-product-light-mode'}`}
                                    scroll={{x: '100%', y: '70vh'}}
                                    pagination={false}
                                    columns={columns}
                                    dataSource={products}
                                    showSorterTooltip={{
                                        title: 'Click để sắp xếp'
                                    }}
                                />
                                {isFetchingNextPage && (
                                    <div className="py-4 text-center">
                                        <Skeleton active paragraph={{rows: 1}}/>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

            </div>
            <AddNewOrUpdateProduct
                productEdit={productEdit}
                showEditProduct={showUpdate}
                storeOptions={stores}
                showAddNew={showAddNew}
                onCloseUpdate={preOnCloseUpdate}
                onCloseAddNew={preOnCloseAddNew}/>
            <ImportWarehouseProduct show={showImportWarehouseProduct}
                                    onSubmit={onSubmitImport}
                                    onClose={preOnCloseImportWarehouseProduct}
                                    productEdit={productEdit}/>
            <ErrorModal
                isLoading={isPendingDelete}
                title={<div className={`${isDarkMode ? 'dark-mode' : ' '} `}>Xoá sản phẩm</div>}
                onCancel={preOnCloseDelete}
                onOk={onHandleDelete} open={showModalDelete}>
                <div className={'px-[24px] flex flex-col items-center gap-y-[12px] mb-[32px]'}>
                    <div
                        className={`${isDarkMode ? 'text-neutrals-500' : 'text-[0d0c22] '} th_ng_b_o self-stretch  text-center text-[2.625rem] font-bold leading-[120%]`}>Xác
                        nhận
                    </div>
                    <div
                        className="text-center self-stretch text-[#6e6d7a] font-['Inter'] text-lg font-medium leading-[140%]">
                        Bạn có chắc chắn xoá <span className={'font-bold'}>{nameProduceDelete}</span>{' '}này không?
                    </div>
                </div>
            </ErrorModal>
            <CreateItemProductPrinter
                open={showPrinterPDF}
                onClose={() => {
                    onResetProductEdit();
                    setPrinterIdCurrent(-1);
                    setValuesPrinter({});
                    sessionStorage.removeItem(STORAGE_ITEM.PRINTER_VALUE);
                    setShowPrinterPDF(false)
                }}
                dataPrinter={getPrinterValue()}
                productName={valuesPrinter[printerIdCurrent || '']?.productName}
                goldRate={valuesPrinter[printerIdCurrent || '']?.goldRateFormat}
                laborCost={valuesPrinter[printerIdCurrent || '']?.laborCostFormat}
            />
            {(isPendingUpdateProduct || loadingStores || loadingProducts || fetchingProducts) &&
                <Loading/>}
        </div>
    );
};

export default Product;
