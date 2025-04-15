import MenuItem from "../MenuItem";
import {
    IconAccountMenu,
    IconArticleMenu,
    IconCartMenu,
    IconManageMenu,
    IconStoreMenu
} from "../../assets/svgs/SVGIcon.tsx";
import {NavLink, useLocation} from "react-router-dom";
import {ROUTES_PATH} from "../../constants";
import {useEffect, useState} from "react";
import {useTheme} from "../../context/ThemeContext.tsx";
import SubMenuItem from "../SubMenuItem";

const listManagementMenus: { key: string, value: string }[] = [
    {
        key: ROUTES_PATH.ORDER, value: 'Đơn hàng',
    },
    {
        key: ROUTES_PATH.PRODUCT, value: 'Sản phẩm',
    },
    {
        key: ROUTES_PATH.STORE, value: 'Cửa hàng',
    },
    {
        key: ROUTES_PATH.CUSTOMER, value: 'Khách hàng',
    },
    {
        key:  ROUTES_PATH.NOTIFICATION, value: 'Gửi thông báo',
    },
    {
        key:ROUTES_PATH.EMPLOYEE, value: 'Nhân viên',
    },
    {
        key: ROUTES_PATH.PROMOTION, value: 'Khuyến mãi',
    }
]
const onRenderSubMenuManagement = ( pathname: string) => {
    return (
        listManagementMenus.map((item: { key: string, value: string }) => {
            return (
                // <NavLink key={item.key} to={item.key}>
                //     <SubMenuItem
                //
                //         key={item.key} name={item.value}/>
                // </NavLink>
                <NavLink
                    key={item.key}
                    to={item.key}>
                    <SubMenuItem
                        isActive={pathname === item.key}
                              name={item.value}/>
                </NavLink>
            )
        })
    )
}
const LeftMenu = () => {
    const location = useLocation();
    const {isDarkMode} = useTheme();
    const [pathName, setPathName] = useState('')
    const [isOpenTabManage, setIsOpenTabManage] = useState(false);
    useEffect(() => {
        setPathName(location?.pathname);
        console.log('pathName', location?.pathname)
    }, [location]);


    return (
        <div className={`max-w-[304px] min-h-[calc(100vh-17rem)] flex flex-col justify-between`}>
            <div className={' flex gap-y-[16px] flex-col z-10'}>
                <NavLink to={ROUTES_PATH.SELL}>
                    <MenuItem isActive={pathName.includes(ROUTES_PATH.SELL)}
                              icon={<IconCartMenu isDarkMode={isDarkMode}
                                                  isActive={pathName.includes(ROUTES_PATH.SELL)}/>}
                              name={'Bán hàng'}/>
                </NavLink>
                <div>
                    <NavLink
                        to={ROUTES_PATH.DASHBOARD}>
                        <div onClick={() => setIsOpenTabManage(!isOpenTabManage)}>
                            <MenuItem isOpen={isOpenTabManage} isActive={pathName === ROUTES_PATH.DASHBOARD}
                                      icon={<IconManageMenu isDarkMode={isDarkMode}
                                                            isActive={pathName === ROUTES_PATH.DASHBOARD}/>}
                                      name={'Quản trị'} hasChildren/>
                        </div>
                    </NavLink>
                    <div id={'i-sub-menu-container'} className={'ml-[35px] flex flex-col'}>
                        {isOpenTabManage ? (onRenderSubMenuManagement( pathName)) : null}
                    </div>
                </div>
                <NavLink to={ROUTES_PATH.EXPENSE}>
                    <MenuItem isActive={pathName.includes(ROUTES_PATH.EXPENSE)}
                              icon={<IconArticleMenu isDarkMode={isDarkMode}
                                                     isActive={pathName.includes(ROUTES_PATH.EXPENSE)}/>}
                              name={'Chi phí'}/>
                </NavLink>
                <NavLink to={ROUTES_PATH.REPORT}>
                    <MenuItem isActive={pathName.includes(ROUTES_PATH.REPORT)}
                              icon={<IconStoreMenu isDarkMode={isDarkMode}
                                                   isActive={pathName.includes(ROUTES_PATH.REPORT)}/>}
                              name={'Báo cáo'}/>
                </NavLink>
                <NavLink to={ROUTES_PATH.ACCOUNT}>
                    <MenuItem isActive={pathName.includes(ROUTES_PATH.ACCOUNT)}
                              icon={<IconAccountMenu isDarkMode={isDarkMode}
                                                     isActive={pathName.includes(ROUTES_PATH.STORE)}/>}
                              name={'Tài khoản'}/>
                </NavLink>
            </div>
            <div>


            </div>
        </div>
    );
};

export default LeftMenu;
