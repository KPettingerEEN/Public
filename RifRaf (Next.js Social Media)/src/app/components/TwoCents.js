import React from 'react';
import { RiHeart3Line, RiHeart3Fill, RiArrowLeftDoubleLine, RiArrowRightWideLine } from "react-icons/ri";

const Comments = ( openComments, video ) => {
  const handleCommentLike = (commentIndex) => {
    const updatedComments = video.Comments.map((comment, index) => {
      if (index === commentIndex) {
        return { ...comment, Likes: comment.Likes + 1, Liked: true };
      }
      return comment;
    });
    setVideo({ ...video, Comments: updatedComments });
  };
  
  const handleSubcommentLike = (commentIndex, subcommentIndex) => {
    const updatedComments = video.Comments.map((comment, index) => {
      if (index === commentIndex) {
        const updatedSubcoms = comment.Subcoms.map((subcom, subIndex) => {
          if (subIndex === subcommentIndex) {
            return { ...subcom, Likes: subcom.Likes + 1, Liked: true };
          }
          return subcom;
        });
        return { ...comment, Subcoms: updatedSubcoms };
      }
      return comment;
    });
    setVideo({ ...video, Comments: updatedComments });
  };
    

  return (
    <div className="comments-section">
      <div className="comments-header">
        <button onClick={openComments} style={{marginTop: '-3px', marginLeft: '-5px'}}>
          <RiArrowLeftDoubleLine size={25} />
        </button>
        <h5>2-Cents</h5>
      </div>
      {video.Comments.map((comment, commentIndex) => (
        <div key={commentIndex} className="comment">
          <label>{comment.User}</label>
          <p>{comment.Comment}</p>
          <div>
            {comment.Liked ? (
              <RiHeart3Fill size={15} style={{ marginRight: '5px' }} />
            ) : (
              <RiHeart3Line size={15} style={{ marginRight: '5px' }} onClick={() => handleCommentLike(commentIndex)} />
            )}
            <span style={{ float: 'right' }}>{comment.Likes}</span>
          </div>
          {comment.Subcoms.map((subcom, subIndex) => (
            <div key={subIndex} className="subcomment">
              <label>{subcom.User}</label>
              <p>{subcom.Comment}</p>
              <div>
                {subcom.Liked ? (
                  <RiHeart3Fill size={13} style={{ marginRight: '5px' }} />
                ) : (
                  <RiHeart3Line size={13} style={{ marginRight: '5px' }} onClick={() => handleSubcommentLike(commentIndex, subIndex)} />
                )}
                <span style={{ float: 'right' }}>{subcom.Likes}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
      <textarea
        style={{
          position: 'fixed', left: '5px', right: '45px', bottom: '5px', minHeight: '50px', maxHeight: '50px',
          backgroundColor: 'rgb(239, 239, 239)', borderColor: 'white', borderRadius: '4px', padding: '6px', 
          fontFamily: 'sans-serif'
        }}
      />
      <button
        style={{
          position: 'fixed', bottom: '5px', right: '3px', width: '40px', height: '64px', backgroundColor: 'rgb(80, 70, 190)',
          border: 'solid 1px white', borderRadius: '4px'
        }}
      >
        <RiArrowRightWideLine size={25} style={{ color: 'white' }} />
      </button>
    </div>
  )
};

export default Comments;