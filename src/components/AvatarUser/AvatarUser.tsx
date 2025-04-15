
interface Props {
    urlAvatar?: string;
    className?: string;
    classNameAvatar?: string;
    charName?: string;
}
const AvatarUser = (props:Props) => {
    const {urlAvatar, className, charName, classNameAvatar = 'text-2xl'} = props;
    const char: string | undefined = charName?.toUpperCase();
    return (
        <div className={` ${className} h-full`}>
            {urlAvatar ? (
                <img src={urlAvatar} alt={'avatar'} className={'w-full h-full rounded-[50%] object-cover'}/>
            ):(
                <div className={`w-full h-full rounded-[50%] bg-brand01 flex justify-center items-center text-white font-bold ${classNameAvatar}`}>
                    {char || 'PK'}
                </div>
            )}
        </div>
    );
};

export default AvatarUser;
