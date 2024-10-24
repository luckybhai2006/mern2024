
import { useEffect, useState } from "react";



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
   // width: 100%; /* Make it responsive */
   // max-width: 100%; /* Ensures card doesn't exceed viewport width */
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   transition: transform 0.2s ease;
   color:white;
   // display: flex;
   // flex-direction: column;
   // align-items: flex-start;
   box-sizing: border-box; /* Ensures padding is included in width/height */
}

.user-card:hover {
   transform: translateY(-5px);
   border:2px solid white;
}

.card-header {
   border-bottom: 5px solid red;
   font-size:25px;
   border-radius: 8px;
   padding: 25px;
   width: 100%; /* Make it responsive */
   max-width: 100%; /* Ensures card doesn't exceed viewport width */
   display: flex;
   color:red
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
   // margin-bottom: 10px;
   // color: black;
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
   // margin-top: 10px;
   width:100%;
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
      // text-align: left;
      margin:5px
   }
   
   .user-actions {
      align-items: flex-start;
      flex-direction: column;
      gap:2px;
      align-items: flex-end;
   }
   
   .user-button {
      padding: 1px 6px;
      width: 100%;
      // align-items: flex-end;
   }
   
}

@media (max-width: 480px) {
   .card-header,
   .user-data {
      font-size: 0.8em; /* Even smaller font size for very small screens */
   }
}
`
const AdminContacts = () => {
   const [contact, setContact] = useState([]);

   useEffect(() => {
      const token = localStorage.getItem('token');

      const getAllUserData = async () => {
         try {
            const response = await fetch("http://192.168.1.41:5000/api/admin/contact", {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${token}`
               }
            });
            const data = await response.json();
            setContact(data);

         } catch (error) {
            console.log(`Services front-end error: ${error}`);
         }
      };
      getAllUserData();
   }, []);

   // Delete user data
   const token1 = localStorage.getItem('token');
   const deleteContact = async (id) => {
      try {
         const response = await fetch(`http://192.168.1.41:5000/api/admin/contacts/delete/${id}`, {
            method: "DELETE",
            headers: {
               Authorization: `Bearer ${token1}`
            }
         })
         if(response.ok) {
            // Filter out the deleted user
            setContact(prevUsers => prevUsers.filter(user => user._id !== id));
         } else {
            console.log('Failed to delete user');
         }
         // const data = await response.json();
         // console.log("User afer delete", data)
      } catch (error) {
         console.log("error", error);
      }
   }

   return (
      <div className="user-list">
         <h1 style={{ textAlign: "center", }}>Admin Contact Data</h1>
         <style>{styles}</style>
         <div className="card-header">
            <div className="header-item">No.</div>
            <div className="header-item">Username</div>
            <div className="header-item">Email</div>
            <div className="header-item">Message</div>
            <div className="header-item">Actions</div>
         </div>
         {Array.isArray(contact) && contact.map((currUser, index) => (
            <div className="user-card" key={index}>
               <div className="user-data">
                  <div className="edit">{index + 1}</div>
                  <div>{currUser.username}</div>
                  <div>{currUser.email}</div>
                  <div>{currUser.message}</div>
                  <div className="user-actions">
                     <button className="user-button delete-button" onClick={() => deleteContact(currUser._id)}>Delete</button>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}
export default AdminContacts;