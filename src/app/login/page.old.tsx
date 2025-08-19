function mobileView() {
    return (
            <>
                <div className="w-full p-12 flex flex-col items-center gap-4">
                    <div className="w-full flex justify-center">
                        <div className="flex gap-2 items-center">
                            <div>
                                <img src="../yok-mock.png" alt="comp-logo" className="h-[32px]"/>
                            </div>
                            <div className="text-white font-bold text-2xl">
                                Eng. Tracker App
                            </div>
                        </div>
                    </div>
                    <div className="w-[360px] p-8 flex flex-col gap-4 justify-center items-center bg-white rounded-xl shadow-[-0px_-0px_5px_#000000] ">
                        <div className="font-bold text-xl">
                            Start Tracking Your Activity!
                        </div>
                        <div className="w-full p-2">
                            <input 
                            type="email" 
                            placeholder="yourmail@company.com"
                            // value = {email}
                            // onChange= {(e) => setEmail(e.target.value)}
                            className="text-center outline-2 outline-slate-100 p-2 rounded-md w-full"
                            />
                        </div>
                        <div className="w-full p-2">
                            <input 
                            type="password"
                            placeholder="Your password"
                            // value = {password}
                            // onChange = {(e) => setPassword(e.target.value)}
                            className="text-center outline-2 outline-slate-100 p-2 rounded-md w-full"/>
                        </div>
                        <div className="w-full flex gap-2 p-2 ">
                            <div className="w-1/2 bg-yok-darkyellow text-xl rounded-md text-white font-bold text-center p-2 cursor-pointer">
                                <button className="cursor-pointer">Sign Up</button>
                            </div>
                            <div className="w-1/2 bg-yok-darkblue text-xl rounded-md text-white font-bold text-center p-2 cursor-pointer">
                                <button className="cursor-pointer">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )    
}

function desktopView() {
    return (
        <>
            <div className="w-full h-screen flex justify-end">
                <div className="w-[576px] h-screen bg-white p-8 flex flex-col gap-4 shadow-[5px_5px_10px_#000000]">
                        <div className="w-full flex justify-center">
                            <div className="flex gap-2 items-center">
                                <div>
                                    <img src="../yok-mock.png" alt="comp-logo" className="h-[32px]"/>
                                </div>
                                <div className="text-black font-bold text-2xl">
                                    Eng. Tracker App
                                </div>
                            </div>
                        </div>
                        <div className="font-bold text-xl text-center">
                            Start Tracking Your Activity!
                        </div>
                        <div className="w-full p-2">
                            <input 
                            type="email" 
                            placeholder="yourmail@company.com"
                            // value = {email}
                            // onChange= {(e) => setEmail(e.target.value)}
                            className="text-center outline-2 outline-slate-100 p-2 rounded-md w-full"
                            />
                        </div>
                        <div className="w-full p-2">
                            <input 
                            type="password"
                            placeholder="Your password"
                            // value = {password}
                            // onChange = {(e) => setPassword(e.target.value)}
                            className="text-center outline-2 outline-slate-100 p-2 rounded-md w-full"/>
                        </div>
                        <div className="w-full flex gap-2 p-2 ">
                            <div className="w-1/2 bg-yok-darkyellow text-xl rounded-md text-white font-bold text-center p-2 cursor-pointer">
                                <button className="cursor-pointer">Sign Up</button>
                            </div>
                            <div className="w-1/2 bg-yok-darkblue text-xl rounded-md text-white font-bold text-center p-2 cursor-pointer">
                                <button className="cursor-pointer">Login</button>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default function Login() {
    return (
        <>
            <div className="hidden xl:block">
                {desktopView()}
            </div>
            <div className="block xl:hidden">
                {mobileView()}
            </div>
        </>
    );
}