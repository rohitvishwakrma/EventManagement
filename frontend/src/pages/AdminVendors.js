
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminVendors() {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [membershipFilter, setMembershipFilter] = useState("all");
  const navigate = useNavigate();

  const fetchVendors = async () => {
    try {
      const res = await API.get("/admin/vendors");
      setVendors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // Filter vendors based on search and membership
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMembership = membershipFilter === "all" || 
      (membershipFilter === "none" ? !vendor.membership : vendor.membership === membershipFilter);
    return matchesSearch && matchesMembership;
  });

  // Get membership badge color
  const getMembershipBadgeColor = (membership) => {
    switch (membership?.toLowerCase()) {
      case 'premium':
        return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'gold':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'silver':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'basic':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-500 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/30 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg p-2 mt-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20">
          <div className="flex items-center gap-3 mb-2 ">
            <button
              onClick={() => navigate("/admin")}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Vendor Management
            </h1>
          </div>
          <p className="text-orange-100 ml-12">Manage vendor accounts, memberships, and activity</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-orange-500">
            <p className="text-sm text-gray-500">Total Vendors</p>
            <p className="text-2xl font-bold text-gray-800">{vendors.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
            <p className="text-sm text-gray-500">Premium</p>
            <p className="text-2xl font-bold text-gray-800">
              {vendors.filter(v => v.membership?.toLowerCase() === 'premium').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
            <p className="text-sm text-gray-500">Gold</p>
            <p className="text-2xl font-bold text-gray-800">
              {vendors.filter(v => v.membership?.toLowerCase() === 'gold').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-gray-400">
            <p className="text-sm text-gray-500">No Membership</p>
            <p className="text-2xl font-bold text-gray-800">
              {vendors.filter(v => !v.membership).length}
            </p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search vendors by email..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                value={membershipFilter}
                onChange={(e) => setMembershipFilter(e.target.value)}
              >
                <option value="all">All Memberships</option>
                <option value="premium">Premium</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="basic">Basic</option>
                <option value="none">No Membership</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vendors Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {filteredVendors.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Vendors Found</h3>
              <p className="text-gray-500">
                {searchTerm || membershipFilter !== 'all' ? 'Try adjusting your search or filters' : 'No vendors have been added yet'}
              </p>
            </div>
          ) : (
            <>
              {/* Table Header - Desktop */}
              <div className="hidden md:block bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 ">
                  <div className="col-span-8 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Vendor Email
                  </div>
                  <div className="col-span-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Membership Status
                  </div>
                </div>
              </div>

              {/* Vendors List */}
              <div className="divide-y divide-gray-200">
                {filteredVendors.map((vendor, index) => (
                  <div
                    key={vendor._id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 hover:bg-orange-50/50 transition-colors duration-200"
                  >
                    {/* Vendor Info */}
                    <div className="md:col-span-8 flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center shadow-sm border-2 border-orange-200">
                        <span className="text-lg font-bold text-orange-500">
                          {vendor.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 break-all">{vendor.email}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">ID: {vendor._id.slice(-8)}</span>
                          {vendor.membership && (
                            <span className="text-xs text-gray-400">•</span>
                          )}
                          {vendor.membership && (
                            <span className="text-xs text-gray-400">
                              Joined: {new Date(vendor.createdAt || Date.now()).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Membership */}
                    <div className="md:col-span-4 flex items-center">
                      {vendor.membership ? (
                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getMembershipBadgeColor(vendor.membership)}`}>
                          {vendor.membership === 'premium' && (
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          )}
                          {vendor.membership === 'gold' && (
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          )}
                          {vendor.membership}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border bg-gray-100 text-gray-500 border-gray-200">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                          No Membership
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{filteredVendors.length}</span> of <span className="font-semibold">{vendors.length}</span> vendors
                  </p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors">
                      1
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
                      2
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
                      3
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminVendors;