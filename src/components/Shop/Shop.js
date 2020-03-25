import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart]=useState([]);
    useEffect(() =>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        const previousCart=productKeys.map(existingKey =>{
            const product =fakeData.find(pd =>pd.key ===existingKey);
            product.quantity=savedCart[existingKey];
            return product;
           
        })
        // console.log(previousCart);
        setCart(previousCart);

    },[])

    const handleAddProduct= (product) =>{
        const toBeaddedKey=product.key;
        const sameProduct=cart.find(pd => pd.key ===toBeaddedKey);
        let count =1;
        let newCart;
        if(sameProduct){
            const count=sameProduct.quantity+1;
            sameProduct.quantity=count;
            const others =cart.filter(pd => pd.key !==toBeaddedKey);
            newCart=[...others,sameProduct]

        }
        else{
            product.quantity=1;
            newCart=[...cart,product];
        }
       
        setCart(newCart);
        
       
        addToDatabaseCart(product.key,count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">

                {
                    products.map(product => <Product 
                        key={product.key}
                        showAddToCart={true}
                        product={product} 
                        handleAddProduct={handleAddProduct}
                        > </Product>)

                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-btn">Review Order</button>
                    </Link> 
                </Cart>
            </div>


        </div>
    );
};

export default Shop;

