import { ChevronDown, Menu, User } from 'lucide-react'
import { Button } from "../ui/button"
import { useAuth } from '../../contexts/AuthContext'

interface HeaderProps {
    onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
    const { user } = useAuth()
    return (
        <header className="flex items-center justify-between border-b bg-white px-4 py-3 lg:px-6">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
                    <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-semibold"></h1>
            </div>
            <div className="flex flex-row items-center gap-2  bg-primary rounded-full px-4 py-2">
                <div className="">
                    {/* <img
                        src="/placeholder.svg?height=32&width=32"
                        alt="User avatar"
                        className="h-8 w-8 rounded-full"

                    /> */}
                    <User />
                </div>
                <div className="flex flex-col sm:flex">
                    <div className="text-sm font-medium">{user?.firstname} {user?.lastname}</div>
                    <div className="text-xs text-gray-500">{user?.role}</div>

                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
        </header >
    )
}

