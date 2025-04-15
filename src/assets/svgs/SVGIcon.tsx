const Plus = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                className={`${props?.isDarkMode ? 'stroke-neutrals-50' : 'stroke-neutrals-50'}`} strokeWidth="1.5"
                strokeMiterlimit="10" strokeLinecap="round"
                strokeLinejoin="round"/>
            <path d="M12 7.45459V16.5455"
                  className={`${props?.isDarkMode ? 'stroke-neutrals-50' : 'stroke-neutrals-50'}`} strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.5455 12H7.45459"
                  className={`${props?.isDarkMode ? 'stroke-neutrals-50' : 'stroke-neutrals-50'}`} strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );
};
const OpenEye = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg className={'hover:cursor-pointer'} width="24" height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z"
                className={`${props?.isDarkMode ? 'stroke-neutrals-500' : 'stroke-neutrals-500'}`} strokeWidth="1.5"
                strokeMiterlimit="10" strokeLinecap="round"
                strokeLinejoin="round"/>
            <path
                d="M12 4.5C19.5 4.5 22.5 12 22.5 12C22.5 12 19.5 19.5 12 19.5C4.5 19.5 1.5 12 1.5 12C1.5 12 4.5 4.5 12 4.5Z"
                className={`${props?.isDarkMode ? 'stroke-neutrals-500' : 'stroke-neutrals-500'}`} strokeWidth="1.5"
                strokeMiterlimit="10" strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>


    );
};
const CloseEye = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg className={'hover:cursor-pointer'} width="24" height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_804_9279)">
                <path
                    d="M8.81775 15.1823C8.00325 14.3678 7.5 13.2427 7.5 12C7.5 9.5145 9.5145 7.5 12 7.5C13.2427 7.5 14.3678 8.004 15.1823 8.81775"
                    className={`${props?.isDarkMode ? 'stroke-neutrals-500' : 'stroke-neutrals-500'}`} strokeWidth="1.5"
                    strokeMiterlimit="10" strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M16.4929 11.7502C16.4974 11.8327 16.4997 11.916 16.4997 12C16.4997 14.4855 14.4852 16.5 11.9997 16.5C11.9134 16.5 11.8279 16.4977 11.7432 16.4925"
                    className={`${props?.isDarkMode ? 'stroke-neutrals-500' : 'stroke-neutrals-500'}`} strokeWidth="1.5"
                    strokeMiterlimit="10" strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M6.2415 17.7607C2.91825 15.5452 1.5 12 1.5 12C1.5 12 4.5 4.5 12 4.5C14.3438 4.5 16.248 5.23275 17.7585 6.23925"
                    className={`${props?.isDarkMode ? 'stroke-neutrals-500' : 'stroke-neutrals-500'}`} strokeWidth="1.5"
                    strokeMiterlimit="10" strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M20.0295 8.21313C21.7402 10.1001 22.5 11.9999 22.5 11.9999C22.5 11.9999 19.5 19.4999 12 19.4999C10.9597 19.4999 10.0065 19.3559 9.13574 19.1076"
                    className={`${props?.isDarkMode ? 'stroke-neutrals-500' : 'stroke-neutrals-500'}`} strokeWidth="1.5"
                    strokeMiterlimit="10" strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path d="M1.5 22.5L22.5 1.5"
                      className={`${props?.isDarkMode ? 'stroke-neutrals-500' : 'stroke-neutrals-500'}`}
                      strokeWidth="1.5" strokeMiterlimit="10"
                      strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_804_9279">
                    <rect width="24" height="24" fill="white"/>
                </clipPath>
            </defs>
        </svg>

    );
};
const AvatarDefault = () => {
    return (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="8" fill="url(#paint0_linear_1426_10731)"/>
            <path
                d="M19.1853 15.5867C19.5232 15.4514 21.7588 14.5984 23.9001 15.7828C25.0984 16.4456 25.676 17.4182 25.8645 17.7437C26.0492 18.0633 27.2397 20.2007 26.2574 22.0577C26.0138 22.5185 25.7035 22.8382 25.4717 23.0382V27.5483L26.6405 28.8876C26.8841 28.7758 27.2358 28.5954 27.6326 28.3327C31.0606 26.0521 31.5183 21.5753 31.5615 21.0773C31.6028 20.6066 31.9485 15.7141 28.2219 12.4492C24.9786 9.60783 20.0006 9.18231 15.8457 11.4687C16.2799 11.706 16.8004 12.0511 17.3191 12.5473C18.3524 13.5375 18.8494 14.6298 19.0871 15.2925L19.1853 15.5867Z"
                fill="white"/>
            <path
                d="M18.4986 39.9992H14.3476C13.6031 39.9992 13 39.3972 13 38.654V12.9385C16.0371 12.9385 18.5005 15.3975 18.5005 18.4291V39.9992H18.4986Z"
                fill="white"/>
            <path
                d="M36.474 29.9013C36.474 27.1933 34.2758 24.999 31.5628 24.999H31.1699V33.1388L36.474 38.0646V29.9013Z"
                fill="#F4D03F"/>
            <path
                d="M36.4732 39.8687L24.3917 27.8385V23.1362C24.3917 20.4282 22.1934 18.2339 19.4805 18.2339V40.0001H22.5785C23.5803 40.0001 24.3917 39.1903 24.3917 38.1902V33.7644L30.5091 39.8707H36.4732V39.8687Z"
                fill="#F4D03F"/>
            <defs>
                <linearGradient id="paint0_linear_1426_10731" x1="0" y1="25" x2="50" y2="25"
                                gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0A88BF"/>
                    <stop offset="1" stopColor="#05AA50"/>
                </linearGradient>
            </defs>
        </svg>


    );
};

