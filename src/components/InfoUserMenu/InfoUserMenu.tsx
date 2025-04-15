import {useTheme} from "../../context/ThemeContext.tsx";
import {STORAGE_ITEM} from "../../constants/StorageItem.ts";
import {useEffect, useState} from "react";
import AvatarUser from "../AvatarUser/AvatarUser.tsx";

const InfoUserMenu = () => {
    const {isDarkMode} = useTheme();
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const fullName = localStorage.getItem(STORAGE_ITEM.FULL_NAME) || sessionStorage.getItem(STORAGE_ITEM.FULL_NAME) || '';
            setFullName(fullName);
            const role = localStorage.getItem(STORAGE_ITEM.NAME_ROLE) || sessionStorage.getItem(STORAGE_ITEM.NAME_ROLE) || '';
            setRole(role);
        }
    }, []);
    return (
        <div>
            <div className="avatar flex gap-x-[12px] items-center">
                <div className={`w-[3.125rem] h-[3.125rem]`}>
                    <AvatarUser
                        // get char at index 0 of first name in full name
                        charName={fullName.split(' ')[0].charAt(0)}
                    />
                </div>
                <div className="info-container">
                    <div
                        className={`fullname capitalize text-[20px] font-[600] ${isDarkMode ? 'text-neutrals-50' : 'text-semantics-grey01'} `}>{fullName}</div>
                    <div
                        className={`text-[16px] font-[500] ${isDarkMode ? 'text-neutrals-50' : 'text-neutrals-700'}`}>{role}</div>
                </div>
            </div>
        </div>
    );
};

export default InfoUserMenu;
