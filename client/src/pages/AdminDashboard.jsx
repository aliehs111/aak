import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminDashboard({ auth }) {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // load current projects
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/projects`, { auth })
      .then(res => setProjects(res.data))
      .catch(console.error);
  }, []);

  // handle file selection
  const onFileChange = e => setFile(e.target.files[0]);

  // create a new project
  const onSubmit = async e => {
    e.preventDefault();
    let s3_key = "";

    if (file) {
      // 1) upload image to S3 via your FastAPI endpoint
      const form = new FormData();
      form.append("file", file);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload-image`,
        form,
        {
          auth,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      s3_key = data.s3_key;
    }

    // 2) create the project record
    const proj = { title, description, imageUrl: s3_key };
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/projects`,
      proj,
      { auth }
    );
    setProjects(prev => [...prev, res.data]);
    // reset form
    setTitle("");
    setDescription("");
    setFile(null);
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
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Create Project
        </button>
      </form>

      <h2 className="text-xl font-semibold">Existing Projects</h2>
      <ul className="space-y-4">
        {projects.map(p => (
          <li key={p.id} className="border p-4 rounded flex justify-between">
            <div>
              <strong>{p.title}</strong>
              <p>{p.description}</p>
            </div>
            <div className="space-x-2">
              <button
                className="px-2 py-1 bg-yellow-500 text-white rounded"
                onClick={() => {/* TODO: edit flow */}}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-600 text-white rounded"
                onClick={async () => {
                  await axios.delete(
                    `${import.meta.env.VITE_API_URL}/projects/${p.id}`,
                    { auth }
                  );
                  setProjects(prev => prev.filter(x => x.id !== p.id));
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
