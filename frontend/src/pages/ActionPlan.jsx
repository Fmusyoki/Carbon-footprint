import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Base from "../components/Base";

const SimpleObjectiveForm = () => {
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    deadline: ''
  });

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch objectives on component mount
  useEffect(() => {
    fetchObjectives();
  }, []);

  const fetchObjectives = async () => {
    try {
      const response = await axios.get(`${API_URL}/objectives/`);
      if (response.data.success) setObjectives(response.data.data);
    } catch (error) {
      console.error('Error fetching objectives:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingId) {
        await axios.put(`${API_URL}/objectives/${editingId}`, formData);
      } else {
        await axios.post(`${API_URL}/objectives/`, formData);
      }
      
      // Reset form and refresh data
      resetForm();
      await fetchObjectives();
    } catch (error) {
      console.error("Error saving objective:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (objective) => {
    setFormData({
      title: objective.title,
      description: objective.description,
      status: objective.status,
      priority: objective.priority,
      deadline: objective.deadline?.split('T')[0] || ''
    });
    setEditingId(objective._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this objective?')) {
      try {
        await axios.delete(`${API_URL}/objectives/${id}`);
        await fetchObjectives();
      } catch (error) {
        console.error('Error deleting objective:', error);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/objectives/${id}`, { status: newStatus });
      await fetchObjectives();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', status: 'pending', priority: 'medium', deadline: '' });
    setEditingId(null);
  };

  const statusOptions = [
    { value: 'pending', label: '⏳ Pending', color: 'bg-gray-100 text-gray-800' },
    { value: 'in-progress', label: '🔄 In Progress', color: 'bg-blue-100 text-blue-800' },
    { value: 'completed', label: '✅ Completed', color: 'bg-green-100 text-green-800' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
  ];

  return (
    <Base>
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sustainability Goals</h1>
          <p className="text-gray-600">Manage your goals and track progress to reduce emissions</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Objective' : 'Create New Objective'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter objective title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your objective..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {priorityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`${editingId ? 'flex-1' : 'w-full'} bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50`}
              >
                {loading ? 'Saving...' : editingId ? 'Update Objective' : 'Create Objective'}
              </button>
            </div>
          </form>
        </div>

        {/* Objectives List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Sustainability Goals ({objectives.length})</h2>
          
          {objectives.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No objectives created yet. Start by creating your first objective!
            </div>
          ) : (
            <div className="space-y-4">
              {objectives.map((objective) => (
                <div key={objective._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">{objective.title}</h3>
                    <div className="flex gap-2">
                      <select
                        value={objective.status}
                        onChange={(e) => handleStatusChange(objective._id, e.target.value)}
                        className={`text-sm px-2 py-1 rounded border ${
                          statusOptions.find(s => s.value === objective.status)?.color
                        }`}
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      
                      <button
                        onClick={() => handleEdit(objective)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(objective._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-2">{objective.description}</p>

                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className={`px-2 py-1 rounded ${priorityOptions.find(p => p.value === objective.priority)?.color}`}>
                      Priority: {objective.priority}
                    </span>
                    {objective.deadline && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        📅 {new Date(objective.deadline).toLocaleDateString()}
                      </span>
                    )}
                    <span className="text-gray-500">
                      Created: {new Date(objective.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </Base>
  );
};

export default SimpleObjectiveForm;