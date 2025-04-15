import {SelectMultipleShowItem} from "../../types";

interface SelectMultipleShowProps {
    options: SelectMultipleShowItem[],
    onChange: (value: string | number) => void
}

const SelectMultipleShowComp = (props: SelectMultipleShowProps) => {
    const {options, onChange} = props;
    return (
        <div>
            {options.map((option) => (
                <div
                    onClick={() => onChange(option.value)}
                    className={`${option?.isSelect ? 'bg-semantics-green03 text-semantics-green01 ' : ' bg-neutral-200  text-semantics-grey01 border-[1px] border-neutral-200 rounded-[8px] '} 
                    text-[18px] font-medium p-[14px] mb-[18px] cursor-pointer transition-all duration-300`}
                    key={option.value}>
                    {option.label}
                </div>
            ))}
        </div>
    );
};

export default SelectMultipleShowComp;
