import { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import backendURL from '../../config'


export default function NewPost() {  

  const [file, setFile] = useState()
  const [caption, setCaption] = useState("")
  const { userToken, setUserToken, user } = useContext(UserContext);
  const navigate = useNavigate()

  const submit = async event => {
    event.preventDefault()

    const formData = new FormData();
    formData.append("image", file)
    formData.append("caption", caption)
    formData.append("token", userToken)
    await axios.post(`${backendURL}/user/posts`, formData, { headers: {'Content-Type': 'multipart/form-data'}})

    navigate("/")
  }

  const fileSelected = event => {
    const file = event.target.files[0]
		setFile(file)
	}

  return (
    <div className="flex flex-col items-center justify-center">

        <form onSubmit={submit} style={{width:650}} className="flex flex-col space-y-5 px-5 py-14">
          <input onChange={fileSelected} type="file" accept="image/*"></input>
          <input value={caption} onChange={e => setCaption(e.target.value)} type="text" placeholder='Caption'></input>
          <button type="submit">Submit</button>
        </form>

    </div>
  )
}