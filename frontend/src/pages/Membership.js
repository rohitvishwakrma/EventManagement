
import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Membership() {
  const [vendors, setVendors] = useState([]);
  const [membership, setMembership] = useState("6 months");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAssigning, setIsAssigning] = useState(null);
  const navigate = useNavigate();

  const fetchVendors = async () => {
    try {
      const res = await API.get("/admin/vendors");
      setVendors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const assignMembership = async (vendorId) => {
    setIsAssigning(vendorId);
    try {
      await API.post("/admin/membership", {
        vendorId,
        membership
      });

      toast.success("Membership assigned successfully");
      fetchVendors();
    } catch (err) {
      console.log(err);
      toast.error("Error assigning membership");
    } finally {
      setIsAssigning(null);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // Filter vendors based on search
  const filteredVendors = vendors.filter(vendor =>
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get membership badge color
  const getMembershipBadgeColor = (membership) => {
    switch (membership?.toLowerCase()) {
      case '6 months':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case '1 year':
        return 'bg-purple-100 text-purple-600 border-purple-200';
      case '2 years':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-500 border-gray-200';
    }
  };

  // Get membership icon
  const getMembershipIcon = (membership) => {
    switch (membership?.toLowerCase()) {
      case '6 months':
        return (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case '1 year':
        return (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case '2 years':
        return (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100/30 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg p-3 mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 mt-20">
          <div className="flex items-center gap-3 mb-2">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Membership Management
            </h1>
          </div>
          <p className="text-orange-100 ml-12">Assign and manage vendor memberships</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-orange-500">
            <p className="text-sm text-gray-500">Total Vendors</p>
            <p className="text-2xl font-bold text-gray-800">{vendors.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
            <p className="text-sm text-gray-500">6 Months</p>
            <p className="text-2xl font-bold text-gray-800">
              {vendors.filter(v => v.membership === '6 months').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-purple-500">
            <p className="text-sm text-gray-500">1 Year</p>
            <p className="text-2xl font-bold text-gray-800">
              {vendors.filter(v => v.membership === '1 year').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-yellow-500">
            <p className="text-sm text-gray-500">2 Years</p>
            <p className="text-2xl font-bold text-gray-800">
              {vendors.filter(v => v.membership === '2 years').length}
            </p>
          </div>
        </div>

        {/* Membership Selector & Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Membership Selector */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Select Membership Duration
            </h3>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <select
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white appearance-none cursor-pointer"
                value={membership}
                onChange={(e) => setMembership(e.target.value)}
              >
                <option value="6 months">6 Months</option>
                <option value="1 year">1 Year</option>
                <option value="2 years">2 Years</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3 ml-1">
              Selected: <span className="font-semibold text-orange-600">{membership}</span>
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Vendors
            </h3>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by email..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                {searchTerm ? 'Try adjusting your search' : 'No vendors are available'}
              </p>
            </div>
          ) : (
            <>
              {/* Table Header - Desktop */}
              <div className="hidden md:block bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 px-6 py-4">
                  <div className="col-span-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Vendor Email
                  </div>
                  <div className="col-span-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Current Membership
                  </div>
                  <div className="col-span-3 text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </div>
                </div>
              </div>

              {/* Vendors List */}
              <div className="divide-y divide-gray-200">
                {filteredVendors.map((vendor) => (
                  <div
                    key={vendor._id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 hover:bg-orange-50/50 transition-colors duration-200"
                  >
                    {/* Vendor Email */}
                    <div className="md:col-span-5 flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center shadow-sm border-2 border-orange-200">
                        <span className="text-lg font-bold text-orange-500">
                          {vendor.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 break-all">{vendor.email}</h3>
                        <p className="text-xs text-gray-400 mt-1">ID: {vendor._id.slice(-8)}</p>
                      </div>
                    </div>

                    {/* Current Membership */}
                    <div className="md:col-span-4 flex items-center">
                      {vendor.membership ? (
                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getMembershipBadgeColor(vendor.membership)}`}>
                          {getMembershipIcon(vendor.membership)}
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

                    {/* Action Button */}
                    <div className="md:col-span-3 flex items-center">
                      <button
                        onClick={() => assignMembership(vendor._id)}
                        disabled={isAssigning === vendor._id}
                        className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isAssigning === vendor._id ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Assigning...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Assign {membership}</span>
                          </>
                        )}
                      </button>
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
                  <div className="flex items-center gap-2">
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

export default Membership;