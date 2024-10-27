import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaUserCircle, FaServer, FaHome } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { useState, useEffect } from "react";

const AdminLayout = () => {
    const [user, setUser] = useState(null); // State to store admin data
    const [isLoading, setIsLoading] = useState(true); // State to track loading status

    useEffect(() => {
        const token = localStorage.getItem('token');

        const checkAdminStatus = async () => {
            try {
                setIsLoading(true); // Start loading
                const response = await fetch('https://mern2024-2095.onrender.com//api/auth/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.userData); // Update the user state with the fetched data
                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error checking admin status:', error);
            } finally {
                setIsLoading(false); // Stop loading
            }
        };

        checkAdminStatus(); // Fetch user data on component mount
    }, []); // Empty dependency array ensures it only runs once on mount

    if (isLoading) {
        return <h1>Loading......</h1>;
    }

    if (!user?.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul style={{
                            display: 'flex',
                            justifyContent: 'space-around', /* Adjust spacing */
                            listStyle: 'none',
                            padding: 0,
                            margin: 0
                        }}>
                            <li>
                                <NavLink to="/admin/users" style={{
                                    textDecoration: 'none',
                                    color: 'inherit', /* Inherit color from parent */
                                    padding: '6px 12px',
                                    transition: 'background-color 0.3s' /* Smooth transition */
                                }}>
                                    <FaUserCircle /> Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/contacts" style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    padding: '6px 12px',
                                    transition: 'background-color 0.3s'
                                }}>
                                    <RiContactsFill /> Contacts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/service" style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    padding: '6px 12px',
                                    transition: 'background-color 0.3s'
                                }}>
                                    <FaServer /> Services
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/" style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    padding: '6px 12px',
                                    transition: 'background-color 0.3s'
                                }}>
                                    <FaHome /> Home
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <style jsx>{`
                    .container {
                        color: blue;
                        padding: 10px;
                    }

                    .navLink:hover {
                        background-color: rgba(0, 0, 255, 0.1); /* Hover effect */
                        border-radius: 4px; /* Rounded corners */
                    }

                    /* Responsive styles */
                    @media (max-width: 768px) {
                        .navbar {
                            flex-direction: column; /* Stack items on small screens */
                            align-items: center; /* Center items */
                        }

                        .navLink {
                            margin-bottom: 10px; /* Space between items */
                        }
                    }
                `}</style>
            </header>
            <Outlet />
        </>
    );
};

export default AdminLayout;
