import { createSlice } from '@reduxjs/toolkit';
import { request } from '@/utils';

const userStore = createSlice({
  name: 'user',
  initialState: {
    token: '',
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

// 异步方法获取登录token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post('/authorizations', loginForm);
    dispatch(setToken(res.data.token));
  };
};

const { setToken } = userStore.actions;

const userReducer = userStore.reducer;

export { fetchLogin, setToken };
export default userReducer;
