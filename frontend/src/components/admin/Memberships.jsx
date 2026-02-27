import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const Memberships = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMembership, setEditingMembership] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await adminService.getAllMemberships();
      setMemberships(response);
    } catch (error) {
      toast.error('Failed to fetch memberships');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingMembership) {
        await adminService.updateMembership(editingMembership._id, data);
        toast.success('Membership updated successfully');
      } else {
        await adminService.addMembership(data);
        toast.success('Membership added successfully');
      }
      setShowModal(false);
      setEditingMembership(null);
      reset();
      fetchMemberships();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (membership) => {
    setEditingMembership(membership);
    reset(membership);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this membership?')) {
      try {
        // Add delete API call
        toast.success('Membership deleted successfully');
        fetchMemberships();
      } catch (error) {
        toast.error('Failed to delete membership');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Membership Management</h1>
        <button
          onClick={() => {
            setEditingMembership(null);
            reset({});
            setShowModal(true);
          }}
          className="btn-primary flex items-center"
        >
          <FiPlus className="mr-2" /> Add Membership
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberships.map((membership) => (
          <div key={membership._id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{membership.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-2 ${
                    membership.type === 'vendor' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {membership.type}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(membership)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(membership._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-2xl font-bold text-primary-600">₹{membership.price}</p>
                <p className="text-sm text-gray-600">Duration: {membership.duration} days</p>
                {membership.type === 'vendor' && (
                  <>
                    <p className="text-sm text-gray-600">Max Products: {membership.maxProducts}</p>
                    <p className="text-sm text-gray-600">Commission: {membership.commission}%</p>
                  </>
                )}
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Benefits:</h4>
                <ul className="space-y-1">
                  {membership.benefits?.map((benefit, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <span className="text-green-500 mr-2">✓</span> {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <span>Active: {membership.isActive ? 'Yes' : 'No'}</span>
                <span>Users: {membership.currentUsers || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingMembership ? 'Edit Membership' : 'Add New Membership'}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="input-field"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    {...register('type', { required: 'Type is required' })}
                    className="input-field"
                  >
                    <option value="">Select type</option>
                    <option value="user">User</option>
                    <option value="vendor">Vendor</option>
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    {...register('price', { 
                      required: 'Price is required',
                      min: { value: 0, message: 'Price must be positive' }
                    })}
                    className="input-field"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (days) *
                  </label>
                  <input
                    type="number"
                    {...register('duration', { 
                      required: 'Duration is required',
                      min: { value: 1, message: 'Duration must be at least 1 day' }
                    })}
                    className="input-field"
                  />
                  {errors.duration && (
                    <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Benefits (one per line)
                </label>
                <textarea
                  {...register('benefits')}
                  rows="3"
                  className="input-field"
                  placeholder="Enter benefits, one per line"
                ></textarea>
              </div>

              {watch('type') === 'vendor' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Products
                    </label>
                    <input
                      type="number"
                      {...register('maxProducts')}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Commission (%)
                    </label>
                    <input
                      type="number"
                      {...register('commission')}
                      className="input-field"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('isActive')}
                  className="h-4 w-4 text-primary-600 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Active
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingMembership(null);
                    reset();
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {editingMembership ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Memberships;