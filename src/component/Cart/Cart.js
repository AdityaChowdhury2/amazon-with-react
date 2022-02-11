import React from 'react';
import './cart.css'


const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    const totalPrice = cart.reduce((price, prd) => price + prd.price * prd.quantity, 0);
    const totalShipping = cart.reduce((shipping, prd) => shipping + prd.shipping, 0);

    const totalBeforeTax = totalShipping + totalPrice;

    const tax = totalPrice * .18;

    const totalAfterTax = totalBeforeTax + tax;
    const styleJustify = {
        display: 'flex',
        justifyContent: 'space-between'
    };

    const fixingNumber = num => Number(num).toFixed(2);
    return (
        <>
            <div className="text-center">
                <h4>Order Summery</h4>
                <p>Items Ordered: {cart.length}</p>
            </div>
            <div className='text-center' >
                <p >
                    <small style={styleJustify}>
                        <span>Items:</span>
                        <span>{fixingNumber(totalPrice)}</span>
                    </small>
                </p>
                <p >
                    <small style={styleJustify}>
                        <span>Shipping &amp; Handling:</span>
                        <span>{fixingNumber(totalShipping)}</span>
                    </small>
                </p>
                <p>
                    <small style={styleJustify}>
                        <span>Total before tax:</span>
                        <span>{fixingNumber(totalBeforeTax)}</span>
                    </small>
                </p>
                <p>
                    <small style={styleJustify}>
                        <span>Estimated Tax:</span>
                        <span>{fixingNumber(tax)}</span>
                    </small>
                </p>
                <hr />
                <h5 className='text-danger' style={styleJustify}>
                    <span>Order Total:</span>
                    <span>{fixingNumber(totalAfterTax)}</span>
                </h5>
                {
                    props.children
                }
            </div>
        </>
    );
};

export default Cart;