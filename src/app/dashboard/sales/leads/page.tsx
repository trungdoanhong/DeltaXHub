"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Target,
  Search,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Filter,
  FileDown,
  Thermometer,
  Users,
  DollarSign,
  Briefcase,
  MessageSquare,
  Calendar,
  MoreVertical,
  Star,
  Clock,
  XCircle,
  ChevronDown,
  Tags,
  Activity,
  BarChart2,
  FileText,
  Link as LinkIcon,
  Trash2,
  Edit,
  Eye,
  LayoutList,
  Columns as KanbanIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LeadDialog } from '@/components/leads/lead-dialog';
import { LeadDetails } from '@/components/leads/lead-details';
import { createLead, getLeads, updateLead, deleteLead, type Lead } from '@/lib/firebase/leads';
import { stages, leadStatuses } from '@/lib/constants';
import { Timestamp } from 'firebase/firestore';

const leads = [
  {
    id: "LEAD-001",
    name: "Tech Solutions Inc",
    contact: "John Smith",
    email: "john@techsolutions.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
    status: "hot",
    source: "Website",
    value: "$50,000",
    lastContact: "2024-03-20",
    nextFollowUp: "2024-03-25",
    tags: ["Enterprise", "Manufacturing", "High Priority"],
    notes: "Interested in full automation solution",
    assignedTo: "Sarah Johnson",
    stage: "Negotiation",
    probability: 75,
    activities: [
      { type: "email", date: "2024-03-20", description: "Sent proposal" },
      { type: "call", date: "2024-03-18", description: "Discovery call" }
    ]
  },
  {
    id: "LEAD-002",
    name: "Industrial Automation Co",
    contact: "Sarah Johnson",
    email: "sarah@indauto.com",
    phone: "+1 345 678 901",
    location: "Chicago, USA",
    status: "warm",
    source: "Trade Show",
    value: "$75,000",
    lastContact: "2024-03-18",
    nextFollowUp: "2024-03-23",
    tags: ["Mid-Market", "Automation", "New Lead"],
    notes: "Met at Industry Expo 2024",
    assignedTo: "Mike Wilson",
    stage: "Qualification",
    probability: 45,
    activities: [
      { type: "meeting", date: "2024-03-18", description: "Trade show meeting" },
      { type: "email", date: "2024-03-19", description: "Follow-up materials sent" }
    ]
  },
  {
    id: "LEAD-003",
    name: "Manufacturing Plus",
    contact: "Mike Wilson",
    email: "mike@mfgplus.com",
    phone: "+1 456 789 012",
    location: "Houston, USA",
    status: "cold",
    source: "Referral",
    value: "$25,000",
    lastContact: "2024-03-15",
    nextFollowUp: "2024-03-30",
    tags: ["SMB", "Manufacturing"],
    notes: "Referred by existing client",
    assignedTo: "John Smith",
    stage: "Initial Contact",
    probability: 25,
    activities: [
      { type: "call", date: "2024-03-15", description: "Introduction call" }
    ]
  }
];

const sources = [
  "Website",
  "Trade Show",
  "Referral",
  "Cold Call",
  "Social Media",
  "Email Campaign",
  "Partner",
  "Other"
];

const crmStats = [
  {
    title: "Total Pipeline",
    value: "$1.2M",
    trend: "up",
    trendValue: "+15%",
    description: "Active opportunities",
    icon: DollarSign,
    color: "green"
  },
  {
    title: "Win Rate",
    value: "32%",
    trend: "up",
    trendValue: "+5%",
    description: "Last 30 days",
    icon: Target,
    color: "blue"
  },
  {
    title: "Avg. Deal Size",
    value: "$48.5K",
    trend: "up",
    trendValue: "+12%",
    description: "vs. last quarter",
    icon: BarChart2,
    color: "purple"
  },
  {
    title: "Active Leads",
    value: "156",
    trend: "up",
    trendValue: "+23",
    description: "In pipeline",
    icon: Users,
    color: "orange"
  }
];

