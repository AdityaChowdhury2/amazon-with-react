import React from 'react';

const ReviewItem = (props) => {
    const { name, quantity, price, key } = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgrey',
        marginBottom: '5px',
        marginLeft: '200px',
        paddingBottom: '15px'
    }

    return (
        <div style={reviewItemStyle}>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price: {price}</p>
            <br />
            <button onClick={() => props.removeProduct(key)} className='addBtn'>Remove</button>
        </div >
    );
};

export default ReviewItem;