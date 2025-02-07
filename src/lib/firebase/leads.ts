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
  Timestamp,
  DocumentData
} from 'firebase/firestore';

export interface Lead {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  location: string;
  status: 'hot' | 'warm' | 'cold' | 'lost';
  source: string;
  value: number;
  lastContact: Timestamp;
  nextFollowUp: Timestamp;
  tags: string[];
  notes: string;
  assignedTo: string;
  stage: string;
  probability: number;
  activities: {
    type: 'email' | 'call' | 'meeting' | 'note';
    date: Timestamp;
    description: string;
    createdBy: string;
  }[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  companyId: string;
}

export async function createLead(data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await addDoc(collection(db, 'leads'), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
}

export async function updateLead(id: string, data: Partial<Lead>) {
  try {
    const leadRef = doc(db, 'leads', id);
    await updateDoc(leadRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
}

export async function deleteLead(id: string) {
  try {
    await deleteDoc(doc(db, 'leads', id));
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
}

export async function getLeads(companyId: string) {
  try {
    console.log('Fetching leads for companyId:', companyId);
    const q = query(
      collection(db, 'leads'),
      where('companyId', '==', companyId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    console.log('Found leads:', querySnapshot.size);
    const leads = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Lead[];
    console.log('Processed leads:', leads);
    return leads;
  } catch (error) {
    console.error('Error getting leads:', error);
    throw error;
  }
}

export async function addActivity(leadId: string, activity: Lead['activities'][0]) {
  try {
    const leadRef = doc(db, 'leads', leadId);
    await updateDoc(leadRef, {
      activities: [...(await getLeadActivities(leadId)), activity],
      lastContact: activity.date,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error adding activity:', error);
    throw error;
  }
}

export async function getLeadActivities(leadId: string) {
  try {
    const leadRef = doc(db, 'leads', leadId);
    const leadSnap = await getDoc(leadRef);
    return leadSnap.data()?.activities || [];
  } catch (error) {
    console.error('Error getting lead activities:', error);
    throw error;
  }
}

export async function updateLeadStage(leadId: string, stage: string, probability: number) {
  try {
    const leadRef = doc(db, 'leads', leadId);
    await updateDoc(leadRef, {
      stage,
      probability,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating lead stage:', error);
    throw error;
  }
}

export async function assignLead(leadId: string, userId: string) {
  try {
    const leadRef = doc(db, 'leads', leadId);
    await updateDoc(leadRef, {
      assignedTo: userId,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error assigning lead:', error);
    throw error;
  }
}

export async function addTags(leadId: string, tags: string[]) {
  try {
    const leadRef = doc(db, 'leads', leadId);
    const leadSnap = await getDoc(leadRef);
    const currentTags = leadSnap.data()?.tags || [];
    const uniqueTags = [...new Set([...currentTags, ...tags])];
    
    await updateDoc(leadRef, {
      tags: uniqueTags,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error adding tags:', error);
    throw error;
  }
}

export async function removeTags(leadId: string, tags: string[]) {
  try {
    const leadRef = doc(db, 'leads', leadId);
    const leadSnap = await getDoc(leadRef);
    const currentTags = leadSnap.data()?.tags || [];
    const updatedTags = currentTags.filter((tag: string) => !tags.includes(tag));
    
    await updateDoc(leadRef, {
      tags: updatedTags,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error removing tags:', error);
    throw error;
  }
}

export async function getLeadStats(companyId: string) {
  try {
    const leads = await getLeads(companyId);
    
    const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
    const wonLeads = leads.filter(lead => lead.stage === 'Closed Won');
    const winRate = (wonLeads.length / leads.length) * 100;
    const avgDealSize = totalValue / leads.length;
    const activeLeads = leads.filter(lead => !['Closed Won', 'Closed Lost'].includes(lead.stage));

    return {
      totalPipeline: totalValue,
      winRate,
      avgDealSize,
      activeLeadsCount: activeLeads.length,
      totalLeadsCount: leads.length,
      stageDistribution: getStageDistribution(leads),
      sourceDistribution: getSourceDistribution(leads),
      monthlyTrends: getMonthlyTrends(leads)
    };
  } catch (error) {
    console.error('Error getting lead stats:', error);
    throw error;
  }
}

function getStageDistribution(leads: Lead[]) {
  const distribution: Record<string, number> = {};
  leads.forEach(lead => {
    distribution[lead.stage] = (distribution[lead.stage] || 0) + 1;
  });
  return distribution;
}

function getSourceDistribution(leads: Lead[]) {
  const distribution: Record<string, number> = {};
  leads.forEach(lead => {
    distribution[lead.source] = (distribution[lead.source] || 0) + 1;
  });
  return distribution;
}

function getMonthlyTrends(leads: Lead[]) {
  const trends: Record<string, { count: number; value: number }> = {};
  
  leads.forEach(lead => {
    const month = lead.createdAt.toDate().toISOString().slice(0, 7);
    if (!trends[month]) {
      trends[month] = { count: 0, value: 0 };
    }
    trends[month].count++;
    trends[month].value += lead.value;
  });
  
  return trends;
} 