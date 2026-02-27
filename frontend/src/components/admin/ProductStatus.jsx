import React, { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

const ProductStatus = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStatus, setEditingStatus] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    try {
      const response = await adminService.getProductStatus();
      setStatuses(response);
    } catch (error) {
      toast.error('Failed to fetch product statuses');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingStatus) {
        // Update status
        toast.success('Status updated successfully');
      } else {
        await adminService.updateProductStatus(data);
        toast.success('Status added successfully');
      }
      setShowModal(false);
      setEditingStatus(null);
      reset();
      fetchStatuses();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (status) => {
    setEditingStatus(status);
    reset(status);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this status?')) {
      try {
        // Add delete API call
        toast.success('Status deleted successfully');
        fetchStatuses();
      } catch (error) {
        toast.error('Failed to delete status');
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
        <h1 className="text-2xl font-bold text-gray-900">Product Status Management</h1>
        <button
          onClick={() => {
            setEditingStatus(null);
            reset({});
            setShowModal(true);
          }}
          className="btn-primary flex items-center"
        >
          <FiPlus className="mr-2" /> Add Status
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Label
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Color
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Background
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {statuses.map((status) => (
              <tr key={status._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{status.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className="px-2 py-1 text-xs font-semibold rounded-full"
                    style={{
                      color: status.color,
                      backgroundColor: status.bgColor
                    }}
                  >
                    {status.label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div 
                      className="w-6 h-6 rounded-full mr-2" 
                      style={{ backgroundColor: status.color }}
                    ></div>
                    <span className="text-sm text-gray-500">{status.color}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div 
                      className="w-6 h-6 rounded-full mr-2" 
                      style={{ backgroundColor: status.bgColor }}
                    ></div>
                    <span className="text-sm text-gray-500">{status.bgColor}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {status.order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    status.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {status.isActive ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(status)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(status._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingStatus ? 'Edit Status' : 'Add New Status'}
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="input-field"
                  placeholder="e.g., active, pending"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Label *
                </label>
                <input
                  type="text"
                  {...register('label', { required: 'Label is required' })}
                  className="input-field"
                  placeholder="e.g., Active, Pending Approval"
                />
                {errors.label && (
                  <p className="mt-1 text-sm text-red-600">{errors.label.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <input
                    type="color"
                    {...register('color')}
                    className="input-field h-10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    {...register('bgColor')}
                    className="input-field h-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register('description')}
                  rows="2"
                  className="input-field"
                  placeholder="Enter description"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    {...register('order')}
                    className="input-field"
                  />
                </div>

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
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingStatus(null);
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
                  {editingStatus ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductStatus;