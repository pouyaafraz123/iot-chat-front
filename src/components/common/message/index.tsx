import classes from "./styles.module.scss"

interface IMessage {
    profile: string
    name: string
    text: string
    date: string
    currentUser: boolean
}

const Message = ({profile, name, text, date, currentUser}: IMessage) => {
    return (
        <div className={classes.Message} data-user={currentUser ? "this" : "other"}>
            {
                currentUser ?
                    null
                    :
                    <img src={profile} alt="" className={classes.Message__Image}/>
            }
            <div className={classes.Message__Box} data-user={currentUser ? "this" : "other"}>
                {
                    currentUser ?
                        null :
                        <span className={classes.Message__Box__Name}>{name}</span>
                }
                <span className={classes.Message__Box__Text}>{text}</span>
                <span className={classes.Message__Box__Time}>{date}</span>
            </div>
        </div>
    )
}

export default Message