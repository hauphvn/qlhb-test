import Button from "../../components/Button";
import {IconInputSearchSmall, IconManageMenu, IconPlus} from "../../assets/svgs/SVGIcon.tsx";
import ButtonGradient from "../../components/ButtonGradient";
import {useTheme} from "../../context/ThemeContext.tsx";
import {Table, TableBody, TableFooter, TableHead, TableHeader, TableRow} from "../../components/ui/table.tsx";
import {Input} from "../../components/ui/input.tsx";

const Customer = () => {
    const {isDarkMode} = useTheme();
    return (
        <div>
            <div
                className={`${isDarkMode ? 'text-neutrals-400 border-b-darkGrey-2727' : 'text-semantics-grey01 border-b-neutrals-300'} titleContainer h-[88px] border-b-[1px] pl-[32px] pr-[33px] flex justify-between items-center`}>
                <div className="title  text-[32px]">Khách hàng</div>
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
            <div className={'w-full flex flex-col h-screen bg-backgroundContent '}>
                <div className={'search-wrapper m-[32px] flex justify-end '}>
                    <div className="input-search w-[275px] relative">
                        <Input
                            placeholder={'Tìm kiếm khách hàng'}
                            className={'focus-visible:ring-transparent placeholder:text-gray-300 pr-8'}/>
                        <div className={'absolute top-[30%] right-2 cursor-pointer'}
                             onClick={() => alert('Đang phát triển')}
                        >
                            <IconInputSearchSmall/>
                        </div>
                    </div>
                </div>
                <div className={'bottom-list-customer-wrapper w-full '}>
                    <div className="max-h-[60vh] table-wrapper border border-[#E7E7E9] rounded-[1.5rem]
                    py-[1.719rem] mx-[2rem] flex flex-col mb-[15px] overflow-hidden bg-white ">
                        <div
                            className=" pb-[2.719rem] w-full justify-between frame_1000003562 flex items-center self-stretch">
                            <div
                                className="text-black font-['Inter'] pl-[1rem] text-2xl font-medium leading-[130%]">Danh
                                sách khách hàng
                            </div>

                        </div>
                        <div className={'overflow-auto'}>
                            <Table>
                                <TableHeader className="sticky top-0 z-10 bg-white">
                                    <TableRow>
                                        <TableHead>Họ</TableHead>
                                        <TableHead>Tên</TableHead>
                                        <TableHead>Điện thoại</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Ngày sinh</TableHead>
                                        <TableHead>Địa chỉ</TableHead>
                                        <TableHead>Doanh thu</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                >

                                </TableBody>
                                <TableFooter>
                                    {/*<TableRow>*/}
                                    {/*    <TableCell colSpan={3}>Total</TableCell>*/}
                                    {/*    <TableCell className="text-right">$2,500.00</TableCell>*/}
                                    {/*</TableRow>*/}
                                </TableFooter>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customer;
