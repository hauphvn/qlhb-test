import './styleAccountDetailPage.css';
import {IconCustomPen, IconKey, IconLock, IconRightArrow, IconSelectArrowLarge} from "../../assets/svgs/SVGIcon.tsx";
import TopAccountPage from "../../components/TopAccountPage/TopAccountPage.tsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "../../components/ui/breadcrumb.tsx";
import {MapStatusCodeInternal, ROUTES_PATH} from "../../constants";
import AvatarUser from "../../components/AvatarUser/AvatarUser.tsx";
import {API_PATH} from "../../constants/Path.ts";
import {get, post} from "../../libs";
import {useMutation, useQuery} from "@tanstack/react-query";
import TextSkeleton from "../../components/TextSkeleton/TextSkeleton.tsx";
import SelectComp from "../../components/Select";
import {useTheme} from "../../context/ThemeContext.tsx";
import {getInfoAuth} from "../../utils";
import {useParams} from "react-router-dom";
import {formBaseInfoAccount, formBaseInfoAccountDefault} from "../../constants/SchemaYups.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, useForm} from "react-hook-form";
import Input from "../../components/Input";
import {IBaseInfoAccount, IRoleCategory} from "../../types";
import {useEffect, useState} from "react";
import DatePicker from "../../components/DatePicker/DatePicker.tsx";
import toast from "react-simple-toasts";
import dayjs from "dayjs";
import {Loader} from "lucide-react";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal.tsx";

export interface Account {
    idNguoiDung: number;
    ho: string;
    ten: string;
    taiKhoan: string;
    idCuaHang: number;
    email: string;
    soDienThoai: string;
    cmnd: string;
    ngaySinhNhat: string;  // ISO date string
    gioiTinh: string;
    vaiTro: string;
    idVaiTro: number;
    isLock: boolean;
}

