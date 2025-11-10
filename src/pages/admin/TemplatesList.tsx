import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteTemplate, listAllTemplates, Template } from "@/services/templates";

const TemplatesList = () => {
  const [items, setItems] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listAllTemplates();
      setItems(data);
    } catch (e: any) {
      setError(e.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id: string) => {
    if (!confirm("Delete this template?")) return;
    try {
      await deleteTemplate(id);
      await load();
    } catch (e: any) {
      alert(e.message ?? "Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Templates</h1>
        <button className="border rounded px-3 py-1" onClick={() => navigate("/admin/templates/new")}>New Template</button>
      </div>
      <div className="border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Updated</th>
              <th className="text-right p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(t => (
              <tr key={t.id} className="border-t">
                <td className="p-2">{t.name}</td>
                <td className="p-2">{t.status}</td>
                <td className="p-2">{new Date(t.updated_at).toLocaleString()}</td>
                <td className="p-2 text-right space-x-2">
                  <Link className="underline" to={`/admin/templates/${t.id}/edit`}>Edit</Link>
                  <button className="text-red-600 underline" onClick={() => onDelete(t.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TemplatesList;
