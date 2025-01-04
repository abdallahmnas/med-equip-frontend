import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BreadcrumbItem {
    label: string
    link: string
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex items-center space-x-1 text-sm text-gray-500">
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
                    <Link
                        to={item.link}
                        className={`hover:text-gray-900 ${index === items.length - 1 ? 'text-gray-900 font-medium' : ''
                            }`}
                    >
                        {item.label}
                    </Link>
                </div>
            ))}
        </nav>
    )
}

