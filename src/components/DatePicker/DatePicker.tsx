import {DatePicker as DatePickerAnt, ConfigProvider} from 'antd';
import locale from 'antd/es/locale/vi_VN'; // Import the desired locale
// import 'moment/locale/vi';
// import moment from "moment";
import 'dayjs/locale/vi';
import dayjs from 'dayjs';

interface Props {
    onChange?: (e: any) => void,
    className?: string,
    value?: any,
    disabled?: boolean
}

const DatePicker = (props: Props) => {
    const {onChange, disabled,className, value} = props;
    const formatValue = value ? dayjs((value)) : null;
    return (
        <ConfigProvider locale={locale}>
            <DatePickerAnt
                disabled={disabled}
                value={formatValue}
                className={` ${className}`}
                onChange={onChange}
                format="DD/MM/YYYY"
            />
        </ConfigProvider>
    );
};

export default DatePicker;
