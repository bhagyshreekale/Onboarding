import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Alert, Spinner, Modal } from 'react-bootstrap';
import '../UserList.css';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);
  const [loadingUpdateId, setLoadingUpdateId] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setUsers(res.data);
    } catch {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setLoadingDeleteId(id);
    setError(null);
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      await fetchUsers();
    } catch {
      setError('Failed to delete user');
    } finally {
      setLoadingDeleteId(null);
    }
  };

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setUpdatedUserData(user);
    setShowModal(true);
  };

  const handleUpdate = async (id) => {
    setLoadingUpdateId(id);
    setError(null);
    try {
      await axios.put(
        `http://localhost:5000/api/users/${id}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      setShowModal(false);
      await fetchUsers();
    } catch {
      setError('Failed to update user');
    } finally {
      setLoadingUpdateId(null);
    }
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(term) ||
      user.phone?.includes(term) ||
      user.businessName?.toLowerCase().includes(term)
    );
  });

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div><strong>Total Users:</strong> {users.length}</div>
        <div className="input-group w-auto">
          <span className="input-group-text">
            <FaSearch />
          </span>

          <input
            type="text"
            className="form-control"
            placeholder="Search by name, phone or business..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

      </div>

      <h3 className="mb-4 text-center user-heading">Registered Users</h3>

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <Table striped bordered hover responsive className="align-middle text-center user-container">
            <thead className="table-dark user-table">
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Business</th>
                <th>Type</th>
                <th>Category</th>
                <th>Services</th>
                <th>Logo</th>
                <th>Est. Date</th>
                <th>Business Mobile</th>
                <th>WhatsApp</th>
                <th>Business Address</th>
                <th>Coordinator</th>
                <th>Insta</th>
                <th>FB</th>
                <th>YT</th>
                <th>GMB</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, index) => (
                <tr key={u._id}>
                  <td>{index + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.phone}</td>
                  <td>{new Date(u.dob).toLocaleDateString()}</td>
                  <td>{u.businessName}</td>
                  <td>{u.businessType}</td>
                  <td>{u.businessCategory}</td>
                  <td>
                    <ul className="list-unstyled mb-0">
                      {u.services.map((service, idx) => (
                        <li key={idx}>{service}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {u.logo && (
                      <img
                        src={`http://localhost:5000/uploads/${u.logo}`}
                        alt="logo"
                        className="logo-img"
                        style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                      />
                    )}
                  </td>
                  <td>{new Date(u.establishmentDate).toLocaleDateString()}</td>
                  <td>{u.businessMobile}</td>
                  <td>{u.businessWhatsapp}</td>
                  <td>{u.businessAddress}</td>
                  <td>{u.coordinator}</td>
                  <td>{u.socialMedia?.instagramId}</td>
                  <td>{u.socialMedia?.facebookAccess}</td>
                  <td>{u.socialMedia?.youtubeAccess}</td>
                  <td>{u.socialMedia?.gmbAccess}</td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={loadingUpdateId === u._id}
                        onClick={() => handleUpdateClick(u)}
                      >
                        {loadingUpdateId === u._id ? (
                          <>
                            <Spinner as="span" animation="border" size="sm" /> Updating...
                          </>
                        ) : (
                          <>
                            <FaEdit className="me-1" /> Update
                          </>
                        )}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        disabled={loadingDeleteId === u._id}
                        onClick={() => handleDelete(u._id)}
                      >
                        {loadingDeleteId === u._id ? (
                          <>
                            <Spinner as="span" animation="border" size="sm" /> Deleting...
                          </>
                        ) : (
                          <>
                            <FaTrash className="me-1" /> Delete
                          </>
                        )}
                      </Button>
                    </div>
                  </td>


                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update User Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            {[
              { label: 'Name', field: 'name' },
              { label: 'Phone', field: 'phone' },
              { label: 'Date of Birth', field: 'dob', type: 'date' },
              { label: 'Business Name', field: 'businessName' },
              { label: 'Business Type', field: 'businessType' },
              { label: 'Business Category', field: 'businessCategory' },
              { label: 'Business Mobile', field: 'businessMobile' },
              { label: 'Business WhatsApp', field: 'businessWhatsapp' },
              { label: 'Business Address', field: 'businessAddress' },
              { label: 'Coordinator', field: 'coordinator' },
            ].map(({ label, field, type = 'text' }) => (
              <div className="col-md-6" key={field}>
                <label>{label}</label>
                <input
                  type={type}
                  className="form-control"
                  value={
                    type === 'date'
                      ? updatedUserData[field]
                        ? new Date(updatedUserData[field]).toISOString().split('T')[0]
                        : ''
                      : updatedUserData[field] || ''
                  }
                  onChange={(e) =>
                    setUpdatedUserData({ ...updatedUserData, [field]: e.target.value })
                  }
                />
              </div>
            ))}

            {/* Social Media */}
            {[
              { label: 'Instagram ID', field: 'instagramId' },
              { label: 'Facebook Access', field: 'facebookAccess' },
              { label: 'YouTube Access', field: 'youtubeAccess' },
              { label: 'GMB Access', field: 'gmbAccess' },
            ].map(({ label, field }) => (
              <div className="col-md-6" key={field}>
                <label>{label}</label>
                <input
                  type="text"
                  className="form-control"
                  value={updatedUserData.socialMedia?.[field] || ''}
                  onChange={(e) =>
                    setUpdatedUserData({
                      ...updatedUserData,
                      socialMedia: {
                        ...updatedUserData.socialMedia,
                        [field]: e.target.value,
                      },
                    })
                  }
                />
              </div>
            ))}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => handleUpdate(selectedUser._id)}
            disabled={loadingUpdateId === selectedUser?._id}
          >
            {loadingUpdateId === selectedUser?._id ? 'Updating...' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserList;
