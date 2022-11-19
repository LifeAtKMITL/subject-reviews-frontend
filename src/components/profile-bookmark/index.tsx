import Bookmark from "@mui/icons-material/Bookmark";

import BolgPost from "components/blogpost";
import BolgPostBookmark from "components/blogpost-bookmark";
import { useState, useEffect } from "react";
import axios from "utils/axios";
import "./profilebookmark.css";

const ProfileBookmark = () => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [dataBookmark, setDataBookmark] = useState<any[]>([]);
  const [dataLike, setDataLike] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]); //
  const [isLoadingProfile, setLoadingProfile] = useState(false);
  let r: any; //
  let chck = true; //
  const apiBookmark = "/blogreview/bookmarkedreview";
  const apiUser = "/blogreview/userreviews";
  const apiAllPost =
    "https://life-at-kmitl-backend-production.up.railway.app/blogreview"; //

  const getBookmarks = async () => {
    setLoadingProfile(true);
    const { data: res } = await axios.get(apiBookmark);
    const { data: response } = await axios.get(apiUser);
    const { data: resp } = await axios.get(apiAllPost); //
    setBookmarks(res);
    setData(resp); //
    setDataBookmark(response.bookmarkedReviews);
    setDataLike(response.likedReviews);
    setLoadingProfile(false);
  };
  useEffect(() => {
    getBookmarks();
  }, []);

  useEffect(() => {
    bookmarks;
  }, [bookmarks]);

  const [isAll, setAll] = useState(false);
  const toggleBtn = () => {
    setAll((prevState) => !prevState);
  };
  if (chck) {
    data.map((e) => {
      const newDate0 = new Date(e.date);
      let tempBK = dataBookmark.find((element) => element.reviewId === e._id);
      if (tempBK && chck) {
        r = e;
        r.date = newDate0.toUTCString();
        chck = false;
      }
    });
  } //

  return (
    <div className="bookmark_container">
      <div className="bookmark_box">
        <div className="bookmark_top">
          <div className="bookmark_head">
            <Bookmark className="bookmark_icon" />
            <div>Bookmark</div>
            <div>({bookmarks.length})</div>
          </div>
          <button className="bookmark_all" onClick={toggleBtn}>
            {isAll ? "Less" : "All"}
          </button>
        </div>
        <div>
          {isLoadingProfile ? (
            <div className="loading">
              <div className="loader"></div>
            </div>
          ) : (
            <div>
              {isAll ? (
                <div>
                  {data.map((e) => {
                    let tempBK1 = dataBookmark.find(
                      (element) => element.reviewId === e._id
                    );
                    let tempLK1 = dataLike.find(
                      (element) => element.reviewId === e._id
                    );
                    const newDate = new Date(e.date);
                    return (
                      tempBK1 && (
                        <BolgPostBookmark
                          reviewer_name={e.username}
                          date={newDate.toUTCString()}
                          description={e.textSubjectReview}
                          subject_id_name={e.subjectId + " " + e.subjectName}
                          reviewer_image={e.imagePath}
                          id={e._id}
                          likeCount={e.likeCount}
                          isBookMark={tempBK1}
                          isLike={tempLK1}
                          getPost={getBookmarks}
                        />
                      )
                    ); //
                  })}
                </div>
              ) : (
                <div>
                  {bookmarks.length == 0 ? (
                    <div>No Bookmark</div>
                  ) : (
                    <div>
                      {bookmarks.reverse().length > 0 ? (
                        <BolgPostBookmark
                          reviewer_name={r.username}
                          date={r.date}
                          description={r.textSubjectReview}
                          subject_id_name={r.subjectId + " " + r.subjectName}
                          reviewer_image={r.imagePath}
                          id={r._id}
                          likeCount={r.likeCount}
                          isBookMark={dataBookmark.find(
                            (element) => element.reviewId === r._id
                          )}
                          isLike={dataLike.find(
                            (element) => element.reviewId === r._id
                          )}
                          getPost={getBookmarks}
                        /> //
                      ) : (
                        <div>No Bookmark</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBookmark;
