import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const cardStyle = `
  .card10 {
    width: 100%;
    height: 100%;
     margin-Top:20px;
     border: 3px solid #61dafb;
     border-radius:20px;
    font-size:17px;
    color:white;
    font-weight: bold;
    transition: transform 0.3s ease, border 0.3s ease;
  }
  .card10:hover {
    transform: scale(1.05);
    border: 4px solid white;
  }
  .row{
  margin-bottom:50px
  }
  .card-body {
   text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
    
}
`;

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false); // To show modal for adding/updating
  const [currentService, setCurrentService] = useState({ service: '', description: '', price: '', provider: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    getService();
  }, []);

  const getService = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/service`, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setServices(data.message);
      } else {
        console.log('Failed to fetch service data');
      }
    } catch (error) {
      console.log(`Services front-end error: ${error}`);
    }
  };

  const handleAddOrUpdateService = async (e) => {
    e.preventDefault();
    const method = isEditMode ? "PUT" : "POST";
    const endpoint = isEditMode ? `/api/auth/service/${currentService._id}` : "/api/auth/service";

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentService),
      });

      if (response.ok) {
        await getService();
        setShowModal(false);
        setCurrentService({ service: '', description: '', price: '', provider: '' });
      } else {
        const errorData = await response.json();
        console.error('Update failed:', errorData);
      }
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} service:`, error);
    }
  };


  const handleDeleteService = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/service/${id}`, { method: "DELETE" });
      if (response.ok) {
        setServices(services.filter((service) => service._id !== id));
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const openAddServiceModal = () => {
    setIsEditMode(false);
    setCurrentService({ service: '', description: '', price: '', provider: '' });
    setShowModal(true);
  };

  const openEditServiceModal = (service) => {
    setIsEditMode(true);
    setCurrentService(service);
    setShowModal(true);
  };

  return (
    <>
      <style>{cardStyle}</style>
      <div className="container">
        <button className="btn btn-primary my-3" onClick={openAddServiceModal}>Add New Service</button>
        <div className="row">
          {services.map((currElm, index) => {
            const { _id, description, price, provider, service } = currElm;
            return (
              <div className="col-md-4" key={index} style={{ marginBottom: '30px' }}>
                <div className="card10">
                  {/* <img src="/images/design.png" className="card-img-top" alt="Card image" /> */}
                  <div className="card-body">
                    <h5 className="card-title">{service}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">Price: {price}</p>
                    <p className="card-text">Provided by: {provider}</p>
                    <button className="btn btn-warning mx-1" onClick={() => openEditServiceModal(currElm)}>Edit</button>
                    <button className="btn btn-danger mx-1" onClick={() => handleDeleteService(_id)}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for Add/Edit Service */}
      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: 'black' }}>{isEditMode ? 'Edit Service' : 'Add New Service'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleAddOrUpdateService}>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control my-12"
                    placeholder="Service Name"
                    value={currentService.service}
                    onChange={(e) => setCurrentService({ ...currentService, service: e.target.value })}
                    required
                    style={{ borderColor: '#61dafb', borderWidth: '4px' }}
                  />
                  <textarea
                    className="form-control my-2"
                    placeholder="Description"
                    value={currentService.description}
                    onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                    required
                    style={{ borderColor: '#61dafb', borderWidth: '4px' }}
                  />
                  <input
                    type="text"
                    className="form-control my-2"
                    placeholder="Price"
                    value={currentService.price}
                    onChange={(e) => setCurrentService({ ...currentService, price: e.target.value })}
                    required
                    style={{ borderColor: '#61dafb', borderWidth: '4px' }}
                  />
                  <input
                    type="text"
                    className="form-control my-2"
                    placeholder="Provider"
                    value={currentService.provider}
                    onChange={(e) => setCurrentService({ ...currentService, provider: e.target.value })}
                    required
                    style={{ borderColor: '#61dafb', borderWidth: '4px' }}
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">{isEditMode ? 'Update' : 'Add'}</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminServices;
