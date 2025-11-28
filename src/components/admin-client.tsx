"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  CreditCard,
  TrendingUp,
  Sparkles,
  Shield,
  Settings,
  Database,
  Activity
} from "lucide-react";

interface AdminClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    platformRole: "admin" | "user";
  };
}

export function AdminClient({ user }: AdminClientProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl lg:text-4xl font-bold">
            Admin Dashboard
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Welcome back, {user.name}. You have admin access to the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Platform Statistics */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Platform Statistics
                </CardTitle>
                <Badge variant="secondary" className="text-sm">
                  Live Data
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">Total Users</span>
                  </div>
                  <p className="text-2xl font-bold">--</p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-muted-foreground">Generations</span>
                  </div>
                  <p className="text-2xl font-bold">--</p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Total Credits</span>
                  </div>
                  <p className="text-2xl font-bold">--</p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-muted-foreground">Active Today</span>
                  </div>
                  <p className="text-2xl font-bold">--</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Admin Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" size="lg" className="h-20 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <span>Manage Users</span>
                </Button>

                <Button variant="outline" size="lg" className="h-20 flex-col gap-2">
                  <Database className="h-6 w-6" />
                  <span>Database Tools</span>
                </Button>

                <Button variant="outline" size="lg" className="h-20 flex-col gap-2">
                  <Settings className="h-6 w-6" />
                  <span>System Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Admin Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Admin Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No recent activity</h3>
                <p className="mb-4">Admin activity will appear here.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Admin Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Admin Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-1">Role</p>
                <Badge variant="default" className="bg-primary">
                  Platform Admin
                </Badge>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-1">Account</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-1">User ID</p>
                <p className="text-xs text-muted-foreground font-mono">{user.id}</p>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                    Healthy
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">API</span>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                    Operational
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage</span>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                    Available
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warning Card */}
          <Card className="bg-gradient-to-br from-orange-500/5 to-red-500/5 border-orange-200 dark:border-orange-900">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-500" />
                Admin Notice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You have elevated privileges. Please use admin features responsibly and follow security best practices.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
