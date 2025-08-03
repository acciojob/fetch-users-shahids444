import React, { useState } from 'react';

const UserListApp = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://reqres.in/api/users?page=1'); // ✅ Corrected API

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        setUsers(data.data);
      } else {
        setUsers([]);
        setError('No data found');
      }
    } catch (err) {
      // ✅ Graceful fallback with mock data
      console.error('Fetch failed:', err.message);
      setError('API failed, showing mock data');

      const mockUsers = [
        {
          id: 1,
          email: 'george.bluth@reqres.in',
          first_name: 'George',
          last_name: 'Bluth',
          avatar: 'https://reqres.in/img/faces/1-image.jpg',
        },
        {
          id: 2,
          email: 'janet.weaver@reqres.in',
          first_name: 'Janet',
          last_name: 'Weaver',
          avatar: 'https://reqres.in/img/faces/2-image.jpg',
        },
        {
          id: 3,
          email: 'emma.wong@reqres.in',
          first_name: 'Emma',
          last_name: 'Wong',
          avatar: 'https://reqres.in/img/faces/3-image.jpg',
        },
        {
          id: 4,
          email: 'eve.holt@reqres.in',
          first_name: 'Eve',
          last_name: 'Holt',
          avatar: 'https://reqres.in/img/faces/4-image.jpg',
        },
        {
          id: 5,
          email: 'charles.morris@reqres.in',
          first_name: 'Charles',
          last_name: 'Morris',
          avatar: 'https://reqres.in/img/faces/5-image.jpg',
        },
        {
          id: 6,
          email: 'tracey.ramos@reqres.in',
          first_name: 'Tracey',
          last_name: 'Ramos',
          avatar: 'https://reqres.in/img/faces/6-image.jpg',
        },
      ];

      setUsers(mockUsers);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Blue Whales</h1>
        <button
          onClick={fetchUsers}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded transition-colors duration-200"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get User List'}
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <p className="mt-2 text-gray-600">Fetching users...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && users.length === 0 && !error && (
        <div className="text-center py-8 text-gray-500">
          Click "Get User List" to fetch users
        </div>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Avatar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.first_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserListApp;
