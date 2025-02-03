'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Shield, User, UserCog } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const availableRoles = ['Admin', 'Mod', 'Staff', 'Customer', 'User', 'R&D', 'Sales', 'Production'] as const;
type Role = typeof availableRoles[number];

interface UserData {
  id: string;
  email: string;
  name: string;
  roles: Role[];
  photoURL?: string;
  createdAt: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { user: currentUser, isAdmin, updateUserRoles } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      const hasAccess = await isAdmin();
      if (!hasAccess) {
        router.push('/dashboard');
      }
    };
    checkAccess();
  }, [isAdmin, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const snapshot = await getDocs(usersCollection);
        const userData: UserData[] = [];
        
        snapshot.forEach((doc) => {
          const data = doc.data() as Omit<UserData, 'id'>;
          userData.push({
            id: doc.id,
            ...data,
            roles: data.roles || ['User'],
          });
        });

        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, role: Role) => {
    try {
      setUpdating(userId);
      const user = users.find(u => u.id === userId);
      if (!user) return;

      let newRoles = [...user.roles];
      if (newRoles.includes(role)) {
        // Remove role if it already exists
        newRoles = newRoles.filter(r => r !== role);
        // Ensure user always has at least one role
        if (newRoles.length === 0) newRoles = ['User'];
      } else {
        // Add new role
        newRoles.push(role);
      }

      await updateUserRoles(userId, newRoles);

      // Update local state
      setUsers(users.map(u => 
        u.id === userId ? { ...u, roles: newRoles } : u
      ));
    } catch (error) {
      console.error('Error updating user roles:', error);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">
          Manage user roles and permissions
        </p>
      </div>

      <div className="grid gap-6">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name || 'User'}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div>
                    <CardTitle>{user.name || 'Unnamed User'}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </div>
                {user.roles.includes('Admin') && (
                  <Shield className="h-5 w-5 text-primary" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Current Roles</div>
                  <div className="flex flex-wrap gap-2">
                    {user.roles.map((role) => (
                      <Badge
                        key={role}
                        variant={role === 'Admin' ? 'default' : 'secondary'}
                        className="cursor-pointer"
                        onClick={() => handleRoleChange(user.id, role)}
                      >
                        {role}
                        {updating === user.id ? '...' : ' ×'}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Add Role</div>
                  <Select
                    onValueChange={(value: Role) => handleRoleChange(user.id, value)}
                    disabled={updating === user.id}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoles
                        .filter(role => !user.roles.includes(role))
                        .map(role => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-xs text-muted-foreground">
                  Created: {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 