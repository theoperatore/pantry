import { CSSProperties, PropsWithChildren } from 'react';
import classes from './FoodIcon.module.css';

type Props = {
  style?: CSSProperties;
};

export function FoodIcon(props: PropsWithChildren<Props>) {
  return (
    <div className={classes.container} style={props.style}>
      {props.children}
    </div>
  );
}