const IconManageMenu = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                d="M8 3H4C3.44772 3 3 3.44772 3 4V8C3 8.55228 3.44772 9 4 9H8C8.55228 9 9 8.55228 9 8V4C9 3.44772 8.55228 3 8 3Z"
                strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                strokeLinejoin="round"/>
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                d="M14 4H21" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                strokeLinejoin="round"/>
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                d="M14 8H21" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                strokeLinejoin="round"/>
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                d="M8 15H4C3.44772 15 3 15.4477 3 16V20C3 20.5523 3.44772 21 4 21H8C8.55228 21 9 20.5523 9 20V16C9 15.4477 8.55228 15 8 15Z"
                strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                strokeLinejoin="round"/>
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                d="M14 16H21" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                strokeLinejoin="round"/>
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                d="M14 20H21" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>

    );
}
const IconLogout = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"

        >
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : 'stroke-neutrals-700'} hover:stroke-primary`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                d="m18.5 6 4 4-4 4M14 14v3H9"
            />
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : 'stroke-neutrals-700'} hover:stroke-primary`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                d="M2.722 2.517 9 7.016V22l-7-5V2h12v4M13 10h9.5-.5"
            />
        </svg>

    );
}
const IconCartMenu = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"

        >
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                d="M8 13v4M12 13v4M16 13v4M3.51 12H3.5l.802 7.221A2 2 0 0 0 6.29 21h11.42a2 2 0 0 0 1.988-1.779L20.5 12h-.01M1 8h22M8.75 1.5 5 8h1"
            />
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                d="M15.25 1.5 19 8h-1"
            />
        </svg>
    )
}
const IconArticleMenu = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"

        >
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                d="M9 1.5v3.75A2.25 2.25 0 0 1 6.75 7.5H3"
            />
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                d="M9 1.5h9.75A2.25 2.25 0 0 1 21 3.75v16.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 20.25V7.5l6-6ZM6.75 16.5h10.5M6.75 12h10.5M12.75 7.5h4.5"
            />
        </svg>
    )
}
const IconLightTheme = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
        >
            <path
                className={`${props?.isActive ? 'fill-lineActive' : 'fill-[#7E808A]'}`}
                d="M2 11.99c0-.225.075-.423.235-.583a.813.813 0 0 1 .565-.225h1.919c.216 0 .395.075.545.235.141.16.217.348.217.574a.829.829 0 0 1-.207.573.699.699 0 0 1-.546.236H2.81a.767.767 0 0 1-.564-.236.782.782 0 0 1-.245-.573Zm2.69 6.52c0-.216.076-.405.217-.574l1.383-1.345c.14-.15.329-.217.555-.217.226 0 .414.076.564.217.15.14.226.32.226.536a.888.888 0 0 1-.226.602l-1.336 1.336c-.385.3-.771.3-1.157 0a.76.76 0 0 1-.226-.555Zm0-13.02c0-.216.076-.404.217-.574a.903.903 0 0 1 .602-.235.79.79 0 0 1 .555.226L7.409 6.29a.73.73 0 0 1 .226.555.766.766 0 0 1-.226.564.766.766 0 0 1-.564.226.73.73 0 0 1-.555-.226L4.916 6.064a.787.787 0 0 1-.226-.574Zm2.4 6.5c0-.874.216-1.693.658-2.445a4.913 4.913 0 0 1 1.797-1.797 4.773 4.773 0 0 1 2.446-.659c.658 0 1.288.132 1.9.395a4.915 4.915 0 0 1 1.562 1.054c.442.442.79.96 1.044 1.562.254.602.385 1.242.385 1.9 0 .884-.216 1.703-.658 2.455a4.933 4.933 0 0 1-1.787 1.788 4.757 4.757 0 0 1-2.456.658 4.757 4.757 0 0 1-2.455-.658 4.933 4.933 0 0 1-1.788-1.788 4.998 4.998 0 0 1-.649-2.464Zm1.599 0c0 .922.32 1.703.969 2.352.64.65 1.42.979 2.342.979.922 0 1.703-.33 2.352-.979.649-.649.978-1.43.978-2.351 0-.903-.33-1.675-.978-2.324-.65-.64-1.43-.96-2.352-.96-.912 0-1.693.32-2.333.96-.659.65-.978 1.42-.978 2.324Zm2.502 7.32c0-.226.075-.414.235-.565a.796.796 0 0 1 .565-.226c.225 0 .423.076.573.226.151.15.226.339.226.564v1.873a.794.794 0 0 1-.235.583.768.768 0 0 1-.564.235.753.753 0 0 1-.565-.235.794.794 0 0 1-.235-.583V19.31Zm0-14.582V2.81c0-.216.075-.404.235-.564A.782.782 0 0 1 12 2c.226 0 .405.075.564.235.16.16.236.348.236.565v1.928a.713.713 0 0 1-.236.546.788.788 0 0 1-.564.216.813.813 0 0 1-.564-.216.74.74 0 0 1-.245-.546Zm5.193 12.399c0-.216.075-.395.216-.527a.689.689 0 0 1 .527-.216c.226 0 .414.075.564.216l1.374 1.345a.82.82 0 0 1 .226.574.76.76 0 0 1-.226.555c-.376.292-.753.292-1.129 0L16.6 17.738a.916.916 0 0 1-.216-.611Zm0-10.273c0-.235.075-.423.216-.555l1.336-1.383a.791.791 0 0 1 .555-.226c.226 0 .414.076.564.236.16.16.236.348.236.564a.794.794 0 0 1-.226.583L17.69 7.42a.83.83 0 0 1-.564.225.683.683 0 0 1-.527-.225.797.797 0 0 1-.216-.565Zm2.126 5.137c0-.226.075-.414.226-.584.15-.15.329-.225.536-.225h1.9c.216 0 .405.084.565.244.16.16.244.348.244.565a.777.777 0 0 1-.244.564.767.767 0 0 1-.565.235h-1.9a.7.7 0 0 1-.546-.235.813.813 0 0 1-.216-.564Z"
            />
        </svg>
    )
}
const IconDarkTheme = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
        >
            <path
                className={`${props?.isActive ? 'fill-lineActive' : 'fill-[#7E808A]'}`}
                d="M13.96 6.654c.115 0 .182-.077.201-.182.296-1.586.287-1.624 1.94-1.95.114-.018.181-.076.181-.19 0-.125-.067-.182-.181-.201-1.653-.335-1.644-.363-1.94-1.95-.02-.105-.086-.181-.2-.181-.115 0-.173.076-.192.182-.306 1.586-.286 1.614-1.95 1.949-.104.019-.18.076-.18.2 0 .115.076.173.18.192 1.673.325 1.644.363 1.95 1.949.02.105.077.182.191.182Zm4.578 6.46c.172 0 .296-.125.315-.307.315-2.57.42-2.608 3.03-3.038.21-.038.334-.134.334-.325 0-.182-.125-.296-.297-.325-2.647-.45-2.752-.468-3.067-3.039-.02-.181-.143-.306-.316-.306a.317.317 0 0 0-.324.297c-.335 2.57-.411 2.599-3.068 3.048-.172.029-.296.143-.296.325 0 .181.124.287.296.325 2.657.43 2.752.468 3.068 3.057.019.163.143.287.325.287ZM11.352 22c3.497 0 6.325-1.758 7.616-4.75.172-.41.114-.725-.067-.916-.172-.163-.459-.201-.803-.067-.717.286-1.596.449-2.695.449-4.271 0-7.023-2.666-7.023-6.861 0-1.157.22-2.303.516-2.905.191-.382.172-.707.01-.908-.182-.21-.507-.277-.956-.096C5.016 7.141 3 10.2 3 13.773 3 18.426 6.42 22 11.352 22Zm.019-1.453c-4.08 0-6.919-2.971-6.919-6.89a7.351 7.351 0 0 1 2.896-5.885c-.23.62-.363 1.576-.363 2.494 0 4.701 3.249 7.854 8.055 7.854.86 0 1.644-.105 2.045-.248-1.194 1.653-3.325 2.675-5.714 2.675Z"
            />
        </svg>
    )
}
const IconStoreMenu = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"

        >
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                d="M9.75 21.75v-6h4.5v6"
            />
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                d="M20.25 14.25v5.25A2.25 2.25 0 0 1 18 21.75H6a2.25 2.25 0 0 1-2.25-2.25v-5.25M22.875 8.25l-4.125-6H5.25l-4.125 6a3 3 0 0 0 3 3A2.987 2.987 0 0 0 6.75 9.674a2.987 2.987 0 0 0 2.625 1.576A2.987 2.987 0 0 0 12 9.674a2.987 2.987 0 0 0 2.625 1.576 2.987 2.987 0 0 0 2.625-1.576 2.987 2.987 0 0 0 2.625 1.576 3 3 0 0 0 3-3Z"
            />
        </svg>
    )
}
const IconAccountMenu = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg width={20} height={24} viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                d="M13 15H7C3.6865 15 1 17.6865 1 21V22C1 22 4.125 23 10 23C15.875 23 19 22 19 22V21C19 17.6865 16.3135 15 13 15Z"
                strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                d="M5 6C5 3.2385 7.2385 1 10 1C12.7615 1 15 3.2385 15 6C15 8.7615 12.7615 12 10 12C7.2385 12 5 8.7615 5 6Z"
                strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

}
const IconArrowButton = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                d="M1.5 5.25L9 12.75L16.5 5.25" strokeWidth="1.7" strokeMiterlimit="10"
                strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    );
}
const PlusRightBottom = () => {
    return (
        <svg width={155} height={140} viewBox="0 0 155 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3866_19573)">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M109.812 58.3521C109.812 53.9338 106.231 50.3521 101.812 50.3521C97.3942 50.3521 93.8125 53.9338 93.8125 58.3521V84.8125H67.3525C62.9343 84.8125 59.3525 88.3942 59.3525 92.8125C59.3525 97.2308 62.9343 100.812 67.3525 100.812H93.8125V127.273C93.8125 131.691 97.3942 135.273 101.812 135.273C106.231 135.273 109.812 131.691 109.812 127.273V100.812H136.273C140.691 100.812 144.273 97.2308 144.273 92.8125C144.273 88.3942 140.691 84.8125 136.273 84.8125H109.812V58.3521Z"
                      fill="#0E5932" fillOpacity="0.4"/>
                <path
                    d="M101.812 168.625C143.683 168.625 177.625 134.683 177.625 92.8125C177.625 50.9424 143.683 17 101.812 17C59.9424 17 26 50.9424 26 92.8125C26 134.683 59.9424 168.625 101.812 168.625Z"
                    stroke="#0E5932" strokeOpacity="0.4" strokeWidth={16} strokeMiterlimit={10} strokeLinecap="round"
                    strokeLinejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_3866_19573">
                    <rect width={181} height={185} fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
}
const IconArrowRight = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            fill="none"
        >
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : 'stroke-[#7E808A]'}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.7}
                d="m6 3 6 6-6 6"
            />
        </svg>

    );
}
const IconLineSubMenu = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={22}
            height={41}
            fill="none"
        >
            <path className={'stroke-neutrals-300'} strokeWidth={2} d="M1 0v32a8 8 0 0 0 8 8h13"/>
        </svg>

    );
}
const IconPlus = ({classNamePath = ''}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
        >
            <path
                className={`${classNamePath ? classNamePath : ' stroke-neutrals-50'}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10ZM12 7.455v9.09M16.546 12H7.455"
            />
        </svg>
    );
}
const IconRemove = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            fill="none"
        >
            <path
                className={'fill-neutrals-300'}
                d="M9 16.875a7.875 7.875 0 1 0 0-15.75 7.875 7.875 0 0 0 0 15.75Z"
            />
            <path
                className={(props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                d="m11.813 6.188-5.626 5.625M11.813 11.813 6.186 6.186"
            />
        </svg>
    );
}
const IconSelectArrowButton = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
            fill="none"
        >
            <path
                className={(props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                d="m1 3.5 5 5 5-5"
            />
        </svg>
    );
}
const IconSelectArrowLarge = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
        >
            <path
                className={`${props?.isDarkMode ? 'stroke-neutrals-500' : 'stroke-neutrals-500'}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                d="m2 7 10 10L22 7"
            />
        </svg>
    );
}
const IconInputSearchSmall = () => {
    return (
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 16.9999L11.7428 12.2427" stroke="#0D0C22" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.5 14C10.8137 14 13.5 11.3137 13.5 8C13.5 4.68629 10.8137 2 7.5 2C4.18629 2 1.5 4.68629 1.5 8C1.5 11.3137 4.18629 14 7.5 14Z" stroke="#0D0C22" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
}
const IconInputSearch = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
        >
            <path
                className={(props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                d="m22 22-6.343-6.343M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
            />
        </svg>
    );
}
const IconFilter = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
        >
            <path
                className={`${props?.isActive ? (props?.isDarkMode ? 'stroke-brand01-100' : 'stroke-brand01') : (props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                d="m22 5-8 8v8l-4 2V13L2 5V2h20v3Z"
            />
        </svg>
    );
}
const IconPen = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
        >
            <path
                className={`${props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-brand01'}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                d="M2.25 21.75h19.5M8.598 16.902l-5.25 1.5 1.5-5.25L14.973 3.027a2.651 2.651 0 1 1 3.75 3.75L8.598 16.902ZM13.5 4.5l3.75 3.75"
            />
        </svg>
    );
}
const IconWarehouse = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
        >
            <path
                className={`${props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-yellow02'}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                d="M1.5 4.875 6.75 7.5 12 4.875M6.75 7.5v6.375"
            />
            <path
                className={`${props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-yellow02'}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                d="M12 4.875 6.75 2.249 1.5 4.875v6.375l5.25 2.625L12 11.25V4.875ZM12 4.875 17.25 7.5l5.25-2.625M17.25 7.5v6.375"
            />
            <path
                className={`${props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-yellow02'}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                d="m22.5 4.875-5.25-2.626L12 4.875v6.375l5.25 2.625 5.25-2.625V4.875ZM6.75 13.875 12 16.5l5.25-2.625M12 16.5v6.375"
            />
            <path
                className={`${props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-yellow02'}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                d="M17.25 13.875 12 11.249l-5.25 2.626v6.375L12 22.875l5.25-2.625v-6.375Z"
            />
        </svg>
    );
}
const IconPrinter = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
        >
            <path
                className={(props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7.667 7V3.667c0-.736.597-1.333 1.333-1.333h6c.736 0 1.333.597 1.333 1.333V7"
            />
            <path
                className={(props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7.667 17.667h-2A2.666 2.666 0 0 1 3 15V9.667A2.666 2.666 0 0 1 5.667 7h12.666A2.666 2.666 0 0 1 21 9.667V15a2.666 2.666 0 0 1-2.667 2.667h-2"
            />
            <path
                className={(props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16.333 13v7.333c0 .736-.597 1.334-1.333 1.334H9a1.334 1.334 0 0 1-1.333-1.334V13h8.666Z"
            />
        </svg>
    );
}
const IconRecycling = (props: { isActive?: boolean, isDarkMode?: boolean }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
        >
            <path
                className={`${props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-red02'}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                d="m19.5 8.25-.637 12.119a2.25 2.25 0 0 1-2.247 2.131H7.384a2.25 2.25 0 0 1-2.247-2.131L4.5 8.25M21.75 5.25H2.25M9 5.25V2.625c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V5.25"
            />
        </svg>
    );
}
const IconArrowLeft = (props: { isActive?: boolean, isDarkMode?: boolean }) => (
    <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            className={(props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}
            d="M25.5 15H4.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
        <path
            className={(props?.isDarkMode ? 'stroke-neutrals-400' : 'stroke-semantics-grey01')}
            d="M12 7.5L4.5 15L12 22.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const WifiRightBottom = () => (
    <svg width={122} height={153} viewBox="0 0 122 153" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_3873_20011)">
            <path
                d="M101.169 145.504C99.2384 145.504 97.3077 144.77 95.8295 143.292C92.9939 140.446 88.0164 140.446 85.1706 143.292C82.2244 146.238 77.448 146.228 74.5017 143.292C71.5554 140.345 71.5554 135.569 74.5017 132.623C83.0489 124.076 97.9613 124.076 106.509 132.623C109.445 135.569 109.445 140.345 106.509 143.292C105.04 144.76 103.11 145.494 101.179 145.494L101.169 145.504Z"
                fill="#12D56A"/>
            <path
                d="M122.497 124.166C120.566 124.166 118.636 123.432 117.167 121.954C102.466 107.253 78.534 107.253 63.8328 121.954C60.8865 124.9 56.1101 124.9 53.1638 121.954C50.2175 119.008 50.2175 114.231 53.1638 111.285C73.7475 90.7012 107.243 90.7012 127.826 111.285C130.773 114.231 130.773 119.008 127.826 121.954C126.358 123.422 124.428 124.166 122.497 124.166Z"
                fill="#12D56A"/>
            <path
                d="M143.825 102.839C141.895 102.839 139.964 102.104 138.496 100.626C112.03 74.1601 68.9718 74.1601 42.5056 100.626C39.5593 103.573 34.7829 103.573 31.8367 100.626C28.8904 97.68 28.8904 92.9036 31.8367 89.9573C64.1854 57.6086 116.806 57.6086 149.155 89.9573C152.101 92.9036 152.101 97.68 149.155 100.626C147.687 102.094 145.756 102.839 143.825 102.839Z"
                fill="#12D56A"/>
            <path
                d="M165.163 81.5004C163.232 81.5004 161.302 80.7664 159.834 79.2882C121.602 41.067 59.4087 41.067 21.1775 79.2882C18.2312 82.2345 13.4548 82.2345 10.5085 79.2882C7.56226 76.3419 7.56226 71.5655 10.5085 68.6193C54.6223 24.5156 126.379 24.5156 170.492 68.6193C173.439 71.5655 173.439 76.3419 170.492 79.2882C169.024 80.7563 167.094 81.5004 165.163 81.5004Z"
                fill="#12D56A"/>
        </g>
        <defs>
            <clipPath id="clip0_3873_20011">
                <rect width={122} height={181} fill="white"/>
            </clipPath>
        </defs>
    </svg>
);
const IconLockRightBottom = () => {
    return (
        <svg width={98} height={143} viewBox="0 0 98 143" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3866_19598)">
                <path
                    d="M105 51V41C104.981 34.3755 102.341 28.0277 97.6565 23.3435C92.9723 18.6592 86.6245 16.0191 80 16C73.3755 16.0191 67.0277 18.6592 62.3435 23.3435C57.6592 28.0277 55.0191 34.3755 55 41V51"
                    stroke="#904918" strokeWidth={14} strokeMiterlimit={10} strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path
                    d="M124.667 72.375H34.8333C27.7457 72.375 22 78.1207 22 85.2083V139.75C22 146.838 27.7457 152.583 34.8333 152.583H124.667C131.754 152.583 137.5 146.838 137.5 139.75V85.2083C137.5 78.1207 131.754 72.375 124.667 72.375Z"
                    stroke="#904918" strokeWidth={14} strokeMiterlimit={10} strokeLinecap="round"
                    strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M74.167 105.833C74.167 102.612 76.7787 100 80.0003 100C83.222 100 85.8337 102.612 85.8337 105.833C85.8337 109.044 83.2395 111.649 80.0328 111.667C80.0219 111.667 80.011 111.667 80 111.667C79.9892 111.667 79.9783 111.667 79.9675 111.667C76.761 111.649 74.167 109.044 74.167 105.833ZM73 124.396C65.5008 121.566 60.167 114.323 60.167 105.833C60.167 94.8797 69.0467 86 80.0003 86C90.954 86 99.8337 94.8797 99.8337 105.833C99.8337 114.323 94.4996 121.567 87 124.396V134.708C87 138.574 83.866 141.708 80 141.708C76.134 141.708 73 138.574 73 134.708V124.396Z"
                      fill="#904918"/>
            </g>
            <defs>
                <clipPath id="clip0_3866_19598">
                    <rect width={98} height={143} fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
};
const IconThreeDotsCircle = () => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="15.5" fill="#F9F9FB" stroke="#E7E7E9"/>
            <path
                d="M16.5 10C17.3284 10 18 9.32843 18 8.5C18 7.67157 17.3284 7 16.5 7C15.6716 7 15 7.67157 15 8.5C15 9.32843 15.6716 10 16.5 10Z"
                fill="#0D0C22"/>
            <path
                d="M16.5 17C17.3284 17 18 16.3284 18 15.5C18 14.6716 17.3284 14 16.5 14C15.6716 14 15 14.6716 15 15.5C15 16.3284 15.6716 17 16.5 17Z"
                fill="#0D0C22"/>
            <path
                d="M16.5 24C17.3284 24 18 23.3284 18 22.5C18 21.6716 17.3284 21 16.5 21C15.6716 21 15 21.6716 15 22.5C15 23.3284 15.6716 24 16.5 24Z"
                fill="#0D0C22"/>
        </svg>

    );
}
const IconRightArrow = () => {
    return <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L7 7L1 13" stroke="#6E6D7A" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
}
const IconKey = () => {
    return <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5.34375 14.0625C6.1204 14.0625 6.75 13.4329 6.75 12.6562C6.75 11.8796 6.1204 11.25 5.34375 11.25C4.5671 11.25 3.9375 11.8796 3.9375 12.6562C3.9375 13.4329 4.5671 14.0625 5.34375 14.0625Z"
            stroke="#E09C2F" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
        <path
            d="M13.5 1.125L7.12294 7.4745C6.73369 7.37213 6.32756 7.3125 5.90625 7.3125C3.26588 7.3125 1.125 9.45338 1.125 12.0938C1.125 14.7341 3.26588 16.875 5.90625 16.875C8.54662 16.875 10.6875 14.7341 10.6875 12.0938C10.6875 11.6685 10.6268 11.259 10.5227 10.8664L11.8125 9.5625V7.3125H14.0625V5.0625H15.75L16.875 3.9375V1.125H13.5Z"
            stroke="#E09C2F" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
}
const IconLock = () => {
    return <svg width={16} height={18} viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11.375 6.75V3.9375C11.3694 2.07563 9.86187 0.568125 8 0.5625C6.13813 0.568125 4.63062 2.07563 4.625 3.9375V6.75"
            stroke="#FF0303" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
        <path
            d="M13.0625 6.75H2.9375C2.00552 6.75 1.25 7.50552 1.25 8.4375V15.1875C1.25 16.1195 2.00552 16.875 2.9375 16.875H13.0625C13.9945 16.875 14.75 16.1195 14.75 15.1875V8.4375C14.75 7.50552 13.9945 6.75 13.0625 6.75Z"
            stroke="#FF0303" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12.375V14.0625" stroke="#FF0303" strokeMiterlimit={10} strokeLinecap="round"
              strokeLinejoin="round"/>
        <path
            d="M8 12.375C8.77665 12.375 9.40625 11.7454 9.40625 10.9688C9.40625 10.1921 8.77665 9.5625 8 9.5625C7.22335 9.5625 6.59375 10.1921 6.59375 10.9688C6.59375 11.7454 7.22335 12.375 8 12.375Z"
            stroke="#FF0303" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
}
const IconChecked = (props:{color?:string}) => {
   const {color = '#12D56A'} = props;
    return <svg
        width={24}
        height={25}
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
            stroke={color}
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M7 13.5L10 16.5L17 8.5"
            stroke={color}
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>;
}
const IconCustomPen = ({
                           width = 16,
                           height = 16,
                           strokeColor = "#0D0C22",
                           className = ""
                       }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M0.6875 15.3125H15.3125"
                stroke={strokeColor}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.44824 11.6764L1.51074 12.8014L2.63574 8.86386L10.2295 1.27011C11.0063 0.493297 12.2652 0.493297 13.042 1.27011C13.8188 2.04692 13.8188 3.3058 13.042 4.08261L5.44824 11.6764Z"
                stroke={strokeColor}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.125 2.375L11.9375 5.1875"
                stroke={strokeColor}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );

}
const IconPhone = (props) => (
    <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M15.1293 14.1943L13.608 16.0956C11.252 14.7103 9.28796 12.7476 7.90396 10.3916L9.80529 8.87027C10.264 8.5036 10.4173 7.87294 10.1786 7.33694L8.44529 3.43427C8.18796 2.8556 7.55062 2.54894 6.93862 2.7076L3.63862 3.5636C3.00129 3.73027 2.58929 4.3476 2.67996 4.9996C3.86929 13.4716 10.528 20.1303 19.0013 21.3209C19.6533 21.4103 20.2706 20.9983 20.436 20.3623L21.292 17.0623C21.4506 16.4503 21.144 15.8143 20.5666 15.5569L16.664 13.8236C16.128 13.5849 15.4986 13.7383 15.1306 14.1956L15.1293 14.1943Z"
            stroke="#0D0C22"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
const IconMail = (props) => (
    <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M2 8L12 13L22 8"
            stroke="#0D0C22"
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
            stroke="#0D0C22"
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
const IconWeb = (props) => (
    <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M13.2347 21.4797C12.6201 21.6023 11.9841 21.6663 11.3334 21.6663C5.99475 21.6663 1.66675 17.3383 1.66675 11.9997C1.66675 6.66101 5.99475 2.33301 11.3334 2.33301C16.6721 2.33301 21.0001 6.66101 21.0001 11.9997C21.0001 12.3517 20.9814 12.6983 20.9454 13.0397"
            stroke="#0D0C22"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M14.8348 14.3571L22.7548 17.2504C23.0881 17.3718 23.0788 17.8478 22.7401 17.9558L19.1148 19.1158L17.9548 22.7411C17.8468 23.0798 17.3708 23.0891 17.2495 22.7558L14.3561 14.8358C14.2468 14.5384 14.5361 14.2491 14.8348 14.3571Z"
            stroke="#0D0C22"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M21.0001 12C21.0001 9.79067 16.6721 8 11.3334 8C5.99475 8 1.66675 9.79067 1.66675 12C1.66675 14.1947 5.94008 15.9773 11.2334 16"
            stroke="#0D0C22"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M15.3148 11.057C15.1188 6.16101 13.4108 2.33301 11.3335 2.33301C9.12416 2.33301 7.3335 6.66101 7.3335 11.9997C7.3335 17.3383 9.12416 21.6663 11.3335 21.6663"
            stroke="#0D0C22"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export {
    IconWeb,
    IconMail,
    IconPhone,
    IconChecked,
    IconKey,
    IconLock,
    IconRightArrow,
    IconThreeDotsCircle,
    IconLockRightBottom,
    IconArrowLeft,
    IconRecycling,
    IconPen,
    IconWarehouse,
    IconPrinter,
    IconLineSubMenu,
    IconFilter,
    IconSelectArrowButton,
    IconPlus,
    IconStoreMenu,
    IconInputSearch,
    IconInputSearchSmall,
    IconLogout,
    IconCartMenu,
    IconArticleMenu,
    IconRemove,
    Plus,
    OpenEye,
    CloseEye,
    AvatarDefault,
    IconDarkTheme,
    IconManageMenu,
    IconSelectArrowLarge,
    IconArrowButton,
    IconArrowRight,
    IconLightTheme,
    IconAccountMenu,
    PlusRightBottom,
    WifiRightBottom,
    IconCustomPen,
};
