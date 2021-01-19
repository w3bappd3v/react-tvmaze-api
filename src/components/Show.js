import React from 'react';
import show from './Show.module.css';

import Button from './Button.js';

const Show = (props) =>  {
  return (
    <div className={show.show}> 
      <img src={props.image} alt={props.name} className={show.showImg}/>
      <ul className={show.info}> 
        <li><h1>{ props.name }</h1></li>
        <li dangerouslySetInnerHTML={{ __html:props.summary }}></li>
        <li><Button doClick={()=>props.goToShow(props.id)} btnType={'secondary'} btnText={ 'Go to Show' }></Button></li>
      </ul>
    </div>         
  );
};
export default Show;