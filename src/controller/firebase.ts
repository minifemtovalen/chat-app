import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc, collection, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC4Bc5eup4T3eqjMNcrXQl4CBprfCKDYSk",
    authDomain: "chat-app-7b144.firebaseapp.com",
    projectId: "chat-app-7b144",
    storageBucket: "chat-app-7b144.appspot.com",
    messagingSenderId: "1084689639989",
    appId: "1:1084689639989:web:74618ea334bde74a111f7c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

type Message = {
    createdBy: string;
    message: string;
}

type RoomCollection = {
    name: string;
    messages: Message[];
};

export async function getRooms(cb: (arg: RoomCollection) => void) {
    const docRef = collection(db, 'rooms');
    return onSnapshot(docRef, async (doc) => {
        const data = await doc.docs.map((d) => d.data());
        cb(data as unknown as RoomCollection);
    });
}

export async function createRoom(name: string, roomId: string) {
    return setDoc(doc(db, 'rooms', roomId), {
        name: name,
        messages: []
    });
}

export async function sendMessage(roomId: string, userName: string, message: string, messages: Message[]) {
    return setDoc(doc(db, 'rooms', roomId), {
        messages: [
            ...messages,
            {
                createdBy: userName,
                message,
            }
        ]
    }, { merge: true });
}
