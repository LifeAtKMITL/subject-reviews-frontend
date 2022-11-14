import React, { useEffect, useState } from 'react';
import axios from 'utils/axios';
import './profileUser.css';

const ProfileUser = () => {
  const [userName, setUserName] = useState();
  const [userImg, setUserImg] = useState();
  const apiUserProfile = '/blogreview/userreviews';
  useEffect(() => {
    const getuserProfile = async () => {
      const { data: res } = await axios.get(apiUserProfile);
      setUserName(res.username);
      setUserImg(res.image);
    };
    getuserProfile();
  }, []);

  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const apiBookmark = '/blogreview/bookmarkedreview';
  useEffect(() => {
    const getBookmarks = async () => {
      const { data: res } = await axios.get(apiBookmark);
      setBookmarks(res);
    };
    getBookmarks();
  }, [bookmarks]);

  const [data, setData] = useState<any[]>([]);
  const apiPostProfile = '/blogreview/profile';
  useEffect(() => {
    const getPostProfile = async () => {
      const { data: res } = await axios.get(apiPostProfile);
      setData(res);
    };
    getPostProfile();
  }, []);

  return (
    <div className='user_container'>
      <div className='user_box'>
        <img src={userImg} alt='' />
        <div className='user_detail'>
          <h1>{userName}</h1>
          <div className='user_num'>
            <div className='user_post'>
              <div className='font_style'>{data.length}</div>
              <div className='font_style'>Post</div>
            </div>
            <div className='user_bookmark'>
              <div className='font_style'>{bookmarks.length}</div>
              <div className='font_style'>Bookmark</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
