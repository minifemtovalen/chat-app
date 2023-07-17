<template>
    <div v-if="isModalOpen" class="modal-container">
        <div class="modal-body">
            <button v-on:click="setModalClose" class="modal-close">X</button>
            <label>Room name:</label>
            <input ref="input" type="text" placeholder="Room 0001">
            <div>
                <button class="send-btn" v-on:click="createEvent">Create</button>
            </div>
        </div>
    </div>
    <div class="button-container">
        <button v-on:click="setModalOpen">Create room</button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { createRoom } from '../../controller/firebase';
    const input = ref(null);
    const isModalOpen = ref(false);
    const setModalOpen = () => {
        isModalOpen.value = true;
    }
    const setModalClose = () => {
        isModalOpen.value = false;
    }
    const createEvent = () => {
        const roomName = input.value.value;
        createRoom(roomName, roomName);
        isModalOpen.value = false;
    }
</script>

<style scoped>
    * {
        font-family: 'Lato', sans-serif;
        color: #383838;
    }

    .modal-body label {
        font-weight: 900;
        font-size: 18px;
    }
    .button-container {
        display: grid;
        place-content: center;
        align-content: flex-end;
        padding: 20px;
    }
    .button-container button {
        background-color: #ffc0cb;
        border-radius: 10px;
        padding: 10px;
        font-weight: 800;
    }

    .button-container button:hover {
        background-color: #CC98A1;
        color: white;
    }
    .modal-container {
        position: fixed;
        display: grid;
        place-content: center;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,0.5);
    }

    .modal-body {
        display: grid;
        padding: 1rem;
        border-radius: 4px;
        background-color: white;
        position: relative;
        text-align: center;
        gap: 10px;
    }

    .modal-body input {
        background-color: #F9F7F7;
        padding: 10px;
        border-radius: 5px;
    }

    .modal-body input:focus {
        border: 3px solid pink;
    }

    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }

    .send-btn {
        background-color: #BAC8FC;
        padding: 5px 10px;
        border-radius: 8px;
        font-weight: 600;
    }
    .send-btn:hover {
        background-color: #A1AFE1;
        color: white;
    }
</style>