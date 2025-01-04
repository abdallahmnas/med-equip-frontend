import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "./header"
import { Sidebar } from "./sidebar"

export function MainLayout({ title, children }: { title: string, children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <AnimatePresence>
                {isSidebarOpen && (
                    // <motion.div
                    //     initial={{ x: -240 }}
                    //     animate={{ x: 0 }}
                    //     exit={{ x: -240 }}
                    //     transition={{ duration: 0.3 }}
                    //     className="absolute inset-y-0 left-0 z-50 lg:relative"
                    // >
                    <Sidebar className="h-full" />
                    // </motion.div>
                )}
            </AnimatePresence>
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    {/* page title */}
                    {/* <h4 className="text-2xl font-semibold tracking-tight">{title}</h4> */}
                    {children}
                </main>
            </div>
        </div>
    )
}

