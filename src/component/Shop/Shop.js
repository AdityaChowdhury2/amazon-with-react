import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [product, setProduct] = useState(first10);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = getStoredCart();
        const cartProductsKey = Object.keys(savedCart);
        const previousCart = cartProductsKey.map(existingKey => {
            const previousProduct = fakeData.find(product => product.key === existingKey);
            previousProduct.quantity = savedCart[existingKey];
            // console.log(previousProduct);
            return previousProduct;
        })
        console.log(previousCart);
        setCart(previousCart);

    }, [])
    const handleAddProduct = (product) => {
        const toBeAddedKey = (product.key);
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart = []
        if (sameProduct) {
            count = product.quantity + 1;
            product.quantity = count;
            const otherProduct = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [sameProduct, ...otherProduct];
        }
        else {
            product.quantity = count;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDb(product.key);
        // console.log(cart);
    }
    return (
        <Grid container>
            <Grid item xs={9} className='product-container' >
                <ul>
                    {product.map((product) =>
                        <Product key={product.key} showAddToCart={true} product={product} handleAddProduct={handleAddProduct} />)}
                </ul>
            </Grid>
            <Grid item md={3} sx={{ paddingX: 2 }}>
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="addBtn">Review Order</button>
                    </Link>
                </Cart>
            </Grid>
        </Grid>
    );
};

export default Shop;
