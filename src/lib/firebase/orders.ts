import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';

export interface OrderItem {
  name: string;
  quantity: number;
  weight: number;
  dimensions: string;
  price: number;
  discount: number;
}

export interface Order {
  id: string;
  orderDate: Timestamp;
  shippingDate: Timestamp | null;
  deliveryDate: Timestamp | null;
  status: string;
  exportType: string;
  customerOrigin: string;
  paymentAccount: string;
  invoice: string;
  customerName: string;
  companyName: string;
  phone: string;
  email: string;
  items: OrderItem[];
  totalAmount: number;
  paidAmount: number;
  transferFee: number;
  shippingPaid: number;
  shippingActual: number;
  shippingCarrier: string;
  shippingDebtStatus: string;
  paymentStatus: string;
  trackingNumber: string;
  recipient: string;
  address: string;
  notes: string;
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  companyId: string;
}

export async function createOrder(data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function updateOrder(id: string, data: Partial<Order>) {
  try {
    const orderRef = doc(db, 'orders', id);
    await updateDoc(orderRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}

export async function deleteOrder(id: string) {
  try {
    await deleteDoc(doc(db, 'orders', id));
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}

export async function getOrders(companyId: string) {
  try {
    console.log('Fetching orders for companyId:', companyId);
    const q = query(
      collection(db, 'orders'),
      where('companyId', '==', companyId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    console.log('Found orders:', querySnapshot.size);
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
    console.log('Processed orders:', orders);
    return orders;
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
}

export async function getOrder(id: string) {
  try {
    const docRef = doc(db, 'orders', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Order;
    }
    return null;
  } catch (error) {
    console.error('Error getting order:', error);
    throw error;
  }
} 