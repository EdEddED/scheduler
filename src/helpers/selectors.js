export function getAppointmentsForDay(state, day) {
  
  const days = state.days;
  
  let dayObject;
  for (let obj of days){
    if (obj.name === day){
      dayObject = obj;
      break;
    }
  }

  let result = [];
  if (!dayObject) return result;

  for (let appointmentId of dayObject.appointments){
    result.push(state.appointments[appointmentId])
  }

  return result;
  
}

export function getInterview(state, interview){
  if (interview){
    return {
      "student": interview.student,
      "interviewer": state.interviewers[interview.interviewer]
    }
  }
  return null;  
}

export function getInterviewersForDay (state, day) {
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
  
  for (let interviewerId of dayObject.interviewers){
    
    result.push (state.interviewers[interviewerId]) 
  
  }

  return result;
  
}