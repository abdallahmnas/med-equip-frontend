import { useEffect, useState } from 'react'
import { Users, Search, Clock } from 'lucide-react'
import { MetricCard } from '../../components/layout/metric-card'
import { RecentSearches } from '../../components/layout/recent-searches'
import { MainLayout } from '../../components/layout'
import DashboardService from '../../services/dashboard.service'


export function Dashboard() {
    const [counts, setCounts] = useState<any>([])

    useEffect(() => {
        const counts = async () => {
            const response = await DashboardService.counts();
            if (response.data) {
                setCounts(response.data);
            }
            // setCounts([]);
        }
        counts();
    }, []);


    return (
        <MainLayout title={'Dashboard'}>
            <h1 className="text-2xl font-semibold tracking-tight mb-2">Dashboard</h1>
            {
                counts?.users &&
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <MetricCard
                        title="Total Users"
                        value={counts?.users | 0}
                        icon={<Users className="h-8 w-8 text-[#8280FF]  " />}
                        iconContainerStyle={`bg-[#cbcaf5]`}
                        change={{ value: 8.5, trend: "up", text: "Up from yesterday" }}
                    />
                    <MetricCard
                        title="Total Searches"
                        value={counts?.searches | 0}
                        icon={<Search className="h-8 w-8 text-[#4AD991]" />}
                        iconContainerStyle='bg-primary'
                        change={{ value: 4.3, trend: "down", text: "Down from yesterday" }}
                    />
                    <MetricCard
                        title="Total Matches"
                        value={counts?.matches | 0}
                        icon={<Clock className="h-8 w-8 text-[#FF9066]" />}
                        iconContainerStyle='bg-[#f8e6e0]'
                        change={{ value: 1.8, trend: "up", text: "Up from yesterday" }}
                    />
                </div>
            }
            <div className="mt-6">
                <RecentSearches />
            </div>

        </MainLayout>
    )
}

