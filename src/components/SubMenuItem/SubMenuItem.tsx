import {ReactNode} from "react";
import {useTheme} from "../../context/ThemeContext.tsx";

interface SubMenuItemProps {
    hasChildren?: boolean,
    name: string,
    icon?: ReactNode,
    isActive?: boolean,
    isOpen?: boolean
}

const SubMenuItem = (props: SubMenuItemProps) => {
    const {isDarkMode} = useTheme();
    return (
        <div className={'sub-item-manage-menu-left flex  relative'}>
            <div className={'absolute sub-item-manage-menu-left-line'}></div>
            <div className={` w-[231px] ml-[20px]
        ${isDarkMode ? 'text-neutrals-50' : 'text-neutrals-900 '}
        ${isDarkMode ? (!props?.isActive ? 'hover:text-neutrals-900' : '') : ' '}
        ${props?.isActive ? (isDarkMode ? 'bg-darkGrey-2C2C' : 'bg-brand01-100') : ''}
        hover:${!props?.isActive ? 'bg-neutrals-200' : ''} transition-all duration-150  
        rounded-[12px] pr-[16px] py-[12px] flex flex-auto gap-x-[13px] justify-start items-end hover:cursor-pointer`}>
                <div className={'flex gap-x-2 '}>
                    <div
                        className={`w-[3px] ${props?.isActive ? 'lineActive h-[24px] bg-lineActive rounded-[100px]' : ''}`}></div>
                    <div className={'flex-1 flex '}>
                        {/*<div>*/}
                        {/*    {props?.icon ? props.icon : null}*/}
                        {/*</div>*/}
                        <div
                            className={` ${(props.isActive ? (!isDarkMode ? 'text-white' : ' ') : '')} `}>{props.name}</div>
                    </div>
                </div>
                {/*<div className={'flex-0'}>*/}
                {/*    {props?.hasChildren ? (*/}
                {/*        props?.isOpen ? (<IconArrowButton isActive={props.isActive || false}/>) : (<IconArrowRight isActive={props.isActive || false}/>)*/}
                {/*    ) : null}*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default SubMenuItem;
