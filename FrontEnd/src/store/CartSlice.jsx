import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartDeatils:null
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartDetails:(state,action)=>{
        state.cartDeatils = action.payload
        console.log("Action payload",action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCartDetails } = cartSlice.actions

export default cartSlice.reducer