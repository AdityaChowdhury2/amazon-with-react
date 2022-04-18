import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './shipment.css';


const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='ship-form'>

            <div>
                <label>Name</label>
                <input defaultValue={loggedInUser.name} {...register("name", { required: true })} />
                {errors.name && <span className='error'>Name is required</span>}
            </div>

            <div>
                <label>Email</label>
                <input defaultValue={loggedInUser.email} {...register("email", { required: true })} />
                {errors.email && <label><span className='error'>email is required</span></label>}
            </div >
            <div>
                <label>Address</label>
                <input {...register("address", { required: true })} placeholder='Enter your address' />
                {errors.address && <span className='error'>Address is required</span>}
            </div>

            <div>
                <label>Phone Number</label>
                <input {...register("phoneNumber", { required: true })} placeholder='Enter your phone number' />
                {errors.phoneNumber && <span className='error'>Phone number is required</span>}
            </div>

            <input type="submit" />
        </form>
    );
};

export default Shipment;