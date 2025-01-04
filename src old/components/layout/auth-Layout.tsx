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
                {children}
                {/* </div> */}
            </div>
        </div>
    )
}