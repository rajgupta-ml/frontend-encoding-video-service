import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { RepresentationMetrics } from '../types';

interface QualityComparisonChartProps {
  representations: Record<string, RepresentationMetrics>;
}

const QualityComparisonChart: React.FC<QualityComparisonChartProps> = ({ representations }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !representations) return;

    // Clean up previous chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const repNames = Object.keys(representations);
    
    const vmafScores = repNames.map(name => 
      representations[name].qualityMetrics?.vmaf || 0
    );
    
    const psnrScores = repNames.map(name => 
      representations[name].qualityMetrics?.psnr || 0
    );
    
    const ssimScores = repNames.map(name => 
      representations[name].qualityMetrics?.ssim.toFixed(3) || 0
    );

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: repNames,
        datasets: [
          {
            label: 'VMAF',
            data: vmafScores,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            barPercentage: 0.7,
          },
          {
            label: 'PSNR',
            data: psnrScores,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            barPercentage: 0.7,
          },
          {
            label: 'SSIM',
            data: ssimScores.map(score => parseFloat(score as string) * 100), // Scale SSIM to 0-100 for better visualization
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            barPercentage: 0.7,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Score'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Representation'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.raw;
                
                // Format SSIM differently as we scaled it for display
                if (label === 'SSIM') {
                  return `${label}: ${(parseFloat(value as string) / 100).toFixed(3)}`;
                }
                
                return `${label}: ${value}`;
              }
            }
          },
          legend: {
            position: 'top',
          },
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [representations]);

  return (
    <div className="w-full" style={{ height: '300px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default QualityComparisonChart;