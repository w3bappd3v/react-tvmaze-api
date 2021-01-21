import React from 'react';
import show from './Show.module.scss';

import Button from '../button/Button.js';

const Show = (props) =>  {

  const formatSummary = (summary) => {
    if(summary){
      return summary.replace(/(<([^>]+)>)/ig, "");
    }
  }

  if (props.summary && props.image) {
    return (
        <div className={show.show}> 
          <img src={props.image} alt={props.name} className={show.showImg}/>
          <ul className={show.info}> 
            <li><h1>{ props.name }</h1></li>
            <li className={show.summary}>{ formatSummary(props.summary) }</li>
            <li><Button doClick={()=>props.goToShow(props.id)} btnType={'secondary'} btnText={ 'Go to Show' }></Button></li>
          </ul>
        </div>  
    );       
  } else {
    return ''
  }

}
export default Show;