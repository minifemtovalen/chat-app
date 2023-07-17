<template>
    <div v-if="!chatSelected">
        <main>
            <div class="container">
                <div class="title-container">
                    <h1>Available rooms:</h1>
                </div>
                <ul v-for="room in rooms">
                    <li v-on:click="selectChat(room.name)" :name="room.name" :key="room.name" class="border-style">
                        <div class="flex-style">
                            <h3>
                                <span>{{ room.name }}</span>
                            </h3>
                        </div>
                    </li>
                </ul>
            </div>
        </main>
        <CreateRoomModal />
    </div>
    <Chat v-if="chatSelected" :messages="messagesInChat" :roomId="chatSelected" />
</template>

<script setup lang="ts">
    import { defineComponent, ref } from 'vue'
    import CreateRoomModal from '../../components/CreateRoomModal/index.vue'
    import { getRooms } from '../../controller/firebase.ts';
    import Chat from '../chat/index.vue';

    const rooms = ref([]);
    const chatSelected = ref(null);
    const messagesInChat = ref(null);

    const roomsListener = getRooms((docs) => {
        rooms.value = docs;
    });

    const selectChat = (name) => {
        chatSelected.value = name;
        messagesInChat.value = rooms.value.find((d) => d.name === chatSelected.value).messages;
    }
</script>

<style scoped>
    * {
        font-family: 'Lato', sans-serif;
        color: #383838;
    }
    .container {
        min-width: 22rem;
    }
    main {
        display: grid;
        place-content: center;
        margin-top:10em;
    }
    .title-container {
        padding-bottom: 20px;
        padding-top: 20px;
        text-align: center;
        font-weight: 900;
        font-size: 18px;
    }
    .border-style {
        border-bottom-width: 1px
    }

    ul {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .flex-style {
        display: flex;
        flex-direction: column;
        background-color: #EEEEEE;
        width: 100%;
        padding: 8px;
    }

    li {
        display: inline-flex;
        gap: 0.5rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        text-transform: capitalize;
        cursor: pointer;
    }

    @media (min-width: 768px) { 
        ul {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 1.25rem;
        }
    }

    @media (min-width: 1024px) {
        ul {
            display: flex;
            flex-direction: column;
        }
    }

    @media (min-width: 1280px) {
        ul, .title-container {
            padding-left: 2rem;
            padding-right: 2rem;
        }
    }
</style>
