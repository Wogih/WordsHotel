export type Room = "room" | "bathroom";

export interface Words_objects{
    id: number;
    objectName: string;
    room: Room;
    width: number;
    height: number;
    wordsId: number;
    classes: string;
}

export interface Word {
    id: number;
    name: string;
}

export interface Rooms {
    id: number;
    name: string;
    width: number;
    height: number;
}