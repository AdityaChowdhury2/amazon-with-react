import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const SingleProduct = () => {
    const { key } = useParams();
    // console.log(key);
    const product = fakeData.find(pd => pd.key === key);
    // console.log(product);
    return (
        <div>
            <Product product={product} showAddToCart={false}></Product>
        </div>
    );
};

export default SingleProduct;