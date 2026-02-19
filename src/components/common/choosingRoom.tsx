import {Room} from "@/types/words_objects";
import {rooms, Translations} from "@/lib/db";
import {Language} from "@/types/language";


interface ChoosingRoomProps {
    currentMainLanguage: Language,
    switchRoom: (room: Room) => void,
    activeRoom: Room
}

export default function ChoosingRoom({
    currentMainLanguage, switchRoom, activeRoom
}: ChoosingRoomProps)
{
    return <>
        {rooms.map((room) => {
            const roomName = Translations({
                key: `rooms.${room.name}`,
                language: currentMainLanguage
            });

            return (
                <button
                    key={room.name}
                    onClick={() => switchRoom(room.name)}
                    className={`
                                    px-6 max-sm:px-4 py-3 max-sm:py-2 rounded-lg font-medium transition-all duration-200
                                    ${activeRoom === room.name
                        ? 'bg-(--main-color) text-white shadow-lg scale-110'
                        : 'bg-(--second-color) text-gray-700'
                    }
                                `}
                >
                    {roomName || room.name}
                </button>
            );
        })}
    </>;
}