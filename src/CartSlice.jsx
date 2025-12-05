import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      // Check if the item already exists in the cart
      const existingItemIndex = state.items.findIndex(
        item => item.name === action.payload.name
      );
      
      if (existingItemIndex >= 0) {
        // If item exists, increment its quantity
        state.items[existingItemIndex].quantity += 1;
      } else {
        // If item doesn't exist, add it with quantity 1
        state.items.push({
          ...action.payload,
          quantity: 1
        });
      }
    },
    removeItem: (state, action) => {
      // Remove item based on its name
      state.items = state.items.filter(
        item => item.name !== action.payload.name
      );
    },
    updateQuantity: (state, action) => {
      // Extract name and amount from payload
      const { name, amount } = action.payload;
      
      // Find the item in the items array
      const itemIndex = state.items.findIndex(
        item => item.name === name
      );
      
      // If item is found, update its quantity
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity = amount;
        
        // Optional: If quantity becomes 0 or less, remove the item
        if (state.items[itemIndex].quantity <= 0) {
          state.items.splice(itemIndex, 1);
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;