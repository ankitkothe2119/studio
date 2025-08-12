
'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { deleteTeamMember } from '@/server/actions';
import { Button } from '../ui/button';


interface DeleteMemberAlertProps {
    trigger: React.ReactNode;
    memberId: string;
}

export function DeleteMemberAlert({ trigger, memberId }: DeleteMemberAlertProps) {
    const { toast } = useToast();

    const handleDelete = async () => {
        const result = await deleteTeamMember(memberId);
        if (result.success) {
            toast({ title: 'Success', description: 'Team member deleted successfully.' });
        } else {
            toast({ title: 'Error', description: result.message, variant: 'destructive' });
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the team member from the database.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                            Yes, delete member
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
