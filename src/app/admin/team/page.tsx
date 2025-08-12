
'use server';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { getTeamMembers } from '@/server/actions';
import { TeamMemberTable } from '@/components/admin/TeamMemberTable';
import { TeamMemberFormDialog } from '@/components/admin/TeamMemberFormDialog';

export default async function TeamManagementPage() {
    const { allMembers } = await getTeamMembers();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Team Management</h1>
                    <p className="text-muted-foreground">Manage founders and team members.</p>
                </div>
                <TeamMemberFormDialog 
                    trigger={<Button><PlusCircle className="mr-2 h-4 w-4"/> Add Member</Button>}
                />
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle>All Team Members</CardTitle>
                    <CardDescription>View, edit, or delete team members from the database.</CardDescription>
                </CardHeader>
                <CardContent>
                    <TeamMemberTable data={allMembers} />
                </CardContent>
            </Card>
        </div>
    );
}
