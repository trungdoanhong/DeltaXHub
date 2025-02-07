"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Building,
  DollarSign,
  Briefcase,
  Calendar,
  Edit,
  Trash2,
  Star,
  Tag,
  Link as LinkIcon
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Lead } from '@/lib/firebase/leads';
import { LeadDialog } from './lead-dialog';
import { LeadActivities } from './lead-activities';

interface LeadDetailsProps {
  lead: Lead;
  onUpdate: () => void;
  onDelete: () => void;
}

export function LeadDetails({ lead, onUpdate, onDelete }: LeadDetailsProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleUpdate = async (data: any) => {
    try {
      // Update lead logic here
      onUpdate();
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating lead:', error);
      // Handle error (show toast, etc.)
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{lead.name}</h2>
          <p className="text-muted-foreground">{lead.id}</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setEditDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Lead
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Lead
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Lead contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Building className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">{lead.contact}</p>
                <p className="text-sm text-muted-foreground">Contact Person</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">{lead.email}</p>
                <p className="text-sm text-muted-foreground">Email</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Phone className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="font-medium">{lead.phone}</p>
                <p className="text-sm text-muted-foreground">Phone</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="font-medium">{lead.location}</p>
                <p className="text-sm text-muted-foreground">Location</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deal Information</CardTitle>
            <CardDescription>Lead status and details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge>{lead.status}</Badge>
                  <Badge variant="outline">{lead.stage}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Status & Stage</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="font-medium">{lead.value}</p>
                <p className="text-sm text-muted-foreground">Deal Value</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <LinkIcon className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="font-medium">{lead.source}</p>
                <p className="text-sm text-muted-foreground">Lead Source</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Tag className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <div className="flex flex-wrap gap-1">
                  {lead.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">Tags</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
          <CardDescription>Additional information</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-wrap">{lead.notes}</p>
        </CardContent>
      </Card>

      <LeadActivities
        leadId={lead.id}
        activities={lead.activities}
        onActivityAdded={onUpdate}
      />

      <LeadDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        initialData={lead}
        onSubmit={handleUpdate}
      />
    </div>
  );
} 