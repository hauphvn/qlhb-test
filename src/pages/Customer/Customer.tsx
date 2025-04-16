import Button from "../../components/Button";
import {IconInputSearchSmall, IconManageMenu, IconPlus} from "../../assets/svgs/SVGIcon.tsx";
import ButtonGradient from "../../components/ButtonGradient";
import {useTheme} from "../../context/ThemeContext.tsx";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "../../components/ui/table.tsx";
import {Input} from "../../components/ui/input.tsx";
import {post} from "../../libs";
import {API_PATH} from "../../constants/Path.ts";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useEffect, useRef, useState} from "react";
import {useIntersection} from "@mantine/hooks";
import {Skeleton} from "../../components/ui/skeleton.tsx";
import {FormatBirthday, FormatCurrency} from "../../constants/ConvertCommon.ts";
import AddNewOrUpdateCustomer from "./AddNewOrUpdateCustomer.tsx";
import {ICustomerDetail} from "../../types";
import {useAtom} from "jotai/index";
import {quocGiaAtom} from "../../store/atom/commonAtom.ts";

type Customer = {
    Id: number;
    CardTypeId: number | null;
    CardNumber: string | null;
    Title: string | null;
    LastName: string | null;
    FirstName: string | null;
    PhoneNumber: string | null;
    Address: string | null;
    City: string | null;
    StateCode: string | null;
    CountryCode: string | null;
    CountryName: string | null;
    StateName: string | null;
    DistrictName: string | null;
    DistrictCode: string | null;
    Email: string | null;
    NationalId: string | null;
    Birthday: string | null;
    Account: string | null;
    Password: string | null;
    StoreId: number | null;
    Status: "ACTIVE" | "LOCK" | string;
    Gender: number | null;
    Notes: string | null;
    Image: string | null;
    Revenue: number | null;
}
type ApiResponse = {
    message: string;
    metadata: {
        TotalCount: number;
        Items: Customer[];
        PageNumber: number;
        PageSize: number;
        TotalPages: number;
    };
    statusCodes: number;
};
const customerEdit: ICustomerDetail = {
    Id: 0,
    CardTypeId: null,
    CardNumber: null,
    Title: null,
    LastName: '',
    FirstName: '',
    PhoneNumber: '',
    Address: '',
    City: '',
    StateCode: '',
    CountryCode: '',
    CountryName: '',
    StateName: '',
    DistrictName: '',
    DistrictCode: '',
    Email: '',
    NationalId: null,
    Birthday: '',
    Account: null,
    Password: null,
    StoreId: null,
    Status: 'INACTIVE',
    Gender: 0,
    Notes: null,
    Image: '',
}
const Customer = () => {
    const {isDarkMode} = useTheme();
    const [showAddNew, setShowAddNew] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [debouncedSearchText, setDebouncedSearchText] = useState('');
    const fetchCustomers = async ({pageParam = 1, searchText = ''}) => {
        const requestBody = {
            SearchText: searchText,
            Status: '',
            PageNumber: pageParam,
            PageSize: 10
        };
        const res = await post(API_PATH.CUSTOMER.GET_ALL, requestBody);
        return res.data as Promise<ApiResponse>;
    }
    const {data, fetchNextPage, isFetchingNextPage, hasNextPage} = useInfiniteQuery<ApiResponse>({
        queryKey: ['customers', debouncedSearchText],
        // @ts-ignore
        queryFn: ({pageParam}) => fetchCustomers({pageParam, searchText: debouncedSearchText}),
        getNextPageParam: (lastPage) => {
            const {PageNumber, TotalPages} = lastPage.metadata;
            return (PageNumber < TotalPages) ? PageNumber + 1 : undefined;
        },
        initialPageParam: 1
    });
    const [{
        data: nationalities,
    }] = useAtom(quocGiaAtom);
    const lastCustomerRef = useRef<HTMLElement>(null);
    const {ref, entry} = useIntersection({
        root: lastCustomerRef.current,
        threshold: 1
    });
    // Debounced search text input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [searchText]);
    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry, hasNextPage, fetchNextPage]);
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setDebouncedSearchText(searchText);
        }
    }
    const onCloseAddNew = () => {
        setShowAddNew(false);
    }
    const onCloseUpdate = () => {
        setShowEdit(false);
    }
    // @ts-ignore
    const customers = data?.pages.flatMap(page => page.metadata.Items) ?? [];
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
                        onClick={() => setShowAddNew(true)}
                        icon={<IconPlus/>}
                        className={`${isDarkMode ? 'border-darkGrey-3838-important border' : ''} h-[40px] w-[165px] text-[16px]  px-[24px] gap-x-[14px]`}
                        name={'Thêm mới'}/>
                </div>
            </div>
            <div className={'w-full flex flex-col h-screen bg-backgroundContent '}>
                <div className={'search-wrapper m-[32px] flex justify-end '}>
                    <div className="input-search w-[275px] relative">
                        <Input
                            onKeyDown={handleKeyDown}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
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
                    <div className="max-h-[70vh] table-wrapper border border-[#E7E7E9] rounded-[1.5rem]
                    py-[1.719rem] mx-[2rem] flex flex-col mb-[15px] overflow-hidden bg-white ">
                        <div
                            className=" pb-[2.719rem] w-full justify-between flex items-center self-stretch">
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
                                        <TableHead
                                            className={'max-w-[200px]'}
                                        >Địa chỉ</TableHead>
                                        <TableHead>Doanh thu</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody
                                >
                                    {customers.map((customer, i) => (
                                        <TableRow
                                            key={customer.Id}
                                            ref={(i === customers.length - 1) ? ref : null}
                                        >
                                            <TableCell>
                                                {customer.LastName || 'N/A'}
                                            </TableCell>
                                            <TableCell>
                                                {customer.FirstName || 'N/A'}
                                            </TableCell>
                                            <TableCell>
                                                {customer.PhoneNumber || 'N/A'}
                                            </TableCell>
                                            <TableCell>
                                                {customer.Email || 'N/A'}
                                            </TableCell>
                                            <TableCell
                                            >
                                                {FormatBirthday(customer.Birthday ?? '') || 'N/A'}
                                            </TableCell>
                                            <TableCell
                                                title={customer.Address ?? ''}
                                                className={'truncate max-w-[150px]'}
                                            >
                                                {customer.Address || 'N/A'}

                                            </TableCell>
                                            <TableCell>
                                                {FormatCurrency((customer?.Revenue) ? customer?.Revenue + '' : '0')}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {isFetchingNextPage && (
                                        <TableRow>
                                            <TableCell colSpan={5}>
                                                <div className="flex items-center space-x-4 p-4">
                                                    <Skeleton className="h-4 w-[50px]"/>
                                                    <Skeleton className="h-4 w-[50px]"/>
                                                    <Skeleton className="h-4 w-[50px]"/>
                                                    <Skeleton className="h-4 w-[150px]"/>
                                                    <Skeleton className="h-4 w-[50px]"/>
                                                    <Skeleton className="h-4 w-[50px]"/>
                                                    <Skeleton className="h-4 w-[50px]"/>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
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
            <AddNewOrUpdateCustomer showAddNew={showAddNew}
                                    showEditCustomer={showEdit}
                                    onCloseAddNew={onCloseAddNew}
                                    onCloseUpdate={onCloseUpdate}
                                    customerEdit={customerEdit}
                                    nationalities={nationalities}
            />
        </div>
    );
};

export default Customer;
