import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useMemo, useState } from 'react'
import SidebarAdmin from './SidebarAdmin';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)",
  },
}

export default function Statistiques({ chartData }) {
    const [ activeChart, setActiveChart ] = useState('desktop');

    const total = useMemo(
        () => ({
            desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
            mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
        }), []
    )

  return (
    <AuthenticatedLayout hideHeader={true}>

        <div className="flex flex-row justify-between">

            <div className='basis-1/4'>
                <SidebarAdmin/>
            </div>

            <div className="basis-3/4 mr-24 lg:mr-24 md:mr-24 sm:mr-10 py-6">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-100">
                        <div className="p-6 border-sky-200 creation-title font-bold">

                            <Card className="py-0">
                                <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
                                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
                                        <CardTitle>Bar Chart - Interactive</CardTitle>
                                        <CardDescription>
                                            Showing total visitors for the last 3 months
                                        </CardDescription>
                                    </div>
                                    <div className='flex'>
                                        {["desktop", "mobile"].map((key) => {
                                            const chart = key;
                                            return (
                                                <button
                                                    key={chart}
                                                    data-active={activeChart === chart}
                                                    className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                                                    onClick={() => setActiveChart(chart)}
                                                >
                                                    <span className="text-muted-foreground text-xs">
                                                        {chartConfig[chart].label}
                                                    </span>
                                                    <span className="text-lg leading-none font-bold sm:text-3xl">
                                                        {total[key].toLocaleString()}
                                                    </span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </CardHeader>
                                <CardContent className="px-2 sm:p-6">
                                    <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                                        <BarChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                                minTickGap={32}
                                                tickFormatter={(value) => {
                                                    const date = new Date(value)
                                                    return date.toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    })
                                                }}
                                            />
                                            <ChartTooltip
                                                content={
                                                    <ChartTooltipContent
                                                    className="w-[150px]"
                                                    nameKey="views"
                                                    labelFormatter={(value) => {
                                                        return new Date(value).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                        })
                                                    }}
                                                    />
                                                }
                                            />
                                            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                                        </BarChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
  )
}
