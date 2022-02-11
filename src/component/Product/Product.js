import React from 'react';
import './product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';


const Product = (props) => {
    const { name, price, img, stock, seller, key } = props.product;
    const { showAddToCart } = props;
    // console.log(showAddToCart);
    return (
        <div className='product'>
            <Grid container >
                <Grid item md={3}>
                    <img src={img} alt="" />
                </Grid>
                <Grid item md={9}>
                    <h3 className='product-heading'><Link to={`/product/${key}`}>{name}</Link></h3>
                    <h6>by : {seller}</h6>
                    <h3>${price}</h3>
                    <p><small>only {stock} left in stock - order soon</small></p>
                    {
                        showAddToCart && <button onClick={() => { props.handleAddProduct(props.product) }} className='addBtn'><FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>
                    }
                </Grid>
            </Grid>
        </div >
    );
};

export default Product;