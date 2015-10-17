// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

import update from 'react/lib/update'
import { DASHBOARD_LAYOUT, INDEX_AGGREGATE_SUCCESS } from '../actions'

const initialState = {
  graphicSize: 'medium',
  legendPlacement: 'bottom',
  tiles: [
    /*{
      name: 'Server Profile Changes',
      history: true,
      type: 'area',
      wide: true,
      params: {
        category: 'server-profiles',
        attribute: 'state',
        interval: 'days',
        count: 8
      }
    },
    {
      name: 'Active Alerts',
      route: 'activity',
      type: 'circle',
      params: {
        category: 'alerts',
        query: IndexQuery.create('state:Active'),
        attribute: 'status'
      }
    },*/
    {
      name: 'Server Profiles',
      route: 'server profiles',
      type: 'circle',
      params: {
        category: 'server-profiles',
        attribute: 'status'
      }
    },
    /*
    {
      name: 'Server Hardware',
      route: 'server hardwares',
      type: 'distribution',
      params: {
        category: 'server-hardware',
        attribute: 'model'
      }
    }
    */
  ]
}

const handlers = {
  [DASHBOARD_LAYOUT]: (state, action) => {
    // set all history tiles counts
    let tiles = state.tiles.map((tile) => {
      if (tile.wide) {
        tile = update(tile, {
          params: { count: { $set: action.count } }
        })
      }
      return tile
    })
    return {
      tiles: tiles,
      legendPlacement: action.legendPlacement,
      graphicSize: action.graphicSize
    }
  },

  [INDEX_AGGREGATE_SUCCESS]: (state, action) => {
    let tiles = state.tiles.map((tile) => {
      if (tile.name === action.id) {
        tile = update(tile, {
          watcher: { $set: action.watcher },
          result: { $set: action.result }
        })
      }
      return tile
    })
    return { tiles: tiles }
  }
}

export default function dashboardReducer (state = initialState, action) {
  let handler = handlers[action.type]
  if (!handler) return state
  return { ...state, ...handler(state, action) }
}
