import React, { useEffect, useState } from "react";
import axios from "axios";

const CrudPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
  });

  // Lấy danh sách user từ API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data);
      setError("");
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
      setError("Không thể tải danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Sắp xếp user theo username
  const sortUsersByUsername = () => {
    setUsers((prevUsers) =>
      [...prevUsers].sort((a, b) =>
        sortOrder === "asc"
          ? a.username.localeCompare(b.username)
          : b.username.localeCompare(a.username)
      )
    );
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Xử lý tạo user mới
  const handleCreateUser = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:8080/users", newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setIsModalOpen(false);
      setNewUser({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        dob: "",
      });
      setError("");
    } catch (error) {
      console.error("Lỗi khi tạo người dùng:", error);
      setError(error.response?.data?.message || "Lỗi từ server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Quản lý Người Dùng
      </h1>

      {/* Nút thêm user */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
        onClick={() => setIsModalOpen(true)}
      >
        + Thêm User
      </button>

      {/* Hiển thị loading hoặc bảng */}
      {loading ? (
        <p className="text-center mt-4 text-lg text-gray-500 animate-pulse">
          Đang tải dữ liệu...
        </p>
      ) : error ? (
        <p className="text-center text-red-500 mt-4">{error}</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-md shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="border px-4 py-2">ID</th>
                <th
                  className="border px-4 py-2 cursor-pointer hover:bg-gray-200 transition"
                  onClick={sortUsersByUsername}
                >
                  Username {sortOrder === "asc" ? "▲" : "▼"}
                </th>
                <th className="border px-4 py-2">Họ</th>
                <th className="border px-4 py-2">Tên</th>
                <th className="border px-4 py-2">Ngày sinh</th>
                <th className="border px-4 py-2 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100 transition">
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.lastName || "N/A"}</td>
                  <td className="border px-4 py-2">
                    {user.firstName || "N/A"}
                  </td>
                  <td className="border px-4 py-2">{user.dob}</td>
                  <td className="border px-4 py-2 flex gap-2 justify-center">
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600">
                      Sửa
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal thêm user */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center animate-fade-in">
          <div className="bg-white p-6 rounded-md shadow-lg w-96 animate-scale-in">
            <h2 className="text-xl font-bold mb-4">Thêm User</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />
            <input
              type="text"
              name="firstName"
              placeholder="Họ"
              value={newUser.firstName}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Tên"
              value={newUser.lastName}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />
            <input
              type="date"
              name="dob"
              placeholder="Ngày sinh"
              value={newUser.dob}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={newUser.password}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />
            <button
              onClick={handleCreateUser}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              {isSubmitting ? "Đang lưu..." : "Lưu"}
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Huỷ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudPage;
