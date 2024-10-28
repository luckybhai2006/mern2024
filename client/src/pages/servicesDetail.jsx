import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ServiceDetails = () => {
  const { id } = useParams(); // Get service ID from URL
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/servic/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched Service:', data.service);
        setService(data.service);
      } else {
        console.error('Service not found');
      }
    };

    fetchServiceDetails();
  }, [id]);

  if (!service) return <div>Loading...</div>;

  return (
    <div>
      <h1>{service.service}</h1>
      <p>{service.description}</p>
      <p>Price: {service.price}</p>
      <p>Provider: {service.provider}</p>
    </div>
  );
};

export default ServiceDetails;
