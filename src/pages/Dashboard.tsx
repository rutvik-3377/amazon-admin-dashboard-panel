
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import CategoryChart from '@/components/dashboard/CategoryChart';
import RecentOrders from '@/components/dashboard/RecentOrders';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  CreditCard,
  AlertCircle
} from "lucide-react";
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulating API calls
    // In a real app, you'd use fetch or axios to call your backend API
    setTimeout(() => {
      // This data would normally come from your backend
      const metricsData = {
        totalSales: 34582.75,
        totalOrders: 587,
        totalCustomers: 312,
        averageOrderValue: 58.91,
        monthlyRevenue: [
          { month: 'Jan', revenue: 4200 },
          { month: 'Feb', revenue: 4800 },
          { month: 'Mar', revenue: 5100 },
          { month: 'Apr', revenue: 4900 },
          { month: 'May', revenue: 5300 },
          { month: 'Jun', revenue: 5800 }
        ],
        categoryDistribution: [
          { name: 'Electronics', value: 42 },
          { name: 'Clothing', value: 28 },
          { name: 'Home', value: 15 },
          { name: 'Sports', value: 10 },
          { name: 'Books', value: 5 }
        ]
      };

      const ordersData = [
        { 
          id: 1001, 
          customer: 'John Smith', 
          date: '2025-05-15', 
          status: 'Delivered', 
          total: 99.99 
        },
        { 
          id: 1002, 
          customer: 'Sarah Johnson', 
          date: '2025-05-16', 
          status: 'Processing', 
          total: 259.97 
        },
        { 
          id: 1003, 
          customer: 'Mike Brown', 
          date: '2025-05-17', 
          status: 'Shipped', 
          total: 79.99 
        },
        { 
          id: 1004, 
          customer: 'Emma Wilson', 
          date: '2025-05-18', 
          status: 'Processing', 
          total: 149.98 
        },
        { 
          id: 1005, 
          customer: 'Alex Taylor', 
          date: '2025-05-18', 
          status: 'Pending', 
          total: 24.99 
        }
      ];

      setMetrics(metricsData);
      setOrders(ordersData);
      setLoading(false);

      toast({
        title: "Dashboard Updated",
        description: "Latest metrics have been loaded",
      });
    }, 1000);
  }, [toast]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 border-4 border-t-amazon-orange border-r-amazon-blue border-b-amazon-orange border-l-amazon-blue rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Revenue" 
            value={`$${metrics.totalSales.toLocaleString()}`}
            description="Last 30 days" 
            icon={<DollarSign className="h-4 w-4" />}
            trend={{
              value: 12.5,
              isPositive: true
            }}
          />
          <StatCard 
            title="Orders" 
            value={metrics.totalOrders}
            description="Last 30 days" 
            icon={<ShoppingCart className="h-4 w-4" />}
            trend={{
              value: 8.2,
              isPositive: true
            }}
          />
          <StatCard 
            title="Customers" 
            value={metrics.totalCustomers}
            description="Total registered" 
            icon={<Users className="h-4 w-4" />}
            trend={{
              value: 4.6,
              isPositive: true
            }}
          />
          <StatCard 
            title="Avg. Order Value" 
            value={`$${metrics.averageOrderValue}`}
            description="Per order" 
            icon={<CreditCard className="h-4 w-4" />}
            trend={{
              value: 2.1,
              isPositive: false
            }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          <RevenueChart data={metrics.monthlyRevenue} />
          <CategoryChart data={metrics.categoryDistribution} />
        </div>

        <RecentOrders orders={orders} />
      </div>
    </Layout>
  );
};

export default Dashboard;
