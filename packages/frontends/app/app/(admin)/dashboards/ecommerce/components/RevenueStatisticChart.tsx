"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

import { LoadingEffect } from "@/components/LoadingEffect";

const ApexCharts = dynamic(() => import("react-apexcharts"), {
    ssr: false,
    loading: () => <LoadingEffect height={chartOptions.chart?.height} />,
});

const chartOptions: ApexOptions = {
    chart: {
        height: 288,
        type: "bar",
        stacked: true,
        background: "transparent",
        toolbar: {
            show: false,
        },
    },

    plotOptions: {
        bar: {
            borderRadius: 8,
            borderRadiusApplication: "end",
            borderRadiusWhenStacked: "last",
            colors: {
                backgroundBarColors: ["rgba(150,150,150,0.07)"],
                backgroundBarRadius: 8,
            },
            columnWidth: "45%",
            barHeight: "100%",
        },
    },
    dataLabels: {
        enabled: false,
    },
    colors: ["#ff8b4b", "#6c74f8"],
    legend: {
        show: true,
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 6,
    },
    series: [
        {
            name: "Orders",
            data: [10, 12, 14, 16, 18, 20, 14, 16, 24, 12],
        },
        {
            name: "Revenue",
            data: [15, 24, 21, 28, 30, 40, 22, 32, 48, 20],
        },
    ],
    xaxis: {
        categories: [
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
            "2023",
            "2024",
            "2025",
        ],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            formatter: (val) => {
                return new Date(val).getFullYear().toString();
            },
        },
    },
    yaxis: {
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            show: false,
        },
    },

    tooltip: {
        enabled: true,
        shared: true,
        intersect: false,
    },
    grid: {
        show: false,
    },
    responsive: [
        {
            breakpoint: 450,
            options: {
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                    },
                },
                xaxis: {
                    tickAmount: 3,
                },
            },
        },
    ],
};

export const RevenueStatisticChart = () => {
    return (
        <ApexCharts
            options={chartOptions}
            height={chartOptions.chart?.height}
            type="bar"
            series={chartOptions.series}></ApexCharts>
    );
};
