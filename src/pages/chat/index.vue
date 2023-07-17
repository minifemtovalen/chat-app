<script setup>
    import { sendMessage, getRooms } from '../../controller/firebase.ts'
    import { ref } from 'vue';

    const props = defineProps({
        roomId: { type: String }
    });
    const currentName = prompt('Name:');
    const input = ref(null);
    const sendEvent = () => {
        const value = input.value.value;
        sendMessage(props.roomId, currentName, value, messagesInChat.value);
        input.value.value = '';
    };
    const messagesInChat = ref(null);
    const roomsListener = getRooms((docs) => {
        messagesInChat.value = docs.find((d) => d.name === props.roomId).messages.map((m) => m);
    });
</script>

<template>
    <div class="main-container">
        <div class="messages-container">
            <div  v-for="message in messagesInChat" :class="[
                {'msg-received': message.createdBy !== currentName},
                {'msg-sent': message.createdBy === currentName}
            ]">
                <h1>{{ message.createdBy }}</h1>
                <p>{{ message.message }}</p>
            </div>
        </div>
        <div class="input-container">
            <input ref="input" type="text" placeholder="Your message goes here" />
            <button v-on:click="sendEvent" class="send-btn">Send</button>
        </div>
    </div>
</template>

<style scoped>
    * {
        font-family: 'Lato', sans-serif;
        color: #383838;
    }
    .main-container {
        padding: 20px;
        display: grid;
        grid-template-rows: 1fr 3em;
        height: 100vh;
    }
    .messages-container {
        display: grid;
        grid-template-rows: repeat(10, 1fr);
        overflow: auto;
        gap: 10px;
        padding-bottom: 20px;
    }
    .msg-received {
        background-color: #FFF2DE;
        border-radius: 20px;
        padding: 20px;
        place-self: start;
        width: fit-content;
    }

    .msg-sent {
        place-self: end;
        background-color: #FDE3EC;
        border-radius: 20px;
        padding: 20px;
        width: fit-content;
    }

    h1 {
        font-weight: 900;
    }

    input {
        background-color: #D9D9D9;
        padding: 10px;
    }

    .send-btn {
        background-color: #BAC8FC;
        font-weight: 900;
    }

    .send-btn:hover {
        background-color: #A1AFE1;
        color: white;
    }

    .input-container {
        display: grid;
        grid-template-columns: 1fr 6em;
    }
</style>