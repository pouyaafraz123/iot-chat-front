import classes from "./styles.module.scss";

interface IButton {
    title:string
    action:() => void
    type:"button" | "submit" | "reset" | undefined
    color:"success" | "warning" | "danger" | "info"
}

const Button = ({title,action,type,color}:IButton) => {
    return (
        <button onClick={action} type={type} data-color={color} className={classes.Button}>
            {title}
        </button>
    )
}

export default Button