
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts";
import { cn } from "@/lib/utils";
import { CustomButton } from "@/components/ui/custom-button";

export function MetricsDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock data for demonstration purposes
  const bitrateData = [
    { name: "0s", "Content-Aware": 2.1, "HLS": 3.2, "FFmpeg": 4.0 },
    { name: "10s", "Content-Aware": 1.8, "HLS": 3.2, "FFmpeg": 4.0 },
    { name: "20s", "Content-Aware": 3.2, "HLS": 2.4, "FFmpeg": 4.0 },
    { name: "30s", "Content-Aware": 2.9, "HLS": 3.8, "FFmpeg": 4.0 },
    { name: "40s", "Content-Aware": 1.5, "HLS": 1.9, "FFmpeg": 4.0 },
    { name: "50s", "Content-Aware": 2.8, "HLS": 3.0, "FFmpeg": 4.0 },
    { name: "60s", "Content-Aware": 3.1, "HLS": 3.5, "FFmpeg": 4.0 },
  ];

  const qualityData = [
    { name: "0s", "Content-Aware": 8.5, "HLS": 8.2, "FFmpeg": 9.1 },
    { name: "10s", "Content-Aware": 8.7, "HLS": 8.3, "FFmpeg": 9.1 },
    { name: "20s", "Content-Aware": 8.9, "HLS": 7.6, "FFmpeg": 9.1 },
    { name: "30s", "Content-Aware": 8.8, "HLS": 8.5, "FFmpeg": 9.1 },
    { name: "40s", "Content-Aware": 8.2, "HLS": 8.0, "FFmpeg": 9.1 },
    { name: "50s", "Content-Aware": 8.6, "HLS": 8.2, "FFmpeg": 9.1 },
    { name: "60s", "Content-Aware": 8.8, "HLS": 8.4, "FFmpeg": 9.1 },
  ];

  const bandwidthData = [
    { name: "0s", "Content-Aware": 68, "HLS": 85, "FFmpeg": 100 },
    { name: "10s", "Content-Aware": 60, "HLS": 85, "FFmpeg": 100 },
    { name: "20s", "Content-Aware": 78, "HLS": 62, "FFmpeg": 100 },
    { name: "30s", "Content-Aware": 75, "HLS": 92, "FFmpeg": 100 },
    { name: "40s", "Content-Aware": 58, "HLS": 56, "FFmpeg": 100 },
    { name: "50s", "Content-Aware": 72, "HLS": 80, "FFmpeg": 100 },
    { name: "60s", "Content-Aware": 75, "HLS": 88, "FFmpeg": 100 },
  ];

  const comparisonData = [
    { 
      metric: "Average Bitrate", 
      "Content-Aware": 2.5, 
      "HLS": 3.2, 
      "FFmpeg": 4.0,
      unit: "Mbps" 
    },
    { 
      metric: "Quality Score", 
      "Content-Aware": 8.7, 
      "HLS": 8.3, 
      "FFmpeg": 9.1,
      unit: "/10" 
    },
    { 
      metric: "Load Time", 
      "Content-Aware": 1.2, 
      "HLS": 0.8, 
      "FFmpeg": 1.5,
      unit: "seconds" 
    },
    { 
      metric: "Bandwidth Usage", 
      "Content-Aware": 70, 
      "HLS": 85, 
      "FFmpeg": 100,
      unit: "%" 
    },
    { 
      metric: "File Size", 
      "Content-Aware": 28, 
      "HLS": 37, 
      "FFmpeg": 45,
      unit: "MB" 
    }
  ];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "bitrate", label: "Bitrate" },
    { id: "quality", label: "Quality" },
    { id: "bandwidth", label: "Bandwidth" },
  ];

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border p-3 rounded-md shadow-lg">
          <p className="font-medium text-xs mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center space-x-2 text-xs">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span>{entry.name}: </span>
              <span className="font-medium">{entry.value} {selectedTab === "bitrate" ? "Mbps" : selectedTab === "quality" ? "/10" : "%"}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-4">
        <div>
          <h2 className="text-lg font-semibold mb-1">Performance Metrics</h2>
          <p className="text-sm text-muted-foreground">
            Detailed analytics comparing different encoding methods
          </p>
        </div>
        
        <div className="flex space-x-2">
          <CustomButton
            variant="outline"
            size="sm"
            className="text-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download mr-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            Export Data
          </CustomButton>
          <CustomButton
            variant="outline"
            size="sm"
            className="text-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw mr-1"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
            Refresh
          </CustomButton>
        </div>
      </div>
      
      <div className="border-b mb-4">
        <div className="flex space-x-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={cn(
                "px-4 py-2 text-sm whitespace-nowrap transition-colors border-b-2 -mb-px",
                selectedTab === tab.id
                  ? "border-primary text-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[350px] w-full">
        {selectedTab === "overview" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="metric" width={100} />
              <Tooltip
                content={({ active, payload, label }: any) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background/95 backdrop-blur-sm border p-3 rounded-md shadow-lg">
                        <p className="font-medium text-xs mb-1">{label}</p>
                        {payload.map((entry: any, index: number) => (
                          <div key={`item-${index}`} className="flex items-center space-x-2 text-xs">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                            <span>{entry.name}: </span>
                            <span className="font-medium">
                              {entry.value} {comparisonData.find(item => item.metric === label)?.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar dataKey="Content-Aware" fill="#3b82f6" barSize={20} />
              <Bar dataKey="HLS" fill="#8b5cf6" barSize={20} />
              <Bar dataKey="FFmpeg" fill="#10b981" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        )}
        
        {selectedTab === "bitrate" && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={bitrateData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Mbps', angle: -90, position: 'insideLeft' }} />
              <Tooltip content={customTooltip} />
              <Legend />
              <Line type="monotone" dataKey="Content-Aware" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="HLS" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="FFmpeg" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
        
        {selectedTab === "quality" && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={qualityData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[6, 10]} label={{ value: 'Quality Score', angle: -90, position: 'insideLeft' }} />
              <Tooltip content={customTooltip} />
              <Legend />
              <Area type="monotone" dataKey="Content-Aware" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              <Area type="monotone" dataKey="HLS" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
              <Area type="monotone" dataKey="FFmpeg" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        )}
        
        {selectedTab === "bandwidth" && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={bandwidthData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} label={{ value: 'Bandwidth %', angle: -90, position: 'insideLeft' }} />
              <Tooltip content={customTooltip} />
              <Legend />
              <Line type="monotone" dataKey="Content-Aware" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="HLS" stroke="#8b5cf6" strokeWidth={2} />
              <Line type="monotone" dataKey="FFmpeg" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
