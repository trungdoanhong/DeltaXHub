"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeadForm } from './lead-form';
import { type Lead } from '@/lib/firebase/leads';

interface LeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<Lead>;
  onSubmit: (data: any) => Promise<void>;
}

export function LeadDialog({ open, onOpenChange, initialData, onSubmit }: LeadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Lead' : 'Add New Lead'}</DialogTitle>
          <DialogDescription>
            {initialData 
              ? 'Update the lead information below' 
              : 'Enter the lead information below'}
          </DialogDescription>
        </DialogHeader>
        <LeadForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
} 