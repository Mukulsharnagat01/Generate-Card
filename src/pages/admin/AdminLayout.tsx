import { Link, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AdminLayout = () => {
  const { signOut, profile } = useAuth();
  return (
    <div className="min-h-screen">
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-semibold">Home</Link>
          <Link to="/admin/templates" className="font-semibold">Templates</Link>
          <Link to="/admin/contacts" className="font-semibold">Contacts</Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{profile?.role}</span>
          <button className="border rounded px-3 py-1" onClick={() => signOut()}>Sign out</button>
        </div>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
