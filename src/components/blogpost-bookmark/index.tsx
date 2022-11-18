import React, { useState, useEffect } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "utils/axios";
import "./index.css";

interface BolgPost {
  reviewer_name: string;
  date: string;
  subject_id_name: string;
  description: string;
  reviewer_image: string;
  id: string;
  likeCount: string;
  isLike: boolean;
  isBookMark: boolean;
}

interface ILike {
  userId: string;
}

const Like = ({ userId }: ILike) => {
  const [likeCount, setLikeCount] = useState(5);
  const [isLikeActive, setActiveBtn] = useState(false);

  const handleLikeClick = () => {
    console.log(userId);
    if (!isLikeActive) {
      setLikeCount(likeCount + 1);
      setActiveBtn((prevState) => !prevState);
      return;
    } else {
      setLikeCount(likeCount - 1);
      setActiveBtn((prevState) => !prevState);
      return;
    }
  };

  return (
    <div>
      <button onClick={handleLikeClick} className="review_btn_like">
        {isLikeActive ? (
          <ThumbUpAltIcon className="review_btn_likeon" />
        ) : (
          <ThumbUpOffAltIcon className="review_btn_likeoff" />
        )}
        <div
          className={isLikeActive ? "review_numlikeon" : "review_numlikeoff"}
        >
          {likeCount}
        </div>
      </button>
    </div>
  );
};
const BolgPostBookmark = ({
  reviewer_name,
  date,
  subject_id_name,
  description,
  reviewer_image,
  id,
  likeCount,
  isBookMark,
  isLike,
}: BolgPost) => {
  const [isReadmore, setReadmore] = useState(false);
  const [isBook, setBook] = useState(isBookMark);
  const [isOnLike, setOnLike] = useState(isLike);
  const [numlike, setnumlike] = useState(Number(likeCount));
  const btn_readmore = () => {
    setReadmore((prevState) => !prevState);
  };
  const btn_delBookmark = () => {
    setBook((prevState) => !prevState);
    axios
      .delete("/blogreview/bookmark", {
        data: {
          reviewId: id,
        },
      })
      .then((res) => console.log("Posting data", res))
      .catch((err) => console.log(err));
    setBook(false);
  };

  const btn_like = () => {
    if (isOnLike) {
      setOnLike((prevState) => !prevState);
      setnumlike(numlike - 1);
      axios.put("/blogreview/like", { reviewId: id });
    } else {
      setOnLike((prevState) => !prevState);
      setnumlike(numlike + 1);
      axios.put("/blogreview/like", { reviewId: id });
    }
  };
  return (
    <div className="review_box">
      <div className="review_post">
        <div className="review_reviewer">
          <img className="review_img" src={reviewer_image}></img>
          <div className="review_name_date">
            <div className="review_font_name">{reviewer_name}</div>
            <div className="review_font_date">{date}</div>
          </div>
          <div>
            <button onClick={btn_delBookmark} className="review_btn_bookmark">
              {isBook ? (
                <BookmarkBorderIcon className="review_color_bookmark" />
              ) : (
                <BookmarkIcon className="review_color_bookmark" />
              )}
            </button>
          </div>
          <div className="review_box_like">
            <div>
              <div>
                <button onClick={btn_like} className="review_btn_like">
                  {isOnLike ? (
                    <ThumbUpAltIcon className="review_btn_likeon" />
                  ) : (
                    <ThumbUpOffAltIcon className="review_btn_likeoff" />
                  )}
                  <div
                    className={
                      isOnLike ? "review_numlikeon" : "review_numlikeoff"
                    }
                  >
                    {Number(numlike)}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="review_font_subject">{subject_id_name}</div>
        <div className="review_font_description">
          {description && (
            <p>{isReadmore ? description : description.substring(0, 200)}</p>
          )}
          {description && (
            <div>
              {" "}
              {description.length > 200 && (
                <button className="review_btn_readmore" onClick={btn_readmore}>
                  {isReadmore ? "Read Less " : "...Read More"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BolgPostBookmark;