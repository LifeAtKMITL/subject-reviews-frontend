import "./index.css";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useEffect, useState } from "react";
import axios from "utils/axios";

interface BlogPost {
  reviewer_name: string;
  date: string;
  subject_id_name: string;
  description: string;
  reviewer_image: string;
  id: string;
  likeCount: string;
  isLike: boolean;
  isBookMark: boolean;
  // userId_Like: string;
  // objId: string;
}

interface ILike {
  userId: string;
  likeCount: string;
  isLike: boolean;
  // objId: string;
}

const BlogPost: React.FC<BlogPost> = ({
  reviewer_name,
  date,
  subject_id_name,
  description,
  reviewer_image,
  id,
  likeCount,
  isBookMark,
  isLike,
}) => {
  const [isReadmore, setReadmore] = useState(false);
  const [isOnLike, setOnLike] = useState(false);
  const [isBook, setBook] = useState(false);
  const [numlike, setnumlike] = useState(0);
  const btn_readmore = () => {
    setReadmore((prevState) => !prevState);
  };
  useEffect(() => {
    setBook(isBookMark);
  }, []);
  const btn_bookmark = () => {
    setBook(false);
    if (isBookMark) {
      axios.delete("/blogreview/bookmark", {
        data: {
          reviewId: id,
        },
      });
    } else setBook(true);
    axios.put("/blogreview/bookmark", { reviewId: id });
  };

  useEffect(() => {
    setOnLike(isLike);
  }, []);

  useEffect(() => {
    setnumlike(Number(likeCount));
  }, []);

  const btn_like = () => {
    if (isLike) {
      axios.put("/blogreview/like", { reviewId: id });
      setOnLike((prevState) => !prevState);
      setnumlike(numlike - 1);
    } else {
      axios.put("/blogreview/like", { reviewId: id });
      setOnLike((prevState) => !prevState);
      setnumlike(numlike + 1);
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
            <button onClick={btn_bookmark} className="review_btn_bookmark">
              {isBook ? (
                <BookmarkIcon className="review_color_bookmark" />
              ) : (
                <BookmarkBorderIcon className="review_color_bookmark" />
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

export default BlogPost;
