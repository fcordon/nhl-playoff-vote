import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Signin from "./components/Signin"
import Vote from "./components/Vote"
import Classement from "./components/Classement"
import Calendrier from "./components/Calendrier"
import AllVote from "./components/AllVote"
import MonCompte from "./components/MonCompte"
import FormSeries from "./components/FormSeries"
import UpdateSeries from "./components/UpdateSeries"

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Signin}/>
      <Route path='/vote' component={Vote}/>
      <Route path='/classement' component={Classement}/>
      <Route path='/calendrier' component={Calendrier}/>
      <Route path='/quiavotequoi' component={AllVote}/>
      <Route path='/monCompte' component={MonCompte}/>
      <Route path='/series' component={FormSeries}/>
      <Route path='/updateseries' component={UpdateSeries}/>
    </Switch>
  </main>
)

export default Main
