import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'


const style = `
.update-user-container {
   max-width: 500px;
   margin: 50px auto;
   padding: 20px;
   background-color: #f9f9f9;
   border-radius: 8px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 }
 
 .update-user-container h1 {
   text-align: center;
   color: #333;
   margin-bottom: 20px;
   font-size: 1.8em;
 }
 
 .update-user-container form {
   display: flex;
   flex-direction: column;
   gap: 15px;
 }
 
 .update-user-container label {
   font-size: 1.1em;
   color: #555;
   margin-bottom: 5px;
 }
 
 .update-user-container input[type="text"],
 .update-user-container input[type="email"] {
   width: 100%;
   padding: 10px;
   font-size: 1em;
   border: 1px solid #ccc;
   border-radius: 4px;
   transition: border-color 0.3s ease;
 }
 
 .update-user-container input[type="text"]:focus,
 .update-user-container input[type="email"]:focus {
   border-color: #007bff;
   outline: none;
 }
 
 .update-user-container button[type="submit"] {
   background-color: #4CAF50;
   color: white;
   padding: 10px 15px;
   font-size: 1.1em;
   border: none;
   border-radius: 4px;
   cursor: pointer;
   transition: background-color 0.3s ease;
 }
 
 .update-user-container button[type="submit"]:hover {
   background-color: #45a049;
 }
 
 @media (max-width: 768px) {
   .update-user-container {
     width: 90%;
     padding: 15px;
   }
 }
 
`


const UpdateUser = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate(); // To redirect after update
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
  });
const params = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Fetch user data by ID
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://mern2024-ui.onrender.com/api/admin/users/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserData({
          username: data.username,
          email: data.email,
          phone: data.phone,
        });
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`https://mern2024-ui.onrender.com/api/admin/users/update${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) { 
        toast.success('User updated successfully!');
        navigate('/admin/users'); // Redirect to the user list page
      } else {
        toast('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.log('Error updating user:', error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate one step back in the history
 }


  return (<>
          <style>{style}</style>
     <div className="update-user-container">
       <style>{/* Place the CSS provided above here */}</style>
       <h1>Update User</h1>
       <form onSubmit={handleFormSubmit}>
         <div>
           <label>Username:</label>
           <input
             type="text"
             name="username"
             value={userData.username}
             onChange={handleInputChange}
           />
         </div>
         <div>
           <label>Email:</label>
           <input
             type="email"
             name="email"
             value={userData.email}
             onChange={handleInputChange}
           />
         </div>
         <div>
           <label>Phone:</label>
           <input
             type="text"
             name="phone"
             value={userData.phone}
             onChange={handleInputChange}
           />
         </div>
         <button type="submit">Update User</button>
         <button type="button" onClick={handleBack}>Go Back</button>
       </form>
     </div>
     </>
  );
};

export default UpdateUser;
