import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Signup from "./components/Signup"
import Signin from "./components/Signin"
import Vote from "./components/Vote"
import Classement from "./components/Classement"
import AllVote from "./components/AllVote"
import MonCompte from "./components/MonCompte"

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Signup}/>
      <Route path='/signin' component={Signin}/>
      <Route path='/vote' component={Vote}/>
      <Route path='/classement' component={Classement}/>
      <Route path='/quiavotequoi' component={AllVote}/>
      <Route path='/monCompte' component={MonCompte}/>
    </Switch>
  </main>
)

export default Main
