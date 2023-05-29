import React from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const DishForm = ({ onChange, onSubmit, values }) => {
  
  const { register, handleSubmit: validate, formState: { errors } } = useForm();
  
  const { name, preparationTime, type, noOfSlices, diameter, spicinessScale, slicesOfBread } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange( name, value );
  };


  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formDishName">
        <Form.Label>Dish Name</Form.Label>
        <Form.Control {...register("title", { required: true })} type="text" name="name" value={name} onChange={handleChange} required />
        {errors.title && <span>This field is required</span>}
      </Form.Group>

      <Form.Group controlId="formPreparationTime" className="mt-2">
        <Form.Label>Preparation Time</Form.Label>
        <Form.Control {...register("time", { required: true })} type="time" step="2" name="preparationTime" value={preparationTime} onChange={handleChange} required />
        {errors.time && <span>Set the time</span>}
      </Form.Group>

      <Form.Group controlId="formDishType">
        <Form.Label>Dish Type</Form.Label>
        <Form.Control {...register("time", { required: true })} as="select" name="type" value={type} onChange={handleChange} required>
          <option value="" disabled>Select</option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </Form.Control>
        {errors.time && <span>Make the choice</span>}
      </Form.Group>


      {type === 'pizza' && (
        <>
          <Form.Group controlId="formNoOfSlices">
            <Form.Label>Number of Slices</Form.Label>
            <Form.Control {...register("slices", { required: true })} type="number" name="noOfSlices" value={noOfSlices} onChange={handleChange} required />
            {errors.slices && <span>Make the choice</span>}
          </Form.Group>

          <Form.Group controlId="formDiameter">
            <Form.Label>Diameter</Form.Label>
            <Form.Control {...register("diameter", { required: true })}type="number" step="0.1" name="diameter" value={diameter} onChange={handleChange} required />
            {errors.diameter && <span>Make the choice</span>}
          </Form.Group>
        </>
      )}

      {type === 'soup' && (
        <Form.Group controlId="formSpicinessScale">
          <Form.Label>Spiciness Scale</Form.Label>
          <Form.Control {...register("diameter", { required: true })} type="number" min="1" max="10" name="spicinessScale" value={spicinessScale} onChange={handleChange} required />
          {errors.spiciness && <span>Make the choice</span>}
        </Form.Group>
      )}

      {type === 'sandwich' && (
        <Form.Group controlId="formSlicesOfBread">
          <Form.Label>Number of Slices of Bread</Form.Label>
          <Form.Control {...register("breadSlices", { required: true })} type="number" min="1" name="slicesOfBread" value={slicesOfBread} onChange={handleChange} required />
                    {errors.breadSlices && <span>Make the choice</span>}
        </Form.Group>
      )}

      <Button variant="primary" type="submit" className="mt-2">
        Submit
      </Button>
    </Form>
  );
};

export default DishForm;