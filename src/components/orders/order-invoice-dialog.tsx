"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Order } from '@/lib/firebase/orders';
import { OrderInvoice } from './order-invoice';

interface OrderInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
}

export function OrderInvoiceDialog({
  open,
  onOpenChange,
  order,
}: OrderInvoiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Hóa đơn bán hàng</DialogTitle>
        </DialogHeader>
        <OrderInvoice order={order} />
      </DialogContent>
    </Dialog>
  );
} 