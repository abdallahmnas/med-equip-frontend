import { useState } from 'react'
import { LayoutDashboard, Users, Wrench, Settings, LogOut, Menu } from 'lucide-react'
import { Link, useLocation, useNavigate } from "react-router-dom"
// import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'

export function Sidebar({ className }: { className?: string }) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const location = useLocation()
    const { signOut } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        signOut();
        navigate('/login');
    }

    const links = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "Accounts", icon: Users, path: "/accounts" },
        { name: "Equipments", icon: Wrench, path: "/equipments" },
        { name: "Settings", icon: Settings, path: "/settings", disabled: true },
    ]

    return (
        <nav>
            <motion.div
                className={cn("flex h-screen flex-col border-r", className)}
                animate={{ width: isCollapsed ? 80 : 240 }}
            >
                <div className="flex items-center justify-between p-5  border border-b   ">
                    {!isCollapsed && <span className="text-xl ">Med-<span className="font-semibold">SPG</span></span>}
                    <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
                <nav className="flex-1 space-y-1 p-2">
                    {links.map((link) => (
                       <Link
                       key={link.path}
                       to={link.disabled ? "#" : link.path} // Disable navigation if the link is disabled
                       onClick={(e) => link.disabled && e.preventDefault()} // Prevent click action if disabled
                       className={cn(
                           "flex items-center gap-2 rounded-md px-3 py-6 text-sm font-medium",
                           link.disabled
                               ? "text-gray-400 cursor-not-allowed" // Apply disabled styles
                               : location.pathname === link.path
                               ? "text-[#297F7F] border-[#297F7F] border-l-8"
                               : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                       )}
                   >
                       <link.icon className="h-5 w-5 flex-shrink-0" />
                       {!isCollapsed && <span>{link.name}</span>}
                   </Link>
                   
                    ))}
                </nav>
                <div className="border-t p-2">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                        <LogOut className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </motion.div>
        </nav>
    )
}

