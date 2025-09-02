import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:3000/users";

  // Fetch users
  const fetchUsers = async () => {
    const res = await axios.get(API_URL);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create user
  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, formData);
    setFormData({ name: "", email: "", role: "", status: "Active" });
    fetchUsers();
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API_URL}/${editId}`, formData);
      setEditId(null);
      setFormData({ name: "", email: "", role: "", status: "Active" });
      fetchUsers();
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setFormData(user);
    setEditId(user.id);
  };

  // Delete user
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchUsers();
  };

  // Toggle status
  const toggleStatus = async (user) => {
    const updatedUser = {
      ...user,
      status: user.status === "Active" ? "Inactive" : "Active",
    };
    await axios.put(`${API_URL}/${user.id}`, updatedUser);
    fetchUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Stutent Application</h1>

      {/* Form */}
      <form style={{ marginBottom: "20px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", border:"1px solid black" }}>
        <div style={{padding:"20px"}}>
            <tr>
          <td>
            <label htmlFor="">Enter Name</label>
          </td>
          <td>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="">Enter Email</label>
          </td>
          <td>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="">Enter Role</label>
          </td>
          <td>
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="">Status</label>
          </td>
          <td>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </td>
        </tr>
        <tr>
            <td></td>
            <td>
                <button onClick={handleAdd} style={{backgroundColor:"gray"}}>Add User</button>
            </td>
        </tr>
        </div>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
              <td>
                <button onClick={() => handleEdit(u)}>Edit</button>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
