import { createSlice } from '@reduxjs/toolkit';
import { request } from '@/utils';
import { setToken as _setToken, getToken } from '@/utils';

const userStore = createSlice({
  name: 'user',
  initialState: {
    // 要先校验localstorage中有没有
    token: getToken() || '',
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      // localStorage也要保存一份，因为redux是基于浏览器内存的，刷新后token会丢失
      _setToken(action.payload);
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
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

const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await request.get('/user/profile');
    dispatch(setUserInfo(res.data));
  };
};

const { setToken, setUserInfo } = userStore.actions;

const userReducer = userStore.reducer;

export { fetchLogin, setToken, fetchUserInfo };
export default userReducer;
