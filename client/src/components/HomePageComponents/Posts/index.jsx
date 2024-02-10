import React from "react";
import "./index.scss";
const Posts = () => {
  return (
    <section id="Posts">
      <div className="container">
        <div className="post-filter">
          <button className="active">Following</button>
          <button>Popular</button>
        </div>
        <div className="posts">
          <div className="post">
            <div className="user-info">
              <div className="user-data-container">
                <div className="image-border">
                  <div className="profile-image">
                    <img
                      src="https://images.pexels.com/photos/1310474/pexels-photo-1310474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt=""
                    />
                  </div>
                </div>
                <div className="username-date">
                  <h4 className="profile-name">Guest User</h4>
                  <p className="post-upload-date">32 min. ago</p>
                </div>
              </div>
              <div className="post-settings">
                <button className="settings-button">···</button>
              </div>
            </div>
            <div className="post-image">
              <img
                src="https://images.pexels.com/photos/773147/pexels-photo-773147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </div>
            <div className="post-actions">
              <div className="like-comment">
                <div className="likes">
                  <button className="action-button like-button">+</button> <p>201 Likes</p>
                </div>
                <div className="comments">
                  <button className="action-button comment-button">C</button>
                  <p>12 Comment</p>
                </div>
              </div>

              <div className="share">
                <button className="action-button share-button">+</button>
              </div>
            </div>
            <div className="post-description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ullam omnis suscipit, expedita et odio dolorum iusto deserunt aliquid! Voluptate explicabo at dignissimos similique, ducimus magni possimus aperiam laborum a nulla rerum, soluta quasi enim sequi praesentium dolor ab natus sunt ipsa ipsam laudantium necessitatibus. Quam praesentium placeat dolorum temporibus!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Posts;
