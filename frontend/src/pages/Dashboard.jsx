import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data.data);
  };

  const createTask = async () => {
    await api.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/tasks/${id}`, { status });
    fetchTasks(); // refresh list
  };

  return (
    <>
      <h2>Dashboard ({user.role})</h2>
      <button onClick={logout}>Logout</button>

      <input
        placeholder="New task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createTask}>Add</button>

      <ul>
        {tasks.map((t) => (
          <li key={t._id} style={{ marginBottom: "10px" }}>
            <strong>{t.title}</strong>

            {/* STATUS DROPDOWN */}
            <select
              value={t.status}
              onChange={(e) => updateStatus(t._id, e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>

            {/* ADMIN DELETE */}
            {user.role === "ADMIN" && (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => deleteTask(t._id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
