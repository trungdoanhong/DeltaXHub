export const stages = [
  { name: "Initial Contact", color: "blue" },
  { name: "Qualification", color: "purple" },
  { name: "Needs Analysis", color: "orange" },
  { name: "Proposal", color: "yellow" },
  { name: "Negotiation", color: "green" },
  { name: "Closed Won", color: "emerald" },
  { name: "Closed Lost", color: "red" }
] as const;

export const sources = [
  "Website",
  "Trade Show",
  "Referral",
  "Cold Call",
  "Social Media",
  "Email Campaign",
  "Partner",
  "Other"
] as const;

export const leadStatuses = [
  { value: "hot", label: "Hot", color: "red" },
  { value: "warm", label: "Warm", color: "yellow" },
  { value: "cold", label: "Cold", color: "blue" },
  { value: "lost", label: "Lost", color: "gray" }
] as const;

export const activityTypes = [
  { value: "email", label: "Email", icon: "Mail" },
  { value: "call", label: "Call", icon: "Phone" },
  { value: "meeting", label: "Meeting", icon: "Users" },
  { value: "note", label: "Note", icon: "FileText" }
] as const;

export const defaultTags = [
  "Enterprise",
  "SMB",
  "Manufacturing",
  "Technology",
  "Healthcare",
  "Retail",
  "High Priority",
  "New Lead",
  "Returning Customer"
] as const;

export const orderStatuses = [
  { value: 'pending', label: 'Chờ xử lý', color: 'yellow' },
  { value: 'confirmed', label: 'Đã xác nhận', color: 'blue' },
  { value: 'shipping', label: 'Đang vận chuyển', color: 'purple' },
  { value: 'delivered', label: 'Đã giao hàng', color: 'green' },
  { value: 'cancelled', label: 'Đã hủy', color: 'red' }
] as const;

export const exportTypes = [
  { value: 'trade', label: 'Mậu dịch' },
  { value: 'non_trade', label: 'Phi mậu dịch' },
  { value: 'dedicated', label: 'Chuyên tuyến' }
] as const;

export const paymentStatuses = [
  { value: 'unpaid', label: 'Chưa thanh toán', color: 'red' },
  { value: 'partial', label: 'Thanh toán một phần', color: 'yellow' },
  { value: 'paid', label: 'Đã thanh toán', color: 'green' }
] as const;

export const shippingStatuses = [
  { value: 'unpaid', label: 'Chưa thanh toán', color: 'red' },
  { value: 'partial', label: 'Thanh toán một phần', color: 'yellow' },
  { value: 'paid', label: 'Đã thanh toán', color: 'green' }
] as const;

export const customerOrigins = [
  { value: 'shopify', label: 'Shopify' },
  { value: 'website', label: 'Website' },
  { value: 'facebook', label: 'Fangpage' },
  { value: 'gmail', label: 'Gmail' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'linkedin', label: 'Linkedin' }
] as const;

export const paymentAccounts = [
  { value: 'stripe', label: 'Stripe' },
  { value: 'paypal', label: 'Paypal' },
  { value: 'bank', label: 'Company Bank' }
] as const;

export const invoiceStatuses = [
  { value: 'issued', label: 'Đã xuất' },
  { value: 'not_issued', label: 'Chưa xuất' },
  { value: 'no_invoice', label: 'Không xuất' }
] as const;

export const orderTags = [
  { value: 'in_stock', label: 'Có sẵn trong kho' },
  { value: 'pre_order', label: 'Pre-order' },
  { value: 'campaign', label: 'Chiến dịch quảng cáo' },
  { value: 'wholesale', label: 'Bán sỉ' },
  { value: 'retail', label: 'Bán lẻ' },
  { value: 'promotion', label: 'Khuyến mãi' },
  { value: 'vip', label: 'Khách VIP' },
  { value: 'urgent', label: 'Gấp' }
] as const; 