import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../cart/Cart';
import happyImage from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart,setCart]=useState([]);
    const [orderPlaced,setOrderPlaced]=useState(false);
    const auth=useAuth();
    const handlePlaceOrder=() =>{
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    const handleRemoveProduct=(productKey) =>{
       
        const newCart =cart.filter( pd => pd.key !==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
        console.log("clicked",productKey);
    }

    useEffect(() => {
        //cart
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);


        const cartProducts = productKeys.map(key => {
            const product =fakeData.find(pd => pd.key ===key);
            product.quantity=savedCart[key];
            return product;
        });
        setCart((cartProducts));
        // console.log(cartProducts);
    },[]);
    let thankYou;
    if(orderPlaced){
       thankYou = <img src={happyImage} alt=""/>
    }
   
    return (
        <div className="shop-container">
            
           <div className="product-container">
                {
                    
                    cart.map(pd => <ReviewItem
                        key={pd.key}
                        handleRemoveProduct={handleRemoveProduct}
                        product ={pd}
                        ></ReviewItem> )
                }
                {
                    thankYou
                }
                {
                    !cart.length && <h1>Your Cart is Empty. <a href="/shop">keep Shopping</a>  </h1>
                }

           </div>
           <div className="cart-container">
               <Cart cart={cart}>
                   <Link to="/shipment">
                        {
                            auth.user ?
                            <button  className="main-btn">Proceed Checkout</button>
                             :
                            <button  className="main-btn">Proceed To Login</button>
                        }
                   </Link>
               </Cart>
           </div>

        </div>
    );
};

export default Review;