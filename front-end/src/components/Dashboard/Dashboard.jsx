import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import StatCard from "../StatCard/StatCard";
import BarChartVertical from "../BarChartVertical/BarChartVertical"; // Nouveau graphique vertical
import DataTable from "../DataTable/DataTable";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import DoughnutChart from "../DoughnutChart/DoughnutChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
    // Données fictives pour les produits avec dates de création
    const products = [
        { id: "1", name: "Ergonomic Chair", price: 120.99, category: "Furniture", owner: "User123", createdAt: "2023-01-15" },
        { id: "2", name: "Wireless Keyboard", price: 45.99, category: "Electronics", owner: "User456", createdAt: "2023-02-20" },
        { id: "3", name: "Noise Cancelling Headphones", price: 199.99, category: "Electronics", owner: "User789", createdAt: "2023-03-05" },
        { id: "4", name: "Standing Desk", price: 299.99, category: "Furniture", owner: "User123", createdAt: "2023-01-25" },
        { id: "5", name: "LED Desk Lamp", price: 29.99, category: "Accessories", owner: "User456", createdAt: "2023-02-10" },
    ];

    // Statistiques calculées à partir des produits
    const totalProducts = products.length;
    const totalRevenue = products.reduce((sum, product) => sum + product.price, 0).toFixed(2);
    const uniqueCategories = [...new Set(products.map((product) => product.category))].length;

    // Données mises à jour pour les StatCards
    const stats = [
        { title: "Total Products", value: totalProducts, icon: "📦", color: "orange" },
        { title: "Total Revenue", value: `${totalRevenue} €`, icon: "💰", color: "green" },
        { title: "Unique Categories", value: uniqueCategories, icon: "📊", color: "blue" },
        { title: "Top Owner", value: "User123", icon: "👤", color: "purple" },
    ];

    // Calcul des produits par mois
    const productsByMonth = products.reduce((acc, product) => {
        const month = new Date(product.createdAt).toLocaleString("default", { month: "short" });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    // Préparer les données pour le BarChart Vertical
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
                    "rgba(255, 99, 132, 0.5)", // Couleurs pour chaque catégorie
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

                <Grid item xs={12} md={4} sx={{ height: "50%" }}>
                    <DoughnutChart
                        data={doughnutChartData}
                        options={{
                            responsive: true,
                            plugins: { legend: { position: "right" } },
                        }}
                    />
                </Grid>
            </Grid>

            <Box sx={{ marginTop: 4, height: "50%", width: "40%" }}>
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
