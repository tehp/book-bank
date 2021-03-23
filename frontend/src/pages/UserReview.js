import React, {useEffect, useState} from 'react';
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import config from "../config.json";

function UserReview(props) {
  const [data, setData] = useState({Username:'', Reviewer:'', Rating:0, Comment:''})

  useEffect(() => {
    let { id } = props.match.params;
    const apiUrl = config.api.url + "/user-review/" + id;
    fetch(apiUrl)
      .then((response) => {
          response.json().then(rawResponse => {
              console.log(rawResponse)
              setData(rawResponse[0])
          }).catch(err => console.log(err))
      });
  }, [])

  return (
      <div className="App">
        <Nav />
        <div className="content">
            {/*<li value={data.Username}>Username:</li>*/}
          <p>Username: {data.Username}</p>
          <p>Reviewer: {data.Reviewer}</p>
          <p>Rating:: {data.Rating}</p>
          <p>Comment: {data.Comment}</p>
        </div>
      </div>
  )
}

export default UserReview;