import Home from 'page/home';
import React, { useState } from 'react';
import axios from 'utils/axios';
import './postForm.css';

const PostForm = () => {
  const [subjectId, setSubjectId] = useState('');
  const [textSubjectReview, setTextSubjectReview] = useState('');
  const handlePost = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      axios
        .post('/blogreview', { subjectId, textSubjectReview })
        .then((res) => console.log('Posting data', res))
        .catch((err) => console.log(err));
      alert('Post Completed!!');
      <Home />;
    } catch (error) {
      alert('Subject Id not found.');
      return null;
    }
  };

  return (
    <div>
      <form className='form_container' onSubmit={handlePost}>
        <div className='modal_heading'>
          <span className='modal_h_style modal_color_w'>Post Review</span>
          <input type='submit' value='Post' className='modal_h_style modal_color_b'></input>
        </div>
        <div className='modal_hr'></div>
        <div className='form_style'>
          <input
            onChange={(e) => setSubjectId(e.target.value)}
            id='subjectId'
            value={subjectId}
            type='text'
            placeholder='Subject id'
            className='form_subjectID'
          />
          <textarea
            onChange={(e) => setTextSubjectReview(e.target.value)}
            id='textSubjectReview'
            value={textSubjectReview}
            placeholder='Review Detail'
            className='form_detail'
            rows={5}
          />
        </div>
      </form>
    </div>
  );
};

export default PostForm;
