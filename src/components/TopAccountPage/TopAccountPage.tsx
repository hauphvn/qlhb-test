import {useTheme} from "../../context/ThemeContext.tsx";
import Button from "../Button/Button.tsx";
import {IconManageMenu, IconPlus} from "../../assets/svgs/SVGIcon.tsx";
import ButtonGradient from "../ButtonGradient";

interface TopAccountPageProps {
    title?: string;
}

const TopAccountPage = (props: TopAccountPageProps) => {
    const {title} = props;
    const {isDarkMode} = useTheme();
    return (
        <div
            className={`${isDarkMode ? 'text-neutrals-400 border-b-darkGrey-2727' : 'text-semantics-grey01 border-b-neutrals-300'} titleContainer h-[88px] border-b-[1px] pl-[32px] pr-[33px] flex justify-between items-center`}>
            <div className="title  text-[32px]">{title}</div>
            <div className={'flex gap-x-[25px]'}>
                <Button
                    icon={<IconManageMenu isDarkMode={isDarkMode}/>}
                    className={`${isDarkMode ? 'bg-[#f9f9fb] border-[#e7e7e9] text-neutrals-400' : ''} h-[40px]`}
                    name={'Nhập theo danh sách'}/>
                <ButtonGradient
                    onClick={() => null}
                    icon={<IconPlus/>}
                    className={`${isDarkMode ? 'border-darkGrey-3838-important border' : ''} h-[40px] w-[165px] text-[16px]  px-[24px] gap-x-[14px]`}
                    name={'Thêm mới'}/>
            </div>
        </div>
    );
};

export default TopAccountPage;
