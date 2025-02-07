"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Building2,
  Phone,
  Mail,
  MapPin,
  Package,
  Truck,
  CreditCard,
  FileText,
  Tag,
  Edit,
  Trash2,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  XCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Order } from '@/lib/firebase/orders';
import { useState } from 'react';
import { OrderDialog } from './order-dialog';
import { 
  orderStatuses, 
  exportTypes, 
  paymentStatuses, 
  shippingStatuses,
  customerOrigins,
  paymentAccounts,
  invoiceStatuses,
  orderTags
} from '@/lib/constants';

interface OrderDetailsProps {
  order: Order;
  onUpdate: () => void;
  onDelete: () => void;
}

export function OrderDetails({ order, onUpdate, onDelete }: OrderDetailsProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleUpdate = async (data: any) => {
    try {
      await onUpdate();
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = orderStatuses.find(s => s.value === status);
    if (!statusConfig) return null;

    const icons = {
      'pending': AlertCircle,
      'confirmed': CheckCircle2,
      'cancelled': XCircle
    };
    const Icon = icons[status as keyof typeof icons] || CheckCircle2;

    return (
      <Badge className={`bg-${statusConfig.color}-500/10 text-${statusConfig.color}-500`}>
        <Icon className="w-3 h-3 mr-1" />
        {statusConfig.label}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    return timestamp.toDate().toLocaleDateString('vi-VN');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Order Details</h2>
          <p className="text-muted-foreground">Order ID: {order.id}</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setEditDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Order
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Order
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Customer and contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">{order.customerName}</p>
                <p className="text-sm text-muted-foreground">Customer Name</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">{order.companyName}</p>
                <p className="text-sm text-muted-foreground">Company Name</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Phone className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="font-medium">{order.phone}</p>
                <p className="text-sm text-muted-foreground">Phone</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="font-medium">{order.email}</p>
                <p className="text-sm text-muted-foreground">Email</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="font-medium">{order.address}</p>
                <p className="text-sm text-muted-foreground">Shipping Address</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Current order status and details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(order.status)}
                </div>
                <p className="text-sm text-muted-foreground">Order Status</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-yellow-500" />
              </div>
              <div>
                <div className="space-y-1">
                  <p className="text-sm">Order Date: {formatDate(order.orderDate)}</p>
                  <p className="text-sm">Shipping Date: {formatDate(order.shippingDate)}</p>
                  <p className="text-sm">Delivery Date: {formatDate(order.deliveryDate)}</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Important Dates</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <div className="space-y-1">
                  <p className="text-sm">Total Amount: {formatCurrency(order.totalAmount)}</p>
                  <p className="text-sm">Paid Amount: {formatCurrency(order.paidAmount)}</p>
                  <Badge className={order.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}>
                    {paymentStatuses.find(s => s.value === order.paymentStatus)?.label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Payment Details</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Tag className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <div className="flex flex-wrap gap-1">
                  {order.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {orderTags.find(t => t.value === tag)?.label || tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Tags</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>Products in this order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>Quantity: {item.quantity}</span>
                    <span>Weight: {item.weight}kg</span>
                    <span>Dimensions: {item.dimensions}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(item.price)}</p>
                  {item.discount > 0 && (
                    <p className="text-sm text-green-500">-{formatCurrency(item.discount)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
            <CardDescription>Delivery and tracking details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Truck className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">{order.shippingCarrier}</p>
                <p className="text-sm text-muted-foreground">Shipping Carrier</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm">Tracking Number: {order.trackingNumber || 'N/A'}</p>
              <p className="text-sm">Recipient: {order.recipient}</p>
              <p className="text-sm">Shipping Fee: {formatCurrency(order.shippingActual)}</p>
              <p className="text-sm">Paid: {formatCurrency(order.shippingPaid)}</p>
              <Badge className={order.shippingDebtStatus === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}>
                {shippingStatuses.find(s => s.value === order.shippingDebtStatus)?.label}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>Other order details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="font-medium">{paymentAccounts.find(a => a.value === order.paymentAccount)?.label}</p>
                <p className="text-sm text-muted-foreground">Payment Account</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="font-medium">{invoiceStatuses.find(i => i.value === order.invoice)?.label}</p>
                <p className="text-sm text-muted-foreground">Invoice Status</p>
              </div>
            </div>

            {order.notes && (
              <div className="mt-4">
                <p className="font-medium mb-2">Notes:</p>
                <p className="text-sm whitespace-pre-wrap">{order.notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <OrderDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        initialData={order}
        onSubmit={handleUpdate}
      />
    </div>
  );
} 