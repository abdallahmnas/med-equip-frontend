import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { equpmentsService } from "../../services/equipments.service"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { dateTimeUtils } from "../../lib/dateTime.utils"

interface RecentSearch {
    search: string
    searchWord: string
    dateTime: string
}


export function RecentSearches() {
    const [searches, setSearches] = useState([])

    useEffect(() => {
        const fetchEquipments = async () => {
            const response = await equpmentsService.getSearches()
            setSearches(response.data.data)
            console.log(response.data)
        }
        fetchEquipments() // Fetch equipment data on component mount
    }, [])
    // {
    //     search: "Daniel Benson",
    //     searchWord: "2 Pack Trauma Shears",
    //     dateTime: "12/06/2024 - 9:36AM"
    // },

    return (
        <div className="space-y-6">
            <div className='p-6 bg-white rounded-lg shadow-md'>
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

                <Table className='border gray-200 rounded-lg shadow-md'>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Search Word</TableHead>
                            <TableHead>Date - Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {searches.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="text-lg font-medium text-gray-500">No records found</p>
                                        <p className="text-sm text-gray-400">There are no searches to display at the moment.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            searches.map((search: any) => (
                                <TableRow key={search.id}>
                                    <TableCell>{search.firstname} {search.lastname}</TableCell>
                                    <TableCell>{search.equipment.name}</TableCell>
                                    <TableCell>{dateTimeUtils.formatDateTime(search.createdAt)}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

