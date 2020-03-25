import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';
// import { UserContext } from '../../App';

const Cart = (props) => {
    const auth = useAuth();
    console.log(auth);
    const cart=props.cart;
    // console.log(cart);
    const total=cart.reduce((total,productPrice)=>total+productPrice.price* productPrice.quantity,0);
  

    // let total=0;
    // for(let i=0;i<cart.length;i++){
    //     const product=cart[i];
    //     total=total+product.price;
    // }
    let shipping=0;
    if(total>35){
        shipping=0;
    }
    else if(total>15) {
        shipping=4.99;
    }
    else if(total>0){
        shipping=12.99
    }

    const tax =(total/10).toFixed(2);
    const grandTotal=(total+shipping+ Number(tax)).toFixed(2);

    const formatNumber=num =>{
        const precision=num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4>Order Summery</h4>
            <p>Item Ordered : {cart.length}</p>
            <p>Product Price:{formatNumber(total)}</p>
            <p><small>Shipping Cost :{shipping}</small></p>
            <p><small>Tax + Vat: {tax}</small></p>
            <p>Total Price: {grandTotal}</p>
            <br/>
           {
               props.children
           }
           {/* {
               <p>{user}</p>
           } */}
            
        </div>
    );
};

export default Cart;