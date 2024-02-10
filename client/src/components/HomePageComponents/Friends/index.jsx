import React from "react";
import "./index.scss";
const Friends = () => {
  return (
    <section id="Friends">
      <div className="container">
        <div className="header">
            <h4>Friends</h4>
        </div>
        <div className="friends">
          <div className="friend">
            <div className="profile-image">
              <img
                src="https://images.pexels.com/photos/1310474/pexels-photo-1310474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </div>
            <div className="username">
                @guest_user
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Friends;
