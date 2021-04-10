import React from 'react'

import '../css/App.css'
import '../css/Picnic.css'

import Nav from '../components/Nav'

import config from '../config.json'

class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      username: ''
    }
  }
  componentDidMount() {
    let { id } = this.props.match.params
    console.log('setting state id: ' + id)
    this.setState({ username: id })
    console.log('state: ' + this.state.username)

    const apiUrl = config.api.url + '/users/' + id
    fetch(apiUrl, {
      headers: {
        Authorization: localStorage['auth']
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ user: data })
      })
  }

  render() {
    return (
      <div className='App'>
        <Nav />
        <div class='content'>
          {/* <h3>User: {this.state.user.name}</h3> */}
          <h3>User: {this.state.user.username}</h3>
          <p>Location: {this.state.user.location}</p>
          <p>Rating: {this.state.user.rating}</p>
          <p>User class: {this.state.user.type}</p>
        </div>
      </div>
    )
  }
}

export default User
