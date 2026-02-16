export type Room = "room" | "bathroom";

export interface WordsObjects {
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
    image: string;
    imageWidth: number;
    imageHeight: number;
    transcript: string;
    spellingGif: string[];
}

export interface Rooms {
    id: number;
    name: Room;
    width: number;
    height: number;
}