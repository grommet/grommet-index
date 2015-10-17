// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import React from 'react'

import Indexer from './components/Indexer'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import TBD from 'grommet/components/TBD'

import Items from './components/Items'
import Item from './components/Item'

var rootPath = "/indexer/";
if (NODE_ENV === 'development') {
  rootPath = "/"; // webpack-dev-server
}

const CATEGORIES = [
  'enclosures',
  'server-hardware',
  'server-profiles'
]

const categoryRoutes = CATEGORIES.map((category) => {
  return {
    path: category, component: Items,
    childRoutes: [
      { path: '*', component: Item }
    ]
  }
})

module.exports = {

  routes: [
    { path: rootPath, component: Indexer,
      // TODO: crashes react-router, wait for fix
      //indexRoute: {
      //  onEnter: function (nextState, replaceState) {
      //    replaceState(null, '/dashboard')
      //  }},
      childRoutes: [
        { path: 'login', component: Login },
        { path: 'dashboard', component: Dashboard },
        { path: 'reports', component: TBD },
        { path: 'settings', component: TBD },
        ...categoryRoutes
      ]
    }
  ],
};
