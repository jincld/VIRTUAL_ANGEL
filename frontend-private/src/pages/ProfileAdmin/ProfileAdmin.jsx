import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthToken.jsx";
import axios from "axios";
import './ProfileAdmin.css';

function ProfileAdmin() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [adminInfo, setAdminInfo] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // 👈 nuevo estado

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/admin/profile", {
          withCredentials: true,
        });
        setAdminInfo(response.data);
      } catch (error) {
        console.error("Error fetching admin data", error.response?.data?.message || error.message);

        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/");
        }
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/api/logout", {}, { withCredentials: true });
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

return (
    <>
<div className="backadminprofile"></div>
<div className="profile-wrapper">
  <div className="profile-content">
    <div className="admin-profile-container">
      <h2 className="profiletitle">ADMIN PROFILE</h2>
      <div className="admin-info">
        <p>EMAIL</p> 
        <p className="infoprofilead">{adminInfo.email}</p> 
        <p>
          PASSWORD{" "}
        </p>
        <p className="infoprofilead">
          {showPassword ? adminInfo.password : "••••••••••••••"}
        </p>
                  <button
            className="btn btn-showing"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{ marginLeft: '10px' }}
          >
            {showPassword ? "HIDE" : "SHOW"}
          </button>
      </div>
      <button className="btn btn-logout" onClick={handleLogout}>LOGOUT</button>
    </div>

    {/* Imagen del perfil o decorativa */}
    <div className="admin-image-container">
      <img src="/profilead.png" alt="Admin" className="admin-image" />
    </div>
  </div>
</div>

  </>
);

}

export default ProfileAdmin;
