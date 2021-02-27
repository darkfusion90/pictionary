import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Home/Home'
import Room from './Room'

const RouteProvider: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/room/:roomName' component={Room} />
            </Switch>
        </BrowserRouter>
    )
}

export default RouteProvider
