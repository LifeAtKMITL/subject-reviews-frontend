import './blogpost.css';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from 'react';
import axios from 'utils/axios';

interface BolgPost {
  reviewer_name: string;
  date: string;
  subject_id_name: string;
  description: string;
  reviewer_image: string;
  id: string;
  likeCount: string;
}

interface ILike {
  userId: string;
  likeCount: string;
}

const Like = ({ userId, likeCount }: ILike) => {
  const [isLikeActive, setActiveBtn] = useState(false);
  const btn_like = () => {
    axios
      .put('/blogreview/like', { reviewId: userId })
      .then((res) => console.log('Posting data', res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button onClick={btn_like} className='review_btn_like'>
        {isLikeActive ? (
          <ThumbUpAltIcon className='review_btn_likeon' />
        ) : (
          <ThumbUpOffAltIcon className='review_btn_likeoff' />
        )}
        <div className={isLikeActive ? 'review_numlikeon' : 'review_numlikeoff'}>{likeCount}</div>
      </button>
    </div>
  );
};

const BolgPost: React.FC<BolgPost> = ({
  reviewer_name,
  date,
  subject_id_name,
  description,
  reviewer_image,
  id,
  likeCount,
}) => {
  const [isReadmore, setReadmore] = useState(false);
  const [isBookmark, setBookmark] = useState(false);
  const btn_readmore = () => {
    setReadmore((prevState) => !prevState);
  };
  const btn_bookmark = () => {
    setBookmark((prevState) => !prevState);
    axios
      .put('/blogreview/bookmark', { reviewId: id })
      .then((res) => console.log('Posting data', res))
      .catch((err) => console.log(err));
  };

  return (
    <div className='review_box'>
      <div className='review_post'>
        <div className='review_reviewer'>
          <img className='review_img' src={reviewer_image}></img>
          <div className='review_name_date'>
            <div className='review_font_name'>{reviewer_name}</div>
            <div className='review_font_date'>{date}</div>
          </div>
          <div>
            <button onClick={btn_bookmark} className='review_btn_bookmark'>
              {isBookmark ? (
                <BookmarkIcon className='review_color_bookmark' />
              ) : (
                <BookmarkBorderIcon className='review_color_bookmark' />
              )}
            </button>
          </div>
          <div className='review_box_like'>
            <div>
              <Like userId={id} likeCount={likeCount} />
            </div>
          </div>
        </div>
        <div className='review_font_subject'>{subject_id_name}</div>
        <div className='review_font_description'>
          {description && <p>{isReadmore ? description : description.substring(0, 200)}</p>}
          {description && (
            <div>
              {' '}
              {description.length > 200 && (
                <button className='review_btn_readmore' onClick={btn_readmore}>
                  {isReadmore ? 'Read Less ' : '...Read More'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BolgPost;