export default function LeadsPage() {
  const { user, isAdmin, getUserRoles } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [view, setView] = useState<'list' | 'kanban'>('list');

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      const userIsAdmin = await isAdmin();
      const userRoles = await getUserRoles(user.uid);
      const isSales = userRoles.includes('Sales');

      if (!userIsAdmin && !isSales) {
        router.push('/dashboard');
        return;
      }

      setHasAccess(true);
      setLoading(false);
      fetchLeads();
    };

    checkAccess();
  }, [user, isAdmin, getUserRoles, router]);

  const fetchLeads = async () => {
    try {
      if (!user) return;
      const fetchedLeads = await getLeads(user.uid);
      setLeads(fetchedLeads);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const handleCreateLead = async (data: any) => {
    try {
      if (!user) return;
      const leadData = {
        ...data,
        companyId: user.uid,
        createdBy: user.uid,
        activities: [],
        lastContact: Timestamp.now(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      await createLead(leadData);
      fetchLeads();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error creating lead:', error);
    }
  };

  const handleUpdateLead = async (data: any) => {
    try {
      if (!selectedLead) return;
      await updateLead(selectedLead.id, {
        ...data,
        updatedAt: Timestamp.now(),
      });
      fetchLeads();
      setSelectedLead(null);
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const handleDeleteLead = async (id: string) => {
    try {
      await deleteLead(id);
      fetchLeads();
      setSelectedLead(null);
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = leadStatuses.find(s => s.value === status);
    if (!statusConfig) return null;

    return (
      <Badge className={`bg-${statusConfig.color}-500/10 text-${statusConfig.color}-500 hover:bg-${statusConfig.color}-500/20`}>
        <Star className="w-3 h-3 mr-1" />
        {statusConfig.label}
      </Badge>
    );
  };

  const getStageBadge = (stage: string) => {
    const stageConfig = stages.find(s => s.name === stage);
    if (!stageConfig) return null;

    return (
      <Badge variant="outline" className={`text-${stageConfig.color}-500`}>
        {stage}
      </Badge>
    );
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    e.dataTransfer.setData('leadId', lead.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, stage: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    const lead = leads.find(l => l.id === leadId);
    if (lead && lead.stage !== stage) {
      try {
        await updateLead(leadId, { stage });
        fetchLeads();
      } catch (error) {
        console.error('Error updating lead stage:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return null;
  }

  if (selectedLead) {
    return (
      <div className="p-8">
        <LeadDetails
          lead={selectedLead}
          onUpdate={fetchLeads}
          onDelete={() => handleDeleteLead(selectedLead.id)}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
          <p className="text-muted-foreground">
            Manage and track your sales leads
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => setDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lead List</CardTitle>
              <CardDescription>View and manage your leads</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setView('list')}
                className={view === 'list' ? 'bg-primary text-primary-foreground' : ''}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setView('kanban')}
                className={view === 'kanban' ? 'bg-primary text-primary-foreground' : ''}
              >
                <KanbanIcon className="h-4 w-4" />
              </Button>
              <Target className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {leadStatuses.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {view === 'list' ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lead</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {lead.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                            {lead.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                            {lead.phone}
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                            {lead.location}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(lead.status)}</TableCell>
                      <TableCell>{getStageBadge(lead.stage)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1 text-green-500" />
                          {lead.value}
                        </div>
                      </TableCell>
                      <TableCell>{lead.source}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                          {lead.lastContact.toDate().toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedLead(lead)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedLead(lead);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteLead(lead.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="max-w-[1400px] mx-auto">
              <div className="overflow-x-auto">
                <div className="inline-flex gap-4 pb-4" style={{ width: stages.length * 320 + 'px' }}>
                  {stages.map((stage) => (
                    <div
                      key={stage.name}
                      className="w-[300px]"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, stage.name)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-${stage.color}-500`} />
                          <h3 className="font-medium">{stage.name}</h3>
                        </div>
                        <Badge variant="secondary">
                          {filteredLeads.filter(lead => lead.stage === stage.name).length}
                        </Badge>
                      </div>
                      <div className="space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto pr-2">
                        {filteredLeads
                          .filter(lead => lead.stage === stage.name)
                          .map((lead) => (
                            <Card
                              key={lead.id}
                              className="cursor-pointer hover:shadow-md transition-shadow border border-border/50"
                              draggable
                              onDragStart={(e) => handleDragStart(e, lead)}
                              onClick={() => setSelectedLead(lead)}
                            >
                              <CardContent className="p-4">
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium">{lead.name}</h4>
                                    {getStatusBadge(lead.status)}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                      <Mail className="w-4 h-4" />
                                      {lead.email}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                      <DollarSign className="w-4 h-4" />
                                      {lead.value}
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {lead.tags.map((tag, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                      {lead.probability}% probability
                                    </span>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <LeadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreateLead}
      />
    </div>
  );
} 