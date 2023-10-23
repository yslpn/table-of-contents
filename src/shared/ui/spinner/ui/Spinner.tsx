import css from './index.module.css';

interface ISpinner {
  style?: React.CSSProperties;
}

export const Spinner = ({ style }: ISpinner) => {
  return <div className={css.spinner} style={style}></div>;
};
