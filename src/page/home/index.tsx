import BolgPost from "components/blogpost";
import SwipeableEdgeDrawer from "components/btn-post";
import Dropdown from "components/dropdown";
import Loading from "components/loading";
import NavBar from "components/navbar";
import SearchButton from "components/searchbutton";
import React, { useEffect, useState } from "react";

import "./home.scss";
import BolgPostBookmark from "components/blogpost-bookmark";
import BlogPost from "components/testBlogPost";
import axios from "utils/axios";

interface IHome {
  id: string;
  bookmarkedReviews: string[];
}

const Home = () => {
  const texts = ["Sci/Math", "Language", "Humanity", "Social", "Elective"];
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const options = texts.filter((option) => !selected.includes(option));
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [dataBookmark, setDataBookmark] = useState<any[]>([]);
  const [dataLike, setDataLike] = useState<any[]>([]);
  const apiUser = "/blogreview/userreviews";
  const apiAllPost = "/blogreview";

  const getPost = async () => {
    setLoading(true);
    const { data: res } = await axios.get(apiAllPost);
    const { data: response } = await axios.get(apiUser);
    setData(res.reverse());
    setDataBookmark(response.bookmarkedReviews);
    setDataLike(response.likedReviews);
    setLoading(false);
  };

  useEffect(() => {
    getPost();
  }, []);
  useEffect(() => {
    data;
  }, [getPost]);

  const handleButtonDropdown = () => {
    setIsActive(!isActive);
  };
  const RemoveSelectedDropdown = (e: string) => {
    const temp = selected.filter((list) => list != e);
    setSelected(temp);
  };
  const handleSelectDropdown = (e: string) => {
    setIsActive(false);
    setSelected((item) => [...item, e]);
  };

  let review = data;
  let r = data;
  if (selected.length > 0) {
    getPost();
    r = [];
    if (selected.includes("Sci/Math")) {
      const filterSubject = review.filter((review) =>
        review.subjectId.includes("901")
      );
      r.push(...filterSubject);
    }
    if (selected.includes("Language")) {
      const filterSubject = review.filter((review) =>
        review.subjectId.includes("902")
      );
      r.push(...filterSubject);
    }
    if (selected.includes("Humanity")) {
      const filterSubject = review.filter((review) =>
        review.subjectId.includes("903")
      );
      r.push(...filterSubject);
    }
    if (selected.includes("Social")) {
      const filterSubject = review.filter((review) =>
        review.subjectId.includes("904")
      );
      r.push(...filterSubject);
    }
    if (selected.includes("Elective")) {
      const filterSubject = review.filter((review) =>
        review.subjectId.includes("905")
      );
      r.push(...filterSubject);
    }
  }
  return (
    <div className="home_bg">
      <NavBar />
      <div className="feature__container">
        <Dropdown
          selected={selected}
          isActive={isActive}
          options={options}
          handleButton={handleButtonDropdown}
          RemoveSelected={RemoveSelectedDropdown}
          handleSelectDropdown={handleSelectDropdown}
        />
        <div className="search__test">
          <SearchButton />
        </div>
      </div>
      {isLoading ? (
        <div className="loading">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="m_blogpost">
          {r.map((e) => {
            // let tempBK = dataBookmark.find((element) => element.reviewId === e._id);
            // let tempLK = dataLike.find((element) => element.reviewId === e._id);
            const newDate = new Date(e.date); //-------------------------------
            return (
              <BlogPost
                reviewer_name={e.username}
                date={newDate.toUTCString()}
                description={e.textSubjectReview}
                subject_id_name={e.subjectId + " " + e.subjectName}
                reviewer_image={e.imagePath}
                id={e._id}
                likeCount={e.likeCount}
                isBookMark={dataBookmark.find(
                  (element) => element.reviewId === e._id
                )}
                isLike={dataLike.find((element) => element.reviewId === e._id)}
              />
            );
          })}
          <SwipeableEdgeDrawer getPost={getPost} />
        </div>
      )}
    </div>
  );
};

export default Home;
