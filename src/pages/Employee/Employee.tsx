import './styleEmployeePage.css';
import {
    IconLockRightBottom,
    IconThreeDotsCircle,
    PlusRightBottom,
    WifiRightBottom
} from "../../assets/svgs/SVGIcon.tsx";
import {useQuery} from "@tanstack/react-query";
import {post} from "../../libs";
import {API_PATH} from "../../constants/Path.ts";
import TopAccountPage from "../../components/TopAccountPage/TopAccountPage.tsx";
import TextSkeleton from "../../components/TextSkeleton/TextSkeleton.tsx";
import TableRowSkeleton from "../../components/TableRowSkeleton/TableRowSkeleton.tsx";
import {cmndSafe, emailSafe, phoneSafe} from "../../libs/commonValid.ts";
import {formatDateSafe} from "../../libs/dateFormatter.ts";
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from '../../components/ui/table.tsx';

export interface Account {
    Id: number;
    Account: string;
    LastName: string ;
    FirstName: string ;
    PhoneNumber: string ;
    Email: string ;
    NationalId: string ;
    Birthday: string ;
    RoleId: number;
    RoleName: string;
    RoleCode: string;
    IsLock: number;
    Gender: string ;
    ContractType: string;
    ContractTypeName: string;
    CountryName: string ;
    StateName: string ;
    CityName: string ;
    Address: string ;
}

