import classes from "./styles.module.scss";

interface IBackDrop {
  show: boolean;
  close: () => void;
}

const BackDrop = ({ show, close }: IBackDrop) => {
  return show ? <div onClick={close} className={classes.BackDrop}></div> : null;
};

export default BackDrop;
