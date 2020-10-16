import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  const setDay = newDay => setState ({ ...state, day: newDay });
  
  //creates a new, and overwrites a existing interview on API server, given an ID
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Promise.all([
      Promise.resolve (axios.put(`/api/appointments/${id}`, appointment )),
      Promise.resolve (axios.get(`/api/days`))
    ]).then((all => {
      setState({...state, appointments, days: all[1].data})
    }))


  }
  
  //deletes an interview from API server, given an ID
  function cancelInterview(id){

    const appointment = {
      ...state.appointments[id],
      interview: {}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return Promise.all([
      Promise.resolve (axios.delete(`/api/appointments/${id}`)),
      Promise.resolve (axios.get(`/api/days`))
    ]).then((all => {
      setState({...state, appointments, days: all[1].data})
    }))
    
  }

  return {state:{state, setState}, setDay, bookInterview, cancelInterview}
}