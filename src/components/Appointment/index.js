import React, { Fragment } from 'react';
// import classNames from "classnames";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error"



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const CONFIRM = "CONFIRM";

export default function Appointment (props) {
  
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW:EMPTY);

  //localize props for ease of readability
  const interviewers = props.interviewers;  
  const interview = props.interview;
  
  //handle null inteviewers to avoid a crash when querying interviews that don't exist
  //TODO: Figure out how to get non-shallow copies of interviewers props.
  let intId;
  let interviewer;
  if (interview){
    intId = interview.interviewer;
  } else {
    intId = -1;
  }
  for (let iv in props.interviewers){
    if (iv.id === intId){
      interviewer = iv;
      break;
    } 
  }

  //triggers bookInterview, and then updates the DayList count
  function save(name, interviewer){
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  //triggers cancelInterview, and then updates the DayList count
  function remove(){ //delete is a registered keyword 
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  return(
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd = {() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form 
        interviewers = {interviewers}
        onSave = {save}
        onCancel = {() => back()}
        />
      )}
      {mode === EDIT && (
        <Form 
        name = {interview.student}
        interviewers = {interviewers}
        interviewer = {interview.interviewer}
        onSave = {save}
        onCancel = {() => back()}
        />
      )}
      {mode === SAVING && (
        <Status message = "Saving" />
      )}
      {mode === DELETING && (
        <Status message = "Deleting" />
      )}
      {mode === ERROR_SAVE && (
        <Error
        message = "Saving Failed."
        onClose = {() => back()}
      />
      )}
      {mode === ERROR_DELETE && (
        <Error
        message = "Deletion Failed."
        onClose = {() => back()}
      />
      )}
      {mode === CONFIRM && (
        <Confirm
          message = "Delete the Appointment?"
          onConfirm = {() => remove()}
          onCancel = {() => back()}
          />
      )}
    </article>
  )

}
