import classes from "./styles.module.scss";
import { BeatLoader } from "react-spinners";

interface IButton {
  title: string;
  action: () => void;
  type: "button" | "submit" | "reset" | undefined;
  color: "success" | "warning" | "danger" | "info";
  isLoading?: boolean;
}

const Button = ({ title, action, type, color, isLoading }: IButton) => {
  return (
    <button
      onClick={isLoading ? undefined : action}
      type={type}
      data-color={color}
      className={classes.Button}
    >
      {isLoading ? (
        <div
          className={
            "w-100 h-100 d-flex justify-content-center align-items-center"
          }
        >
          <BeatLoader loading={true} color={"#00474b"} size={10} />
        </div>
      ) : (
        title
      )}
    </button>
  );
};

export default Button;
