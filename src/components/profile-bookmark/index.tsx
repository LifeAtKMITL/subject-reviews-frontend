import Bookmark from '@mui/icons-material/Bookmark';

import BolgPost from 'components/blogpost';
import BolgPostBookmark from 'components/blogpost-bookmark';
import { useState, useEffect } from 'react';
import axios from 'utils/axios';
import './profilebookmark.css';

const ProfileBookmark = () => {
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [dataBookmark, setDataBookmark] = useState<any[]>([]);
  const [dataLike, setDataLike] = useState<any[]>([]);
  const apiBookmark = '/blogreview/bookmarkedreview';
  const apiUser = '/blogreview/userreviews';
  useEffect(() => {
    const getBookmarks = async () => {
      const { data: res } = await axios.get(apiBookmark);
      const { data: response } = await axios.get(apiUser);
      setBookmarks(res);
      setDataBookmark(response.bookmarkedReviews);
      setDataLike(response.likedReviews);
    };
    getBookmarks();
    setLoading(false);
  }, [bookmarks]);

  const [isAll, setAll] = useState(false);
  const toggleBtn = () => {
    setAll((prevState) => !prevState);
  };

  if (loading) return <div>...loading</div>;

  return (
    <div className='bookmark_container'>
      <div className='bookmark_box'>
        <div className='bookmark_top'>
          <div className='bookmark_head'>
            <Bookmark className='bookmark_icon' />
            <div>Bookmark</div>
            <div>({bookmarks.length})</div>
          </div>
          <button className='bookmark_all' onClick={toggleBtn}>
            {isAll ? 'Less' : 'All'}
          </button>
        </div>
        <div>
          {isAll ? (
            <div>
              {bookmarks.reverse().map((e) => {
                let tempBK1 = dataBookmark.find((element) => element.reviewId === e._id);
                let tempLK1 = dataLike.find((element) => element.reviewId === e._id);
                return (
                  <BolgPostBookmark
                    reviewer_name={e.username}
                    date={e.date}
                    description={e.textSubjectReview}
                    subject_id_name={e.subjectId + ' ' + e.subjectName}
                    reviewer_image={e.imagePath}
                    id={e._id}
                    likeCount={e.likeCount}
                    isBookMark={tempBK1}
                    isLike={tempLK1}
                  />
                );
              })}
            </div>
          ) : (
            <div>
              {bookmarks.reverse().length > 0 ? (
                <BolgPostBookmark
                  reviewer_name={bookmarks[0].username}
                  date={bookmarks[0].date}
                  description={bookmarks[0].textSubjectReview}
                  subject_id_name={bookmarks[0].subjectId + ' ' + bookmarks[0].subjectName}
                  reviewer_image={bookmarks[0].imagePath}
                  id={bookmarks[0]._id}
                  likeCount={bookmarks[0].likeCount}
                  isBookMark={dataBookmark.find((element) => element.reviewId === bookmarks[0]._id)}
                  isLike={dataLike.find((element) => element.reviewId === bookmarks[0]._id)}
                />
              ) : (
                <div>No Bookmark</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBookmark;
