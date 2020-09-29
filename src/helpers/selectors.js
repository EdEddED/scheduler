import React from 'react';

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
