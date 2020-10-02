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
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`/api/appointments/${id}`, appointment )
      .then (() => setState({...state, appointments}))
  }
  
  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: {}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then (() => setState({...state, appointments}))
  }
  return {state:{state, setState}, setDay, bookInterview, cancelInterview}
}