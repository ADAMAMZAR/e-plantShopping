import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();
    
    // Get cart items from Redux store
    const cartItems = useSelector((state) => state.cart.items);
    
    // State to track item quantities locally (optional, but can be useful for UI updates)
    const [itemQuantities, setItemQuantities] = useState({});
    
    // Initialize quantities from cart items
    useEffect(() => {
        const initialQuantities = {};
        cartItems.forEach(item => {
            initialQuantities[item.name] = item.quantity;
        });
        setItemQuantities(initialQuantities);
    }, [cartItems]);
    
    // Calculate total amount for all items in cart
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            // Extract numeric value from cost string (e.g., "$15" -> 15)
            const price = parseFloat(item.cost.replace('$', ''));
            return total + (price * item.quantity);
        }, 0);
    };
    
    // Calculate subtotal for a specific item
    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.replace('$', ''));
        return (price * item.quantity).toFixed(2);
    };
    
    // Handle increment (increase quantity by 1)
    const handleIncrement = (item) => {
        dispatch(updateQuantity({
            name: item.name,
            amount: item.quantity + 1
        }));
    };
    
    // Handle decrement (decrease quantity by 1)
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            // If quantity > 1, decrease by 1
            dispatch(updateQuantity({
                name: item.name,
                amount: item.quantity - 1
            }));
        } else {
            // If quantity would become 0, remove item from cart
            dispatch(removeItem({ name: item.name }));
        }
    };
    
    // Handle remove item completely from cart
    const handleRemove = (item) => {
        dispatch(removeItem({ name: item.name }));
    };
    
    // Handle continue shopping
    const handleContinueShopping = (e) => {
        e.preventDefault();
        if (onContinueShopping) {
            onContinueShopping(e);
        }
    };
    
    // Handle checkout (placeholder)
    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };
    
    // Calculate total number of items in cart
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };
    
    // If cart is empty, show empty cart message
    if (cartItems.length === 0) {
        return (
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                </div>
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <button 
                        className="continue-shopping-btn"
                        onClick={handleContinueShopping}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1>Shopping Cart</h1>
                <div className="cart-summary">
                    <p>Total Items: {getTotalItems()}</p>
                    <p>Total Amount: ${calculateTotalAmount().toFixed(2)}</p>
                </div>
            </div>
            
            <div className="cart-items">
                {cartItems.map((item, index) => (
                    <div key={item.name} className="cart-item">
                        <div className="item-image">
                            <img src={item.image} alt={item.name} />
                        </div>
                        
                        <div className="item-details">
                            <h3 className="item-name">{item.name}</h3>
                            <p className="item-description">{item.description}</p>
                            <p className="item-price">Price: {item.cost}</p>
                        </div>
                        
                        <div className="item-quantity">
                            <button 
                                className="quantity-btn"
                                onClick={() => handleDecrement(item)}
                            >
                                -
                            </button>
                            <span className="quantity-value">{item.quantity}</span>
                            <button 
                                className="quantity-btn"
                                onClick={() => handleIncrement(item)}
                            >
                                +
                            </button>
                        </div>
                        
                        <div className="item-subtotal">
                            <p>Subtotal: ${calculateTotalCost(item)}</p>
                        </div>
                        
                        <div className="item-remove">
                            <button 
                                className="remove-btn"
                                onClick={() => handleRemove(item)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="cart-footer">
                <div className="cart-total">
                    <h2>Total: ${calculateTotalAmount().toFixed(2)}</h2>
                </div>
                
                <div className="cart-actions">
                    <button 
                        className="continue-shopping-btn"
                        onClick={handleContinueShopping}
                    >
                        Continue Shopping
                    </button>
                    <button 
                        className="checkout-btn"
                        onClick={handleCheckoutShopping}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;