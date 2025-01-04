import { ArrowDown, ArrowUp } from 'lucide-react'
import { cn } from "../../lib/utils"

interface MetricCardProps {
    title: string
    value: string | number
    icon: React.ReactNode
    change: {
        value: number
        trend: "up" | "down"
        text: string
    }
    className?: string
    iconContainerStyle?: string
}

export function MetricCard({ title, value, icon, change, className, iconContainerStyle }: MetricCardProps) {
    return (
        <div className={cn("rounded-lg bg-white p-4 shadow-sm sm:p-6", className)}>
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{title}</p>
                <div className={`rounded-2xl p-2 ${iconContainerStyle}`}>{icon}</div>
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold sm:text-2xl">{value}</h3>
                <div className="mt-2 flex items-center gap-1">
                    {change.trend === "up" ? (
                        <ArrowUp className="h-4 w-4 text-green-500" />
                    ) : (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={cn("text-sm",
                        change.trend === "up" ? "text-green-500" : "text-red-500"
                    )}>
                        {change.value}%
                    </span>
                    <span className="text-sm text-gray-500">{change.text}</span>
                </div>
            </div>
        </div>
    )
}

