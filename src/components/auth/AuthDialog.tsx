
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { login, signup } from '@/server/actions';
import { LogIn } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

interface AuthDialogProps {
  trigger: React.ReactNode;
}

export function AuthDialog({ trigger }: AuthDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const { toast } = useToast();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const handleLogin = async (values: LoginFormData) => {
    const result = await login(values);
    if (result.success) {
      toast({ title: 'Login Successful', description: `Welcome back, ${result.user?.name}!` });
      setIsOpen(false);
      // In a real app, you would set a session cookie or update global state here.
      // e.g., router.refresh() to update server components with user state.
    } else {
      toast({ title: 'Login Failed', description: result.message, variant: 'destructive' });
    }
  };

  const handleSignup = async (values: SignupFormData) => {
    const result = await signup(values);
    if (result.success) {
      toast({ title: 'Signup Successful', description: 'Your account has been created. Please log in.' });
      signupForm.reset();
      setActiveTab('login'); // Switch to login tab
    } else {
      toast({ title: 'Signup Failed', description: result.message, variant: 'destructive' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn /> User/Admin Access
          </DialogTitle>
          <DialogDescription>
            Log in to your account or sign up to get involved.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4 pt-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input placeholder="user@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                  {loginForm.formState.isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="signup">
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4 pt-4">
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input placeholder="user@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={signupForm.formState.isSubmitting}>
                  {signupForm.formState.isSubmitting ? 'Signing up...' : 'Sign Up'}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
