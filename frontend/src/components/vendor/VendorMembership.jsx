import React, { useEffect, useState } from 'react';
import vendorService from '../../services/vendorService';
import toast from 'react-hot-toast';
import { FiClock, FiPackage, FiPercent, FiDollarSign } from 'react-icons/fi';

const VendorMembership = () => {
  const [membership, setMembership] = useState(null);
  const [availableMemberships, setAvailableMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembershipData();
  }, []);

  const fetchMembershipData = async () => {
    try {
      const response = await vendorService.getMyMembership();
      setMembership(response.current);
      setAvailableMemberships(response.available || []);
    } catch (error) {
      toast.error('Failed to fetch membership data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradeRequest = async (membershipId) => {
    try {
      await vendorService.requestMembershipUpgrade(membershipId);
      toast.success('Upgrade request submitted successfully');
    } catch (error) {
      toast.error('Failed to submit upgrade request');
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
      <h1 className="text-2xl font-bold text-gray-900">Membership Management</h1>

      {/* Current Membership */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 bg-primary-600 text-white">
          <h2 className="text-lg font-semibold">Current Membership</h2>
        </div>
        <div className="p-6">
          {membership ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{membership.name}</h3>
                <p className="text-gray-600 mb-4">{membership.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FiDollarSign className="text-primary-600 mr-2" />
                    <span className="text-gray-700">Price: ₹{membership.price}</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock className="text-primary-600 mr-2" />
                    <span className="text-gray-700">Duration: {membership.duration} days</span>
                  </div>
                  <div className="flex items-center">
                    <FiPackage className="text-primary-600 mr-2" />
                    <span className="text-gray-700">Max Products: {membership.maxProducts}</span>
                  </div>
                  <div className="flex items-center">
                    <FiPercent className="text-primary-600 mr-2" />
                    <span className="text-gray-700">Commission: {membership.commission}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Membership Benefits:</h4>
                <ul className="space-y-2">
                  {membership.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                {membership.expiryDate && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Expires on: {new Date(membership.expiryDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-yellow-600">
                      {membership.daysRemaining} days remaining
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No active membership</p>
          )}
        </div>
      </div>

      {/* Available Upgrades */}
      {availableMemberships.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-gray-800 text-white">
            <h2 className="text-lg font-semibold">Available Upgrades</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableMemberships.map((plan) => (
                <div key={plan._id} className="border rounded-lg p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold text-primary-600 mb-4">₹{plan.price}</p>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600">Duration: {plan.duration} days</p>
                    <p className="text-sm text-gray-600">Max Products: {plan.maxProducts}</p>
                    <p className="text-sm text-gray-600">Commission: {plan.commission}%</p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.benefits?.map((benefit, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="text-green-500 mr-2">✓</span> {benefit}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleUpgradeRequest(plan._id)}
                    className="w-full btn-primary"
                  >
                    Request Upgrade
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorMembership;