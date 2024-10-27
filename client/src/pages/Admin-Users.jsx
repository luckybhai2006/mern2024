import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const styles = `
.user-list {
   display: flex;
   flex-direction: column;
   gap: 10px;
   justify-content: center;
   margin-bottom: 100px;
   padding: 20px; /* Added padding for spacing */
}

.user-card {
   border: 1px solid #61dafb;
   border-radius: 10px;
   padding: 15px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   transition: transform 0.2s ease;
   color: white;
   box-sizing: border-box; /* Ensures padding is included in width/height */
}

.user-card:hover {
   transform: translateY(-5px);
   border: 2px solid white;
}

.card-header {
   border-bottom: 5px solid red;
   font-size: 25px;
   border-radius: 8px;
   padding: 25px;
   width: 100%; /* Make it responsive */
   display: flex;
   color: red;
}

.header-item {
   font-weight: bold;
   flex: 1;
   text-align: center;
   border-right: 2px solid #ddd;
}

.user-data {
   display: flex;
   justify-content: space-between;
   width: 100%;
   font-size: 0.9em; /* Smaller font size for smaller screens */
}

.user-data div {
   border-right: 2px solid #ddd;
   flex: 1;
   text-align: center;
}

.user-actions {
   display: flex;
   justify-content: center;
   gap: 20px;
   width: 100%;
}

.user-button {
   padding: 8px 12px;
   border: none;
   border-radius: 5px;
   cursor: pointer;
   color: white;
   font-size: 0.8em; /* Smaller font size for smaller screens */
}

.edit-button {
   background-color: #4CAF50;
}

.delete-button {
   background-color: #f44336;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
   .user-card {
      padding: 10px;
   }

   .card-header,
   .user-data {
      align-items: flex-start;
   }

   .header-item,
   .user-data div {
      border-right: 2px solid black;
      margin: 5px;
   }

   .user-actions {
      align-items: flex-start;
      flex-direction: column;
      gap: 2px;
      align-items: flex-end;
   }

   .user-button {
      padding: 1px 6px;
      width: 100%;
   }
}

@media (max-width: 480px) {
   .card-header,
   .user-data {
      font-size: 0.8em; /* Even smaller font size for very small screens */
   }
}
`;

const AdminUsers = () => {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const token = localStorage.getItem('token');

      const getAllUserData = async () => {
         try {
            const response = await fetch("https://mern2024-2095.onrender.com/api/admin/users", {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${token}`
               }
            });
            const data = await response.json();
            setUsers(data);
         } catch (error) {
            console.log(`Services front-end error: ${error}`);
         }
      };

      getAllUserData();
   }, []);

   // Delete user data
   const deleteUser = async (id) => {
      const token = localStorage.getItem('token');
      try {
         const response = await fetch(`https://mern2024-2095.onrender.com/api/admin/users/delete/${id}`, {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${token}`
            }
         });

         if (response.ok) {
            // Filter out the deleted user
            setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
         } else {
            console.log('Failed to delete user');
         }
      } catch (error) {
         console.log("error", error);
      }
   }

   return (
      <div className="user-list">
         <h1 style={{ textAlign: "center" }}>Admin User Data</h1>
         <style>{styles}</style>
         <div className="card-header">
            <div className="header-item">No.</div>
            <div className="header-item">Username</div>
            <div className="header-item">Email</div>
            <div className="header-item">Phone</div>
            <div className="header-item">Actions</div>
         </div>
         {Array.isArray(users) && users.map((currUser, index) => (
            <div className="user-card" key={currUser._id}>
               <div className="user-data">
                  <div>{index + 1}</div>
                  <div>{currUser.username}</div>
                  <div>{currUser.email}</div>
                  <div>{currUser.phone}</div>
                  <div className="user-actions">
                     <Link className="user-button edit-button" to={`/admin/users/${currUser._id}/edit`}>Update</Link>
                     <button className="user-button delete-button" onClick={() => deleteUser(currUser._id)}>Delete</button>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default AdminUsers;
