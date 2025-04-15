import React from "react";
import LeftMenu from "../components/LeftMenu";
import Logout from "../components/Logout";
import {useTheme} from "../context/ThemeContext.tsx";
import InfoUserMenu from "../components/InfoUserMenu";

interface Props {
    children?: React.ReactNode
}

const MainLayout = ({children}: Props) => {
    const {isDarkMode} = useTheme();
    return (
        <div
            className={` ${isDarkMode ? 'bg-darkGrey-3838' : ''} min-h-screen max-h-screen h-full overflow-hidden flex flex-auto pl-8 `}>
            <aside
                className={`  ${isDarkMode ? 'border-r-darkGrey-2727' : 'border-r-neutrals-300'} max-w-[304px]  border-r-[1px] justify-between flex flex-auto flex-col pr-[24px] pt-[40px]`}>
                <div className={'fixed top-[2.5rem] h-[3.375rem]'}>
                    <InfoUserMenu/>
                </div>
                <div className={'flex-2 overflow-y-auto h-full mt-[5rem] '}>
                    <LeftMenu/>
                </div>
                <div className={'flex-0'}>
                    <Logout/>
                </div>
            </aside>
            <main className={'flex-1'}>{children}</main>
        </div>
    );
};

export default MainLayout;
