import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import config from '../config.json'

function UserReview(props) {
  const [data, setData] = useState([])

  useEffect(() => {
    const apiUrl = config.api.url + '/user-review/'
    fetch(apiUrl, {
      headers: {
        Authorization: localStorage['auth']
      }
    }).then(response => {
      response
        .json()
        .then(rawResponse => {
          // console.log(rawResponse.body)
          setData(rawResponse.body)
        })
        .catch(err => console.log(err))
    })
  }, [])

  return (
    <div className='App'>
      <Nav />
      <div className='content'>
        {data.map(review => (
          <li>
            {review.Username}, {review.Reviewer}, {review.Rating},{' '}
            {review.Comment}
          </li>
        ))}
      </div>
    </div>
  )
}

export default UserReview
