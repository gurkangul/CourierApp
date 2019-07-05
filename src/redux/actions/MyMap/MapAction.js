import {Get_MissionUser,Get_MissionCourier,Get_IsToggle} from "../../constants/MyMap/MapConstans";



export const getMissionCourier=(response)=>{
  //  console.warn(response,"actionmission")

    const action={
        type:Get_MissionCourier,
        payload:response,
    }
 return action
}

export const getMissionUser=(response)=>{
   // console.warn(response,"actionmission")

    const action={
        type:Get_MissionUser,
        payload:response,
    }
 return action
}

export const getToggle=(response)=>{
    //console.warn(response,"actiontoggle")

    const action={
        type:Get_IsToggle,
        payload:response,
    }
 return action
}