"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Search,
  Filter,
  Plus,
  Upload,
  Download,
  File,
  Image,
  FileType,
  FileText as FilePdf,
  CheckCircle2 as FileCheck,
  Clock,
  MoreVertical,
  Folder,
  Users,
  Star,
  Share2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const documents = [
  {
    id: "DOC-001",
    name: "Sales Proposal - Tech Solutions",
    type: "pdf",
    size: "2.4 MB",
    modified: "2024-03-20",
    author: "John Smith",
    shared: true,
    status: "final"
  },
  {
    id: "DOC-002",
    name: "Q1 Sales Report",
    type: "spreadsheet",
    size: "1.8 MB",
    modified: "2024-03-19",
    author: "Sarah Johnson",
    shared: true,
    status: "draft"
  },
  {
    id: "DOC-003",
    name: "Product Catalog 2024",
    type: "pdf",
    size: "5.2 MB",
    modified: "2024-03-18",
    author: "Mike Wilson",
    shared: false,
    status: "final"
  },
  {
    id: "DOC-004",
    name: "Client Meeting Notes",
    type: "document",
    size: "256 KB",
    modified: "2024-03-17",
    author: "John Smith",
    shared: true,
    status: "draft"
  }
];

const folders = [
  {
    name: "Sales Proposals",
    files: 24,
    size: "128 MB",
    modified: "2024-03-20"
  },
  {
    name: "Reports",
    files: 15,
    size: "64 MB",
    modified: "2024-03-19"
  },
  {
    name: "Templates",
    files: 8,
    size: "32 MB",
    modified: "2024-03-18"
  }
];

const documentStats = [
  {
    title: "Total Documents",
    value: "156",
    description: "All files",
    icon: FileText,
    color: "blue"
  },
  {
    title: "Shared Files",
    value: "32",
    description: "Accessible by team",
    icon: Share2,
    color: "green"
  },
  {
    title: "Storage Used",
    value: "2.4 GB",
    description: "Of 10 GB total",
    icon: Folder,
    color: "purple"
  }
];

export default function DocumentsPage() {
  const { user, isAdmin, getUserRoles } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

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
    };

    checkAccess();
  }, [user, isAdmin, getUserRoles, router]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FilePdf className="w-4 h-4 text-red-500" />;
      case 'spreadsheet':
        return <FileType className="w-4 h-4 text-green-500" />;
      case 'image':
        return <Image className="w-4 h-4 text-blue-500" />;
      default:
        return <File className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'final':
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <FileCheck className="w-3 h-3 mr-1" />
            Final
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Draft
          </Badge>
        );
      default:
        return null;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesType;
  });

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

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
          <p className="text-muted-foreground">
            Manage and organize your files
          </p>
        </div>
        <div className="flex gap-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Document
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documentStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 text-${stat.color}-500`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Folders</CardTitle>
              <Folder className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {folders.map((folder, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{folder.name}</h3>
                    <span className="text-sm text-muted-foreground">
                      {folder.files} files
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{folder.size}</span>
                    <span>Modified {folder.modified}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Documents</CardTitle>
                <CardDescription>Your files and shared documents</CardDescription>
              </div>
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={typeFilter}
                onValueChange={setTypeFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="spreadsheet">Spreadsheet</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      {getFileIcon(doc.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{doc.name}</h3>
                        {getStatusBadge(doc.status)}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{doc.size}</span>
                        <span>Modified {doc.modified}</span>
                        <span>By {doc.author}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {doc.shared && (
                      <Badge variant="secondary">
                        <Users className="w-3 h-3 mr-1" />
                        Shared
                      </Badge>
                    )}
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 