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

    return axios
      .put(`/api/appointments/${id}`, appointment )
      .then (() => setState({...state, appointments}))
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
    return axios
      .delete(`/api/appointments/${id}`)
      .then (() => setState({...state, appointments}))
  }

  //TODO - figure out where this code snippet goes.
  function getSpots(){
    axios.get(`/api/days`)
      .then ((result => {
        console.log(result.data);
        setState(prev => ({...prev, days: result.data}))
      }))
  }

  return {state:{state, setState}, setDay, bookInterview, cancelInterview, getSpots}
}