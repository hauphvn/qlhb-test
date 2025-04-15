import useAuth from "../../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {error500, formLoginDefault, formLoginSchema, MapStatusCodeInternal, ROUTES_PATH} from "../../constants";
import LogoPKNText from '../../assets/imgs/white-logo.png';
import LogoPKNTextDark from '../../assets/imgs/white-logo.png';
import {yupResolver} from "@hookform/resolvers/yup";
import {Controller, useForm} from "react-hook-form";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";
import {CloseEye, OpenEye} from "../../assets/svgs/SVGIcon.tsx";
import {Switch} from "antd";
import ButtonGradient from "../../components/ButtonGradient";
import {useTheme} from "../../context/ThemeContext.tsx";
import {useMutation} from "@tanstack/react-query";
import {decodeData, encodeData} from "../../libs";
import {AxiosResponse} from "axios";
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import 'react-simple-toasts/dist/theme/light.css';
import {LoaderPinwheel} from "lucide-react";
import {Role, UserInfo} from "../../types";
import {onSaveToken} from "../../utils";
import {API_PATH} from "../../constants/Path.ts";
import {initBaseUrlAxios, postProdDomain} from "../../libs/axios.ts";

interface Credential {
    dataBody: string;
    Hash: string;
}

interface LoginResponse {
    message: string;
    metadata: {
        EncodedData: string,
        Hash: string
    },
    statusCodes: number
}

