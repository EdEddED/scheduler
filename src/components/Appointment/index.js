import React, { Fragment } from 'react';
// import classNames from "classnames";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "create";


export default function Appointment (props) {
  
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW:EMPTY);
  
  const interviewers = props.interviewers;

  const interview = props.interview;

  function save(name, interviewer){
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }
  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd = {() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form 
        interviewers = {interviewers}
        onSave = {save}
        onCancel = {() => back()}
        />
      )}
    </article>
  )

}
