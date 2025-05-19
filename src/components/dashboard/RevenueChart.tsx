
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface RevenueChartProps {
  data: {
    month: string;
    revenue: number;
  }[];
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>
          Monthly revenue for the current year
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff9900" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff9900" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12 }} 
              tickFormatter={(value) => `$${value}`} 
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Revenue']} 
              labelStyle={{ color: '#232f3e' }}
              contentStyle={{ 
                backgroundColor: 'white', 
                borderColor: '#e8e8e8',
                borderRadius: '6px' 
              }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#ff9900" 
              strokeWidth={2}
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