const Login = () => {
    const navigate = useNavigate();
    const {isAuthenticated, login} = useAuth();
    const {isDarkMode} = useTheme();
    const [saveSessionLogin, setSaveSessionLogin] = useState(false);
    const {
        formState: {errors, isDirty, isValid},
        control: controlLogin,
        getValues,
    } = useForm({
        resolver: yupResolver(formLoginSchema()),
        mode: 'all',
        defaultValues: formLoginDefault
    })
    useEffect(() => {
        if (isAuthenticated || localStorage.getItem("isAuthenticated") || sessionStorage.getItem("isAuthenticated")) {
            navigate(ROUTES_PATH.DASHBOARD);
        }
    }, [isAuthenticated, navigate]);
    const loginUser = (credentials: Credential): Promise<AxiosResponse<LoginResponse>> => {
        return postProdDomain(API_PATH.EMPLOYEE_LOGIN, credentials);
    }
    const loginMutation = useMutation({
        mutationFn: loginUser,
        onError: () => {
            toast(error500,
                {
                    position: 'top-center',
                    theme: isDarkMode ? 'dark' : 'light',
                    className: 'shadow shadow-semantics-red03  text-semantics-red02'
                });
        },
        onSuccess: async (data) => {
            const dataBody = data?.data;
            if (!dataBody?.metadata) {
                toast(MapStatusCodeInternal(dataBody?.statusCodes),
                    {
                        position: 'top-center',
                        theme: isDarkMode ? 'dark' : 'light',
                        className: 'shadow shadow-dangerLight  text-danger'
                    });
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const dataJson: any = decodeData(dataBody.metadata);
                // Save to localstorage or session storage
                const userInfo: UserInfo = dataJson?.UserInfo;
                // const storeInfo: StoreInfo = dataJson?.StoreInfo;
                // const storeInfo: StoreInfo = dataJson?.StoreInfo;
                // const permissions: Permission[] = dataJson?.Permissions;
                const token = dataJson?.Token;
                // const refreshToken = dataJson?.RefreshToken;
                // const envTypeCode = dataJson?.EnvTypeCode;
                const apiUrl = dataJson?.ApiUrl;
                const viewImageUrl = dataJson?.ViewImageUrl;
                const permissionsUser = dataJson?.PermissionsUser || [];
                const role: Role = dataJson?.Role;

                if (saveSessionLogin) {
                    onSaveToken(true, {
                        token: token,
                        // refreshToken: refreshToken,
                        role: role,
                        userInfo: userInfo,
                        // storeInfo: storeInfo,
                        apiUrl: apiUrl,
                        viewImageUrl: viewImageUrl,
                        permissionsUser: permissionsUser
                    });
                    const result = await login();
                    if (result) {
                        navigate(ROUTES_PATH.DASHBOARD);
                    }
                } else {
                    onSaveToken(false, {
                        token: token,
                        // refreshToken: refreshToken,
                        role: role,
                        userInfo: userInfo,
                        // storeInfo: storeInfo,
                        apiUrl: apiUrl,
                        viewImageUrl: viewImageUrl,
                        permissionsUser: permissionsUser
                    });
                    const result = await login();
                    if (result) {
                        initBaseUrlAxios();
                        navigate(ROUTES_PATH.DASHBOARD);
                    }
                }
            }

        },
    })

    const onSaveSessionLogin = () => {
        setSaveSessionLogin(!saveSessionLogin);
    }

    const handleLogin = async () => {
        const dataBodyEndcode = encodeData({
            "TokenNofitication": "from web",
            "DeviceId": "from web",
            "Account": getValues('account'),
            "Password": getValues('password'),
            "DeviceModel": "web"
        });
        loginMutation.mutate(dataBodyEndcode)
    }
    function handleKeyPress (event){
        if(event.key === 'Enter'){
            handleLogin();
        }
    }

    return (
        <div
            className={` ${isDarkMode ? 'dark bg-darkGrey-3333 ' : 'light '} px-[32px] py-[24px] h-screen flex flex-col `}>
            {/*<div className={''}>*/}
            {/*    <img src={LeftLogo} alt={'logo'}/>*/}
            {/*</div>*/}
            <div className={'max-w-[1440px] min-w-full flex justify-center'}>
                <div className={'pr-[94px] flex gap-x-[95px] flex-row'}>
                    {/*<div>*/}
                    {/*    {isDarkMode ?*/}
                    {/*        <img className={'max-w-[661px]'} src={ImgLeftLoginDark} alt={'img-left-login'}/> :*/}
                    {/*        <img className={'max-w-[661px]'} src={ImgLeftLogin} alt={'img-left-login'}/>}*/}
                    {/*</div>*/}
                    <div
                        className={`w-[534px] px-[40px] py-[48px] ${isDarkMode ? 'border-darkGrey-2C2C ' : 'border-neutrals-300 '} border rounded-[24px] shadow-custom-2 ${isDarkMode ? 'bg-darkGrey-3333 ' : ' '}`}>
                        <div className={'mb-[20px] flex justify-center items-center w-full'}>
                            {isDarkMode ? <img src={LogoPKNTextDark} alt={'logo-pkn-text'}/> :
                                <img src={LogoPKNText} alt={'logo-pkn-text'}/>}
                        </div>
                        <div className={'form-login-container dark:bg-'}>
                            <div className="title w-full text-center">
                                <h1 className={`text-[42px] font-[700]  ${isDarkMode ? ' text-neutrals-50' : ' text-neutrals-900 '} `}>CHÀO
                                    MỪNG TRỞ LẠI</h1>
                                <h5 className={` ${isDarkMode ? 'text-neutrals-500 ' : 'text-semantics-grey02'} text-[20px] font-[600]`}>Đăng
                                    nhập vào tài khoản
                                    của
                                    bạn</h5>
                            </div>
                            <div className="form px-[13px] pt-[48px]">
                                <Controller
                                    control={controlLogin}
                                    name='account'
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <div className={'control h-[98px]'}>
                                            <label htmlFor={'account'}
                                                   className={`${isDarkMode ? 'text-semantics-grey03 ' : 'text-semantics-grey01 '}label text-[12px] font-[500] pb-[7px]`}>
                                                Tài khoản<span className={'text-semantics-red02'}>*</span>
                                            </label>
                                            <div className={'relative flex '}>
                                                <div className={'w-full max-h-[50px]'}>
                                                    <Input
                                                        disabled={loginMutation.isPending}
                                                        warning={errors.account?.message}
                                                        id={'account'}
                                                        className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E placeholder-semantics-grey02 text-semantics-grey03 ' : 'bg-neutrals-100'} h-[50px]`}
                                                        placeholder={'Tài khoản của bạn'}
                                                        onChange={onChange}
                                                        onKeyDown={handleKeyPress}
                                                        onBlur={onBlur}
                                                        value={value || ''}
                                                    />
                                                </div>
                                                <span
                                                    className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.account?.message || ''}
                                            </span>
                                            </div>
                                        </div>
                                    )}
                                />
                                <Controller
                                    control={controlLogin}
                                    name='password'
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <div className={'control h-[88px]'}>
                                            <label htmlFor={'password'}
                                                   className={`${isDarkMode ? 'text-semantics-grey03 ' : 'text-semantics-grey01 '} label text-[12px] font-[500] pb-[7px]`}>
                                                Mật khẩu<span className={'text-semantics-red02'}>*</span>
                                            </label>
                                            <div className={'relative flex '}>
                                                <div className={'w-full max-h-[50px]'}>
                                                    <InputPassword
                                                        disabled={loginMutation.isPending}
                                                        warning={errors.password?.message || ''}
                                                        iconopeneye={<OpenEye/>}
                                                        iconcloseeye={<CloseEye/>}
                                                        type={'password'}
                                                        id={'password'}
                                                        className={`${isDarkMode ? 'bg-darkGrey-3636 border-darkGrey-2E2E border placeholder-dark text-semantics-grey03' : 'bg-neutrals-200'} h-[50px]`}
                                                        placeholder={'Mật khẩu của bạn'}
                                                        onChange={onChange}
                                                        onKeyDown={handleKeyPress}
                                                        onBlur={onBlur}
                                                        value={value || ''}
                                                    />
                                                </div>
                                                <span
                                                    className={'absolute bottom-[-17px] text-semantics-red02 text-[12px]'}>
                                                {errors.password?.message || ''}
                                            </span>
                                            </div>
                                        </div>
                                    )}
                                />
                                <div className={'flex gap-x-[10px] items-center mb-[32px] mt-[18px]'}>
                                    <Switch
                                        id="sessionLogin"
                                        className={`${isDarkMode ? 'bg-neutrals-800 ' : 'bg-neutrals-200'} `}
                                        defaultValue={saveSessionLogin} onChange={onSaveSessionLogin}/>
                                    <label htmlFor="sessionLogin"
                                           className={`${isDarkMode ? 'text-semantics-grey03' : ''}`}>Lưu đăng
                                        nhập</label>
                                </div>
                                <ButtonGradient
                                    icon={loginMutation.isPending ?
                                        <LoaderPinwheel size={18} className={'animate-spin'}/> : null}
                                    className={`${isDarkMode ? 'border-darkGrey-3838-important' : ''} h-[49px] w-[185px] text-[18px] px-[26px] gap-x-2`}
                                    onClick={handleLogin}
                                    disabled={!isDirty || !isValid || loginMutation.isPending}
                                    name={'Đăng nhập'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Login;
