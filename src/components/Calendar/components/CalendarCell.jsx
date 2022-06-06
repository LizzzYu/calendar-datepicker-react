import React from 'react';
import clsx from 'clsx'
import classes from './date.module.scss'
import * as constants from '../../../constants/constants'

export default function Date(props) {
  return (
    <div
      onClick={props.onClick}
      className={clsx(
      classes.wrapper, {
        [classes.fourCols]: props.calendarType !== constants.calendarType.DAY,
        [classes.current]: props.isCurrent,
        [classes.active]: props.isActive,
        [classes.disabled]: props.disabled,
      })}>
      <p className={clsx(
        classes.dateText, {
          [classes.disabled]: props.disabled,
        })}>
        {props.value}
      </p>
    </div>
  )
}