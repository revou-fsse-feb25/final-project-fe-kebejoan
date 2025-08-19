export default function Header() {
    return (
        <div className="w-full flex h-[48px] items-center bg-yok-blue p-2 justify-between">
            <div className="flex justify-between gap-2 items-center">
                <div>
                    <img src="./yok-mock.png" alt="comp-logo" className="h-[28px]"/>
                </div>
                <div className="text-white font-bold text-xl">
                    Eng. Tracker
                </div>
            </div>
            <div className="">
                <svg className="h-[32px] text-white" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 18L20 18" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 12L20 12" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 6L20 6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>
        </div>
    );
}