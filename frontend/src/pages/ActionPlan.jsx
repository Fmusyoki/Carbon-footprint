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
    { value: 'pending', label: '⏳ Pending', color: 'bg-orange-50 text-orange-700 border-orange-200', dot: '🟠' },
    { value: 'in-progress', label: '🔄 In Progress', color: 'bg-blue-50 text-blue-700 border-blue-200', dot: '🔵' },
    { value: 'completed', label: '✅ Completed', color: 'bg-green-50 text-green-700 border-green-200', dot: '🟢' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: '📈' },
    { value: 'medium', label: 'Medium', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: '⚡' },
    { value: 'high', label: 'High', color: 'bg-rose-50 text-rose-700 border-rose-200', icon: '🚨' }
  ];

  const getStatusIcon = (status) => {
    return statusOptions.find(s => s.value === status)?.dot || '⚪';
  };

  const getPriorityIcon = (priority) => {
    return priorityOptions.find(p => p.value === priority)?.icon || '📊';
  };

  return (
    <Base>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Track Your Impact
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Set, manage, and achieve your sustainability objectives. Every goal brings us closer to a greener future.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 p-6 sticky top-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-2 h-8 rounded-full ${editingId ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    {editingId ? 'Edit Objective' : 'New Objective'}
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <span>🎯</span>
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-300/50 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 placeholder-slate-400"
                      placeholder="What do you want to achieve?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <span>📝</span>
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-300/50 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 placeholder-slate-400 resize-none"
                      placeholder="Describe your objective and its impact..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-300/50 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 appearance-none cursor-pointer"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50/50 border border-slate-300/50 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 appearance-none cursor-pointer"
                      >
                        {priorityOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <span>📅</span>
                      Deadline
                    </label>
                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50/50 border border-slate-300/50 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    {editingId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all duration-200 active:scale-95 border border-slate-300/50"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className={`${editingId ? 'flex-1' : 'w-full'} px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/25`}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Saving...
                        </span>
                      ) : editingId ? (
                        'Update Goal'
                      ) : (
                        'Create Goal'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Objectives List */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Your Goals</h2>
                    <p className="text-slate-600 mt-1">
                      {objectives.length} objective{objectives.length !== 1 ? 's' : ''} in progress
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-slate-600">{objectives.filter(o => o.status === 'completed').length} Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-slate-600">{objectives.filter(o => o.status === 'in-progress').length} In Progress</span>
                    </div>
                  </div>
                </div>
                
                {objectives.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">No goals yet</h3>
                    <p className="text-slate-500 mb-6">Create your first sustainability goal to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {objectives.map((objective) => (
                      <div key={objective._id} className="group bg-white border border-slate-300/50 rounded-xl p-5 hover:shadow-lg transition-all duration-200 hover:border-slate-400/50">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg">{getStatusIcon(objective.status)}</span>
                              <h3 className="font-semibold text-slate-800 text-lg">{objective.title}</h3>
                            </div>
                            <p className="text-slate-600 leading-relaxed">{objective.description}</p>
                          </div>
                          
                          <div className="flex items-center gap-2 shrink-0">
                            <select
                              value={objective.status}
                              onChange={(e) => handleStatusChange(objective._id, e.target.value)}
                              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 cursor-pointer ${
                                statusOptions.find(s => s.value === objective.status)?.color
                              } hover:shadow-sm`}
                            >
                              {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            
                            <button
                              onClick={() => handleEdit(objective)}
                              className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all duration-200 active:scale-95"
                              title="Edit"
                            >
                              <span className="w-4 h-4">✏️</span>
                            </button>
                            <button
                              onClick={() => handleDelete(objective._id)}
                              className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-all duration-200 active:scale-95"
                              title="Delete"
                            >
                              <span className="w-4 h-4">🗑️</span>
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200/60">
                          <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${priorityOptions.find(p => p.value === objective.priority)?.color}`}>
                            <span className="mr-1.5">{getPriorityIcon(objective.priority)}</span>
                            {objective.priority} Priority
                          </span>
                          
                          {objective.deadline && (
                            <span className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-sm font-medium border border-slate-200">
                              <span className="mr-1.5">📅</span>
                              Due {new Date(objective.deadline).toLocaleDateString()}
                            </span>
                          )}
                          
                          <span className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-lg text-sm border border-slate-200">
                            Created {new Date(objective.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default SimpleObjectiveForm;