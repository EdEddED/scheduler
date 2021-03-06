import React, { useState } from 'react'
import InterviewerList from "components/InterviewerList";
import Button from 'components/Button';

export default function Form(props){

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset(){
    setName("");
    setInterviewer(null);
  }
  
  function cancel(e){
    reset();
    props.onCancel();
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}  
            onChange={e => setName(e.target.value)}
            onSubmit={event => event.preventDefault()}     
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer} /> 
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={e => cancel(e)}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )

}