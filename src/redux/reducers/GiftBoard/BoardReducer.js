import {GET_GIFTID} from "../../constants/GiftBoard/BoardConstants";

const initialState = {
 id:"",
 isTrue:false
    
  };


  export const BoardReducer = function(state = initialState, action) {
    switch (action.type) {
      case GET_GIFTID:
      console.log("searcden dönen action",action)
       
        return Object.assign({}, state, {
          
          id: action.payload,
          isTrue:action.isTrue
          
        });
       
   
      default:
        return state;
    }
  };