"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { type Order } from '@/lib/firebase/orders';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { generateOrderPdf } from '@/lib/pdf-generator';

interface OrderInvoiceProps {
  order: Order;
}

export function OrderInvoice({ order }: OrderInvoiceProps) {
  const componentRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleExportPDF = async () => {
    try {
      const pdfDoc = await generateOrderPdf(order);
      if (!pdfDoc) {
        console.error('Failed to generate PDF');
        return;
      }
      pdfDoc.download(`Invoice-${order.id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
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

  if (!isClient) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-4">
        <Button onClick={handleExportPDF}>
          <FileDown className="mr-2 h-4 w-4" />
          Xuất PDF
        </Button>
      </div>

      <div ref={componentRef} className="bg-white p-8" style={{ width: '210mm' }}>
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">HÓA ĐƠN BÁN HÀNG</h1>
            <p className="text-gray-600">Số: {order.id}</p>
            <p className="text-gray-600">Ngày: {formatDate(order.orderDate)}</p>
          </div>
          <div className="text-right">
            <div className="w-32 h-12 relative mb-2">
              <img
                src="/logo.png"
                alt="Company Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <h2 className="font-bold">CÔNG TY DELTAX</h2>
            <p className="text-sm">123 Đường ABC, Quận XYZ</p>
            <p className="text-sm">TP. Hồ Chí Minh, Việt Nam</p>
            <p className="text-sm">Tel: (84) 123-456-789</p>
          </div>
        </div>

        <div className="border-t border-gray-200 my-8" />

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-2">Thông tin khách hàng:</h3>
            <div className="space-y-1">
              <p><span className="font-medium">Tên công ty:</span> {order.companyName}</p>
              <p><span className="font-medium">Người đại diện:</span> {order.customerName}</p>
              <p><span className="font-medium">Địa chỉ:</span> {order.address}</p>
              <p><span className="font-medium">Điện thoại:</span> {order.phone}</p>
              <p><span className="font-medium">Email:</span> {order.email}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Thông tin vận chuyển:</h3>
            <div className="space-y-1">
              <p><span className="font-medium">Người nhận:</span> {order.recipient}</p>
              <p><span className="font-medium">Đơn vị vận chuyển:</span> {order.shippingCarrier}</p>
              <p><span className="font-medium">Mã vận đơn:</span> {order.trackingNumber || 'N/A'}</p>
              <p><span className="font-medium">Ngày giao:</span> {formatDate(order.deliveryDate)}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">STT</th>
              <th className="py-2 text-left">Sản phẩm</th>
              <th className="py-2 text-right">Số lượng</th>
              <th className="py-2 text-right">Đơn giá</th>
              <th className="py-2 text-right">Giảm giá</th>
              <th className="py-2 text-right">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      KT: {item.dimensions} | KL: {item.weight}kg
                    </p>
                  </div>
                </td>
                <td className="py-2 text-right">{item.quantity}</td>
                <td className="py-2 text-right">{formatCurrency(item.price)}</td>
                <td className="py-2 text-right">{formatCurrency(item.discount)}</td>
                <td className="py-2 text-right">
                  {formatCurrency((item.price - item.discount) * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="flex justify-end">
          <div className="w-72 space-y-2">
            <div className="flex justify-between">
              <span>Tổng tiền hàng:</span>
              <span className="font-medium">{formatCurrency(order.totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển:</span>
              <span className="font-medium">{formatCurrency(order.shippingActual)}</span>
            </div>
            <div className="flex justify-between">
              <span>Đã thanh toán:</span>
              <span className="font-medium">{formatCurrency(order.paidAmount)}</span>
            </div>
            <div className="border-t border-gray-200 my-2" />
            <div className="flex justify-between text-lg font-bold">
              <span>Còn lại:</span>
              <span>{formatCurrency(order.totalAmount + order.shippingActual - order.paidAmount)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Ghi chú:</h3>
            <p className="text-sm whitespace-pre-wrap">{order.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 grid grid-cols-2 gap-8 text-center">
          <div>
            <p className="font-medium mb-12">Người mua hàng</p>
            <p className="text-sm text-gray-600">(Ký, ghi rõ họ tên)</p>
          </div>
          <div>
            <p className="font-medium mb-12">Người bán hàng</p>
            <p className="text-sm text-gray-600">(Ký, ghi rõ họ tên)</p>
          </div>
        </div>
      </div>
    </div>
  );
} 