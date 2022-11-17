import React, { useEffect, useState } from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import AddIcon from "@mui/icons-material/Add";
import "./btnPost.css";
import PostForm from "components/post-form";
import axios from "utils/axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Value } from "sass";

interface ISuggestionDrawer {
  window?: () => Window;
}

const Root = styled("div")(() => ({
  height: "100%",
  backgroundColor: grey[100],
}));

const StyledBox = styled(Box)(() => ({
  backgroundColor: "#232528",
}));

const Puller = styled(Box)(() => ({
  width: 80,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: "absolute",
  top: 15,
  left: "50%",
  transform: "translateX(-50%)",
}));

const drawerBleeding = 56;

const SubjectDrawer = ({ window }: ISuggestionDrawer) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [subjectId, setSubjectId] = useState("");
  const [textSubjectReview, setTextSubjectReview] = useState("");
  const handlePost = (e: React.FormEvent<HTMLFormElement>) => {
    if (subjectId.trim() != "" && textSubjectReview.trim() != "") {
      try {
        e.preventDefault();
        axios
          .post("/blogreview", { subjectId, textSubjectReview })
          .then((res) => console.log("Posting data", res))
          .catch((err) => console.log(err));
        alert("Post สำเร็จ");
        setSubjectId("");
        setTextSubjectReview("");
        setOpen(false);
      } catch (error) {
        alert("Subject Id not found.");
        return null;
      }
    } else if (subjectId.trim() == "") {
      e.preventDefault();
      alert("โปรดพิมพ์รหัสวิชาให้ถูกต้อง");
    } else if (
      textSubjectReview.length == 0 ||
      textSubjectReview.trim() == ""
    ) {
      e.preventDefault();
      alert("โปรดพิมพ์ข้อความ");
    } else {
      e.preventDefault();
      alert("โปรดพิมพ์รหัสวิชาและข้อความ");
    }
  };

  const [subject, setSubject] = React.useState<any[]>([]);
  const apiBookmark = "/subject/gened";
  React.useEffect(() => {
    const getSubject = async () => {
      const { data: res } = await axios.get(apiBookmark);
      setSubject(res);
      console.log(res);
    };
    getSubject();
  }, []);

  return (
    <Root>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(75% - ${drawerBleeding}px)`,
            overflow: "visible",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}
      />
      <div className="btn_post">
        <button className="btn_add" onClick={() => setOpen((prev) => !prev)}>
          <AddIcon className="btn_style" />
        </button>
      </div>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            px: 3,
            pb: 2,
            height: "100%",
            overflow: "auto",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <Puller />
          {/* <PostForm /> */}
          <div>
            <form className="form_container" onSubmit={handlePost}>
              <div className="modal_heading">
                <span className="modal_h_style modal_color_w">Post Review</span>
                <input
                  type="submit"
                  value="Post"
                  className="modal_h_style modal_color_b"
                ></input>
              </div>
              <div className="modal_hr"></div>
              <div className="form_style form">
                <Stack spacing={2} sx={{ width: "100%" }}>
                  <Autocomplete
                    id="subjectId"
                    freeSolo
                    options={subject.map(
                      (option) => option.subjectId + " " + option.name
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Subject id"
                        sx={{ label: { color: "#707070" } }}
                      />
                    )}
                    onChange={(_, data) =>
                      data ? setSubjectId(data.substr(0, 8)) : setSubjectId("")
                    }
                  />
                </Stack>
                <textarea
                  onChange={(e) => setTextSubjectReview(e.target.value)}
                  id="textSubjectReview"
                  value={textSubjectReview}
                  placeholder="Review Detail"
                  className="form_detail"
                  rows={5}
                />
              </div>
            </form>
          </div>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
};

export default SubjectDrawer;
