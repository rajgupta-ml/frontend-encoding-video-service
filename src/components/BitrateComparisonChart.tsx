import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { RepresentationMetrics } from '../types';

interface BitrateComparisonChartProps {
  representations: Record<string, RepresentationMetrics>;
}

const BitrateComparisonChart: React.FC<BitrateComparisonChartProps> = ({ representations }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !representations) return;

    // Clean up previous chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const repNames = Object.keys(representations);
    
    const targetBitrates = repNames.map(name => 
      representations[name].targetBitrateKbps || 0
    );
    
    const actualBitrates = repNames.map(name => 
      representations[name].actualBitrateKbps || 0
    );

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: repNames,
        datasets: [
          {
            label: 'Target Bitrate (Kbps)',
            data: targetBitrates,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            barPercentage: 0.7,
          },
          {
            label: 'Actual Bitrate (Kbps)',
            data: actualBitrates,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
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
            title: {
              display: true,
              text: 'Bitrate (Kbps)'
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
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const value = context.raw;
                
                // Format bitrate with thousands separator
                return `${label}: ${value.toLocaleString()} Kbps`;
              },
              footer: function(tooltipItems) {
                const item = tooltipItems[0];
                const repName = item.label;
                const rep = representations[repName];
                
                if (rep) {
                  return `Resolution: ${rep.width}x${rep.height}`;
                }
                return '';
              }
            }
          }
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

export default BitrateComparisonChart;