
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
  CreditCard
} from "lucide-react";
import { useToast } from '@/components/ui/use-toast';
import api from '@/services/api';

const Dashboard = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch metrics
        const metricsResponse = await api.get('/api/metrics');
        setMetrics(metricsResponse.data);
        
        // Fetch recent orders
        const ordersResponse = await api.get('/api/orders');
        // Take the 5 most recent orders
        setOrders(ordersResponse.data.slice(0, 5));
        
        setLoading(false);
        
        toast({
          title: "Dashboard Updated",
          description: "Latest metrics have been loaded",
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
        
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      }
    };

    fetchDashboardData();
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
            value={metrics.totalProducts}
            description="Total registered" 
            icon={<Users className="h-4 w-4" />}
            trend={{
              value: 4.6,
              isPositive: true
            }}
          />
          <StatCard 
            title="Avg. Order Value" 
            value={`$${metrics.averageOrderValue.toFixed(2)}`}
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
