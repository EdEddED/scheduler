import React from 'react';
import classNames from "classnames";

import "components/InterviewerListItem.scss";

function formatName(name, isSelected){
  if (isSelected){
    return name;
  } else {
    return "";
  }
}

export default function InterviewerListItem (props) {

  return(
    <li className={classNames("interviewers__item", {
      " interviewers__item--selected":props.selected,
    })} onClick={() => props.setInterviewer(props.id)} >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
        {formatName(props.name, props.selected)}
    </li>
  )

}