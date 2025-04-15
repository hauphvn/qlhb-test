import Input from "../Input";
import './filterProductStyle.css';
import {Slider, SliderSingleProps} from "antd";
import Switch from "../Swtich";
import ButtonGradient from "../ButtonGradient";
import {useEffect, useState} from "react";
import {useTheme} from "../../context/ThemeContext.tsx";
import {FormatCurrencyNumber} from "../../constants/ConvertCommon.ts";

export type FilterProductType = {
    priceRange: number[],
    outOfStockValue: number | undefined
}

interface IFilterProductProps {
    onFilter: ({
                   priceRange,
                   outOfStockValue
               }: FilterProductType) => void;
    showFilter?: boolean
}

const FilterProduct = (props: IFilterProductProps) => {
    const {onFilter,showFilter = false} = props;
    const {isDarkMode} = useTheme();
    const [valueRange, setValueRange] = useState<number[]>([1000_000, 1000_000_000])
    const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (value) => FormatCurrencyNumber(value ? value : 0);
    const [enableOutOfStock, setEnableOutOfStock] = useState(false);
    const [outOfStockValue, setOutOfStockValue] = useState<number | undefined>(undefined);

    function handleChange(value: number[]) {
        if (value[0] > value[1]) {
            return;
        }
        setValueRange(value)
    }

    useEffect(() => {
        if (!enableOutOfStock) {
            setOutOfStockValue(undefined)
        }
    }, [enableOutOfStock])
    return (
        <div id={`${isDarkMode ? 'filter-product-dark-mode-root' : 'filter-product-light-mode-root'}`}
             className={`${isDarkMode ? 'bg-darkGrey-3333 border-darkGrey-2727' : 'bg-neutrals-50 border-neutrals-300 '} filter-product-root flex flex-col gap-y-[24px] shadow-button-1 
             border-[0.5px]  rounded-[8px] w-[225px] h-auto px-[8px] py-[10px] ${!showFilter ? 'hidden' : ''}`}>
            <div className="price-filter flex gap-x-[4px]">
                <Input
                    disabled={true}
                    className={`${isDarkMode ? 'bg-darkGrey-3838 border-darkGrey-3838 text-neutrals-400 placeholder-neutrals-400' : 'bg-neutrals-200'}  rounded-[4px] h-[30px] pl-[10px]`}
                    placeholder={'Giá nhập'}/>
                <Input
                    disabled={true}
                    className={`${isDarkMode ? 'bg-darkGrey-3838 border-darkGrey-3838 text-neutrals-400 placeholder-neutrals-400' : 'bg-neutrals-200'} rounded-[4px] h-[30px] pl-[10px]`}
                    placeholder={'Giá bán'}/>
            </div>
            <div>
                <Slider
                    disabled={true}
                    tooltip={{formatter}}
                    onChange={(value) => handleChange(value)}
                    defaultValue={valueRange}
                    range={true}
                    id={'slider-price'}
                    min={1000_000}
                    max={1000_000_000}
                    step={100_000}
                />
                <div className={'flex justify-between'}>
                    <span className={'text-[10px]'}>Từ: {FormatCurrencyNumber(valueRange[0])} </span>
                    <span className={'text-[10px]'}>Đến: {FormatCurrencyNumber(valueRange[1])}</span>
                </div>
            </div>
            <div className={'out-off-stuck  flex gap-x-[20px]'}>
                <Input
                    type={'number'}
                    onChange={(e) => setOutOfStockValue(e?.target?.value ? parseInt(e.target.value) : undefined)}
                    value={outOfStockValue}
                    disabled={!enableOutOfStock}
                    className={`${isDarkMode ? 'bg-darkGrey-3838 border-darkGrey-3838 disabled:border-darkGrey-2727 text-neutrals-400 placeholder-neutrals-400' : 'bg-neutrals-200'} rounded-[4px] h-[30px] pl-[10px] pr-2`}
                    placeholder={'Còn ít hơn'}/>
                <Switch
                    checked={enableOutOfStock}
                    onChange={(checked) => setEnableOutOfStock(checked)}
                    size={'small'}/>
            </div>
            <ButtonGradient
                onClick={() => onFilter({
                    priceRange: valueRange,
                    outOfStockValue: outOfStockValue ? outOfStockValue : undefined
                })}
                className={`${isDarkMode ? 'border-darkGrey-3838-important' : ''} h-[34px] w-full`}
                name={'Áp dụng'}/>
        </div>
    );
};

export default FilterProduct;
