'use client';

import classes from './chatRoom.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Chat } from '@/app/components/chat';

type Chat = {
    contactImage: string;
    contactName: string;
    id: string;
    lastMessage: string;
    lastMessageTimestamp: string;
};

interface Data {
    chats: Chat[];
    meta: { page: number; pageSize: number; totalChats: number; totalPages: number };
}

export const ChatRoom = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getData = async () => {
        const result = await fetch('http://localhost:3000/api/chats?page=1&pageSize=15');
        const data = await result.json();
        setChats(data.chats);
        setPage(data.meta.page);
        setTotalPages(data.meta.totalPages);
    };

    const getMoreData = async (page: number) => {
        setIsLoading(true);
        const result = await fetch(`http://localhost:3000/api/chats?page=${page}&pageSize=15`);
        const data = await result.json();
        setChats((prev) => [...prev, ...data.chats]);
        setPage(data.meta.page);
        setIsLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const scrollContainerRef = useRef(null);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                if (page < totalPages) {
                    getMoreData(page + 1);
                }
            }
        }
    };

    return (
        <div className={classes.chatRoom}>
            <div className={classes.inputContainer}>
                <input type="search" placeholder="Search" />
            </div>
            <div className={classes.content} ref={scrollContainerRef} onScroll={handleScroll}>
                {chats.map((item) => (
                    <Chat
                        key={item.id}
                        id={item.id}
                        img={item.contactImage}
                        name={item.contactName}
                        time={item.lastMessageTimestamp}
                        lastMessage={item.lastMessage}
                    />
                ))}
            </div>
            {isLoading && <div className="flex justify-center">Loading...</div>}
        </div>
    );
};
