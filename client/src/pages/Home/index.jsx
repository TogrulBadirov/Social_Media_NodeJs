
import Posts from "../../components/HomePageComponents/Posts"
import "./index.scss"

const Home = () => {
  return (
    <div className="home">
      <div className="home-page-elems">
      <Posts/>
      <div className="friends">
    friend
      </div>
      <div className="logo">
      <h3>MY LOGO</h3>
      </div>
      </div>
      </div>
  )
}

export default Home