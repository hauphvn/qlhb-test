import {Drawer} from "antd";
import Button from "../../components/Button";
import ButtonGradient from "../../components/ButtonGradient";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {formAddEditProduct, formAddEditProductDefault} from "../../constants/SchemaYups.ts";
import Input from "../../components/Input";
import SelectComp from "../../components/Select";
import {IconArrowLeft, IconSelectArrowLarge} from "../../assets/svgs/SVGIcon.tsx";
import Switch from "../../components/Swtich";
import {
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnUnderline,
    BtnUndo,
    ContentEditableEvent,
    Editor,
    EditorProvider,
    Toolbar
} from 'react-simple-wysiwyg';
import ImageProductImport from "../../components/ImageProductImport";
import {
    AddGroupProduct,
    IImageUpdateRequest,
    INewProductRequest, IProductDetails, IProductUpdateRequest,
    NhomSanPham,
    SelectMultipleShowItem
} from "../../types";
import {useTheme} from "../../context/ThemeContext.tsx";
import {
    FolderImageOnFtp,
    TypeAddNewProductImage,
    TypeUpdateProductImage,
    UnitOptions,
    WarrantyOptions
} from "../../constants/AppContants.ts";
import {StoreOptions} from "./Product.tsx";
import {STORAGE_ITEM} from "../../constants/StorageItem.ts";
import {useMutation} from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading.tsx";
import {post} from "../../libs";
import {API_PATH} from "../../constants/Path.ts";
import toast from "react-simple-toasts";
import CurrencyInput from "../../components/CurrencyInput";
import {ToastAlert} from "../../constants";
import {LoaderPinwheel} from "lucide-react";
import {generateSimpleId} from "../../utils";
import {nhomSanPhamxQueryAtom} from "../../store/atom/commonAtom.ts";
import TextSkeleton from "../../components/TextSkeleton/TextSkeleton.tsx";
import {useAtom} from "jotai";
import SelectMultipleShowComp from "../../components/SelectMultipleShow";
import {delay} from "../../lib/utils.ts";

