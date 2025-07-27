import React from 'react';
import { RepresentationMetrics } from '../types';

interface RepresentationTableProps {
  representations: Record<string, RepresentationMetrics>;
}

const RepresentationTable: React.FC<RepresentationTableProps> = ({ representations }) => {
  if (!representations || Object.keys(representations).length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No representation data available</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Resolution
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              CRF
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Target Bitrate
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actual Bitrate
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              VMAF
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              PSNR
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              SSIM
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {Object.entries(representations).map(([name, metrics]) => (
            <tr key={name} className="hover:bg-gray-50 dark:hover:bg-gray-750">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {metrics.width}×{metrics.height}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {metrics.crf}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {metrics.targetBitrateKbps?.toLocaleString()} Kbps
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {metrics.actualBitrateKbps?.toLocaleString()} Kbps
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <span 
                  className={`inline-block rounded px-2 py-1 text-xs font-medium ${getVmafColorClass(metrics.qualityMetrics?.vmaf || 0)}`}
                >
                  {metrics.qualityMetrics?.vmaf?.toFixed(2) || '-'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {metrics.qualityMetrics?.psnr?.toFixed(2) || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {metrics.qualityMetrics?.ssim?.toFixed(4) || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper function to get color class based on VMAF score
const getVmafColorClass = (vmaf: number): string => {
  if (vmaf >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  if (vmaf >= 70) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  if (vmaf >= 50) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
};

export default RepresentationTable;