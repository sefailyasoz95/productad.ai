
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserRound, 
  CreditCard, 
  Bell, 
  Lock, 
  Key, 
  Save,
  AlertCircle,
  Trash2,
  FileText,
  Building
} from "lucide-react";
import DashboardLayout from '@/components/DashboardLayout';

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="apikeys">API Keys</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserRound className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your account information and profile settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@example.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input id="company" defaultValue="Acme Corp" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="marketing-emails" defaultChecked={true} />
                  <Label htmlFor="marketing-emails">Receive marketing emails and updates</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>
                  These actions are irreversible. Please proceed with caution.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border border-destructive/20 rounded-md p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="font-medium">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all your data
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Current Plan
                </CardTitle>
                <CardDescription>
                  Manage your subscription and billing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Pro Plan</h3>
                      <p className="text-sm text-muted-foreground">$24.99 / month</p>
                    </div>
                    <Badge className="bg-brand-purple/10 text-brand-purple border-brand-purple/20">
                      Active
                    </Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Next billing date</p>
                      <p className="font-medium">May 15, 2025</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Images remaining</p>
                      <p className="font-medium">7 of 10</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Videos remaining</p>
                      <p className="font-medium">8 of 10</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Voices remaining</p>
                      <p className="font-medium">10 of 10</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Available Plans</Label>
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <Card className="border-brand-purple/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Plus</CardTitle>
                        <CardDescription>
                          <span className="text-2xl font-bold">$14.99</span> / month
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            5 AI images per month
                          </li>
                          <li className="flex items-center text-muted-foreground">
                            <X className="h-4 w-4 mr-2" />
                            No videos
                          </li>
                          <li className="flex items-center text-muted-foreground">
                            <X className="h-4 w-4 mr-2" />
                            No voiceovers
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            Basic support
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">Downgrade</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border-brand-purple bg-brand-purple/5">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">Pro</CardTitle>
                          <Badge>Current</Badge>
                        </div>
                        <CardDescription>
                          <span className="text-2xl font-bold">$24.99</span> / month
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            10 AI images per month
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            10 AI videos per month
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            10 AI voiceovers
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            Priority support
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button disabled className="w-full">Current Plan</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border-brand-purple/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Pro Max</CardTitle>
                        <CardDescription>
                          <span className="text-2xl font-bold">$34.99</span> / month
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            20 AI images per month
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            20 AI videos per month
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            20 AI voiceovers
                          </li>
                          <li className="flex items-center">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            24/7 premium support
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-brand-purple to-brand-blue">Upgrade</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Methods
                </CardTitle>
                <CardDescription>
                  Manage your payment methods and billing details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted rounded-md p-2">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/25</p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>
                
                <Button variant="outline" className="w-full">
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Billing History
                </CardTitle>
                <CardDescription>
                  View your past invoices and billing history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 p-4 font-medium border-b">
                    <div>Date</div>
                    <div>Description</div>
                    <div>Amount</div>
                    <div>Status</div>
                  </div>
                  <div className="grid grid-cols-4 p-4 border-b">
                    <div>Apr 1, 2025</div>
                    <div>Pro Plan Subscription</div>
                    <div>$24.99</div>
                    <div><Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Paid</Badge></div>
                  </div>
                  <div className="grid grid-cols-4 p-4 border-b">
                    <div>Mar 1, 2025</div>
                    <div>Pro Plan Subscription</div>
                    <div>$24.99</div>
                    <div><Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Paid</Badge></div>
                  </div>
                  <div className="grid grid-cols-4 p-4">
                    <div>Feb 1, 2025</div>
                    <div>Pro Plan Subscription</div>
                    <div>$24.99</div>
                    <div><Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Paid</Badge></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-marketing">Marketing and updates</Label>
                      <Switch id="email-marketing" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-usage">Usage reports</Label>
                      <Switch id="email-usage" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-billing">Billing and receipts</Label>
                      <Switch id="email-billing" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-security">Security alerts</Label>
                      <Switch id="email-security" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">In-App Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="app-completion">Content generation completion</Label>
                      <Switch id="app-completion" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="app-updates">New features and updates</Label>
                      <Switch id="app-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="app-tips">Tips and recommendations</Label>
                      <Switch id="app-tips" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="apikeys" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Keys
                </CardTitle>
                <CardDescription>
                  Manage your API keys for integrating with the Genfluence API
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">Your API Key</Label>
                  <div className="flex">
                    <Input id="api-key" readOnly value="•••••••••••••••••••••••••••••••••••" className="rounded-r-none" />
                    <Button variant="secondary" className="rounded-l-none">
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Keep this key secret! Do not share it or expose it in client-side code.
                  </p>
                </div>
                
                <div className="pt-4 border-t space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Regenerate API Key</h3>
                      <p className="text-sm text-muted-foreground">
                        Generate a new API key. The old key will become invalid.
                      </p>
                    </div>
                    <Button variant="outline">
                      Regenerate Key
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  API Usage & Permissions
                </CardTitle>
                <CardDescription>
                  Configure API rate limits and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Rate Limits</Label>
                  <div className="border rounded-md p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Image Generation</p>
                        <p className="font-medium">100 requests / day</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Video Generation</p>
                        <p className="font-medium">20 requests / day</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Voice Generation</p>
                        <p className="font-medium">50 requests / day</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Other Endpoints</p>
                        <p className="font-medium">500 requests / day</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>API Permissions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="perm-read">Read Access</Label>
                      <Switch id="perm-read" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="perm-write">Write Access</Label>
                      <Switch id="perm-write" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="perm-delete">Delete Access</Label>
                      <Switch id="perm-delete" defaultChecked={false} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save API Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="organization" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Organization Settings
                </CardTitle>
                <CardDescription>
                  Manage your organization's profile and team members
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue="Acme Corporation" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="org-address">Business Address</Label>
                  <Input id="org-address" defaultValue="123 Main St, City, Country" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="org-tax">Tax ID / VAT Number (Optional)</Label>
                  <Input id="org-tax" defaultValue="US123456789" />
                </div>
                
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <Label>Team Members</Label>
                    <Button variant="outline" size="sm">Invite Member</Button>
                  </div>
                  
                  <div className="border rounded-md divide-y">
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-brand-purple/20 flex items-center justify-center">
                          <span className="text-sm font-medium">JD</span>
                        </div>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">john@example.com</p>
                        </div>
                      </div>
                      <Badge>Admin</Badge>
                    </div>
                    
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-brand-blue/20 flex items-center justify-center">
                          <span className="text-sm font-medium">JS</span>
                        </div>
                        <div>
                          <p className="font-medium">Jane Smith</p>
                          <p className="text-sm text-muted-foreground">jane@example.com</p>
                        </div>
                      </div>
                      <Badge variant="outline">Member</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Organization</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
