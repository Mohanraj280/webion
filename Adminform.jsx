import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

function AdminForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    phoneNumber: '',
    course: '',
    status: 'Unplaced',
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
    document.title = "WEBION";
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users');
    setUsers(res.data);
  };

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/users', formData);
    fetchUsers();
    setFormData({ name: '', email: '', role: '', phoneNumber: '', course: '', status: 'Unplaced' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="container py-4" style={{ backgroundColor: '#000', color: '##b6ff00', minHeight: '100vh' }}>
      <nav className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2" style={{ borderColor: '#d4ff00' }}>
        <a href="/" className="fw-bold logo" style={{ color: '#d4ff00' ,textDecoration:'none'}}>LEARNHUB</a>
        <a href="#" className="btn btn-outline-light" style={{ backgroundColor: '#b6ff00', color: '#000', border: 'none' }}>Admin</a>
      </nav>

      <h2 className="text-center fw-bold mb-4">Fill This Form</h2>

      <form className="row g-3" onSubmit={handleSubmit}>
        {['name', 'role', 'email', 'phoneNumber'].map((field, index) => (
          <div className="col-md-6" key={index}>
            <label htmlFor={field} className="form-label fw-bold">{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              className="form-control"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              required
              style={{ backgroundColor: '#111', color: '#d4ff00', border: '1px solidrgb(255, 255, 255)' }}
            />
          </div>
        ))}

        <div className="col-md-6">
          <label htmlFor="course" className="form-label fw-bold">Course:</label>
          <select
            className="form-select"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            style={{ backgroundColor: '#111', color: '#d4ff00', border: '1px solidrgb(252, 252, 252)' }}
          >
            <option>Select a course</option>
            <option>React Basics</option>
            <option>UI/UX Design</option>
            <option>Advanced JS</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="status" className="form-label fw-bold">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-select"
            id="status"
            style={{ backgroundColor: '#111', color: '#d4ff00', border: '1px solidrgb(255, 255, 255)' }}
          >
            <option value="Placed">Placed</option>
            <option value="Unplaced">Unplaced</option>
          </select>
        </div>

        <div className="col-12 text-end">
          <button type="submit" className="btn" style={{ backgroundColor: '#b6ff00', color: '#000', fontWeight: 'bold' }}>
            Submit
          </button>
        </div>
      </form>

      <div className="row mt-4" style={{ gap: '20px' }}>
        {users.map((user) => (
          <div
            key={user._id}
            className="p-3 rounded"
            style={{ backgroundColor: '#111', color: 'white', border: '1px solid #d4ff00', width: '300px' }}
          >
            {/* Profile Icon */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#d4ff00",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          {user.name.charAt(0)}
        </div>
        <h4 style={{ margin: 0 }}>{user.name}</h4>
      </div>

      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone Number:</strong> {user.phoneNumber}
      </p>
      <p>
        <strong>Course:</strong> {user.course}
      </p>
      <p>
        <strong>Status:</strong> {user.status}
      </p>

      {/* Delete Button */}
      <button
        onClick={() => handleDelete(user._id)}
        className="btn btn-danger btn-block"
        style={{
          backgroundColor: "red",
          color: "white",
          fontWeight: "bold",
          width: "100%",
        }}
      >
        Delete
      </button>
          </div>
        ))}
      </div>

    

      <footer className="text-center mt-5">
        <h4 className="fw-bold" style={{ color: '#d4ff00' }}>LearnHub</h4>
        <p>&copy; 2025 LearnHub Inc. All rights reserved.</p>
        <div>
          <a href="#" className="text-decoration-none fw-bold" style={{ color: '#d4ff00', margin: '0 15px' }}>Form</a>|
          <a href="#" className="text-decoration-none fw-bold" style={{ color: '#d4ff00', margin: '0 15px' }}>Notes</a>
        </div>
      </footer>
    </div>
  );
}

export default AdminForm;
