export type MessageProps = {
    fromUUID: string;
    content: string;
    timestamp: Date;
};

function Message({ fromUUID, content, timestamp }: MessageProps) {
    const formattedTimestamp = new Date(timestamp)
        .toLocaleString()
        .split(',')[1]
        .split(':')
        .slice(0, 2)
        .join(':');

    const isMe = fromUUID === 'me'; // TODO: Get user UUID from user context

    return isMe ? (
        <div key={fromUUID} className="flex flex-col rounded-lg bg-stone-700 p-2 self-end m-2 gap-1">
            <p className="flex self-start min-w-5 text-md font-normal">{content}</p>
            <p className="flex self-end font-extralight text-sm">{formattedTimestamp}</p>
        </div>
    ) : (
        <div key={fromUUID} className="flex flex-col rounded-lg bg-stone-600 p-2 self-start">
            <p className="flex w-fit self-">{content}</p>
            <p>{formattedTimestamp}</p>
        </div>
    );
}

export default Message;