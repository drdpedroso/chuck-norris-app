import React from 'react'
import { Route } from 'react-router-dom'
import Jokes from '@/pages/Jokes'

const Routes = () => (
  <div>
    <Route exac path="/" component={Jokes} />
  </div>
)

export default Routes
