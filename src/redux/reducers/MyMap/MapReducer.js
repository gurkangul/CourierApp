import {Get_MissionUser,Get_MissionCourier,Get_IsToggle} from "../../constants/MyMap/MapConstans";

const initialState = {
  
  misData:[],
  };

  const initialStatee = {
    misData:[]
    };

    const toggleState = {
      toggle:false
      };
    
  


  export const MissionReducer = function(state = initialState, action) {
   // console.warn(action,"reducermission")
  switch (action.type) {
    case Get_MissionCourier:
      return Object.assign({}, state, {
        misData: action,
      });
    default:
      return state;
  }
};

export const MissionUserReducer = function(state = initialStatee, action) {
 // console.warn(action,"reducermission")
switch (action.type) {
  case Get_MissionUser:
    return Object.assign({}, state, {
      misData: action,
    });
  default:
    return state;
}
};

export const ToggleReducer = function(state = toggleState, action) {
 // console.warn(action,"reducertoggle")
switch (action.type) {
  case Get_IsToggle:
    return Object.assign({}, state, {
      toggle: action,
    });
  default:
    return state;
}
};




