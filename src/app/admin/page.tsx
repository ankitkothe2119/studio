
'use server';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSign, Users, Handshake, Mail } from 'lucide-react';
import { Donor, Volunteer, Partner, Contact } from '@/server/db/models';
import connectToDatabase from '@/server/db/mongodb';

async function getStats() {
    await connectToDatabase();
    const [donorCount, volunteerCount, partnerCount, contactCount] = await Promise.all([
        Donor.countDocuments(),
        Volunteer.countDocuments(),
        Partner.countDocuments(),
        Contact.countDocuments()
    ]);
    return { donorCount, volunteerCount, partnerCount, contactCount };
}


export default async function AdminDashboard() {
    const { donorCount, volunteerCount, partnerCount, contactCount } = await getStats();
    
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{donorCount}</div>
                        <p className="text-xs text-muted-foreground">Number of donation records</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Volunteers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{volunteerCount}</div>
                        <p className="text-xs text-muted-foreground">Number of volunteer sign-ups</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Partnerships</CardTitle>
                        <Handshake className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{partnerCount}</div>
                        <p className="text-xs text-muted-foreground">Number of partnership inquiries</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
                        <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{contactCount}</div>
                        <p className="text-xs text-muted-foreground">Number of contact inquiries</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
