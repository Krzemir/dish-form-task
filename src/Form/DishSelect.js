import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import DishForm from './DishForm';


const DishSelect = () => {
  const [name, setName] = useState('');
  const [preparationTime, setPreparationTime] = useState('00:00:00');
  const [type, setType] = useState('');
  const [noOfSlices, setNoOfSlices] = useState('');
  const [diameter, setDiameter] = useState('');
  const [spicinessScale, setSpicinessScale] = useState('');
  const [slicesOfBread, setSlicesOfBread] = useState('');
  const [errors, setErrors] = useState(null);

  const handleChange = (name, value) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'preparationTime':
        setPreparationTime(value);
        break;
      case 'type':
        setType(value);
        break;
      case 'noOfSlices':
        setNoOfSlices(value);
        break;
      case 'diameter':
        setDiameter(value);
        break;
      case 'spicinessScale':
        setSpicinessScale(value);
        break;
      case 'slicesOfBread':
        setSlicesOfBread(value);
        break;
      default:
        break;
    }
  };
  


  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(name, preparationTime, type, noOfSlices, diameter, spicinessScale, slicesOfBread);

    const data = {
      name,
      preparation_time: preparationTime,
      type,
      ...(type === 'pizza' && { no_of_slices: noOfSlices, diameter }),
      ...(type === 'soup' && { spiciness_scale: spicinessScale }),
      ...(type === 'sandwich' && { slices_of_bread: slicesOfBread }),
    };

    

    try {
      console.log(data)
      const response = await fetch('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData);
        return;
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formValues = { name, preparationTime, type, noOfSlices, diameter, spicinessScale, slicesOfBread };

  return (
    <Col xs={6} md={4}>
      <DishForm onChange={handleChange} onSubmit={handleSubmit} values={formValues}/>
    </Col>
  );
};

export default DishSelect;