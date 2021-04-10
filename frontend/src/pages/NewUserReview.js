import React, { useState } from 'react'
import Nav from '../components/Nav'
import { useHistory } from 'react-router-dom'
import config from '../config.json'

function NewUserReview() {
  const [username, setUsername] = useState('')
  const [reviewer, setReviewer] = useState('')
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const history = useHistory()

  function handleSubmit(event) {
    const apiUrl = config.api.url + '/user-review'
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: localStorage['auth']
      },
      body: JSON.stringify({
        Username: username,
        Reviewer: reviewer,
        Rating: rating,
        Comment: comment
      })
    })
      .then(res => {
        res.json().then(rawResponse => {
          if (rawResponse.statusCode === 200) {
            history.push('/user-review/' + rawResponse.ReviewID)
          }
        })
      })
      .catch(err => console.log(err))
    event.preventDefault()
  }

  return (
    <div className='App'>
      <Nav />
      <div className='content'>
        <h1>New User Review</h1>
        <h4>Review Information</h4>

        <form className='flex two-800 one' onSubmit={handleSubmit}>
          <label>
            <input
              type='text'
              value={username}
              name='username'
              onChange={event => setUsername(event.target.value)}
              placeholder='User being reviewed'
            />
          </label>
          <label>
            <input
              type='text'
              value={reviewer}
              name='reviewer'
              onChange={event => setReviewer(event.target.value)}
              placeholder='Reviewer'
            />
          </label>
          <div>
            <label>Rating (between 0 and 5):</label>
            <input
              type='range'
              value={rating}
              name='rating'
              min='0'
              max='5'
              step='1'
              onChange={event => setRating(Number(event.target.value))}
              placeholder='Rating 1-5'
            />
          </div>
          <div>
            <label>Comments</label>
            <textarea
              value={comment}
              name='comment'
              onChange={event => setComment(event.target.value)}
              placeholder='Comments'
            />
          </div>
          <div>
            <input type='submit' value='Submit' />
          </div>
        </form>

        <h4>Photo backing up comment (OPTIONAL)</h4>
        <div style={{ width: 200 }}>
          <label className='dropimage'>
            <input title='Drop image or click me' type='file' />
          </label>
        </div>
      </div>
    </div>
  )
}

export default NewUserReview
