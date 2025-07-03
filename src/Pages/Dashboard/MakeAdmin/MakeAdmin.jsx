import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();

  const [searchEmail, setSearchEmail] = useState("");
  const [searchKey, setSearchKey] = useState("");

  // Debounce input for better UX (fetch after 500ms pause)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setSearchKey(searchEmail.trim());
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchEmail]);

  // Fetch users array whenever searchKey changes
  const {
    data: users = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", searchKey],
    queryFn: async () => {
      if (!searchKey) return [];
      const res = await axiosSecure.get(`/admin/search?email=${searchKey}`);
      return res.data; // expect array of users
    },
    enabled: !!searchKey,
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/admin/role/${id}`, { role });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Role updated successfully", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong", "error");
    },
  });

  // Handlers for admin role changes by user ID
  const makeAdmin = (id) => {
    updateRoleMutation.mutate({ id, role: "admin" });
  };

  const removeAdmin = (id) => {
    updateRoleMutation.mutate({ id, role: "rider" });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Make Admin Panel</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="email"
          placeholder="Search users by email"
          className="border px-3 py-2 rounded w-full"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && searchKey && <p className="text-red-600">Users not found.</p>}

      {users.length > 0
        ? users.map((user) => (
            <div key={user._id} className="border rounded p-4 shadow-md mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {user.role}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-4">
                {user.role !== "admin" && (
                  <button
                    onClick={() => makeAdmin(user._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Make Admin
                  </button>
                )}

                {user.role === "admin" && (
                  <button
                    onClick={() => removeAdmin(user._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Remove Admin
                  </button>
                )}
              </div>
            </div>
          ))
        : searchKey && <p>No users found matching "{searchKey}".</p>}
    </div>
  );
};

export default MakeAdmin;
