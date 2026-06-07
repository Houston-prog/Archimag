import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SidebarAdmin from '../SidebarAdmin';
import React, { useMemo, useEffect } from "react";
import { Pie, PieChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { router } from '@inertiajs/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function Stats({ diskStats, totalSpace, totalDocarchives, totalTypedocs, totalDPA, totalDossierPersonnel, userActivity = [] }) {

  useEffect(() => {
    const interval = setInterval(() => {
      router.reload({ only: ['diskStats', 'totalSpace', 'totalDocarchives', 'totalTypedocs', 'totalDPA', 'totalDossierPersonnel', 'userActivity'], preserveScroll: true, preserveState: true });
    }, 5000); // Recharger toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

  const chartData = useMemo(() => {
    return diskStats.map(item => ({
        ...item,
    }));
  }, [diskStats]);

  const chartConfig = {
    used: {
      label: "Utilisé",
      color: "hsl(var(--chart-2))",
    },
    free: {
      label: "Libre",
      color: "hsl(var(--chart-1))",
    },
  };

  const activityConfig = {
    activity: {
      label: "Activité",
      color: "hsl(var(--chart-1))",
    },
  };

  const totalValue = useMemo(() => {
    return diskStats.reduce((acc, curr) => acc + curr.value, 0);
  }, [diskStats]);

  return (
    <AuthenticatedLayout>
        <div className="flex flex-row justify-between">

            <div className='basis-1/4'>
                <SidebarAdmin/>
            </div>

            <div className="basis-3/4 mr-24 lg:mr-24 md:mr-24 sm:mr-10 py-6">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-100">
                        <div className="p-6 border-sky-200 creation-title font-bold">
                            <Card className="flex flex-col max-w-md mx-auto">
                                <CardHeader className="items-center pb-0">
                                    <CardTitle>Utilisation de l'espace disque</CardTitle>
                                    <CardDescription>Espace disque total : {totalSpace}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 pb-0">
                                    <ChartContainer
                                    config={chartConfig}
                                    className="mx-auto aspect-square max-h-[300px]"
                                    >
                                    <PieChart>
                                        <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent
                                            formatter={(value) => {
                                                const percentage = totalValue > 0 ? ((value / totalValue) * 100).toFixed(2) : 0;
                                                const valueInGb = (value / 1024 / 1024 / 1024).toFixed(2);
                                                return `${valueInGb} Go (${percentage}%)`;
                                            }}
                                            hideLabel
                                        />}
                                        />
                                        <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={5} />
                                        <ChartLegend content={<ChartLegendContent nameKey="name" />} className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center" />
                                    </PieChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className='overflow-hidden mt-4 shadow-sm sm:rounded-lg'>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Nombre d'archives</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalDocarchives}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Types d'archives</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalTypedocs}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">DPA</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalDPA}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Dossiers Personnel</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalDossierPersonnel}</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="mt-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Activité des utilisateurs</CardTitle>
                                <CardDescription>Nombre d'actions par utilisateur</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={activityConfig} className="min-h-[300px] w-full">
                                    <BarChart accessibilityLayer data={userActivity}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="activity" fill="var(--color-activity)" radius={4} />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
  )
}