const AddNewOrUpdateProduct = (props: AddNewOrUpdateProductProps) => {
        const {isDarkMode} = useTheme();
        const {productEdit, showAddNew} = props;
        const [tabIndex, setTabIndex] = useState<'info' | 'desc' | 'category'>('info');
        const [htmlDescription, setHtmlDescription] = useState('');
        const [htmlShortDescription, setHtmlShortDescription] = useState('');
        const [isSubmitted, setIsSubmitted] = useState(false);
        const [productImgs, setProductImgs] = useState<{ id: string, urlImg: string | File, keyName: string }[]>([]);
        const [newImageUploaded, setNewImageUploaded] = useState<{ file: File | null, name: string }[]>([]);
        const [imagesChange, setImagesChange] = useState<IImageUpdateRequest>({
            loai: TypeAddNewProductImage
        });
        const [typeObjCurrent, setTypeObjCurrent] = useState<{
            type?: string;
            type2?: string;
            type3?: string;
            type4?: string;
            type5?: string;
        }>({})
        const [optionsNhomSanPham, setOptionsNhomSanPham] = useState<SelectMultipleShowItem[]>([]);
        const {VITE_DOMAIN_IMAGE} = import.meta.env;

        function preOnTabClick(type: 'info' | 'desc' | 'category') {
            setTabIndex(type);
        }

        const setInfoTemp = () => {
            const salePrice = getValues('salePrice');
            const discount = getValues('discount');
            sessionStorage.setItem('infoTemp', JSON.stringify({
                salePrice,
                discount
            }));
        }
        const getInfoTemp = (): { salePrice: string, discount: string } => {
            const infoTemp = sessionStorage.getItem('infoTemp');
            if (infoTemp) {
                return JSON.parse(infoTemp);
            }
            return {
                salePrice: '0',
                discount: '0'
            }
        }
        const resetInfoTemp = () => {
            sessionStorage.removeItem('infoTemp');
            sessionStorage.removeItem('fileNameDelete');
            sessionStorage.removeItem('fileNameNew');
            sessionStorage.removeItem('fileNameOld');
            sessionStorage.removeItem('productId');
            setNewImageUploaded([]);
        }
        const [{data: nhomSanPhams, isLoading: isLoadingNhomSanPhams}] = useAtom(nhomSanPhamxQueryAtom);
        const {
            formState: {errors, isDirty, isValid},
            control: controlAddNewProduct,
            setValue,
            getValues,
            watch,
            reset
        } = useForm({
            resolver: yupResolver(formAddEditProduct()),
            mode: 'all',
            defaultValues: formAddEditProductDefault
        })

        function onChangeEditorDescription(e: ContentEditableEvent, type: string) {
            if (type === 'long') {
                setHtmlDescription(e.target.value);
                setValue('description', e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true
                });
            } else {
                setHtmlShortDescription(e.target.value);
                setValue('shortDescription', e.target.value, {
                    shouldValidate: true,
                    shouldDirty: true
                });
            }
        }

        function saveTempImage(nameImage: string, nameImage2: string, nameImage3: string, nameImage4: string, nameImage5: string) {
            sessionStorage.setItem('fileNameOriginal', JSON.stringify([nameImage, nameImage2, nameImage3, nameImage4, nameImage5]));
        }

        function getTempImage(): string[] {
            return JSON.parse(sessionStorage.getItem('fileNameOriginal') || '["","","","",""]');
        }

        useEffect(() => {
            reset({
                productName: productEdit?.TenSanPham,
                store: productEdit?.IDCuaHang?.toString() || '',
                warranty: productEdit?.ThoiGianBaoHanh?.toString() || '',
                unit: productEdit?.IDDonViTinh?.toString() || '',
                importPrice: productEdit?.TriGia?.toString(),
                salePrice: productEdit?.GiaBan?.toString(),
                discount: productEdit?.GiamGia?.toString(),
                priceAfterDiscount: productEdit?.GiaBan ? (productEdit?.GiaBan - (productEdit?.GiaBan * (productEdit?.GiamGia ?? 0) / 100)).toString() : '',
                quantity: productEdit?.SoLuong?.toString(),
                weight: productEdit?.KhoiLuong?.toString(),
                length: productEdit?.Dai?.toString(),
                width: productEdit?.Rong?.toString(),
                height: productEdit?.Cao?.toString(),
                isContactPrice: productEdit?.GiaBan === 0,
                isOnlineSale: productEdit?.SanPhamTrucTuyen === 1,
                shortDescription: productEdit?.MoTaNgan,
                description: productEdit?.MoTa,
                URLImage: VITE_DOMAIN_IMAGE + productEdit?.URLImage,
                URLImage2: VITE_DOMAIN_IMAGE + productEdit?.URLImage2,
                URLImage3: VITE_DOMAIN_IMAGE + productEdit?.URLImage3,
                URLImage4: VITE_DOMAIN_IMAGE + productEdit?.URLImage4,
                URLImage5: VITE_DOMAIN_IMAGE + productEdit?.URLImage5

            })
            setHtmlDescription(productEdit?.MoTa || '');
            setHtmlShortDescription(productEdit?.MoTaNgan || '');
            setProductImgs([
                {
                    urlImg: productEdit?.URLImage !== '' ? VITE_DOMAIN_IMAGE + productEdit?.URLImage : '',
                    id: generateSimpleId(),
                    keyName: 'URLImage'
                },
                {
                    urlImg: productEdit?.URLImage2 !== '' ? VITE_DOMAIN_IMAGE + productEdit?.URLImage2 : '',
                    id: generateSimpleId(),
                    keyName: 'URLImage2'
                },
                {
                    urlImg: productEdit?.URLImage3 !== '' ? VITE_DOMAIN_IMAGE + productEdit?.URLImage3 : '',
                    id: generateSimpleId(),
                    keyName: 'URLImage3'
                },
                {
                    urlImg: productEdit?.URLImage4 !== '' ? VITE_DOMAIN_IMAGE + productEdit?.URLImage4 : '',
                    id: generateSimpleId(),
                    keyName: 'URLImage4'
                },
                {
                    urlImg: productEdit?.URLImage5 !== '' ? VITE_DOMAIN_IMAGE + productEdit?.URLImage5 : '',
                    id: generateSimpleId(),
                    keyName: 'URLImage5'
                }
            ]);
            setValue('URLImage', VITE_DOMAIN_IMAGE + productEdit?.URLImage);
            setValue('URLImage2', VITE_DOMAIN_IMAGE + productEdit?.URLImage2);
            setValue('URLImage3', VITE_DOMAIN_IMAGE + productEdit?.URLImage3);
            setValue('URLImage4', VITE_DOMAIN_IMAGE + productEdit?.URLImage4);
            setValue('URLImage5', VITE_DOMAIN_IMAGE + productEdit?.URLImage5);
// Get files name
            const nameImage = productEdit?.URLImage?.split('/').pop()?.toString();
            const nameImage2 = productEdit?.URLImage2?.split('/').pop()?.toString();
            const nameImage3 = productEdit?.URLImage3?.split('/').pop()?.toString();
            const nameImage4 = productEdit?.URLImage4?.split('/').pop()?.toString();
            const nameImage5 = productEdit?.URLImage5?.split('/').pop()?.toString();
            saveTempImage(nameImage || '', nameImage2 || '', nameImage3 || '', nameImage4 || '', nameImage5 || '');
            setImagesChange({
                loai: TypeUpdateProductImage,
                filename: [nameImage, nameImage2, nameImage3, nameImage4, nameImage5]
            })
            sessionStorage.setItem('fileNameNew', JSON.stringify([nameImage, nameImage2, nameImage3, nameImage4, nameImage5]));
            // Set type image
            const type = nameImage?.split('.').pop()?.toString();
            const type2 = nameImage2?.split('.').pop()?.toString();
            const type3 = nameImage3?.split('.').pop()?.toString();
            const type4 = nameImage4?.split('.').pop()?.toString();
            const type5 = nameImage5?.split('.').pop()?.toString();
            const typeObj: any = {};
            if (type) {
                typeObj['type'] = "image/" + type;
            }
            if (type2) {
                typeObj['type2'] = "image/" + type2;
            }
            if (type3) {
                typeObj['type3'] = "image/" + type3;
            }
            if (type4) {
                typeObj['type4'] = "image/" + type4;
            }
            if (type5) {
                typeObj['type5'] = "image/" + type5;
            }
            setTypeObjCurrent(typeObj);
            // resetInfoTemp();
            // Update idsNhomSanPham
            const idsGroup = productEdit.IdsNhomSanPham;
            if (idsGroup && idsGroup?.length > 0) {
                const newList = optionsNhomSanPham.map(item => {
                    item.isSelect = idsGroup.includes(+item.value);
                    return item;
                })
                setOptionsNhomSanPham(newList);
                setValue('idsGroupProduct', idsGroup);
            }
        }, [productEdit?.IDSanPham]);
        useEffect(() => {
            setProductImgs([
                {
                    urlImg: '',
                    id: generateSimpleId(),
                    keyName: 'URLImage'
                },
                {
                    urlImg: '',
                    id: generateSimpleId(),
                    keyName: 'URLImage2'
                },
                {
                    urlImg: '',
                    id: generateSimpleId(),
                    keyName: 'URLImage3'
                },
                {
                    urlImg: '',
                    id: generateSimpleId(),
                    keyName: 'URLImage4'
                },
                {
                    urlImg: '',
                    id: generateSimpleId(),
                    keyName: 'URLImage5'
                }
            ]);
            const subscription = watch((value, {name}) => {
                if (name === 'discount') {
                    const salePrice = parseInt(getValues('salePrice') ?? '0');
                    const discountPrice = parseInt(value.discount || '0') / 100 * salePrice;
                    setValue('priceAfterDiscount', (salePrice - discountPrice).toString(), {
                        shouldValidate: true,
                        shouldDirty: true
                    });
                }
                if (name === 'salePrice') {
                    const salePrice = parseInt(value.salePrice || '0');
                    const discountPrice = parseInt(getValues(('discount')) || '0');
                    setValue('priceAfterDiscount', (salePrice - (discountPrice / 100 * salePrice)).toString(), {
                        shouldValidate: true,
                        shouldDirty: true
                    })
                }
                if (name === 'isContactPrice') {
                    if (value.isContactPrice) {
                        setInfoTemp();
                        setValue('salePrice', '0', {
                            shouldValidate: true,
                            shouldDirty: true
                        });
                        setValue('discount', '0', {
                            shouldValidate: true,
                            shouldDirty: true
                        });
                        setValue('priceAfterDiscount', '0', {
                            shouldValidate: true,
                            shouldDirty: true
                        });
                    } else {
                        const {salePrice, discount} = getInfoTemp();
                        setValue('salePrice', salePrice, {
                            shouldValidate: true,
                            shouldDirty: true
                        });
                        setValue('discount', discount, {
                            shouldValidate: true,
                            shouldDirty: true
                        });
                    }
                }

            });
            return () => subscription.unsubscribe();
        }, [watch, getValues, setValue]);
        useEffect(() => {
            return () => {
                resetInfoTemp();
                sessionStorage.removeItem('fileNameOriginal');
            }
        }, []);
        useEffect(() => {
            resetOptionNhomSanPham();
        }, [nhomSanPhams]);
        useEffect(() => {
            if (showAddNew && isSubmitted) {
                onResetAll();
            }
            resetOptionNhomSanPham();
        }, [showAddNew]);
        const onUpdateFileEdit = async () => {
            const formData = new FormData();
            const filesNameDelete = await JSON.parse(sessionStorage.getItem('fileNameDelete') || '[]')
            formData.append('folder', FolderImageOnFtp.Products);
            formData.append('filesDeleted', await filesNameDelete?.filter((item: any) => !!item));
            if (newImageUploaded.length > 0) {
                newImageUploaded.forEach(item => {
                    if (item?.file) {
                        formData.append('filesUpdated', item.file, item.name);
                    }
                })
            } else {
                formData.append('filesUpdated', '');
            }
            const res = await post(API_PATH.HANDLE_FILE.UPLOAD_FILE_PRODUCT_IMAGE_V2, formData
            );
            return res.data;
        }
        const onUpdateFile = async (productId: string) => {
            const formData = new FormData();
            formData.append('folder', FolderImageOnFtp.Products);
            formData.append('productId', productId);
            formData.append('description', htmlDescription);
            formData.append('shortDescription', htmlShortDescription);

            if (newImageUploaded.length > 0) {
                newImageUploaded.forEach(item => {
                    if (item?.file) {
                        formData.append('filesUpdated', item.file, item.name);
                    }
                })
            } else {
                formData.append('filesUpdated', '');
            }

            // const res = await post(API_PATH.HANDLE_FILE.UPDATE_METADATA_PRODUCT_IMAGE, formData
            // );
            const res = await post(API_PATH.HANDLE_FILE.UPDATE_METADATA_PRODUCT_IMAGE, formData
            );
            return res.data;
        }

        async function onAddGroupProduct(productId: number) {
            const databody: AddGroupProduct = {
                idSanPham: productId,
                idsNhomSanPham: getListGroupsProduct()
            }
            const res = await post(API_PATH.GROUP_PRODUCT.ADD_GROUPS, databody);
            return res.data;
        }

        const onAddNewProduct = async () => {
            const dataBody: INewProductRequest = {
                tensanpham: getValues('productName'),
                sanphamtructuyen: getValues('isOnlineSale') ? 1 : 0,
                soluong: parseInt(getValues('quantity') ?? '0'),
                trigia: parseInt(getValues('importPrice') ?? '0'),
                giaban: getValues('isContactPrice') ? 0 : parseInt(getValues('salePrice') ?? '0'),
                iddonvitinh: parseInt(getValues('unit') ?? '0'),
                idcuahang: parseInt(getValues('store') ?? '0'),
                giatritiente: '&#8363',
                mota: htmlDescription,
                motangan: htmlShortDescription,
                giamgia: getValues('isContactPrice') ? 0 : parseInt(getValues('discount') ?? '0'),
                thoigianbaohanh: parseInt(getValues('warranty') ?? '0'),
                khoiluong: parseInt(getValues('weight') ?? '0'),
                dai: parseInt(getValues('length') ?? '0'),
                rong: parseInt(getValues('width') ?? '0'),
                cao: parseInt(getValues('height') ?? '0'),
                idnguoidung: parseInt(localStorage.getItem(STORAGE_ITEM.USER_ID) || sessionStorage.getItem(STORAGE_ITEM.USER_ID) || '-1', 10),
            };
            // if (typeObjCurrent?.type) {
            //     dataBody.type = typeObjCurrent.type;
            // }
            // if (typeObjCurrent?.type2) {
            //     dataBody.type2 = typeObjCurrent.type2;
            // }
            // if (typeObjCurrent?.type3) {
            //     dataBody.type3 = typeObjCurrent.type3;
            // }
            // if (typeObjCurrent?.type4) {
            //     dataBody.type4 = typeObjCurrent.type4;
            // }
            // if (typeObjCurrent?.type5) {
            //     dataBody.type5 = typeObjCurrent.type5;
            // }
            const res = await post(API_PATH.PRODUCT.ADD_INFO, dataBody);
            return res.data;
        }

        function handleOnChangeImg(file: File | undefined, id: string, keyName: string) {
            if (file === undefined) { // Delete image
                if (imagesChange?.filename) {
                    const fileNameClone = JSON.parse((sessionStorage.getItem('fileNameNew')) || '["","","","",""]');
                    const fileNameDelete: (string | undefined)[] = JSON.parse(sessionStorage.getItem('fileNameDelete') || '["","","","",""]');
                    const fileNameNew = fileNameClone.filter((name: string) => {
                        if (keyName === 'URLImage' && !!imagesChange?.filename) {
                            return name !== imagesChange.filename[0];
                        }
                        if (keyName === 'URLImage2' && !!imagesChange?.filename) {
                            return name !== imagesChange.filename[1];
                        }
                        if (keyName === 'URLImage3' && !!imagesChange?.filename) {
                            return name !== imagesChange.filename[2];
                        }
                        if (keyName === 'URLImage4' && !!imagesChange?.filename) {
                            return name !== imagesChange.filename[3];
                        }
                        if (keyName === 'URLImage5' && !!imagesChange?.filename) {
                            return name !== imagesChange.filename[4];
                        }
                    });

                    if (keyName === 'URLImage') {
                        fileNameDelete[0] = (imagesChange.filename[0] || '');
                        setValue('URLImage', '', {
                            shouldValidate: true,
                            shouldDirty: true
                        });
                        setTypeObjCurrent(pre => ({
                            ...pre,
                            type: undefined
                        }))
                    }
                    if (keyName === 'URLImage2') {
                        fileNameDelete[1] = (imagesChange.filename[1] || '');
                        setValue('URLImage2', '', {
                            shouldValidate: true,
                            shouldDirty: true
                        });
                        setTypeObjCurrent(pre => ({
                            ...pre,
                            type2: undefined
                        }))
                    }
                    if (keyName === 'URLImage3') {
                        fileNameDelete[2] = (imagesChange.filename[2] || '');
                        setValue('URLImage3', '', {
                            shouldValidate: true,
                            shouldDirty: true
                        });
                        setTypeObjCurrent(pre => ({
                            ...pre,
                            type3: undefined
                        }))
                    }
                    if (keyName === 'URLImage4') {
                        fileNameDelete[3] = (imagesChange.filename[3] || '');
                        setValue('URLImage4', '', {
                            shouldValidate: true,
                            shouldDirty: true
                        });
                        setTypeObjCurrent(pre => ({
                            ...pre,
                            type4: undefined
                        }))
                    }
                    if (keyName === 'URLImage5') {
                        fileNameDelete[4] = (imagesChange.filename[4] || '');
                        setValue('URLImage5', '', {
                            shouldValidate: true,
                            shouldDirty: true
                        });
                        setTypeObjCurrent(pre => ({
                            ...pre,
                            type5: undefined
                        }))
                    }
                    const keyNameTyped = keyName as keyof typeof formAddEditProductDefault;
                    setValue(keyNameTyped, '', {
                        shouldValidate: true,
                        shouldDirty: true
                    });
                    sessionStorage.setItem('fileNameNew', JSON.stringify(fileNameNew));
                    sessionStorage.setItem('fileNameDelete', JSON.stringify(fileNameDelete));
                }
            } else { // Change image
                let newImg: string | File = '';
                const newProductImgs = productImgs.map(img => {
                    if (img.id === id) {
                        newImg = file ? URL.createObjectURL(file) : img.urlImg;
                        return {
                            id: img.id,
                            urlImg: newImg,
                            keyName: img.keyName
                        }
                    }
                    return img;
                })
                setProductImgs(newProductImgs);
                const keyNameTyped = keyName as keyof typeof formAddEditProductDefault;
                setValue(keyNameTyped, newImg, {
                    shouldValidate: true,
                    shouldDirty: true
                });


                const newProductImgLocal = productImgs.map(img => {
                    if (img?.keyName === keyName) {
                        const imgLocal = file ? URL.createObjectURL(file) : img.urlImg;
                        return {
                            id: img.id,
                            urlImg: imgLocal,
                            keyName: img.keyName
                        }
                    }
                    return img;
                })
                setProductImgs(newProductImgLocal);

                // Update fileNameNew session storage
                const fileNameClone = JSON.parse((sessionStorage.getItem('fileNameNew')) || '["","","","",""]');
                // const fileNameDelete: (string | undefined)[] = JSON.parse(sessionStorage.getItem('fileNameDelete') || '["","","","",""]');
                const fileNameOld: (string | undefined)[] = JSON.parse(sessionStorage.getItem('fileNameOld') || '["","","","",""]');
                const imagesOriginal = getTempImage();
                if (keyName === 'URLImage') {
                    fileNameClone[0] = file?.name;
                    setTypeObjCurrent(pre => ({
                        ...pre,
                        type: file?.type
                    }))
                    fileNameOld[0] = imagesOriginal[0];
                    setNewImageUploaded(pre => {
                        return [...pre, {
                            name: showAddNew ? '_1' : productEdit.IDSanPham + '_' + 1,
                            file: file
                        }]
                    })
                    sessionStorage.setItem('fileNameOld', JSON.stringify(fileNameOld));
                }
                if (keyName === 'URLImage2') {
                    fileNameClone[1] = file?.name;
                    setTypeObjCurrent(pre => ({
                        ...pre,
                        type2: file?.type
                    }))
                    fileNameOld[1] = imagesOriginal[1];
                    setNewImageUploaded(pre => {
                        return [...pre, {
                            name: showAddNew ? '_2' : productEdit.IDSanPham + '_' + 2,
                            file: file
                        }]
                    })
                    sessionStorage.setItem('fileNameOld', JSON.stringify(fileNameOld));
                }
                if (keyName === 'URLImage3') {
                    fileNameClone[2] = file?.name;
                    setTypeObjCurrent(pre => ({
                        ...pre,
                        type3: file?.type
                    }))
                    fileNameOld[2] = imagesOriginal[2]
                    setNewImageUploaded(pre => {
                        return [...pre, {
                            name: showAddNew ? '_3' : productEdit.IDSanPham + '_' + 3,
                            file: file
                        }]
                    })
                    sessionStorage.setItem('fileNameOld', JSON.stringify(fileNameOld));
                }
                if (keyName === 'URLImage4') {
                    fileNameClone[3] = file?.name;
                    setTypeObjCurrent(pre => ({
                        ...pre,
                        type4: file?.type
                    }))
                    fileNameOld[3] = imagesOriginal[3];
                    setNewImageUploaded(pre => {
                        return [...pre, {
                            name: showAddNew ? '_4' : productEdit.IDSanPham + '_' + 4,
                            file: file
                        }]
                    })
                    sessionStorage.setItem('fileNameOld', JSON.stringify(fileNameOld));
                }
                if (keyName === 'URLImage5') {
                    fileNameClone[4] = file?.name;
                    setTypeObjCurrent(pre => ({
                        ...pre,
                        type5: file?.type
                    }))
                    fileNameOld[4] = imagesOriginal[4];
                    setNewImageUploaded(pre => {
                        return [...pre, {
                            name: showAddNew ? '_5' : productEdit.IDSanPham + '_' + 5,
                            file: file
                        }]
                    })
                    sessionStorage.setItem('fileNameOld', JSON.stringify(fileNameOld));
                }
            }
        }

        async function handleReaderFileBinary(binary: ArrayBuffer | null, keyName: string) {
            if (keyName === 'URLImage') {
                setImagesChange(pre => ({
                    ...pre,
                    file1: binary
                }))
            }
            if (keyName === 'URLImage2') {
                setImagesChange(pre => ({
                    ...pre,
                    file2: binary
                }))
            }
            if (keyName === 'URLImage3') {
                setImagesChange(pre => ({
                    ...pre,
                    file3: binary
                }))
            }
            if (keyName === 'URLImage4') {
                setImagesChange(pre => ({
                    ...pre,
                    file4: binary
                }))
            }
            if (keyName === 'URLImage5') {
                setImagesChange(pre => ({
                    ...pre,
                    file5: binary
                }))
            }
        }

        const {
            mutate: mutateUploadFile,
            isPending: isPendingUploadFile
        } = useMutation({
            mutationKey: ['upProductImage'],
            mutationFn: onUpdateFile,
            onError: () => {
                toast('Thêm sản phẩm thất bại',
                    {
                        zIndex: 9999,
                        position: 'top-center',
                        theme: isDarkMode ? 'dark' : 'light',
                        className: 'shadow shadow-dangerLight  text-danger'
                    });
            }
        })
        const {mutate: mutateAddGroupProduct, isPending: isPendingAddGroupProduct} = useMutation({
            mutationKey: ['addGroupProduct'],
            mutationFn: onAddGroupProduct,
            onError: () => {
                toast('Thêm nhóm sản phẩm thất bại',
                    {
                        zIndex: 9999,
                        position: 'top-center',
                        theme: isDarkMode ? 'dark' : 'light',
                        className: 'shadow shadow-dangerLight  text-danger'
                    });
            }
        })

        function resetOptionNhomSanPham() {
            if (nhomSanPhams && nhomSanPhams?.length > 0) {
                const options: SelectMultipleShowItem[] = nhomSanPhams?.map((item: NhomSanPham) => {
                    return {
                        value: item.IDNhomSanPham,
                        label: item.MoTa,
                        isSelect: false
                    }
                });
                setOptionsNhomSanPham(options);
            }
        }

        function onResetAll() {
            reset(formAddEditProductDefault);
            setIsSubmitted(true);
            setHtmlDescription('');
            setHtmlShortDescription('');
            setTypeObjCurrent({});
            setProductImgs([
                {
                    urlImg: '',
                    id: generateSimpleId(),
                    keyName: 'URLImage'
                },
                {
                    urlImg: '',
                    id: generateSimpleId(),
                    keyName: 'URLImage2'
                },
                {
                    urlImg: '',
                    id: generateSimpleId(),
                    keyName: 'URLImage3'
                },
                {
                    urlImg: '',
                    id: generateSimpleId(),
                    keyName: 'URLImage4'
                },
                {
                    urlImg: '',
                    id: generateSimpleId(),
                    keyName: 'URLImage5'
                }
            ]);
            setNewImageUploaded([]);
            setTabIndex('info');
            sessionStorage.removeItem('fileNameOriginal');
            sessionStorage.removeItem('fileNameDelete');
            sessionStorage.removeItem('fileNameNew');
            sessionStorage.removeItem('fileNameOld');
            setIsSubmitted(false);
        }


        const {
            mutate: mutateUploadFileEdit,
            isPending: isPendingUploadFileEdit
        } = useMutation({
            mutationKey: ['updateFileEdit'],
            mutationFn: onUpdateFileEdit,
            onError: () => {
                toast('Cập nhật sản phẩm thất bại',
                    {
                        zIndex: 9999,
                        position: 'top-center',
                        theme: isDarkMode ? 'dark' : 'light',
                        className: 'shadow shadow-dangerLight  text-danger'
                    });
            }
        });
    const onUpdateProductEdit = async () => {
        const dataBody: IProductUpdateRequest = {
            masanpham: props.productEdit?.MaSanPham || '',
            tensanpham: getValues('productName'),
            sanphamtructuyen: getValues('isOnlineSale') ? 1 : 0,
            soluong: parseInt(getValues('quantity') ?? '0'),
            trigia: parseInt(getValues('importPrice') ?? '0'),
            giaban: getValues('isContactPrice') ? 0 : parseInt(getValues('salePrice') ?? '0'),
            iddonvitinh: parseInt(getValues('unit') ?? '0'),
            idcuahang: parseInt(getValues('store') ?? '0'),
            giatritiente: '&#8363',
            mota: htmlDescription,
            motangan: htmlShortDescription,
            giamgia: getValues('isContactPrice') ? 0 : parseInt(getValues('discount') ?? '0'),
            thoigianbaohanh: parseInt(getValues('warranty') ?? '0'),
            khoiluong: parseInt(getValues('weight') ?? '0'),
            dai: parseInt(getValues('length') ?? '0'),
            rong: parseInt(getValues('width') ?? '0'),
            cao: parseInt(getValues('height') ?? '0'),
            idnguoidung: parseInt(localStorage.getItem(STORAGE_ITEM.USER_ID) || sessionStorage.getItem(STORAGE_ITEM.USER_ID) || '-1', 10),
            idsanpham: props.productEdit?.IDSanPham || -1,
        };
        if (typeObjCurrent?.type) {
            dataBody.type = typeObjCurrent.type;
        }
        if (typeObjCurrent?.type2) {
            dataBody.type2 = typeObjCurrent.type2;
        }
        if (typeObjCurrent?.type3) {
            dataBody.type3 = typeObjCurrent.type3;
        }
        if (typeObjCurrent?.type4) {
            dataBody.type4 = typeObjCurrent.type4;
        }
        if (typeObjCurrent?.type5) {
            dataBody.type5 = typeObjCurrent.type5;
        }
        const res = await post(API_PATH.PRODUCT.RE_UPDATE, dataBody);
        return res.data;
    }
        const {
            mutate: mutateUpdateProduct,
            isPending: isPendingUpdateProduct,
        } = useMutation({
            mutationKey: ['updateProductEdit'],
            mutationFn: onUpdateProductEdit,
            onSuccess: (data) => {
                console.log('data update: ', data);
                // if (data?.metadata && data.statusCodes === 200) {
                if (data?.length > 0 && data[0]?.success === '01') {
                    const fileNameArray = data[0]?.TenTapTin?.split(',');
                    sessionStorage.setItem('fileNameNew', JSON.stringify(fileNameArray));
                    setImagesChange(pre => ({
                        ...pre,
                        filename: fileNameArray
                    }));

                    Promise.all([
                        mutateUploadFileEdit(),
                        // productEdit.IDSanPham ? mutateUploadFile(productEdit.IDSanPham + '') : null,
                        productEdit.IDSanPham ? mutateAddGroupProduct(productEdit.IDSanPham) : null
                    ])
                        .then(() => {
                            toast('Cập nhật thành công', {
                                zIndex: 9999,
                                position: 'top-center',
                                theme: isDarkMode ? 'dark' : 'light',
                                className: 'shadow shadow-successLight text-success'
                            });
                            onResetAll();
                            props.onCloseUpdate(true);
                        })
                        .catch(() => {
                            toast('Lỗi trong quá trình thêm cập nhật sản phẩm', {
                                zIndex: 9999,
                                position: 'top-center',
                                theme: isDarkMode ? 'dark' : 'light',
                                className: 'shadow shadow-dangerLight  text-danger'
                            });
                        });
                } else {
                    toast('Cập nhật sản phẩm thất bại',
                        {
                            zIndex: 9999,
                            position: 'top-center',
                            theme: isDarkMode ? 'dark' : 'light',
                            className: 'shadow shadow-dangerLight  text-danger'
                        });
                }


            }
        })

        const {
            mutate: mutateAddNewProduct,
            isPending: isPendingAddNewProduct,
        } = useMutation({
            mutationKey: ['addNewProduct'],
            mutationFn: onAddNewProduct,
            onSuccess: (data) => {
                if (data?.metadata && data?.statusCodes === 200) {
                    const productId = data.metadata.IdsanPham;
                    Promise.all([
                        mutateUploadFile(productId),
                        mutateAddGroupProduct(+productId),
                        delay(2000)
                    ])
                        .then(() => {
                            toast('Thêm sản phẩm thành công', {
                                zIndex: 9999,
                                position: 'top-center',
                                theme: isDarkMode ? 'dark' : 'light',
                                className: 'shadow shadow-successLight text-success'
                            });
                            onResetAll();
                            props.onCloseAddNew(true);
                        })
                        .catch(() => {
                            toast('Lỗi trong quá trình thêm mới sản phẩm', {
                                zIndex: 9999,
                                position: 'top-center',
                                theme: isDarkMode ? 'dark' : 'light',
                                className: 'shadow shadow-dangerLight  text-danger'
                            });
                        });
                } else {
                    toast('Thêm sản phẩm thất bại',
                        {
                            zIndex: 9999,
                            position: 'top-center',
                            theme: isDarkMode ? 'dark' : 'light',
                            className: 'shadow shadow-dangerLight  text-danger'
                        });
                }
            },
        })

        function preSubmit() {
            if (!typeObjCurrent.type?.includes('image')) {
                toast(ToastAlert.PresentProductImageIsRequired, {
                    position: 'top-right',
                    theme: isDarkMode ? 'dark' : 'light',
                    className: 'shadow shadow-dangerLight  text-danger',
                    zIndex: 9999
                })
            } else {
                if (showAddNew) {
                    mutateAddNewProduct();
                } else {
                    mutateUpdateProduct();
                }
            }
        }

        function onChangeNhomSanPham(value: string | number) {
            const updatedOptions = optionsNhomSanPham.map(item => {
                if (item.value === value) {
                    return {
                        ...item,
                        isSelect: !item.isSelect
                    }
                }
                return item;
            })
            setOptionsNhomSanPham(updatedOptions);
            const idsGroupProduct: number[] =[];
            for (const item of updatedOptions) {
                if (item.isSelect) {
                    idsGroupProduct.push(+item.value);
                }
            }
            setValue('idsGroupProduct', idsGroupProduct,{
                shouldValidate: true,
                shouldDirty: true
            });
        }

        const getListGroupsProduct = (): number[] => {
            const listIds:number[] = [];
            for (const item of optionsNhomSanPham) {
                if (item.isSelect) {
                    listIds.push(+item.value);
                }
            }
            return listIds;
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
                        {props.showAddNew ? 'Thêm mới' : productEdit?.MaSanPham}
                    </div>
                </div>}
                destroyOnClose maskClosable={false} closeIcon={null} onClose={() => props.onCloseAddNew}
                open={props.showAddNew || props.showEditProduct}>
                <div id={'add-new-product-container'}
                     className={`${isDarkMode ? 'bg-darkGrey-2E2E' : ''} add-new-product-container flex justify-between flex-col h-full w-[435px]`}>
                    <div className="update-contents-container w-full h-[44.25rem] overflow-y-hidden">
                        <div className="actions-tab flex mb-[24px] fixed w-auto bg-white gap-x-[17px] z-20 ">
                            <div
                                onClick={() => preOnTabClick('info')}
                                className={`
                             ${tabIndex === 'info' ? (isDarkMode ? ' border-[1.5px] border-darkGrey-3838 bg-darkGrey-2E2E text-neutrals-400 font-[600]' : ' border-[1.5px] border-darkGrey-A804033-20 bg-semantics-green03 text-semantics-green01 font-[600]') : (isDarkMode ? 'bg-darkGrey-3333 text-neutrals-600 ' : 'bg-neutrals-50 text-neutrals-700')}'} 
                              hover:cursor-pointer rounded-[8px] flex justify-center items-center  w-[131px] h-[42px]`}>
                                Thông tin
                            </div>
                            <div
                                onClick={() => preOnTabClick('desc')}
                                className={`
                            ${tabIndex === 'desc' ? (isDarkMode ? ' border-[1.5px] border-darkGrey-3838 bg-darkGrey-2E2E text-neutrals-400 font-[600]' : ' border-[1.5px] border-darkGrey-A804033-20 bg-semantics-green03  font-[600]') : (isDarkMode ? 'bg-darkGrey-3333 text-neutrals-600 ' : 'bg-neutrals-50 text-neutrals-700')}'} 
                                hover:cursor-pointer rounded-[8px] flex justify-center items-center  w-[131px] h-[42px]`}>
                                Mô tả
                            </div>
                            <div
                                onClick={() => preOnTabClick('category')}
                                className={`
                             ${tabIndex === 'category' ? (isDarkMode ? ' border-[1.5px] border-darkGrey-3838 bg-darkGrey-2E2E text-neutrals-400 font-[600]' : ' border-[1.5px] border-darkGrey-A804033-20 bg-semantics-green03 text-semantics-green01 font-[600]') : (isDarkMode ? 'bg-darkGrey-3333 text-neutrals-600 ' : 'bg-neutrals-50 text-neutrals-700')}'} 
                               hover:cursor-pointer  rounded-[8px] flex justify-center items-center  w-[131px] h-[42px]`}>
                                Nhóm sản phẩm
                            </div>
                        </div>
                        <div
                            className={`${tabIndex === 'info' ? 'visible' : 'hidden'} form-container mt-[70px] max-h-[75vh] overflow-y-scroll scroll-smooth pb-[70px]`}>
                            <Controller
                                control={controlAddNewProduct}
                                name='productName'
                                render={({field: {onChange, onBlur, value}}) => (
                                    <div className={'control h-[98px] px-[2px]'}>
                                        <label htmlFor={'productName'}
                                               className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                            Tên sản phẩm
                                            <span className={'text-semantics-red02'}>*</span>
                                        </label>
                                        <div className={'relative flex '}>
                                            <div className={'w-full max-h-[50px]'}>
                                                <Input
                                                    warning={errors.productName?.message}
                                                    id={'account'}
                                                    className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
                                                    placeholder={'Nhập tên sản phẩm'}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value || ''}
                                                />
                                            </div>
                                            <span
                                                className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.productName?.message || ''}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            />
                            <Controller
                                control={controlAddNewProduct}
                                name='store'
                                render={({field: {value, onChange}}) => (
                                    <div className={'control h-[92px]'}>
                                        <label htmlFor={'store'}
                                               className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                            Cửa hàng
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
                                                    options={props.storeOptions}
                                                    placeholder={'Chọn cửa hàng'}/>
                                            </div>
                                            <span
                                                className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.store?.message || ''}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            />
                            <div
                                className={`${isDarkMode ? 'bg-darkGrey-3838' : 'bg-neutrals-300'} horizontal-line w-full h-[1px] mb-[16px]`}></div>
                            <div className={'text-semantics-red02 text-[12px] mb-[24px]'}>(*) Sản phẩm phải được nhập theo
                                giá ĐÃ TÍNH VAT
                            </div>
                            <div className="form-row flex gap-x-[40px] w-full flex-auto items-center">
                                <div className={'flex-1'}>
                                    <Controller
                                        control={controlAddNewProduct}
                                        name='warranty'
                                        render={({field: {value, onChange}}) => (
                                            <div className={'control h-[98px]'}>
                                                <label htmlFor={'warranty'}
                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                    Bảo hành
                                                    <span className={'text-semantics-red02'}>*</span>
                                                </label>
                                                <div className={'relative flex px-[2px] '}>
                                                    <div className={'w-full max-h-[50px]'}>
                                                        <SelectComp
                                                            onChange={onChange}
                                                            value={value || ''}
                                                            mode={'single'}
                                                            suffixIcon={<IconSelectArrowLarge/>}
                                                            className={`control-add-product custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : 'bg-neutrals-100 '} h-[50px] text-[12px]`}
                                                            options={WarrantyOptions} placeholder={'Thời gian bảo hành'}/>
                                                    </div>
                                                    <span
                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.warranty?.message || ''}
                                            </span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Controller
                                        control={controlAddNewProduct}
                                        name='isOnlineSale'
                                        render={({field: {value, onChange}}) => (
                                            <div className={'flex gap-x-[15px] flex-1 items-center'}>
                                                <label className={'min-w-[109px] text-[14px] font-[500] text-neutrals-700'}
                                                       htmlFor="isOnlineSale">Bán
                                                    trực tuyến</label>
                                                <Switch
                                                    checked={value}
                                                    onChange={onChange}
                                                />
                                            </div>
                                        )}
                                    />

                                </div>
                            </div>
                            <div className="form-row flex gap-x-[40px] w-full flex-auto items-center">
                                <div className={'flex-1'}>
                                    <Controller
                                        control={controlAddNewProduct}
                                        name='unit'
                                        render={({field: {value, onChange}}) => (
                                            <div className={'control h-[98px]'}>
                                                <label htmlFor={'unit'}
                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                    Đơn vị tính
                                                    <span className={'text-semantics-red02'}>*</span>
                                                </label>
                                                <div className={'relative flex px-[2px] '}>
                                                    <div className={'w-full max-h-[50px]'}>
                                                        <SelectComp
                                                            onChange={onChange}
                                                            value={value || ''}
                                                            mode={'single'}
                                                            suffixIcon={<IconSelectArrowLarge/>}
                                                            className={`control-add-product custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : 'bg-neutrals-100 '} h-[50px] text-[12px]`}
                                                            options={UnitOptions} placeholder={'Đơn vị tính'}/>
                                                    </div>
                                                    <span
                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.unit?.message || ''}
                                            </span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                                <div>
                                    <Controller
                                        control={controlAddNewProduct}
                                        name='isContactPrice'
                                        render={({field: {value, onChange}}) => (
                                            <div className={'flex gap-x-[15px] flex-1 items-center'}>
                                                <label className={'min-w-[109px] text-[14px] font-[500] text-neutrals-700'}
                                                       htmlFor="isContactPrice">Giá liên hệ</label>
                                                <Switch
                                                    checked={value}
                                                    onChange={onChange}
                                                />
                                            </div>
                                        )}
                                    />

                                </div>
                                {/*<div className={'flex gap-x-[15px] flex-1 items-center'}>*/}
                                {/*    <label className={'min-w-[109px] text-[14px] font-[500] text-neutrals-700'}*/}
                                {/*           htmlFor="isOnlineSale">Giá liên hệ</label>*/}
                                {/*    <Switch*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </div>
                            <div className="form-row flex gap-x-[8px] w-full flex-auto items-center">
                                <div className={'flex-1'}>
                                    <Controller
                                        control={controlAddNewProduct}
                                        name='importPrice'
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <div className={'control h-[98px]'}>
                                                <label htmlFor={'productName'}
                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                    Giá nhập
                                                    <span className={'text-semantics-red02'}>*</span>
                                                </label>
                                                <div className={'relative flex px-[2px] '}>
                                                    <div className={'w-full max-h-[50px]'}>
                                                        <CurrencyInput
                                                            warning={errors.importPrice?.message}
                                                            id={'account'}
                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
                                                            placeholder={'Nhập giá nhập'}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value || ''}
                                                        />
                                                    </div>
                                                    <span
                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.importPrice?.message || ''}
                                            </span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className={'flex-1'}>
                                    <Controller
                                        control={controlAddNewProduct}
                                        name='salePrice'
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <div className={'control h-[98px]'}>
                                                <label htmlFor={'salePrice'}
                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                    Giá bán
                                                    <span className={'text-semantics-red02'}>*</span>
                                                </label>
                                                <div className={'relative flex px-[2px] '}>
                                                    <div className={'w-full max-h-[50px]'}>
                                                        <CurrencyInput
                                                            disabled={getValues('isContactPrice')}
                                                            warning={errors.salePrice?.message}
                                                            id={'salePrice'}
                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
                                                            placeholder={'Nhập giá bán'}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                        />
                                                    </div>
                                                    <span
                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.salePrice?.message || ''}
                                            </span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="form-row flex gap-x-[8px] w-full flex-auto items-center">
                                <div className={'flex-1'}>
                                    <Controller
                                        control={controlAddNewProduct}
                                        name='discount'
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <div className={'control h-[92px]'}>
                                                <label htmlFor={'discount'}
                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                    Giảm giá(%)
                                                    {/*<span className={'text-semantics-red02'}>*</span>*/}
                                                </label>
                                                <div className={'relative flex px-[2px] '}>
                                                    <div className={'w-full max-h-[50px]'}>
                                                        <Input
                                                            disabled={getValues('isContactPrice')}
                                                            warning={errors.discount?.message}
                                                            id={'discount'}
                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}

                                                            placeholder={'Giảm giá'}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value || ''}
                                                        />
                                                    </div>
                                                    <span
                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.discount?.message || ''}
                                            </span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className={'flex-1'}>
                                    <Controller
                                        control={controlAddNewProduct}
                                        name='priceAfterDiscount'
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <div className={'control h-[92px]'}>
                                                <label htmlFor={'priceAfterDiscount'}
                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                    Giá sau giảm
                                                    {/*<span className={'text-semantics-red02'}>*</span>*/}
                                                </label>
                                                <div className={'relative flex px-[2px] '}>
                                                    <div className={'w-full max-h-[50px]'}>
                                                        <CurrencyInput
                                                            disabled
                                                            warning={errors.salePrice?.message}
                                                            id={'priceAfterDiscount'}
                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}

                                                            placeholder={'Giá sau giảm'}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value || ''}
                                                        />
                                                    </div>
                                                    <span
                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.priceAfterDiscount?.message || ''}
                                            </span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                            <div
                                className={`${isDarkMode ? 'bg-darkGrey-3838' : 'bg-neutrals-300'} horizontal-line w-full h-[1px] mb-[16px]`}></div>
                            <div className="form-row flex gap-x-[8px] w-full flex-auto items-center">
                                <div className={'flex-1'}>
                                    <Controller
                                        control={controlAddNewProduct}
                                        name='quantity'
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <div className={'control h-[98px]'}>
                                                <label htmlFor={'quantity'}
                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                    Số lượng
                                                    <span className={'text-semantics-red02'}>*</span>
                                                </label>
                                                <div className={'relative flex px-[2px] '}>
                                                    <div className={'w-full max-h-[50px]'}>
                                                        <Input
                                                            warning={errors.quantity?.message}
                                                            id={'quantity'}
                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}

                                                            placeholder={'Nhập số lượng'}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value || ''}
                                                        />
                                                    </div>
                                                    <span
                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.quantity?.message || ''}
                                            </span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className={'flex-1'}>
                                    <Controller
                                        control={controlAddNewProduct}
                                        name='weight'
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <div className={'control h-[98px]'}>
                                                <label htmlFor={'weight'}
                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                    Khối lượng
                                                    <span className={'text-semantics-red02'}>*</span>
                                                </label>
                                                <div className={'relative flex px-[2px] '}>
                                                    <div className={'w-full max-h-[50px]'}>
                                                        <Input
                                                            warning={errors.weight?.message}
                                                            id={'account'}
                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}

                                                            placeholder={'Nhập khối lượng'}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value || ''}
                                                        />
                                                    </div>
                                                    <span
                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.weight?.message || ''}
                                            </span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="form-row flex gap-x-[8px] w-full flex-auto items-center">
                                <div className={'flex-1'}>
                                    <Controller
                                        control={controlAddNewProduct}
                                        name='length'
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <div className={'control h-[98px]'}>
                                                <label htmlFor={'length'}
                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                    Dài(mm)
                                                    <span className={'text-semantics-red02'}>*</span>
                                                </label>
                                                <div className={'relative flex px-[2px] '}>
                                                    <div className={'w-full max-h-[50px]'}>
                                                        <Input
                                                            warning={errors.importPrice?.message}
                                                            id={'length'}
                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}

                                                            placeholder={'Nhập chiều dài'}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value || ''}
                                                        />
                                                    </div>
                                                    <span
                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.length?.message || ''}
                                            </span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className={'flex-1'}>
                                    <Controller
                                        control={controlAddNewProduct}
                                        name='width'
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <div className={'control h-[98px]'}>
                                                <label htmlFor={'width'}
                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                    Rộng(mm)
                                                    <span className={'text-semantics-red02'}>*</span>
                                                </label>
                                                <div className={'relative flex px-[2px] '}>
                                                    <div className={'w-full max-h-[50px]'}>
                                                        <Input
                                                            warning={errors.width?.message}
                                                            id={'width'}
                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}

                                                            placeholder={'Nhập chiều rộng'}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value || ''}
                                                        />
                                                    </div>
                                                    <span
                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.width?.message || ''}
                                            </span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                                <div className={'flex-1'}>
                                    <Controller
                                        control={controlAddNewProduct}
                                        name='height'
                                        render={({field: {onChange, onBlur, value}}) => (
                                            <div className={'control h-[98px]'}>
                                                <label htmlFor={'height'}
                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                    Cao(mm)
                                                    <span className={'text-semantics-red02'}>*</span>
                                                </label>
                                                <div className={'relative flex px-[2px] '}>
                                                    <div className={'w-full max-h-[50px]'}>
                                                        <Input
                                                            warning={errors.salePrice?.message}
                                                            id={'height'}
                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}

                                                            placeholder={'Nhập chiều cao'}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value || ''}
                                                        />
                                                    </div>
                                                    <span
                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.height?.message || ''}
                                            </span>
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className={`${tabIndex === 'desc' ? 'visible' : 'hidden'} form-container pt-[70px] h-full pb-12 overflow-y-auto  flex flex-col gap-y-[1.25rem] `}>
                            <div className={'short-desc'}>
                                <div className={'text-[#6E6D7A] text-[0.75rem] pb-[0.313rem]'}>Mô tả ngắn</div>
                                <EditorProvider>
                                    <Editor
                                        style={{color: isDarkMode ? 'var(--color-neutrals-400)' : ''}}
                                        value={htmlShortDescription}
                                        onChange={(value) => onChangeEditorDescription(value, 'short')}>
                                        <Toolbar>
                                            <BtnRedo/>
                                            <BtnUndo/>
                                            <BtnBold/>
                                            <BtnItalic/>
                                            <BtnUnderline/>
                                            <BtnLink/>
                                            <BtnStrikeThrough/>
                                            <BtnBulletList/>
                                            <BtnNumberedList/>
                                        </Toolbar>
                                    </Editor>
                                </EditorProvider>
                            </div>
                            <div className={'long-desc '}>
                                <div className={'text-[#6E6D7A] text-[0.75rem] pb-[0.313rem]'}>Mô tả</div>
                                <EditorProvider>
                                    <Editor
                                        style={{color: isDarkMode ? 'var(--color-neutrals-400)' : ''}}
                                        value={htmlDescription}
                                        onChange={(value) => onChangeEditorDescription(value, 'long')}>
                                        <Toolbar>
                                            <BtnRedo/>
                                            <BtnUndo/>
                                            <BtnBold/>
                                            <BtnItalic/>
                                            <BtnUnderline/>
                                            <BtnLink/>
                                            <BtnStrikeThrough/>

                                            <BtnBulletList/>
                                            <BtnNumberedList/>
                                        </Toolbar>
                                    </Editor>
                                </EditorProvider>
                            </div>
                            <div className={'image-wrapper'}>
                                <div className={'text-[#6E6D7A] text-[0.75rem] pb-[0.313rem]'}>Hình ảnh</div>
                                <div className={'text-semantics-red02 text-[12px] font-[500] mb-[24px]'}>(*) Dung lượng
                                    hình {'<300KB'}</div>
                                <div className={'flex gap-[9px] flex-wrap'}>
                                    {productImgs.map((item, index) => (
                                        <ImageProductImport
                                            isSubmitted={isSubmitted}
                                            onReaderFileBinary={handleReaderFileBinary}
                                            keyName={item.keyName}
                                            onChange={handleOnChangeImg}
                                            id={item.id}
                                            caption={index === 0 ? 'Ảnh bìa' : 'Ảnh ' + index} key={item.id}
                                            urlImg={item.urlImg}/>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div
                            className={`${tabIndex === 'category' ? 'visible' : 'hidden'} form-container mt-[70px] max-h-[66vh] overflow-auto scroll-smooth`}>
                            {isLoadingNhomSanPhams ? <TextSkeleton/> : (
                                <SelectMultipleShowComp
                                    options={optionsNhomSanPham}
                                    onChange={onChangeNhomSanPham}
                                />
                            )}
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
                            icon={(isPendingUploadFileEdit || isPendingAddGroupProduct || isPendingAddNewProduct || isPendingUploadFile || isPendingUpdateProduct) ?
                                <LoaderPinwheel size={18} className={'animate-spin'}/> : null}
                            disabled={!(isDirty && isValid) || isPendingAddGroupProduct || isPendingUploadFileEdit || isPendingAddNewProduct || isPendingUploadFile || isPendingUpdateProduct}
                            onClick={() => preSubmit()}
                            className={`${isDarkMode ? 'border-darkGrey-3838-important' : ''} h-[53px] w-[210px] gap-x-2`}
                            name={showAddNew ? 'Thêm sản phẩm' : 'Cập nhật'}/>
                    </div>
                </div>
                {isPendingAddNewProduct || isPendingUploadFile && <Loading/>}
            </Drawer>
        );
    }
;

interface AddNewOrUpdateProductProps {
    showAddNew: boolean,
    showEditProduct: boolean,
    onCloseAddNew: (isReload: boolean) => void,
    onCloseUpdate: (isReload: boolean) => void,
    onSubmit?: () => void,
    storeOptions: StoreOptions[],
    productEdit: IProductDetails,

}

export default AddNewOrUpdateProduct;
