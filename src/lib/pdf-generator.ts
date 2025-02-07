import { type Order } from './firebase/orders';
import { TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';

interface PdfMakeStatic {
  vfs: { [file: string]: string };
  fonts: TFontDictionary;
  createPdf: (documentDefinition: TDocumentDefinitions) => any;
}

let pdfMakeInstance: PdfMakeStatic | null = null;

async function initPdfMake(): Promise<PdfMakeStatic | null> {
  if (typeof window === 'undefined') return null;
  
  if (!pdfMakeInstance) {
    try {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      pdfMakeInstance = pdfMakeModule.default;
      
      // Define fonts
      const fonts: TFontDictionary = {
        Roboto: {
          normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf',
          bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf',
          italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Italic.ttf',
          bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-MediumItalic.ttf'
        }
      };

      // Set virtual file system and fonts
      pdfMakeInstance.vfs = pdfFontsModule.default;
      pdfMakeInstance.fonts = fonts;
    } catch (error) {
      console.error('Failed to initialize pdfMake:', error);
      return null;
    }
  }
  
  return pdfMakeInstance;
}

export async function generateOrderPdf(order: Order) {
  const pdfMake = await initPdfMake();
  if (!pdfMake) {
    console.error('Failed to initialize pdfMake');
    return null;
  }

  const docDefinition: TDocumentDefinitions = {
    content: [
      // Header
      {
        columns: [
          {
            width: '*',
            stack: [
              { text: 'HÓA ĐƠN BÁN HÀNG', style: 'header' },
              { text: `Số: ${order.id}`, style: 'subheader' },
              { text: `Ngày: ${formatDate(order.orderDate)}`, style: 'subheader' }
            ]
          },
          {
            width: 'auto',
            stack: [
              { text: 'CÔNG TY DELTAX', style: 'companyHeader' },
              { text: '123 Đường ABC, Quận XYZ', style: 'companyInfo' },
              { text: 'TP. Hồ Chí Minh, Việt Nam', style: 'companyInfo' },
              { text: 'Tel: (84) 123-456-789', style: 'companyInfo' }
            ],
            alignment: 'right'
          }
        ]
      },
      { text: '', margin: [0, 20] },

      // Customer Info
      {
        columns: [
          {
            width: '*',
            stack: [
              { text: 'Thông tin khách hàng:', style: 'sectionHeader' },
              { text: `Tên công ty: ${order.companyName}`, style: 'info' },
              { text: `Người đại diện: ${order.customerName}`, style: 'info' },
              { text: `Địa chỉ: ${order.address}`, style: 'info' },
              { text: `Điện thoại: ${order.phone}`, style: 'info' },
              { text: `Email: ${order.email}`, style: 'info' }
            ]
          },
          {
            width: '*',
            stack: [
              { text: 'Thông tin vận chuyển:', style: 'sectionHeader' },
              { text: `Người nhận: ${order.recipient}`, style: 'info' },
              { text: `Đơn vị vận chuyển: ${order.shippingCarrier}`, style: 'info' },
              { text: `Mã vận đơn: ${order.trackingNumber || 'N/A'}`, style: 'info' },
              { text: `Ngày giao: ${formatDate(order.deliveryDate)}`, style: 'info' }
            ]
          }
        ]
      },
      { text: '', margin: [0, 20] },

      // Items Table
      {
        table: {
          headerRows: 1,
          widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'STT', style: 'tableHeader' },
              { text: 'Sản phẩm', style: 'tableHeader' },
              { text: 'Số lượng', style: 'tableHeader', alignment: 'right' },
              { text: 'Đơn giá', style: 'tableHeader', alignment: 'right' },
              { text: 'Giảm giá', style: 'tableHeader', alignment: 'right' },
              { text: 'Thành tiền', style: 'tableHeader', alignment: 'right' }
            ],
            ...order.items.map((item, index) => [
              { text: (index + 1).toString(), style: 'tableCell' },
              {
                stack: [
                  { text: item.name, style: 'tableCell' },
                  { text: `KT: ${item.dimensions} | KL: ${item.weight}kg`, style: 'tableCellSmall' }
                ]
              },
              { text: item.quantity.toString(), style: 'tableCell', alignment: 'right' },
              { text: formatCurrency(item.price), style: 'tableCell', alignment: 'right' },
              { text: formatCurrency(item.discount), style: 'tableCell', alignment: 'right' },
              { text: formatCurrency((item.price - item.discount) * item.quantity), style: 'tableCell', alignment: 'right' }
            ])
          ]
        }
      },
      { text: '', margin: [0, 20] },

      // Summary
      {
        stack: [
          {
            columns: [
              { width: '*', text: '' },
              {
                width: 'auto',
                table: {
                  widths: ['auto', 'auto'],
                  body: [
                    [
                      { text: 'Tổng tiền hàng:', style: 'summaryLabel' },
                      { text: formatCurrency(order.totalAmount), style: 'summaryValue', alignment: 'right' }
                    ],
                    [
                      { text: 'Phí vận chuyển:', style: 'summaryLabel' },
                      { text: formatCurrency(order.shippingActual), style: 'summaryValue', alignment: 'right' }
                    ],
                    [
                      { text: 'Đã thanh toán:', style: 'summaryLabel' },
                      { text: formatCurrency(order.paidAmount), style: 'summaryValue', alignment: 'right' }
                    ],
                    [
                      { text: 'Còn lại:', style: 'summaryTotal' },
                      { text: formatCurrency(order.totalAmount + order.shippingActual - order.paidAmount), style: 'summaryTotal', alignment: 'right' }
                    ]
                  ]
                },
                layout: 'noBorders'
              }
            ]
          }
        ]
      },

      // Notes
      order.notes ? [
        { text: '', margin: [0, 20] },
        { text: 'Ghi chú:', style: 'sectionHeader' },
        { text: order.notes, style: 'notes' }
      ] : [],

      // Footer
      {
        columns: [
          {
            width: '*',
            stack: [
              { text: 'Người mua hàng', style: 'signatureHeader', alignment: 'center' },
              { text: '(Ký, ghi rõ họ tên)', style: 'signatureText', alignment: 'center' }
            ]
          },
          {
            width: '*',
            stack: [
              { text: 'Người bán hàng', style: 'signatureHeader', alignment: 'center' },
              { text: '(Ký, ghi rõ họ tên)', style: 'signatureText', alignment: 'center' }
            ]
          }
        ],
        margin: [0, 40, 0, 0]
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 5]
      },
      subheader: {
        fontSize: 12,
        color: '#666666',
        margin: [0, 0, 0, 3]
      },
      companyHeader: {
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 5]
      },
      companyInfo: {
        fontSize: 10,
        color: '#666666',
        margin: [0, 0, 0, 2]
      },
      sectionHeader: {
        fontSize: 12,
        bold: true,
        margin: [0, 0, 0, 5]
      },
      info: {
        fontSize: 10,
        margin: [0, 0, 0, 3]
      },
      tableHeader: {
        fontSize: 10,
        bold: true,
        margin: [0, 5]
      },
      tableCell: {
        fontSize: 10,
        margin: [0, 5]
      },
      tableCellSmall: {
        fontSize: 8,
        color: '#666666',
        margin: [0, 2]
      },
      summaryLabel: {
        fontSize: 10,
        margin: [0, 3]
      },
      summaryValue: {
        fontSize: 10,
        margin: [20, 3]
      },
      summaryTotal: {
        fontSize: 12,
        bold: true,
        margin: [0, 3]
      },
      notes: {
        fontSize: 10,
        margin: [0, 5]
      },
      signatureHeader: {
        fontSize: 12,
        bold: true,
        margin: [0, 0, 0, 40]
      },
      signatureText: {
        fontSize: 10,
        color: '#666666'
      }
    },
    defaultStyle: {
      font: 'Roboto'
    }
  };

  return pdfMake.createPdf(docDefinition);
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

function formatDate(timestamp: any) {
  if (!timestamp) return 'N/A';
  return timestamp.toDate().toLocaleDateString('vi-VN');
} 