type StoreRes = {
    IDCuaHang: number;
    TenCuaHang: string;
}
type RoleRes = {
    value: number;
    label: string;
}
type ApiStoreResponse = [
    StoreRes
];
type ApiRoleResponse = [
    RoleRes
];
type ApiRoleCategoryResponse = {
    message: string,
    metadata: IRoleCategory[],
    statusCodes: number
};
type ApiAccountResponse = {
    message: string;
    metadata: {
        IdnguoiDung: number;
        Ho: string;
        Ten: string;
        TaiKhoan: string;
        IdcuaHang: number;
        Email: string;
        DienThoai: string;
        Cmnd: string | null;
        NgaySinhNhat: string;
        GioiTinh: string;
        IdvaiTro: number;
        IsLock: boolean;
        Token: string;
        TokenAppKh: string | null;
    },
    statusCodes: number;
}
const AccountDetail = () => {
        const {
            formState: {errors},
            control: controlAccountDetail,
            reset,
            getValues
        } = useForm({
            resolver: yupResolver(formBaseInfoAccount()),
            mode: 'all',
            defaultValues: formBaseInfoAccountDefault
        })
        const {isDarkMode} = useTheme();
        const userInfo = getInfoAuth();
        const [allowEdit, setAllowEdit] = useState(false);
        const [isLockAccount, setIsLockAccount] = useState(false);
        const [showModalConfirm, setShowModalConfirm] = useState(false);
        const [rolesCategoriesState, setRolesCategoriesState] = useState<IRoleCategory[]>([]);
        const [rolesCategoriesFilter, setRolesCategoriesFilter] = useState<IRoleCategory[]>([]);

        // Get param id from url
        const {id} = useParams();
        const apiUpdateAccount = async () => {
            if (!id) return;
            const res = await post(API_PATH.ACCOUNT.UPDATE, {
                idNguoiDung: +id,
                ho: getValues('ho'),
                ten: getValues('ten'),
                taiKhoan: getValues('taiKhoan'),
                soDienThoai: getValues('dienThoai'),
                email: getValues('email'),
                cmnd: getValues('cmnd'),
                ngaySinhNhat: dayjs(getValues('ngaySinhNhat')).format('YYYY-MM-DD'),
                idCuaHang: getValues('idCuaHang'),
                idVaiTro: getValues('idVaiTro'),
            });
            return res.data;
        }
        const apiGetAccountDetail = async () => {
            if (!id) return;
            const res = await get(API_PATH.ACCOUNT.GET_BY_ID + `?id=${id}`);
            return res.data;
        }
        const apiGetRolesCategories = async () => {
            const res = await get(API_PATH.COMMONS.ROLES_CATEGORIES);
            return res.data;
        }

        const apiGetStores = async () => {
            const res = await post(API_PATH.STORE.GET_ALL, {
                loai: 1
            });
            return res.data;
        }
        const apiGetRoles = async () => {
            const res = await post(API_PATH.ROLE.GET_ALL, {
                loai: 4,
                idvaitro: userInfo.IDVaiTro
            });
            return res.data;
        }
        const apiLockAccount = async (isLock: boolean) => {
            if (!id) return;
            const res = await post(API_PATH.ACCOUNT.LOCK, {
                "loai": 8,
                "idnguoidung": +id,
                "islock": isLock ? 1 : 0
            });
            return res.data;
        }
        const apiResetPwd = async (account: string) => {
            if (!userInfo.IDNguoiDung || !account) return;
            const res = await post(API_PATH.ACCOUNT.RESET_PWD, {
                "taiKhoanReset": account,
                "idNguoiTao": userInfo.IDNguoiDung,
                "isAutoSendEmail": true
            });
            return res.data;
        }
        const mutateLock = useMutation({
            mutationKey: ['lockAccount'],
            mutationFn: apiLockAccount,
            onError: () => {
                toast('Cập nhật thất bại',
                    {
                        zIndex: 9999,
                        position: 'top-center',
                        theme: isDarkMode ? 'dark' : 'light',
                        className: 'shadow shadow-dangerLight  text-danger'
                    });
            },
            onSuccess: (data) => {
                if (data && data?.length > 0 && data[0].success === '01') {
                    toast('Cập nhật thành công',
                        {
                            zIndex: 9999,
                            position: 'top-center',
                            theme: isDarkMode ? 'dark' : 'light',
                            className: 'shadow shadow-successLight text-success'
                        })
                } else {
                    toast('Cập nhật thất bại',
                        {
                            zIndex: 9999,
                            position: 'top-center',
                            theme: isDarkMode ? 'dark' : 'light',
                            className: 'shadow shadow-dangerLight  text-danger'
                        });
                }
            }
        });
        const {mutate: mutateResetPwd, isPending: isPendingResetPwd} = useMutation({
            mutationKey: ['resetPwd'],
            mutationFn: apiResetPwd,
            onError: () => {
                toast('Đăt lại mật khẩu thất bại',
                    {
                        zIndex: 9999,
                        position: 'top-center',
                        theme: isDarkMode ? 'dark' : 'light',
                        className: 'shadow shadow-dangerLight  text-danger'
                    });
            },
            onSuccess: (data) => {
                if (data?.statusCodes !== 200) {
                    toast(MapStatusCodeInternal(data?.statusCodes) || 'Đặt lại mật khẩu thất bại',
                        {
                            zIndex: 9999,
                            position: 'top-center',
                            theme: isDarkMode ? 'dark' : 'light',
                            className: 'shadow shadow-dangerLight  text-danger'
                        });
                } else {
                    toast('Đặt lại mật khẩu thành công và đã gửi qua email',
                        {
                            zIndex: 9999,
                            position: 'top-center',
                            theme: isDarkMode ? 'dark' : 'light',
                            className: 'shadow shadow-successLight text-success'
                        })
                }
            },
        });
        const mutateUpdate = useMutation({
            mutationKey: ['updateAccount'],
            mutationFn: apiUpdateAccount,
            onError: () => {
                toast('Cập nhật thông tin tài khoản thất bại',
                    {
                        zIndex: 9999,
                        position: 'top-center',
                        theme: isDarkMode ? 'dark' : 'light',
                        className: 'shadow shadow-dangerLight  text-danger'
                    });
            },
            onSuccess: (data) => {
                if (data?.statusCodes !== 200) {
                    toast(MapStatusCodeInternal(data?.statusCodes) || 'Cập nhật thông tin tài khoản thất bại',
                        {
                            zIndex: 9999,
                            position: 'top-center',
                            theme: isDarkMode ? 'dark' : 'light',
                            className: 'shadow shadow-dangerLight  text-danger'
                        });
                } else {
                    toast('Cập nhật thông tin tài khoản thành công',
                        {
                            zIndex: 9999,
                            position: 'top-center',
                            theme: isDarkMode ? 'dark' : 'light',
                            className: 'shadow shadow-successLight text-success'
                        })
                    setAllowEdit(false);
                }
            },
        });
        const {data: rolesCategories, isLoading: isLoadingRolesCategories} = useQuery<ApiRoleCategoryResponse, Error>({
            queryKey: ['rolesCategories'],
            queryFn: apiGetRolesCategories,
        });
        const {data: accountDetail, isLoading: isLoadingAccountDetail} = useQuery<ApiAccountResponse, Error>({
            queryKey: ['accountDetail'],
            queryFn: apiGetAccountDetail,
        });
        const {data: stores, isLoading: isLoadingStores} = useQuery<ApiStoreResponse, Error>({
            queryKey: ['stores'],
            queryFn: apiGetStores,
        });
        const {data: roles, isLoading: isLoadingRoles} = useQuery<ApiRoleResponse, Error>({
            queryKey: ['roles'],
            queryFn: apiGetRoles,
        });

        function preOnUpdateAccountInfo() {
            setShowModalConfirm(true);
        }

        useEffect(() => {
            if (accountDetail && accountDetail?.statusCodes === 200 && stores && stores?.length > 0 && roles && roles?.length > 0) {
                const userInfo: IBaseInfoAccount = {
                    idNguoiDung: accountDetail.metadata.IdnguoiDung,
                    ho: accountDetail.metadata.Ho,
                    ten: accountDetail.metadata.Ten,
                    taiKhoan: accountDetail.metadata.TaiKhoan,
                    idCuaHang: accountDetail.metadata.IdcuaHang,
                    email: accountDetail.metadata.Email || '',
                    dienThoai: accountDetail.metadata.DienThoai || '',
                    cmnd: accountDetail.metadata.Cmnd || '',
                    ngaySinhNhat: accountDetail.metadata.NgaySinhNhat || '',
                    gioiTinh: accountDetail.metadata.GioiTinh !== null ? +accountDetail.metadata.GioiTinh : -1,
                    idVaiTro: accountDetail.metadata.IdvaiTro
                }
                reset(userInfo);
                setIsLockAccount(accountDetail.metadata.IsLock);
                // Filter roles categories
                const rolesCategoriesFilter = rolesCategoriesState.filter((item) => item.idsVaiTro.includes(userInfo.idVaiTro));
                setRolesCategoriesFilter(rolesCategoriesFilter);
            }
        }, [accountDetail, stores]);
        useEffect(() => {
            if (rolesCategories && rolesCategories?.statusCodes === 200) {
                setRolesCategoriesState(rolesCategories.metadata);
            }
        }, [rolesCategories]);
        return (
                <div className={'h-[calc(100%-40px)] overflow-hidden '}>
                    <TopAccountPage
                        title={'Thông tin tài khoản'}
                    />
                    <div className="frame_1000003604 inline-flex items-center pt-[1.063rem] pl-[1.5rem]">
                        <div>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={`${ROUTES_PATH.ACCOUNT}`}>
                                            <div
                                                className="text-[#6e6d7a] font-['Inter'] text-sm font-medium leading-[120%]">Tài
                                                khoản
                                            </div>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator>
                                        <div
                                            className="flex justify-center items-center pt-[0.1875rem] pb-[0.1875rem] px-1 w-[1.125rem] h-[1.125rem]">
                                            <IconRightArrow/>
                                        </div>
                                    </BreadcrumbSeparator>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink>
                                            <div
                                                className="text-[#0d0c22] font-['Inter'] text-sm font-medium leading-[120%]">Thông
                                                tin tài khoản
                                            </div>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div className={'info-user mt-[2rem] flex gap-x-[1.5rem] items-center pl-[4rem]'}>
                        <div className="item flex gap-x-[1.5rem] justify-center items-center">
                            <div className={`w-[6.25rem] h-[6.25rem]`}>
                                {isLoadingAccountDetail ? (<TextSkeleton/>) : accountDetail ? (
                                    <AvatarUser
                                        // get char at index 0 of first name in full name
                                        charName={accountDetail.metadata.Ten.split(' ')[0].charAt(0)}
                                        classNameAvatar={'text-4xl'}
                                    />
                                ) : null}
                            </div>
                            <div className={'flex flex-col'}>
                                <div
                                    className="w-[12.625rem] text-[#7e808a] font-['Inter'] font-medium leading-[130%]">Tài
                                    khoản
                                </div>
                                <div
                                    className="w-[12.625rem] text-[#454545] font-['Inter'] text-xl font-semibold leading-[140%]">
                                    {isLoadingAccountDetail ? (<TextSkeleton/>) : accountDetail ? (
                                        <div>{accountDetail.metadata.TaiKhoan}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div
                                onClick={() => {
                                    if (!isPendingResetPwd && !isLoadingAccountDetail && accountDetail?.metadata.TaiKhoan) {
                                        mutateResetPwd(accountDetail.metadata.TaiKhoan);
                                    }
                                }}
                                className="frame_1000003591 hover:cursor-pointer justify-end items-center pl-[1.125rem] pr-[1.125rem] p-2 rounded-lg border border-[#e7e7e9] hover:border-b-neutrals-500 bg-white flex gap-x-[0.875rem]">
                                {isPendingResetPwd ? (
                                    <div className={'min-w-[9.375rem] flex justify-center'}><Loader
                                        className={'animate-spin'}/>
                                    </div>
                                ) : (
                                    <>
                                        <div
                                            className="flex justify-center items-center p-px w-[1.125rem] h-[1.125rem]">
                                            <IconKey/>
                                        </div>
                                        <div className="text-[#e09c2f] font-['Inter'] font-medium leading-[130%] ">Đặt
                                            lại mật
                                            khẩu
                                        </div>
                                    </>
                                )}

                            </div>
                        </div>
                        <div className="item">
                            <div
                                onClick={() => {
                                    mutateLock.mutate(!isLockAccount);
                                    setIsLockAccount(!isLockAccount);
                                }}
                                className="frame_35477 hover:cursor-pointer justify-end items-center pl-[1.125rem] pr-[1.125rem] p-2 rounded-lg border border-[#e7e7e9] hover:border-b-neutrals-500 bg-white flex gap-x-[0.875rem]">
                                <IconLock/>
                                <div className="text-[#ff0303] font-['Inter'] font-medium leading-[130%]">
                                    {isLockAccount ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                                </div>
                            </div>
                        </div>
                    </div>
                        <div
                            className="info-main-container h-full  flex flex-auto flex-wrap gap-x-[1rem] md:gap-x-[2.5rem] justify-between w-full mt-[1.5rem] px-[2rem] border border-yellow-50">
                            <div
                                className="flex-1 max-h-[65vh] w-full inline-flex flex-col items-start gap-6 py-6 px-8 rounded-3xl border border-[#e7e7e9] bg-white">
                                <div className="frame_1000003588 flex items-center self-stretch justify-between">
                                    <div
                                        className="w-[13.75rem] text-[#0d0c22] font-['Inter'] text-2xl font-medium leading-[130%]">Thông
                                        tin cơ bản
                                    </div>
                                    {allowEdit ? (
                                        <div
                                            onClick={() => {
                                                preOnUpdateAccountInfo();
                                            }}
                                            className="frame_35477 hover:cursor-pointer flex justify-end items-center gap-x-[0.875rem] pl-[1.125rem] pr-[1.125rem] p-2 w-[7.8125rem] rounded-lg border border-[#12d56a] bg-[#e3fff0]">
                                            <div
                                                className="flex flex-shrink-0 justify-center items-center p-px w-[1.125rem] h-[1.125rem]">
                                                <svg width={16} height={16} viewBox="0 0 16 16" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.6875 15.3125H15.3125" stroke="#0E5932"
                                                          strokeMiterlimit={10}
                                                          strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path
                                                        d="M5.44824 11.6764L1.51074 12.8014L2.63574 8.86386L10.2295 1.27011C11.0063 0.493297 12.2652 0.493297 13.042 1.27011C13.8188 2.04692 13.8188 3.3058 13.042 4.08261L5.44824 11.6764Z"
                                                        stroke="#0E5932" strokeMiterlimit={10} strokeLinecap="round"
                                                        strokeLinejoin="round"/>
                                                    <path d="M9.125 2.375L11.9375 5.1875" stroke="#0E5932"
                                                          strokeMiterlimit={10}
                                                          strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                            <div
                                                className="x_c_nh_n text-[#0e5932] font-['Inter'] text-xs leading-[130%]">Xác
                                                nhận
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => setAllowEdit(!allowEdit)}
                                            className="frame_35477 hover:cursor-pointer flex justify-end items-center pl-[1.125rem] pr-[1.125rem] p-2 rounded-lg border border-[#e7e7e9] bg-[#f9f9fb] gap-x-[0.875rem]">
                                            <div
                                                className="flex justify-center items-center p-px w-[1.125rem] h-[1.125rem]">
                                                <IconCustomPen/>
                                            </div>
                                            <div
                                                className="text-[#0d0c22] font-['Inter'] text-xs leading-[130%]">Chỉnh
                                                sửa
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="self-stretch h-0.5 rounded-full bg-[#eaeaea]"/>
                                <div className="flex flex-wrap justify-between">
                                    {(isLoadingAccountDetail || isLoadingStores || isLoadingRoles) ? (
                                        <TextSkeleton/>) : accountDetail ? (
                                        <>
                                            <Controller
                                                control={controlAccountDetail}
                                                name='ho'
                                                render={({field: {onChange, onBlur, value}}) => (
                                                    <div
                                                        className={'control h-[98px] px-[2px] max-w-[calc(55%-3rem)] w-full'}>
                                                        {isLoadingAccountDetail ? (<TextSkeleton/>) : accountDetail ? (
                                                            <div>
                                                                <label htmlFor={'ho'}
                                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                                    Họ
                                                                </label>
                                                                <div className={'relative flex '}>
                                                                    <div className={'w-full max-h-[50px]'}>
                                                                        <Input
                                                                            disabled={!allowEdit}
                                                                            id={'ho'}
                                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
                                                                            placeholder={'Nhập họ'}
                                                                            onChange={onChange}
                                                                            onBlur={onBlur}
                                                                            value={value || ''}
                                                                        />
                                                                    </div>
                                                                    <span
                                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.ho?.message || ''}
                                            </span>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                            />
                                            <Controller
                                                control={controlAccountDetail}
                                                name='ten'
                                                render={({field: {onChange, onBlur, value}}) => (
                                                    <div
                                                        className={'control h-[98px] px-[2px] max-w-[calc(55%-3rem)] w-full'}>
                                                        {isLoadingAccountDetail ? (<TextSkeleton/>) : accountDetail ? (
                                                            <div>
                                                                <label htmlFor={'ten'}
                                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                                    Tên
                                                                </label>
                                                                <div className={'relative flex '}>
                                                                    <div className={'w-full max-h-[50px]'}>
                                                                        <Input
                                                                            disabled={!allowEdit}
                                                                            id={'ten'}
                                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
                                                                            placeholder={'Nhập tên'}
                                                                            onChange={onChange}
                                                                            onBlur={onBlur}
                                                                            value={value || ''}
                                                                        />
                                                                    </div>
                                                                    <span
                                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.ten?.message || ''}
                                            </span>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                            />
                                            <Controller
                                                control={controlAccountDetail}
                                                name='taiKhoan'
                                                render={({field: {onChange, onBlur, value}}) => (
                                                    <div
                                                        className={'control h-[98px] px-[2px] max-w-[calc(55%-3rem)] w-full'}>
                                                        {isLoadingAccountDetail ? (<TextSkeleton/>) : accountDetail ? (
                                                            <div>
                                                                <label htmlFor={'taiKhoan'}
                                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                                    Tên
                                                                </label>
                                                                <div className={'relative flex '}>
                                                                    <div className={'w-full max-h-[50px]'}>
                                                                        <Input
                                                                            disabled={!allowEdit}
                                                                            id={'taiKhoan'}
                                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
                                                                            placeholder={'Nhập tài khoản'}
                                                                            onChange={onChange}
                                                                            onBlur={onBlur}
                                                                            value={value || ''}
                                                                        />
                                                                    </div>
                                                                    <span
                                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.taiKhoan?.message || ''}
                                            </span>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                            />
                                            <Controller
                                                control={controlAccountDetail}
                                                name='dienThoai'
                                                render={({field: {onChange, onBlur, value}}) => (
                                                    <div
                                                        className={'control h-[98px] px-[2px] max-w-[calc(55%-3rem)] w-full'}>
                                                        {isLoadingAccountDetail ? (<TextSkeleton/>) : accountDetail ? (
                                                            <div>
                                                                <label htmlFor={'dienThoai'}
                                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                                    Điện thoại
                                                                </label>
                                                                <div className={'relative flex '}>
                                                                    <div className={'w-full max-h-[50px]'}>
                                                                        <Input
                                                                            disabled={!allowEdit}
                                                                            id={'dieThoai'}
                                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
                                                                            placeholder={'Nhập số điện thoại'}
                                                                            onChange={onChange}
                                                                            onBlur={onBlur}
                                                                            value={value || ''}
                                                                        />
                                                                    </div>
                                                                    <span
                                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.dienThoai?.message || ''}
                                            </span>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                            />
                                            <Controller
                                                control={controlAccountDetail}
                                                name='email'
                                                render={({field: {onChange, onBlur, value}}) => (
                                                    <div
                                                        className={'control h-[98px] px-[2px] max-w-[calc(55%-3rem)] w-full'}>
                                                        {isLoadingAccountDetail ? (<TextSkeleton/>) : accountDetail ? (
                                                            <div>
                                                                <label htmlFor={'ho'}
                                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                                    Email
                                                                </label>
                                                                <div className={'relative flex '}>
                                                                    <div className={'w-full max-h-[50px]'}>
                                                                        <Input
                                                                            disabled={!allowEdit}
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
                                                        ) : null}
                                                    </div>
                                                )}
                                            />
                                            <Controller
                                                control={controlAccountDetail}
                                                name='ngaySinhNhat'
                                                render={({field: {onChange, value}}) => (
                                                    <div
                                                        className={'control h-[98px] px-[2px] max-w-[calc(55%-3rem)] w-full'}>
                                                        {isLoadingAccountDetail ? (<TextSkeleton/>) : accountDetail ? (
                                                            <div>
                                                                <label htmlFor={'ho'}
                                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                                    Ngày sinh
                                                                </label>
                                                                <div className={'relative flex '}>
                                                                    <div className={'w-full max-h-[50px]'}>
                                                                        <DatePicker
                                                                            disabled={!allowEdit}
                                                                            className={` w-full ${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
                                                                            value={value}
                                                                            onChange={onChange}/>
                                                                    </div>
                                                                    <span
                                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.ngaySinhNhat?.message || ''}
                                            </span>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                            />
                                            <Controller
                                                control={controlAccountDetail}
                                                name='cmnd'
                                                render={({field: {onChange, onBlur, value}}) => (
                                                    <div
                                                        className={'control h-[98px] px-[2px] max-w-[calc(55%-3rem)] w-full'}>
                                                        {isLoadingAccountDetail ? (<TextSkeleton/>) : accountDetail ? (
                                                            <div>
                                                                <label htmlFor={'ho'}
                                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                                    CMND
                                                                </label>
                                                                <div className={'relative flex '}>
                                                                    <div className={'w-full max-h-[50px]'}>
                                                                        <Input
                                                                            disabled={!allowEdit}
                                                                            id={'cmnd'}
                                                                            className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px] pl-[11px]`}
                                                                            placeholder={'Nhập số căn cước công dân'}
                                                                            onChange={onChange}
                                                                            onBlur={onBlur}
                                                                            value={value || ''}
                                                                        />
                                                                    </div>
                                                                    <span
                                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.ngaySinhNhat?.message || ''}
                                            </span>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                            />
                                            <Controller
                                                control={controlAccountDetail}
                                                name='idCuaHang'
                                                render={({field: {onChange, value}}) => (
                                                    <div
                                                        className={'control h-[98px] px-[2px] max-w-[calc(55%-3rem)] w-full'}>
                                                        {(isLoadingStores || isLoadingAccountDetail) ? (<TextSkeleton/>) : accountDetail ? (
                                                            <div>
                                                                <label htmlFor={'idCuaHang'}
                                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                                    Cửa hàng
                                                                </label>
                                                                <div className={'relative flex '}>
                                                                    <div className={'w-full max-h-[50px]'}>
                                                                        <SelectComp
                                                                            disabled={!allowEdit}
                                                                            mode={'single'}
                                                                            onChange={onChange}
                                                                            value={isNaN(value!) ? '' : value + ''}
                                                                            suffixIcon={<IconSelectArrowLarge/>}
                                                                            className={`control-add-product custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : 'bg-neutrals-100 '} h-[50px] text-[12px]`}
                                                                            options={stores?.map((store) => (
                                                                                {
                                                                                    label: store.TenCuaHang,
                                                                                    value: store.IDCuaHang + ''
                                                                                }
                                                                            )) || []}
                                                                            placeholder={'Chọn cửa hàng'}/>
                                                                    </div>
                                                                    <span
                                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.idCuaHang?.message || ''}
                                            </span>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                            />
                                            <Controller
                                                control={controlAccountDetail}
                                                name='idVaiTro'
                                                render={({field: {onChange, value}}) => (
                                                    <div
                                                        className={'control h-[98px] px-[2px] max-w-[calc(55%-3rem)] w-full'}>
                                                        {(isLoadingRoles || isLoadingAccountDetail || isLoadingRolesCategories) ? (<TextSkeleton/>) : accountDetail ? (
                                                            <div>
                                                                <label htmlFor={'idVaiTro'}
                                                                       className={'label text-[12px] font-[500] text-neutrals-700 pb-[7px]'}>
                                                                    Vị trí
                                                                </label>
                                                                <div className={'relative flex '}>
                                                                    <div className={'w-full max-h-[50px]'}>
                                                                        <SelectComp
                                                                            disabled={!allowEdit}
                                                                            mode={'single'}
                                                                            onChange={(role) => {
                                                                                onChange(role);
                                                                                const roleCategory = rolesCategoriesState.filter((roleCategory) =>roleCategory.idsVaiTro.includes(+role));
                                                                                if (roleCategory) {
                                                                                    setRolesCategoriesFilter(roleCategory);
                                                                                }
                                                                            }}
                                                                            value={value + ''}
                                                                            suffixIcon={<IconSelectArrowLarge/>}
                                                                            className={`control-add-product custom-select-dropdown ${isDarkMode ? 'placeholder-dark border-dark bg-darkGrey-2E2E rounded-[8px] select-dark-content ' : 'bg-neutrals-100 '} h-[50px] text-[12px]`}
                                                                            options={roles?.map((role) => (
                                                                                {
                                                                                    label: role.label,
                                                                                    value: role.value + ''
                                                                                }
                                                                            )) || []}
                                                                            placeholder={'Chọn vai trò'}/>
                                                                    </div>
                                                                    <span
                                                                        className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.idVaiTro?.message || ''}
                                            </span>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )}
                                            />
                                        </>
                                    ) : null}
                                </div>
                            </div>
                            <div
                                className='flex-1 max-h-[65vh] w-full h-full  inline-flex flex-col items-start gap-6 py-6 px-8 rounded-3xl border border-[#e7e7e9] bg-white'>
                                <div
                                    className="max-w-[10rem] md:max-w-[13.75rem] text-[#0d0c22] font-['Inter'] text-xl md:text-2xl font-medium leading-[130%]">Chức
                                    năng
                                </div>
                                <div className="line self-stretch h-0.5 rounded-full bg-[#eaeaea]"/>

                                <div
                                    className={'items min-w-full overflow-y-auto gap-x-[1rem] md:gap-x-[2.813rem] gap-y-[1.5rem] grid grid-cols-2 '}>

                                    {isLoadingRolesCategories ? (
                                        <TextSkeleton/>) : rolesCategoriesFilter.map((roleCategory) => (
                                        <div
                                            key={roleCategory.idChuyenMuc}
                                            className="item col-span-1 flex  pt-[0.8125rem] pb-[0.8125rem]  px-5 h-fit  rounded-lg border border-[#e7e7e9]/50 bg-[#f9f9fb]">
                                            <div
                                                className=" text-[#6e6d7a] min-w-full font-['Inter'] leading-[140%]">{roleCategory.tenChuyenMuc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    <ConfirmModal
                        okText={'Cập nhật'}
                        cancelText={'Hủy'}
                        title={<div className={`${isDarkMode ? 'dark-mode' : ' '} `}>Xoá sản phẩm</div>}
                        onCancel={() => setShowModalConfirm(false)}
                        onOk={() => {
                            mutateUpdate.mutate();
                            setShowModalConfirm(false);
                        }} open={showModalConfirm}>
                        <div className={'px-[24px] flex flex-col items-center gap-y-[12px] mb-[32px]'}>
                            <div
                                className={`${isDarkMode ? 'text-neutrals-500' : 'text-[0d0c22] '} th_ng_b_o self-stretch  text-center text-[2.625rem] font-bold leading-[120%]`}>Xác
                                nhận
                            </div>
                            <div
                                className="text-center self-stretch text-[#6e6d7a] font-['Inter'] text-lg font-medium leading-[140%]">
                                Bạn có chắc chắn muốn chỉnh sửa thông tin này không?
                            </div>
                        </div>
                    </ConfirmModal>
                </div>
        );
    }
;

export default AccountDetail;
