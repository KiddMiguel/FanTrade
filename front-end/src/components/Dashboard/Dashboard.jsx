import React from "react";
import { Box, Grid } from "@mui/material";
import StatCard from "../StatCard/StatCard";
import BarChartVertical from "../BarChartVertical/BarChartVertical";
import DoughnutChart from "../DoughnutChart/DoughnutChart";
import DataTable from "../DataTable/DataTable";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
    // Données fictives pour les produits avec des champs _id, seller, et createdAt
    const products = [
        {
            _id: "676488bb2387b5efe17799f1",
            name: "Progressive systematic task-force",
            description: "Us medical law prevent. Main drug hair still away boy season stock.",
            price: 563.49,
            category: "digital",
            universe: "Furniture",
            images: [
                "https://via.placeholder.com/250",
                "https://via.placeholder.com/150",
                "https://via.placeholder.com/200",
            ],
            seller: "dacdba84e7bfae0608649f09",
            stock: 15,
            ratings: [
                {
                    user: "dacdba84e7bfae0608649f09",
                    rating: 4,
                    comment: "Others want grow know we see part yeah responsibility wonder factor difference.",
                },
            ],
            createdAt: "2024-12-19T20:57:31.744Z",
        },
        // Ajoutez d'autres produits similaires ici
    ];

    // Statistiques calculées à partir des produits
    const totalProducts = products.length;
    const totalRevenue = products.reduce((sum, product) => sum + product.price, 0).toFixed(2);
    const uniqueCategories = [...new Set(products.map((product) => product.category))].length;

    // Données pour les StatCards
    const stats = [
        { title: "Total Products", value: totalProducts, icon: "📦", color: "orange" },
        { title: "Total Revenue", value: `${totalRevenue} €`, icon: "💰", color: "green" },
        { title: "Unique Categories", value: uniqueCategories, icon: "📊", color: "blue" },
        { title: "Average Stock", value: (products.reduce((sum, product) => sum + product.stock, 0) / totalProducts).toFixed(2), icon: "📈", color: "purple" },
    ];

    // Calcul des produits par mois
    const productsByMonth = products.reduce((acc, product) => {
        const month = new Date(product.createdAt).toLocaleString("default", { month: "short" });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    const barChartVerticalData = {
        labels: Object.keys(productsByMonth), // Mois
        datasets: [
            {
                label: "Products Created",
                data: Object.values(productsByMonth), // Nombre de produits par mois
                backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
        ],
    };

    // Produits par catégorie pour Doughnut Chart
    const productsByCategory = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    const doughnutChartData = {
        labels: Object.keys(productsByCategory), // Catégories
        datasets: [
            {
                data: Object.values(productsByCategory), // Nombre de produits par catégorie
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box sx={{ padding: 4 }}>
            {/* Statistiques */}
            <Grid container spacing={4}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <StatCard title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
                    </Grid>
                ))}
            </Grid>

            {/* Graphiques */}
            <Grid container spacing={4} sx={{ marginTop: 4 }}>
                <Grid item xs={12} md={8}>
                    <DataTable />
                </Grid>

                <Grid item xs={12} md={4}>
                    <DoughnutChart
                        data={doughnutChartData}
                        options={{
                            responsive: true,
                            plugins: { legend: { position: "right" } },
                        }}
                    />
                </Grid>
            </Grid>

            <Box sx={{ marginTop: 4 }}>
                <BarChartVertical
                    data={barChartVerticalData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: "top" },
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: "Months",
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: "Number of Products",
                                },
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default Dashboard;
