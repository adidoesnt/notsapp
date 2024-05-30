import { useContext } from "react";
import { UserContext } from "../context/user";

export type MessageProps = {
    UID: string;
    fromUUID: string;
    content: string;
    timestamp: Date;
};

function Message({ UID, fromUUID, content, timestamp }: MessageProps) {
    const { user } = useContext(UserContext)!;
    const formattedTimestamp = new Date(timestamp)
        .toLocaleString()
        .split(',')[1]
        .split(':')
        .slice(0, 2)
        .join(':');

    const isMe = fromUUID === user?.UUID;

    return isMe ? (
        <div key={UID} className="flex flex-col rounded-lg bg-stone-700 p-2 self-end m-2 gap-1">
            <p className="flex self-start min-w-5 text-md font-normal">{content}</p>
            <p className="flex self-end font-extralight text-sm">{formattedTimestamp}</p>
        </div>
    ) : (
        <div key={UID} className="flex flex-col rounded-lg bg-stone-600 p-2 self-start">
            <p className="flex w-fit self-">{content}</p>
            <p>{formattedTimestamp}</p>
        </div>
    );
}

export default Message;
