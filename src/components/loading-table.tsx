import { Skeleton } from "./ui/skeleton"

interface LoadingTableProps {
  columns?: number
  rows?: number
}

export function LoadingTable({ columns = 3, rows = 5 }: LoadingTableProps) {
  return (
    <div className="w-full space-y-4 rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className={`grid grid-cols-${columns} gap-4`}>
          {Array(columns).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
        {Array(rows).fill(0).map((_, i) => (
          <div key={i} className={`grid grid-cols-${columns} gap-4`}>
            {Array(columns).fill(0).map((_, j) => (
              <Skeleton key={j} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

