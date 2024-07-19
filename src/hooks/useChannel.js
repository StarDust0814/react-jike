// 封装获取频道列表逻辑
import { useState, useEffect } from 'react';
import { getChannelAPI } from '@/apis/article';
function useChannel() {
  // 获取频道列表
  const [channelList, setChannelList] = useState([]);
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };
    // 利用useEffect触发异步获取后端接口
    getChannelList();
  }, []);
  return { channelList };
}

export { useChannel };
