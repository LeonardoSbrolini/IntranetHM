// components/LineChart.tsx
"use client"
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';

// Importar o ApexCharts dinamicamente para evitar problemas de SSR
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface LineChartProps {
    series: {
        name: string;
        data: number[];
    }[];
}

const LineChart: React.FC<LineChartProps> = ({ series }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Configurações do gráfico
    const options: ApexOptions = {
        chart: {
            // Tipo do gráfico
            type: 'line',
            // Zoom habilitado
            zoom: {
                enabled: true,
                type: 'x', // Zoom apenas no eixo X
            },
            toolbar: {
                // Mostrar a barra de ferramentas
                show: true,
                tools: {
                    // Ferramentas de zoom
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    reset: true, // Botão para resetar o zoom
                },
            },
        },
        dataLabels: {
            // Mostrar rótulos de dados
            enabled: false,
        },
        stroke: {
            // Estilo da linha
            curve: 'smooth', // Linha suave
        },
        title: {
            // Título do gráfico
            text: 'Gráfico de Linha',
            align: 'center',
        },
        grid: {
            // Grade do gráfico
            borderColor: '#e7e7e7',//Border color of the graph
            row: {
                colors: ['#f3f3f3', 'transparent'], // Alternate colors of the row in the graph
                opacity: 0.5, //Opacity on graph rows
            },
        },
        // Marker points
        markers: {
            size: 5,//Size of the marker
            colors: ['#FFA41B'],//Color of the marker define one for each index in dataValue or one for all dataValues
            strokeColors: '#fff',//Border color of marker
            strokeWidth: 2,//Width of marker
            hover: {
                size: 7,//Size of the marker if hover
            },
        },
        xaxis: {
            categories: Array.from({ length: series[0].data.length }, (_, i) => i + 1),//Value of the X-axis
            title: {
                text: 'X-Axis',//Title of the X-axis
            },
        },
        yaxis: {
            title: {
                text: 'Values',//Title of the Y-axis
            },
            min: 0,//Min Y-axis value
            max: Math.max(...series.flatMap(s => s.data)) + 10,//Max y-axis value
        },
        //Hover card
        tooltip: {
            //Hover card config
            enabled: true,//Enable hover card
            enabledOnSeries: undefined,//Enable hover cards with index []
            shared: true, //Shared hover card with the sames dataValues
            followCursor: false,//Hover card follow a user cursor
            custom: undefined,//Define a custom hover with HTML tags
            hideEmptySeries: true,//Hide a empty values if exists
            fillSeriesColor: false,//Fill the background hover cards with the line colors
            //Hover card style
            style: {
                fontSize: '12px',//Font size on the hover card
                fontFamily: undefined//Font family on the hover card
            },
            //hover card title
            x: {
                show: true,//show hover card title
                formatter: () => 'Title',  //hover card title message ( using for date index)
            },
            //hover card content
            y: {
                title: {
                    formatter: () => 'oi',//hover card content title
                },
                formatter: () => 'Leonardo',//hover card content value
            },
            marker: {
                show: false, //Show the markers of the multiple dataValues
            },
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            {isClient ? (
                <Chart options={options} series={series} type="line" height="350" />
            ) : (
                <div className="h-72 flex items-center justify-center">
                    <p>Loading chart...</p>
                </div>
            )}
        </div>
    );
};

export default LineChart;