type ApiResponse = {
    message: string,
    metadata: Account[],
    statusCodes: number,
    stats: {
        total: number,
        active: number,
        locked: number
    }
};
const Employee = () => {
    // const navigate = useNavigate();
    const apiGetListAccount = async () => {
        // call api get list account
        // console.log(IDCuaHang);
        const res = await post(API_PATH.ACCOUNT.GET_ALL, {
        });
        return res?.data;
        // }
    };

    const {data: accounts, isLoading, isError} = useQuery<ApiResponse, Error>({
        queryKey: ['accounts'],
        queryFn: apiGetListAccount,
        select: (data) => {
            const stats = data?.metadata.reduce(
                (acc, account) => ({
                    total: acc.total + 1,
                    active: account.IsLock ? acc.active : acc.active + 1,
                    locked: account.IsLock ? acc.locked + 1 : acc.locked
                }), {
                    total: 0,
                    active: 0,
                    locked: 0
                });
            return {
                metadata: data?.metadata,
                stats,
                message: data?.message,
                statusCodes: data?.statusCodes
            }
        }
    });

    const skeletonRows = Array.from({length: 8}, (_, i) => i);

    // function onNavigateDetail(idNguoiDung: number) {
    //     // Send idNguoiDung to param url /account/detail/:id
    //     // navigate(`/dashboard/accounts/detail/${idNguoiDung}`);
    // }

    return (
        <div className={'h-[calc(100%-40px)] max-h-screen overflow-hidden '}>
            <TopAccountPage title={'Nhân viên'}/>
            <div className="top pt-[2.188rem] pl-[2rem] flex gap-x-[3.688rem] pb-[2.5rem]">
                <div
                    className="overflow-hidden flex relative flex-shrink-0 w-[21.5rem] h-[9.5625rem] rounded-[1.125rem] pt-[2.313rem] pl-[2.313rem] pr-[2.313rem]">
                    <div
                        className=" absolute top-0 left-0 flex-shrink-0 w-[21.5rem] h-[9.5625rem] rounded-[1.125rem] bg-brand01"/>
                    <div className="z-10 flex flex-col items-start gap-1.5 w-[3.4375rem]">
                        <div className="self-stretch text-white font-['Inter'] font-medium leading-[130%]">Đã tạo
                        </div>
                        <div
                            className="self-stretch h-[3.0625rem] text-white font-['Inter'] text-5xl font-semibold leading-[130%]">
                            {isLoading ? (<TextSkeleton/>) : (accounts?.stats?.total || 0)}
                        </div>
                    </div>
                    <div className={'absolute right-0 bottom-0'}>
                        <PlusRightBottom/>
                    </div>
                </div>
                <div
                    className="overflow-hidden relative flex flex-shrink-0 w-[21.5rem] h-[9.5625rem] rounded-[1.125rem] pt-[2.313rem] pl-[2.313rem] pr-[2.313rem]">
                    <div
                        className=" absolute top-0 left-0 flex-shrink-0 w-[21.5rem] h-[9.5625rem] rounded-[1.125rem] border-2 border-[#e7e7e9] bg-white"/>
                    <div className="z-10 flex flex-col flex-shrink-0 items-start gap-1.5 w-[3.4375rem] h-[4.75rem]">
                        <div className="w-[7.875rem] text-[#6e6d7a] font-['Inter'] font-medium leading-[130%]">Đang
                            kích
                            hoạt
                        </div>
                        <div
                            className="self-stretch text-[#0d0c22] font-['Inter'] text-5xl font-semibold leading-[130%]">
                            {isLoading ? (
                                <TextSkeleton/>) : ((accounts?.stats?.total || 0) - (accounts?.stats?.locked || 0))}
                        </div>
                    </div>
                    <div className={'absolute right-0 bottom-0'}>
                        <WifiRightBottom/>
                    </div>
                </div>
                <div
                    className="overflow-hidden flex relative flex-shrink-0 w-[21.5rem] h-[9.5625rem] rounded-[1.125rem] pt-[2.313rem] pl-[2.313rem] pr-[2.313rem]">
                    <div
                        className="absolute top-0 left-0 flex-shrink-0 w-[21.5rem] h-[9.5625rem] rounded-[1.125rem] border-2 border-[#e7e7e9] bg-white"/>
                    <div className="z-10 flex flex-col flex-shrink-0 items-start gap-1.5 w-[3.4375rem] h-[4.75rem]">
                        <div className="w-[7.875rem] text-[#6e6d7a] font-['Inter'] font-medium leading-[130%]">Đã khóa
                        </div>
                        <div
                            className="self-stretch text-[#0d0c22] font-['Inter'] text-5xl font-semibold leading-[130%]">
                            {isLoading ? (<TextSkeleton/>) : (accounts?.stats?.locked || 0)}
                        </div>
                    </div>
                    <div className={'absolute right-0 bottom-0'}>
                        <IconLockRightBottom/>
                    </div>
                </div>
            </div>
            <div className={'bottom-list-account-wrapper'}>
                <div className="max-h-[60vh] table-wrapper border border-[#E7E7E9] rounded-[1.5rem]
                    py-[1.719rem] mx-[2rem] flex flex-col mb-[15px] overflow-hidden ">
                    <div
                        className=" pb-[2.719rem] w-full justify-between frame_1000003562 flex items-center self-stretch">
                        <div className="text-black font-['Inter'] pl-[1rem] text-2xl font-medium leading-[130%]">Danh sách tài
                            khoản
                        </div>
                        <div
                            className="frame_35477 flex justify-end items-center pb-[18px)] pl-[var(--01,] pr-[var(--01,] pl-[1.125rem] pr-[1.125rem] mr-4 p-2 rounded-lg border border-[#e7e7e9] bg-[#f9f9fb]">
                            <div
                                className="18px)] 18px)] flex justify-center items-center pt-[0.563px] pb-px px-px w-[var(--01, h-[var(--01,">
                                <svg width={17} height={18} viewBox="0 0 17 18" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 12.9375L11.9375 16.875L15.875 12.9375" stroke="#0D0C22"
                                          strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M11.9375 16.875V0.5625" stroke="#0D0C22" strokeMiterlimit={10}
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6.03125 7.3125L3.78125 1.125H3.21875L0.96875 7.3125" stroke="#0D0C22"
                                          strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M1.25 10.6875H5.75V11.25L1.25 16.3125V16.875H5.75" stroke="#0D0C22"
                                          strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M1.78711 5.0625H5.21273" stroke="#0D0C22" strokeMiterlimit={10}
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="text-[#0d0c22] font-['Inter'] text-xs leading-[130%]">Sắp xếp theo</div>
                        </div>
                    </div>
                    <div className={'overflow-auto'}>
                        <Table>
                            {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
                            <TableHeader className="sticky top-0 z-10 bg-white">
                                <TableRow>
                                    <TableHead >Họ</TableHead>
                                    <TableHead >Tên</TableHead>
                                    <TableHead >Điện thoại</TableHead>
                                    <TableHead >CMND</TableHead>
                                    <TableHead >Email</TableHead>
                                    <TableHead >Ngày sinh</TableHead>
                                    <TableHead >Tài khoản</TableHead>
                                    <TableHead >Loại</TableHead>
                                    <TableHead ></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                            >
                                {isLoading ? (
                                    skeletonRows.map((index) => (
                                        <TableRowSkeleton key={`skeleton-${index}`}/>
                                    ))
                                ) : isError ? (
                                    <TableCell colSpan={4} className="text-center">
                                        Lỗi không thể lấy danh sách tài khoản
                                    </TableCell>
                                ) : accounts?.metadata?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-gray-500">
                                            Danh sách trống
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    accounts?.metadata.map((account) => (
                                        <TableRow className='border-0 text-[#454545] text-lg font-medium leading-[140%]'
                                                  key={account.Id}>
                                            {/*<TableCell>{invoice.userId}</TableCell>*/}
                                            <TableCell title={account.FirstName}
                                                       className={' h-[2.219rem] '}>{account.FirstName}</TableCell>
                                            <TableCell title={account.LastName}
                                                       className={' h-[2.219rem] '}>{account.LastName}</TableCell>
                                            <TableCell
                                                className={' h-[2.219rem] '}>{phoneSafe(account.PhoneNumber)}</TableCell>
                                            <TableCell
                                                className={' h-[2.219rem] '}>{cmndSafe(account.NationalId)}</TableCell>
                                            <TableCell
                                                className={' h-[2.219rem] '}>{emailSafe(account.Email)}</TableCell>
                                            <TableCell
                                                className={' h-[2.219rem] '}>{formatDateSafe(account.Birthday)}</TableCell>
                                            <TableCell className={' h-[2.219rem] '}>{account.Account}</TableCell>
                                            <TableCell className={' h-[2.219rem] '}>Demo</TableCell>
                                            <TableCell
                                                onClick={() => alert("Chức năng này đang phát triển")}
                                                className={' h-[2.219rem] hover:cursor-pointer hover:scale-110 '}><IconThreeDotsCircle/></TableCell>
                                            {/*<TableCell className="text-right">{invoice.email}</TableCell>*/}
                                        </TableRow>
                                    ))
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
    );
};

export default Employee;
