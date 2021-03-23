import React, {useEffect, useState} from 'react';
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import config from "../config.json";

function UserReview(props) {
  const [data, setData] = useState('')

  useEffect(() => {
    let { id } = props.match.params;
    const apiUrl = config.api.url + "/user-review/" + id;
    fetch(apiUrl)
      .then((response) => {
          response.json().then(rawResponse => {
              console.log(rawResponse)
              setData(rawResponse)
          }).catch(err => console.log(err))
      });
  }, [])

  return (
      <div className="App">
        <Nav />
        <div className="content">
          <p>{data}</p>
        </div>
      </div>
  )
}

export default UserReview;