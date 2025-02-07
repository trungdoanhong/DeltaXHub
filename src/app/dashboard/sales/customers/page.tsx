"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users2,
  Search,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Star,
  MoreVertical,
  FileDown,
  Filter,
  BadgeCheck,
  Clock,
  Ban
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const customers = [
  {
    id: "CUS-001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
    status: "active",
    type: "Premium",
    totalOrders: 24,
    totalSpent: "$4,890",
    lastOrder: "2024-03-15"
  },
  {
    id: "CUS-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 345 678 901",
    location: "Los Angeles, USA",
    status: "inactive",
    type: "Standard",
    totalOrders: 8,
    totalSpent: "$1,240",
    lastOrder: "2024-02-28"
  },
  {
    id: "CUS-003",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    phone: "+1 456 789 012",
    location: "Chicago, USA",
    status: "pending",
    type: "Premium",
    totalOrders: 16,
    totalSpent: "$3,450",
    lastOrder: "2024-03-18"
  }
];

const customerStats = [
  {
    title: "Total Customers",
    value: "1,234",
    trend: "up",
    trendValue: "+12%",
    description: "vs. last month",
    icon: Users2,
    color: "blue"
  },
  {
    title: "Premium Members",
    value: "256",
    trend: "up",
    trendValue: "+8",
    description: "this month",
    icon: Star,
    color: "yellow"
  },
  {
    title: "Average Value",
    value: "$328",
    trend: "up",
    trendValue: "+15%",
    description: "per customer",
    icon: BadgeCheck,
    color: "green"
  }
];

export default function CustomersPage() {
  const { user, isAdmin, getUserRoles } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      const userIsAdmin = await isAdmin();
      const userRoles = await getUserRoles(user.uid);
      const isSales = userRoles.includes('Sales');

      if (!userIsAdmin && !isSales) {
        router.push('/dashboard');
        return;
      }

      setHasAccess(true);
      setLoading(false);
    };

    checkAccess();
  }, [user, isAdmin, getUserRoles, router]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <BadgeCheck className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case 'inactive':
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            <Ban className="w-3 h-3 mr-1" />
            Inactive
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return null;
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage and track customer information
          </p>
        </div>
        <div className="flex gap-4">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {customerStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 text-${stat.color}-500`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className={`mr-1 px-1.5 py-0.5 rounded-full ${
                    stat.trend === 'up' 
                      ? 'text-green-500 bg-green-500/10' 
                      : 'text-red-500 bg-red-500/10'
                  }`}>
                    {stat.trend === 'up' ? '↑' : '↓'} {stat.trendValue}
                  </span>
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customer List</CardTitle>
              <CardDescription>View and manage customer accounts</CardDescription>
            </div>
            <Users2 className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                        {customer.location}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell>
                      <Badge variant={customer.type === 'Premium' ? 'default' : 'secondary'}>
                        {customer.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.totalOrders}</TableCell>
                    <TableCell>{customer.totalSpent}</TableCell>
                    <TableCell>{customer.lastOrder}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 