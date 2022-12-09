import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'
import Home from './Home'
import NotFound from './NotFound'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'

// Replace your code here

const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
