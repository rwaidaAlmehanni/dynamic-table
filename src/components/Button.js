/**
 * Created by Rwaida on 13/08/2021.
 */
import React from 'react';
import PropTypes from 'prop-types';

const Button =( props )=> {
    const { title, onClick } = props;
    return (
      <div>
        <button type="button"
                className={"button"}
                onClick={onClick}>{title}</button>
      </div>
    )
  }

Button.propTypes = {
title: PropTypes.string,
onClick: PropTypes.func,
};

export default Button;