"use client";

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Timestamp } from 'firebase/firestore';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type Order, type OrderItem } from '@/lib/firebase/orders';
import { 
  orderStatuses, 
  exportTypes, 
  customerOrigins, 
  paymentAccounts, 
  invoiceStatuses,
  paymentStatuses,
  shippingStatuses,
  orderTags 
} from '@/lib/constants';
import { Plus, Minus, Trash2 } from 'lucide-react';

const orderFormSchema = z.object({
  orderDate: z.date(),
  shippingDate: z.date().nullable(),
  deliveryDate: z.date().nullable(),
  status: z.string(),
  exportType: z.string(),
  customerOrigin: z.string(),
  paymentAccount: z.string(),
  invoice: z.string(),
  customerName: z.string().min(2, 'Customer name must be at least 2 characters'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  phone: z.string().min(6, 'Phone number must be at least 6 characters'),
  email: z.string().email('Invalid email address'),
  items: z.array(z.object({
    name: z.string().min(1, 'Item name is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    weight: z.number().min(0, 'Weight must be non-negative'),
    dimensions: z.string(),
    price: z.number().min(0, 'Price must be non-negative'),
    discount: z.number().min(0, 'Discount must be non-negative')
  })),
  totalAmount: z.number().min(0, 'Total amount must be non-negative'),
  paidAmount: z.number().min(0, 'Paid amount must be non-negative'),
  transferFee: z.number().min(0, 'Transfer fee must be non-negative'),
  shippingPaid: z.number().min(0, 'Shipping paid must be non-negative'),
  shippingActual: z.number().min(0, 'Actual shipping must be non-negative'),
  shippingCarrier: z.string(),
  shippingDebtStatus: z.string(),
  paymentStatus: z.string(),
  trackingNumber: z.string(),
  recipient: z.string().min(2, 'Recipient name must be at least 2 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  notes: z.string(),
  tags: z.array(z.string())
});

type OrderFormData = z.infer<typeof orderFormSchema>;

interface OrderFormProps {
  initialData?: Partial<Order>;
  onSubmit: (data: OrderFormData) => Promise<void>;
  onCancel: () => void;
}

export function OrderForm({ initialData, onSubmit, onCancel }: OrderFormProps) {
  const [loading, setLoading] = useState(false);

  // Transform Timestamp to Date for form initialization
  const transformInitialData = () => {
    if (!initialData) return null;

    return {
      ...initialData,
      orderDate: initialData.orderDate?.toDate() || new Date(),
      shippingDate: initialData.shippingDate?.toDate() || null,
      deliveryDate: initialData.deliveryDate?.toDate() || null,
      items: initialData.items || [{
        name: '',
        quantity: 1,
        weight: 0,
        dimensions: '',
        price: 0,
        discount: 0
      }]
    };
  };

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: transformInitialData() || {
      orderDate: new Date(),
      shippingDate: null,
      deliveryDate: null,
      status: orderStatuses[0].value,
      exportType: exportTypes[0].value,
      customerOrigin: '',
      paymentAccount: '',
      invoice: '',
      customerName: '',
      companyName: '',
      phone: '',
      email: '',
      items: [{
        name: '',
        quantity: 1,
        weight: 0,
        dimensions: '',
        price: 0,
        discount: 0
      }],
      totalAmount: 0,
      paidAmount: 0,
      transferFee: 0,
      shippingPaid: 0,
      shippingActual: 0,
      shippingCarrier: '',
      shippingDebtStatus: 'unpaid',
      paymentStatus: 'unpaid',
      trackingNumber: '',
      recipient: '',
      address: '',
      notes: '',
      tags: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items"
  });

  // Calculate total amount when items change
  useEffect(() => {
    const values = form.getValues();
    const total = values.items.reduce((sum, item) => {
      const itemTotal = (item.price * item.quantity) - item.discount;
      return sum + itemTotal;
    }, 0);
    form.setValue('totalAmount', total);
  }, [form.watch('items')]);

  const handleSubmit = async (data: OrderFormData) => {
    try {
      setLoading(true);
      // Transform dates back to Timestamps for submission
      const formattedData = {
        ...data,
        orderDate: Timestamp.fromDate(data.orderDate),
        shippingDate: data.shippingDate ? Timestamp.fromDate(data.shippingDate) : null,
        deliveryDate: data.deliveryDate ? Timestamp.fromDate(data.deliveryDate) : null
      };
      await onSubmit(formattedData);
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dates */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="orderDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                      onChange={e => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                      onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
                      onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Status and Type */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {orderStatuses.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Export Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select export type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {exportTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Customer Information */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-lg font-semibold">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Items */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Items</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({
                  name: '',
                  quantity: 1,
                  weight: 0,
                  dimensions: '',
                  price: 0,
                  discount: 0
                })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
            
            {fields.map((field, index) => (
              <Card key={field.id} className="mb-4">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name={`items.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Item Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantity</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.weight`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (Kg)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.dimensions`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dimensions</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="L x W x H" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`items.${index}.discount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount ($)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-red-500 hover:text-red-600"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Item
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="customerOrigin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Origin</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select origin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {customerOrigins.map(origin => (
                          <SelectItem key={origin.value} value={origin.value}>
                            {origin.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Account</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {paymentAccounts.map(account => (
                          <SelectItem key={account.value} value={account.value}>
                            {account.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="invoice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {invoiceStatuses.map(status => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Amount ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paidAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paid Amount ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="transferFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transfer Fee ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {paymentStatuses.map(status => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Shipping Information */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="shippingCarrier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Carrier</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shippingPaid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Paid ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shippingActual"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Actual Shipping ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trackingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tracking Number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shippingDebtStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Debt Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {shippingStatuses.map(status => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {orderTags.map(tag => (
                      <div
                        key={tag.value}
                        className={`px-3 py-1.5 rounded-lg cursor-pointer text-sm transition-colors ${
                          field.value?.includes(tag.value)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                        onClick={() => {
                          const newValue = field.value || [];
                          const index = newValue.indexOf(tag.value);
                          if (index === -1) {
                            field.onChange([...newValue, tag.value]);
                          } else {
                            newValue.splice(index, 1);
                            field.onChange(newValue);
                          }
                        }}
                      >
                        {tag.label}
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : initialData ? 'Update Order' : 'Create Order'}
          </Button>
        </div>
      </form>
    </Form>
  );
} 