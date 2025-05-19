import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard({ auth }) {
  const [projects, setProjects]     = useState([]);
  const [title, setTitle]           = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile]             = useState(null);
  const [status, setStatus]         = useState("");

  // load current projects
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/projects`, { auth })
      .then(res => setProjects(res.data))
      .catch(console.error);
  }, []);

  const onFileChange = e => setFile(e.target.files[0]);

  const onSubmit = async e => {
    e.preventDefault();
    setStatus("Creating project…");

    try {
      // build one multipart form with title, description, and optional file
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      if (file) form.append("file", file);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        form,
        {
          auth,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // append the new project to the list
      setProjects(prev => [...prev, res.data]);
      setStatus("Done! 🎉");
      // reset our form fields
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("Error: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <form onSubmit={onSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <div>
          <label className="block font-medium">Title</label>
          <input
            className="w-full border rounded p-2"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full border rounded p-2"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Photo</label>
          <input type="file" accept="image/*" onChange={onFileChange} />
        </div>

        <button type="submit" className="px-4 py-2 bg-secondary text-white rounded">
          Create Project
        </button>

        {status && <p className="mt-2 text-gray-700">{status}</p>}
      </form>

      <h2 className="text-xl font-semibold">Existing Projects</h2>
      <ul className="space-y-4">
        {projects.map(p => (
          <li key={p.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <strong>{p.title}</strong>
              <p>{p.description}</p>
            </div>
            <button
  className="px-2 py-1 bg-red-600 text-white rounded"
  onClick={async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/projects/${p.id}`,
        {
          auth,               // { username, password }
          withCredentials: true
        }
      );
      setProjects(prev => prev.filter(x => x.id !== p.id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete project");
    }
  }}
>
  Delete
</button>

          </li>
        ))}
      </ul>
    </div>
  );
}

