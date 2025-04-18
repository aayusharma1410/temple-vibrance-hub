import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar, SidebarProvider, SidebarContent } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { isUserAdmin } from '@/lib/supabase-helpers';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Home, Image, Bell, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, loading, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setCheckingAdmin(false);
        return;
      }

      try {
        // Check if user has admin email
        if (user.email === 'shrilakshminarsinghhasampur@gmail.com') {
          console.log('Admin email detected:', user.email);
          setIsAdmin(true);
          
          // Also ensure they have admin flag in user_details
          const { data, error } = await supabase
            .from('user_details')
            .update({ is_admin: true })
            .eq('user_id', user.id);
            
          if (error) console.error('Error updating admin status:', error);
        } else {
          // For non-specific emails, check admin status via function
          const adminStatus = await isUserAdmin(user.id);
          console.log('Admin status for non-specific email:', adminStatus);
          setIsAdmin(adminStatus);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-2/3 mx-auto" />
        </div>
      </div>
    );
  }

  if (!user) {
    toast({
      title: "Access Denied",
      description: "Please login to access the admin area.",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }
  
  // Special check for the specific admin email
  if (user.email !== 'shrilakshminarsinghhasampur@gmail.com' && isAdmin === false) {
    toast({
      title: "Access Denied",
      description: "You need admin privileges to access this area.",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="w-64 border-r pb-12 fixed inset-y-0">
          <SidebarContent>
            <div className="space-y-4 py-4">
              <div className="px-4 py-2">
                <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
                  Admin Panel
                </h2>
              </div>
              <div className="px-4">
                <div className="space-y-1">
                  <Link to="/">
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="mr-2 h-4 w-4" />
                      Back to Website
                    </Button>
                  </Link>
                  <Link to="/admin">
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/admin/darshan">
                    <Button variant="ghost" className="w-full justify-start">
                      <Image className="mr-2 h-4 w-4" />
                      Darshan Images
                    </Button>
                  </Link>
                  <Link to="/admin/notices">
                    <Button variant="ghost" className="w-full justify-start">
                      <Bell className="mr-2 h-4 w-4" />
                      Notice Board
                    </Button>
                  </Link>
                  <Link to="/admin/gallery">
                    <Button variant="ghost" className="w-full justify-start">
                      <Image className="mr-2 h-4 w-4" />
                      Gallery
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="px-4 absolute bottom-4 left-0 right-0">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
              <div className="mt-2 px-2 text-xs text-muted-foreground">
                Logged in as Admin: {user.email}
              </div>
            </div>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 pl-64">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
