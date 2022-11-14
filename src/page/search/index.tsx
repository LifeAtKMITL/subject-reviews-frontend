import BolgPost from 'components/blogpost';
import Loading from 'components/loading';
import Searchbar from 'components/searchbar';
import BlogPost from 'components/testBlogPost';
import React, { useEffect, useState } from 'react';
import axios from 'utils/axios';
import './index.scss';

interface IPost {
  _id: string;
  subjectId: string;
  subjectName: string;
  textSubjectReview: string;
  userID: string;
  likeCount: string;
  date: string;
  username: string;
  imagePath: string;
}

const Search = () => {
  const [textInput, setTextInput] = useState('');
  const [items, setItems] = useState<IPost[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [dataBookmark, setDataBookmark] = useState<any[]>([]);
  const [dataLike, setDataLike] = useState<any[]>([]);
  const apiUser = '/blogreview/userreviews';
  const apiAllPost = '/blogreview';
  useEffect(() => {
    const getPost = async () => {
      const { data: res } = await axios.get(apiAllPost);
      const { data: response } = await axios.get(apiUser);
      setData(res);
      setDataBookmark(response.bookmarkedReviews);
      setDataLike(response.likedReviews);
    };
    getPost();
    // console.log(dataBookmark);
  }, [data]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setTextInput(e.currentTarget.value);
    console.log(textInput);
  };

  let review = data;
  if (textInput) {
    const filterSubject = review.filter((review) => review.subjectId.includes(textInput));
    console.log(filterSubject);
    review = [...filterSubject];
    console.log(review);
  }

  return (
    <div className='searchpage__container'>
      <Searchbar fun={handleInput} />
      <div className='post__searchpage'>
        {review.reverse().map((e) => {
          let tempBK = dataBookmark.find((element) => element.reviewId === e._id);
          let tempLK = dataLike.find((element) => element.reviewId === e._id);
          console.log('temp', tempBK);
          return (
            <BlogPost
              reviewer_name={e.username}
              date={e.date}
              description={e.textSubjectReview}
              subject_id_name={e.subjectId + ' ' + e.subjectName}
              reviewer_image={e.imagePath}
              id={e._id}
              likeCount={e.likeCount}
              isBookMark={tempBK}
              isLike={tempLK}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
