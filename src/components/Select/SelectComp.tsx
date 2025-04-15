import {Select as SelectAnt} from 'antd';
import {ReactNode} from "react";
import {IconSelectArrowButton} from "../../assets/svgs/SVGIcon.tsx";
import './selectCustom.css';

export interface SelectOption {
    label: string,
    value: string
}
interface SelectProps{
    className?: string,
    disabled?: boolean,
    allowClear?: boolean,
    placeholder?: string,
    options: SelectOption[],
    id?:string
    suffixIcon?: ReactNode,
    maxTagCount?: number,
    isDarkMode?: boolean,
    mode?: 'multiple' | 'tags' |'single',
    value?: string | string[],
    onChange?: (value: string | string[]) => void,
    onDropdownVisibleChange?:(open: boolean) => void
}
// const options: SelectAntProps['options'] = [];
const SelectComp = (props: SelectProps) => {
    const {
        options,
        placeholder,
        suffixIcon,
        maxTagCount,
        isDarkMode,
        className,
        mode = 'single',
        value = '',
        onChange,
        disabled,
        allowClear,
        onDropdownVisibleChange

    } = props;
    return (
        // <Space className={'w-full flex items-center'} direction="vertical">
            <SelectAnt
                onDropdownVisibleChange={onDropdownVisibleChange}
                allowClear={allowClear}
                disabled={disabled}
                onChange={onChange}
                value={value ? value : null}
                suffixIcon={suffixIcon ? props.suffixIcon : <IconSelectArrowButton/>}
                mode={mode === 'single' ? undefined : mode}
                maxTagCount={maxTagCount}
                placeholder={placeholder}
                options={options}
                style={{ width: '100%' }}
                className={` rounded-[8px] ${className} ${disabled ? ' custom-select-disabled ' : ''}`}
                getPopupContainer={trigger => trigger.parentElement}
                popupClassName={isDarkMode ? 'select-dark-content' : ''}
            />
        // </Space>
    );
};

export default SelectComp;
