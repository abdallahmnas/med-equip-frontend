import { Button } from "../ui/button"

interface RecentSearch {
    user: string
    searchWord: string
    dateTime: string
}

export function RecentSearches() {
    const searches: RecentSearch[] = [
        {
            user: "Daniel Benson",
            searchWord: "2 Pack Trauma Shears",
            dateTime: "12/06/2024 - 9:36AM"
        },
        {
            user: "Daniel Benson",
            searchWord: "2 Pack Trauma Shears",
            dateTime: "12/06/2024 - 9:36AM"
        },
        {
            user: "Daniel Benson",
            searchWord: "2 Pack Trauma Shears",
            dateTime: "12/06/2024 - 9:36AM"
        },
        {
            user: "Daniel Benson",
            searchWord: "2 Pack Trauma Shears",
            dateTime: "12/06/2024 - 9:36AM"
        },
        {
            user: "Daniel Benson",
            searchWord: "2 Pack Trauma Shears",
            dateTime: "12/06/2024 - 9:36AM"
        }
    ]

    return (
        <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold">Recent Searches</h2>
                <div className="flex items-center gap-2">
                    <select className="rounded-md border border-gray-200 px-2 py-1.5 text-sm sm:px-3">
                        <option>Today</option>
                        <option>Yesterday</option>
                        <option>Last 7 days</option>
                    </select>
                    <Button variant="ghost" size="sm">View All</Button>
                </div>
            </div>
            <div className="mt-4 overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b text-left">
                            <th className="pb-3 text-sm font-medium text-gray-500">User</th>
                            <th className="pb-3 text-sm font-medium text-gray-500">Search word</th>
                            <th className="pb-3 text-sm font-medium text-gray-500">Date - Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searches.map((search, index) => (
                            <tr key={index} className="border-b last:border-0">
                                <td className="py-3 text-sm">{search.user}</td>
                                <td className="py-3 text-sm">{search.searchWord}</td>
                                <td className="py-3 text-sm">{search.dateTime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

