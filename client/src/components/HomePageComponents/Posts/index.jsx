import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import backendURL from "../../../config";
import { UserContext } from "../../../context/UserContext";
import "./index.scss";

import Post from "../../Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { userToken, setUserToken, user } = useContext(UserContext);
  
  async function getPosts() {
    try {
      const result = await axios.get(`${backendURL}/posts`, {
        headers: {
          Authorization: `Bearer ${userToken}`, // Include the token in the Authorization header
        },
      });
      setPosts(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  useEffect(() => {

    getPosts();
  }, []);
  return (
    <section id="Posts">
      <div className="container">
        <div className="post-filter">
          <button className="active">Popular</button>
          {/* <button className="active">Following</button> */}
          {/* <button>Popular</button> */}
        </div>
        <div className="posts">
          {posts &&
            posts.map((item) => (
              <Post key={item._id} item={item} setPosts={setPosts} posts={posts}/>
            ))}

        
        </div>
      </div>
    </section>
  );
};

export default Posts;
