import React, { useState } from "react";
import images from "../../constants/images";

const Comment = ({
  profile = images.user2image,
  name = "James Smith",
  text = "Comment text",
  commentDate = "January 27, 2021",
  replyOnClick = () => null,
  repliesData = [],
}) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="comment">
      <div className="comment-top">
        <div className="comment-top-img">
          <img src={profile} />
        </div>
        <h4>{name}</h4>
        <p>{commentDate}</p>
      </div>
      <p className="comment-text">{text}</p>
      {/* <p className="comment-reply" onClick={() => replyOnClick()}>
        Reply
      </p> */}
      {repliesData.length ? (
        <p
          className="comment-replies"
          onClick={() => setShowReplies(!showReplies)}
        >
          {!showReplies ? "Show Replies" : "Hide Replies"}
        </p>
      ) : null}
      {showReplies && (
        <div className="comment-reply-container">
          {repliesData?.map((reply) => {
            return (
              <div className="comment-reply-box">
                <div className="comment-top">
                  <div className="comment-top-img">
                    <img src={reply.user?.avatar?.croppedImage} />
                  </div>
                  <h4>{`${reply?.user?.firstName} ${reply?.user?.lastName}`}</h4>
                  <p>January 27, 2021 at 8:41 am</p>
                </div>
                <p className="comment-text">{reply?.comment}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
