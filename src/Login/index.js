import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {userId: '', pin: '', errorMsg: ''}

  onChangeUserId = event => this.setState({userId: event.target.value})

  onChangePin = event => this.setState({pin: event.target.value})

  fetchFailure = errorMsg => this.setState({errorMsg, userId: '', pin: ''})

  fetchSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitLoginForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const bodyData = {user_id: userId, pin}
    const api = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(bodyData),
    }
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok) {
      this.fetchSuccess(data.jwt_token)
    } else {
      this.fetchFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <div className="card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <div>
            <form onSubmit={this.submitLoginForm}>
              <h1>Welcome back!</h1>
              <label htmlFor="userId">User ID</label>
              <input
                type="text"
                id="userId"
                placeholder="Enter User ID"
                value={userId}
                onChange={this.onChangeUserId}
              />
              <label htmlFor="pin">PIN</label>
              <input
                type="password"
                id="pin"
                placeholder="Enter PIN"
                value={pin}
                onChange={this.onChangePin}
              />
              <button type="submit">Login</button>
            </form>
            {errorMsg !== '' && <p>{errorMsg}</p>}
          </div>
        </div>
      </div>
    )
  }
}

export default Login
