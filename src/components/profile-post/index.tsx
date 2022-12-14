import React, { useEffect, useState } from "react";
import "./index.scss";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import BolgPost from "components/blogpost";

import Loading from "components/loading";
import BlogPost from "components/testBlogPost";
import axios from "utils/axios";
import BolgPostUser from "components/blogpost-post";

interface IProfilePost {
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

const ProfilePost = () => {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState<IProfilePost[]>([]);
  const [dataBookmark, setDataBookmark] = useState<any[]>([]);
  const [dataLike, setDataLike] = useState<any[]>([]);
  const apiPostProfile = "/blogreview/profile";
  const apiUser = "/blogreview/userreviews";
  const apiBookmark = "/blogreview/bookmarkedreview";
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [isLoadingProfile, setLoadingProfile] = useState(false);
  useEffect(() => {
    setLoadingProfile(true);
    const getPostProfile = async () => {
      const { data: res } = await axios.get(apiPostProfile);
      const { data: response } = await axios.get(apiUser);
      setData(res.reverse());
      setDataBookmark(response.bookmarkedReviews);
      setDataLike(response.likedReviews);
      setLoadingProfile(false);
    };
    getPostProfile();
  }, []);
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handleAllButton = () => {
    setIsActive(!isActive);
  };

  // const newDatePost0 = new Date(data[0].date);
  return (
    <div className="Post__container">
      <div className="header__postProfile">
        <div className="left__header">
          <AddIcon className="Add__icon" />
          <div className="txt__post">Post ({data.length})</div>
        </div>
        <div className="right__header">
          <div className="all__button" onClick={handleAllButton}>
            {!isActive ? "All" : "Less"}
          </div>
        </div>
      </div>
      <div className="reviewpost__blog">
        {isLoadingProfile ? (
          <div className="loading">
            <div className="loader"></div>
          </div>
        ) : (
          <div>
            {" "}
            {isActive ? (
              <div>
                {data.map((e) => {
                  let tempBK1 = dataBookmark.find(
                    (element) => element.reviewId === e._id
                  );
                  let tempLK1 = dataLike.find(
                    (element) => element.reviewId === e._id
                  );
                  const newDatePost = new Date(e.date);
                  return (
                    <BolgPostUser
                      reviewer_name={e.username}
                      date={newDatePost.toUTCString()}
                      description={e.textSubjectReview}
                      subject_id_name={e.subjectId + " " + e.subjectName}
                      reviewer_image={e.imagePath}
                      id={e._id}
                      likeCount={e.likeCount}
                      isLike={tempLK1}
                    />
                  );
                })}
              </div>
            ) : (
              <div>
                {data.length > 0 ? (
                  <BolgPostUser
                    reviewer_name={data[0].username}
                    date={data[0].date}
                    description={data[0].textSubjectReview}
                    subject_id_name={
                      data[0].subjectId + " " + data[0].subjectName
                    }
                    reviewer_image={data[0].imagePath}
                    id={data[0]._id}
                    likeCount={data[0].likeCount}
                    isLike={dataLike.find(
                      (element) => element.reviewId === data[0]._id
                    )}
                  />
                ) : (
                  <div>No Post</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePost;
