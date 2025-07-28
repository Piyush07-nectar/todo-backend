import { createSlice,configureStore } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {user:"" ,isLoggedIn:false},
  reducers: {
    login(state){
        state.isLoggedIn=true;
    },
    logout(state){
         state.isLoggedIn=false;
    }
  }
});
export const authAction = authSlice.actions;
const store=configureStore({
    reducer: {
  auth: authSlice.reducer
}
})
  export default store;
