import React from 'react';
import button from './Button.module.scss';

const Button = (props) =>  {

  const getBtnClass = (btnType) => {
    switch(btnType) {
      case 'primary':
        return button.primary;
      case 'secondary':
        return button.secondary;
      default: 
        return button.secondary;
    }
  }

  return (
    <button onClick={ props.doClick } className={ getBtnClass(props.btnType) }>{ props.btnText }</button>
  );
};
export default Button;