import React, { Fragment } from 'react';
// import classNames from "classnames";
import "components/Appointment/styles.scss"

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

export default function Appointment (props) {
  
  const interview = props.interview;

  return(
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (<Show 
          student={interview.student} 
          interviewer={interview.interviewer} 
          onEdit={props.onEdit} 
          onDelete={props.onDelete} 
        />) : (<Empty />)}
    </article>
  )

}
