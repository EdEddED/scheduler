import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";


export default function Application(props) {
  
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  // const setDays = newDays => setState (prev => ({ ...prev, days: newDays }));
  const setDay = newDay => setState ({ ...state, day: newDay });

  useEffect(function(){

    Promise.all([
      Promise.resolve(axios("/api/days")),
      Promise.resolve(axios("/api/appointments")),
      Promise.resolve(axios("/api/interviewers"))
    ]).then((all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    }))
    
  }, [])

  const dayInts = getInterviewersForDay(state, state.day);
  const dayAppt = getAppointmentsForDay(state, state.day);
  const schedule = dayAppt.map((appt) => {
    const interview = getInterview(state, appt.interview)
    return (
      <Appointment
        key = {appt.id}
        id = {appt.id}
        time = {appt.time}
        interview = {interview}
        />
    );
  })

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



  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={newDay => setDay(newDay)}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {dayAppt.map(function(appt){
          return(
            <Appointment
              bookInterview = {bookInterview}
              cancelInterview = {cancelInterview}
              interviewers = {[...dayInts]}
              key = {appt.id}
              {...appt}
            />
          )
        })}
        {
          <Appointment
            key = "last"
            id = "last"
            time = "5pm"
          />
        }
      </section>
    </main>
  );
}
