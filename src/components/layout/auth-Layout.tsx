export function AuthLayout({ children }: any) {
    return (
        <div className="min-h-screen bg-[#7FB7B4] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%' height='100%' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0c20 0 20 20 40 20C60 20 60 0 80 0h20v20c-20 0-20 20-40 20C40 40 40 20 20 20H0V0z' fill='%2399CDC9' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            <div className="w-full max-w-md">
                {/* <div className="bg-white rounded-3xl p-8 shadow-lg"> */}
                <AuthBackground />
                {children}
                {/* </div> */}
            </div>
        </div>
    )
}

export function AuthBackground() {
    return (
        <div className="fixed inset-0 -z-10">
            <svg
                className="h-full w-full"
                viewBox="0 0 1200 800"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
            >
                <path
                    d="M0 0C100 50 200 150 400 200C600 250 800 200 1000 150C1200 100 1400 150 1600 200V800H0V0Z"
                    fill="#2A7C7C"
                    opacity="0.3"
                />
                <path
                    d="M0 100C200 150 400 250 600 300C800 350 1000 300 1200 250C1400 200 1600 250 1800 300V800H0V100Z"
                    fill="#2A7C7C"
                    opacity="0.4"
                />
                <path
                    d="M0 200C200 250 400 350 600 400C800 450 1000 400 1200 350C1400 300 1600 350 1800 400V800H0V200Z"
                    fill="#2A7C7C"
                    opacity="0.5"
                />
            </svg>
        </div>
    )
}

