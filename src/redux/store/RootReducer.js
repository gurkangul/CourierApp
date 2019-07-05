import { combineReducers } from 'redux';
import { MissionReducer,MissionUserReducer,ToggleReducer } from '../reducers/MyMap/MapReducer';


const allReducers = {
  MissionUserReducer,
  MissionReducer,
  ToggleReducer
};

export const rootReducer = combineReducers(allReducers);