// 封装高阶组件
// 有token正常跳转，无token跳转登录页面

import { getToken } from '@/utils';
import { Navigate } from 'react-router-dom';

export function AuthRoute({ children }) {
  const token = getToken();
  // 有token，直接跳转到原本要跳转的页面，注意写法
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to={'/login'} replace></Navigate>;
  }
}
