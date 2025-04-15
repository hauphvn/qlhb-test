import {Modal} from "antd";
import Button from "../Button";
import {ReactNode} from "react";
import ButtonGradient from "../ButtonGradient";
import {useTheme} from "../../context/ThemeContext.tsx";
import ConfirmMan from '../../assets/imgs/ConfirmMan.png';

interface ErrorModalProps {
    onCancel?: () => void;
    onOk: () => void;
    okText?: string;
    cancelText?: string;
    open: boolean;
    children: ReactNode,
    title: ReactNode
}

const ConfirmModal = (props: ErrorModalProps) => {
    const {isDarkMode} = useTheme();
    return (
        <Modal
            classNames={{
            }}
            styles={
                {
                    content: {
                        backgroundColor: isDarkMode ? 'var(--color-dark-2C2C)' : '',
                        padding: 0,
                        margin: 0,
                        overflow: 'hidden',
                        borderRadius:24
                    },
                    header: {

                        color: isDarkMode ? 'var(--color-dark-2C2C)' : '',
                        backgroundColor: isDarkMode ? 'var(--color-dark-2C2C)' : '',
                    }
                }}
            destroyOnClose
            title={
                <div>
                    <img src={ConfirmMan} alt={'confirm'} className={'h-full'}/>
                </div>
            }
            footer={
                <div className={'flex gap-x-[32px] w-full justify-end px-[24px] pb-[24px] '}>
                    <Button
                        className={`${isDarkMode ? 'border-darkGrey-3838-important text-neutrals-50' : ''} h-[53px] w-full rounded-[8px] `}
                        name={props.cancelText || 'Đóng'}
                        key="back" onClick={props?.onCancel}/>
                    <ButtonGradient
                        className={`${isDarkMode ? 'border-darkGrey-3838-important' : ''} 
                        h-[px53] w-full rounded-[8px]`}
                        onClick={props?.onOk}
                        name={props.okText || 'Xác nhận'}
                        key="submit"/>
                </div>

            }
            open={props.open}
            closable={false}
            onCancel={props?.onCancel}
        >
            {props.children}
        </Modal>
    );
};

export default ConfirmModal;
