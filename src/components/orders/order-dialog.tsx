"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderForm } from './order-form';
import { type Order } from '@/lib/firebase/orders';

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<Order>;
  onSubmit: (data: any) => Promise<void>;
}

export function OrderDialog({ open, onOpenChange, initialData, onSubmit }: OrderDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Order' : 'New Order'}</DialogTitle>
          <DialogDescription>
            {initialData 
              ? 'Update the order information below' 
              : 'Enter the order information below'}
          </DialogDescription>
        </DialogHeader>
        <OrderForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
} 