import { ChevronRight } from 'lucide-react'
import { cn } from "../../lib/utils"

interface BreadcrumbProps {
    children: React.ReactNode
    className?: string
}

export function Breadcrumb({ children, className }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn("flex", className)}>
            <ol className="flex items-center space-x-2">{children}</ol>
        </nav>
    )
}

interface BreadcrumbItemProps {
    children: React.ReactNode
    isCurrentPage?: boolean
}

export function BreadcrumbItem({ children, isCurrentPage }: BreadcrumbItemProps) {
    return (
        <li className="flex items-center">
            <div className="flex items-center">
                {children}
            </div>
            {!isCurrentPage && (
                <ChevronRight className="ml-2 h-4 w-4 text-gray-400" />
            )}
        </li>
    )
}

interface BreadcrumbLinkProps {
    children: React.ReactNode
    href?: string
}

export function BreadcrumbLink({ children, href }: BreadcrumbLinkProps) {
    if (href) {
        return (
            <a
                href={href}
                className="text-sm text-gray-500 hover:text-gray-700"
            >
                {children}
            </a>
        )
    }
    return (
        <span className="text-sm text-gray-900 font-medium">
            {children}
        </span>
    )
}

