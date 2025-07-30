import classes from './chat.module.scss';
import { useCallback, useEffect, useRef } from 'react';

interface Props {
    id: string;
    img: string;
    name: string;
    time: string;
    lastMessage: string;
}

export const Chat = ({ id, img, name, time, lastMessage }: Props) => {
    const getTime = (time: string) => {
        const myDate = new Date(time);
        const minutes = myDate.getMinutes();
        const hours = myDate.getHours();
        return `${hours}:${minutes}`;
    };

    return (
        <div className={classes.chatContainer}>
            <div className={classes.avatar}>
                <img src={img} />
            </div>
            <div className={classes.main}>
                <div className={classes.content}>
                    <div className={classes.name}>{name}</div>
                    <div className={classes.time}>{getTime(time)}</div>
                </div>
                <div className={classes.summry}>{lastMessage}</div>
            </div>
        </div>
    );
};
