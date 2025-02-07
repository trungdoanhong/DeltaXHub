"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Order } from '@/lib/firebase/orders';
import { OrderDetails } from './order-details';

interface OrderViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
  onUpdate: () => void;
  onDelete: () => void;
}

export function OrderViewDialog({
  open,
  onOpenChange,
  order,
  onUpdate,
  onDelete
}: OrderViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <OrderDetails
          order={order}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </DialogContent>
    </Dialog>
  );
} 