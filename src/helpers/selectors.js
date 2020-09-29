export function getAppointmentsForDay(state, day) {
  
  const days = state.days;
  
  let dayObject;
  for (let obj of days){
    if (obj.name === day){
      dayObject = obj;
      break;
    }
  }
  
  // dayObject is this for Monday
  // {
  //   id: 1,
  //   name: "Monday",
  //   appointments: [1, 2, 3]
  // }

  let result = [];
  if (!dayObject) return result;

  for (let appointmentId of dayObject.appointments){
    result.push(state.appointments[appointmentId])
  }

  return result;
  
}

export function getInterview(state, interview){

  if (interview === null) return null;
  
  const interviewer = state.interviewers[interview.interviewer];

  // "2": {
    //   id: 2,
    //   name: "Tori Malcolm",
    //   avatar: "https://i.imgur.com/Nmx0Qxo.png"
    // }



    return {
      "student": interview.student,
      "interviewer":{
        "id": interviewer.id,
        "name": interviewer.name,
        "avatar": interviewer.avatar
      }
    }

    
}
