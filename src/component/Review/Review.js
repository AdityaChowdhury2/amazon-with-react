import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteFromDb } from '../../utilities/fakedb';

const Review = () => {
    const [cart, setCart] = useState([]);
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        deleteFromDb(productKey);
    }
    useEffect(() => {
        const savedCart = getStoredCart();
        const cartProductsKey = Object.keys(savedCart);
        const cartProducts = cartProductsKey.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedCart[key];
            return product;

        })
        // console.log(cartProducts);
        setCart(cartProducts);
    }, [])
    // console.log(cart);
    return (
        <>
            <Grid container>
                <Grid item md={9}>
                    {
                        cart.map(pd => <ReviewItem product={pd} key={pd.key} removeProduct={removeProduct} />)
                    }
                </Grid>
                <Grid item md={3} sx={{ paddingX: 2 }}>
                    <Cart cart={cart}>
                        <button className="addBtn">Place Order</button>
                    </Cart>
                </Grid>
            </Grid>
        </>

    );
};

export default Review;