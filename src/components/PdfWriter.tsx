import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import Chart from 'chart.js/auto';
import React, { useRef, useEffect, useState } from 'react';

type ChartData = {
    labels: string[];
    data: number[];
};

const PdfWriter: React.FC<ChartData> = ({ labels, data }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [chart, setChart] = useState<Chart | null>(null);
    useEffect(() => {
        if (canvasRef.current) {
            if (chart) {
                chart.destroy();
            }

            new Chart(canvasRef.current, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Category Scores',
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132)',
                                'rgba(54, 162, 235',
                                'rgba(255, 206, 86',
                                'rgba(75, 192, 192',
                                'rgba(153, 102, 255',
                                'rgba(255, 159, 64',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                        },
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Categories',
                                color: 'rgba(0, 0, 0, 0.87)',
                                font: {
                                    size: 18,
                                    weight: 'bold',
                                },
                            },
                            ticks: {
                                color: 'rgba(0, 0, 0, 0.87)',
                                font: {
                                    size: 14,
                                    weight: 'bold',
                                },
                            }
                        },
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: 'Score %',
                                color: 'rgba(0, 0, 0, 0.87)',
                                font: {
                                    size: 18,
                                    weight: 'bold',
                                },
                            },
                        },
                        

                    },
                },
            });
        }
    }, []);

    const generatePdf = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 400]);
        const { width, height } = page.getSize();

        page.drawText('Your Heart Self-Assessment Scores!', {
            x: 50,
            y: height - 50,
            size: 20,
            color: rgb(0, 0, 0),
        });

        page.drawText('A high score indicates a spiritually and mentally healthy heart.\n A low score in a particular area may indicate an area for improvement.', {
            x: 50,
            y: height - 75,
            size: 12,
            color: rgb(0, 0, 0),
        }
        )

        if (canvasRef.current) {
            const chartDataUrl = canvasRef.current.toDataURL('image/png');
            const chartImageBytes = await fetch(chartDataUrl).then((res) => res.arrayBuffer());
            const chartImage = await pdfDoc.embedPng(chartImageBytes);
            page.drawImage(chartImage, {
                x: 50,
                y: height - 300,
                width: 500,
                height: 200,
            });
        }

        page.drawText('We hope you enjoyed taking this quiz and learned something about yourself!\n Consider retaking the quiz in 6 months time to see how you have improved.', {
            x: 50,
            y: height - 325,
            size: 12,
            color: rgb(0, 0, 0),
        }
        )

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        saveAs(blob, 'Heart_Self_Assessment.pdf');
    };

    return (
        <div>
            <canvas ref={canvasRef} width="500" height="200"></canvas>
            <button className='bg-foreground' onClick={generatePdf}>Generate PDF</button>
        </div>
    );
};

export default PdfWriter;