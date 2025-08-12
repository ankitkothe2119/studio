
'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { TeamMemberFormDialog } from './TeamMemberFormDialog';
import { DeleteMemberAlert } from './DeleteMemberAlert';


export function TeamMemberTable({ data }: { data: any[] }) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((member) => (
          <TableRow key={member._id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{member.avatar}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{member.name}</span>
              </div>
            </TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell>
                <Badge variant={member.category === 'Founder' ? 'default' : 'secondary'}>
                    {member.category}
                </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                 <TeamMemberFormDialog 
                    member={JSON.parse(JSON.stringify(member))}
                    trigger={<Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>}
                />
                <DeleteMemberAlert
                    memberId={member._id}
                    trigger={<Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
