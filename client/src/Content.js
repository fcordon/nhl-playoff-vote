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
      <Route exact path='/vote' component={Vote}/>
      <Route exact path='/classement' component={Classement}/>
      <Route exact path='/calendrier' component={Calendrier}/>
      <Route exact path='/quiavotequoi' component={AllVote}/>
      <Route exact path='/monCompte' component={MonCompte}/>
      <Route exact path='/series' component={FormSeries}/>
      <Route exact path='/updateseries' component={UpdateSeries}/>
    </Switch>
  </main>
)

export default Main
