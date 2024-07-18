import { createSlice } from '@reduxjs/toolkit';
import { removeToken } from '@/utils';
import { setToken as _setToken, getToken } from '@/utils';
import { getProfileAPI, loginAPI } from '@/apis/user';

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
    clearUserInfo(state) {
      state.token = '';
      state.userInfo = {};
      removeToken();
    },
  },
});

// 异步方法获取登录token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await loginAPI(loginForm);
    dispatch(setToken(res.data.token));
  };
};

const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await getProfileAPI();
    dispatch(setUserInfo(res.data));
  };
};

const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

const userReducer = userStore.reducer;

export { fetchLogin, fetchUserInfo, clearUserInfo };
export default userReducer;
