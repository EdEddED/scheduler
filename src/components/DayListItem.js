import React from 'react';
import classNames from "classnames";

import "components/DayListItem.scss";

function formatSpots(spot){
  if (spot === 0){
    return (`no spots remaining`);
  }
  else if (spot === 1){
    return (`${spot} spot remaining`);
  } else {
    return (`${spot} spots remaining`);
  }
}

export default function DayListItem(props){

  return(
    <li className={classNames("day-list__item", {
      " day-list__item--full":props.spots === 0,
      " day-list__item--selected":props.selected
    })} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text-light">{formatSpots(props.spots)}</h3>
    </li>
  );
}