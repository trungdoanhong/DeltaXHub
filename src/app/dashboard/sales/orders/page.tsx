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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  Search,
  Filter,
  Plus,
  FileDown,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Plane,
  Ship,
  Truck,
  DollarSign,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getOrders, updateOrder, deleteOrder, type Order } from '@/lib/firebase/orders';
import { orderStatuses, exportTypes, paymentStatuses, shippingStatuses, orderTags } from '@/lib/constants';
import { format } from 'date-fns';
import { OrderDialog } from '@/components/orders/order-dialog';
import { Timestamp } from 'firebase/firestore';
import { createOrder } from '@/lib/firebase/orders';
import { OrderViewDialog } from '@/components/orders/order-view-dialog';
import { OrderInvoiceDialog } from '@/components/orders/order-invoice-dialog';

const orderStats = [
  {
    title: "Total Orders",
    value: "156",
    trend: "up",
    trendValue: "+12%",
    description: "vs. last month",
    icon: Package,
    color: "blue"
  },
  {
    title: "Total Revenue",
    value: "$48.2K",
    trend: "up",
    trendValue: "+8%",
    description: "vs. last month",
    icon: DollarSign,
    color: "green"
  },
  {
    title: "Pending Delivery",
    value: "23",
    trend: "down",
    trendValue: "-5",
    description: "Active shipments",
    icon: Clock,
    color: "yellow"
  }
];

export default function OrdersPage() {
  const { user, isAdmin, getUserRoles } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [exportTypeFilter, setExportTypeFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);

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
      fetchOrders();
    };

    checkAccess();
  }, [user, isAdmin, getUserRoles, router]);

  const fetchOrders = async () => {
    try {
      if (!user) return;
      const fetchedOrders = await getOrders(user.uid);
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = orderStatuses.find(s => s.value === status);
    if (!statusConfig) return null;

    return (
      <Badge className={`bg-${statusConfig.color}-500/10 text-${statusConfig.color}-500 hover:bg-${statusConfig.color}-500/20`}>
        <CheckCircle2 className="w-3 h-3 mr-1" />
        {statusConfig.label}
      </Badge>
    );
  };

  const getExportTypeIcon = (type: string) => {
    switch (type) {
      case 'air':
        return <Plane className="w-4 h-4 text-blue-500" />;
      case 'sea':
        return <Ship className="w-4 h-4 text-blue-500" />;
      case 'land':
        return <Truck className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = paymentStatuses.find(s => s.value === status);
    if (!statusConfig) return null;

    return (
      <Badge className={`bg-${statusConfig.color}-500/10 text-${statusConfig.color}-500 hover:bg-${statusConfig.color}-500/20`}>
        <DollarSign className="w-3 h-3 mr-1" />
        {statusConfig.label}
      </Badge>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesExportType = exportTypeFilter === 'all' || order.exportType === exportTypeFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesExportType && matchesPayment;
  });

  const handleCreateOrder = async (data: any) => {
    try {
      if (!user) return;
      const orderData = {
        ...data,
        companyId: user.uid,
        createdBy: user.uid,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      await createOrder(orderData);
      fetchOrders();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleUpdateOrder = async (data: any) => {
    try {
      if (!selectedOrder) return;
      await updateOrder(selectedOrder.id, {
        ...data,
        updatedAt: Timestamp.now(),
      });
      fetchOrders();
      setSelectedOrder(null);
      setDialogOpen(false);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setViewDialogOpen(true);
  };

  const handleInvoice = (order: Order) => {
    setSelectedOrder(order);
    setInvoiceDialogOpen(true);
  };

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
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">
            Manage and track your orders
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {orderStats.map((stat, index) => {
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
                    {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 inline" /> : <ArrowDownRight className="w-3 h-3 inline" />}
                    {stat.trendValue}
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
              <CardTitle>Order List</CardTitle>
              <CardDescription>View and manage all orders</CardDescription>
            </div>
            <Package className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
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
                {orderStatuses.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={exportTypeFilter}
              onValueChange={setExportTypeFilter}
            >
              <SelectTrigger className="w-[180px]">
                <Plane className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Export type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {exportTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={paymentFilter}
              onValueChange={setPaymentFilter}
            >
              <SelectTrigger className="w-[180px]">
                <DollarSign className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {paymentStatuses.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">STT</TableHead>
                  <TableHead className="w-[140px]">Dates</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[140px]">Export Type</TableHead>
                  <TableHead className="w-[200px]">Customer Info</TableHead>
                  <TableHead className="w-[250px]">Items</TableHead>
                  <TableHead className="w-[140px]">Payment</TableHead>
                  <TableHead className="w-[160px]">Shipping</TableHead>
                  <TableHead className="w-[200px]">Tracking</TableHead>
                  <TableHead className="w-[150px]">Tags</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow key={order.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                          Order: {format(order.orderDate.toDate(), 'dd/MM/yyyy')}
                        </div>
                        {order.shippingDate && (
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                            Ship: {format(order.shippingDate.toDate(), 'dd/MM/yyyy')}
                          </div>
                        )}
                        {order.deliveryDate && (
                          <div className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-1 text-muted-foreground" />
                            Delivery: {format(order.deliveryDate.toDate(), 'dd/MM/yyyy')}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getExportTypeIcon(order.exportType)}
                        {exportTypes.find(t => t.value === order.exportType)?.label}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-1 text-muted-foreground" />
                          {order.companyName}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-1 text-muted-foreground" />
                          {order.phone}
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-1 text-muted-foreground" />
                          {order.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-sm">
                            {item.name} x{item.quantity}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        {getPaymentStatusBadge(order.paymentStatus)}
                        <div className="flex items-center text-sm">
                          <DollarSign className="w-4 h-4 mr-1 text-green-500" />
                          {order.totalAmount}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">Carrier: {order.shippingCarrier}</div>
                        <div className="text-sm">Paid: ${order.shippingPaid}</div>
                        <div className="text-sm">Actual: ${order.shippingActual}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{order.trackingNumber}</div>
                        <div className="text-sm text-muted-foreground">{order.recipient}</div>
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                          {order.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {order.tags?.map((tag, idx) => {
                          const tagConfig = orderTags.find(t => t.value === tag);
                          return tagConfig ? (
                            <Badge key={idx} variant="outline">
                              {tagConfig.label}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="justify-start"
                          onClick={() => handleEdit(order)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="justify-start"
                          onClick={() => handleView(order)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="justify-start"
                          onClick={() => handleInvoice(order)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Invoice
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <OrderDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialData={selectedOrder || undefined}
        onSubmit={selectedOrder ? handleUpdateOrder : handleCreateOrder}
      />

      <OrderViewDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        order={selectedOrder!}
        onUpdate={fetchOrders}
        onDelete={() => {
          setViewDialogOpen(false);
          fetchOrders();
        }}
      />

      <OrderInvoiceDialog
        open={invoiceDialogOpen}
        onOpenChange={setInvoiceDialogOpen}
        order={selectedOrder!}
      />
    </div>
  );
} 