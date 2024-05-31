import db from '../firebase.js';
import {ref, set, get, push, remove, update} from 'firebase/database';
import axios from 'axios';

export const usersAPI = {
    async getRooms() {
        return get(ref(db))
    },

    async sendMessage(message, roomId, id, userId, date, reactionsBtn){
        return await push(ref(db, `/${roomId}/messages`), {
            message: message,
            id: id,
            userId: userId,
            date: date,
            reactionsBtn: reactionsBtn
        })
    },

    async getMessage(roomId) {  
        return await get(ref(db, `/${roomId}`))
    },

    async createRoom(roomId, name, password = null, pcId) {
        // debugger;
        return await set(ref(db, `/${roomId}`), {
            roomId: roomId,
            name: name,
            password: password,
            pcId: pcId
        })
    },

    async removeMessages(roomId, messages) {
        let messagesLength = Object.keys(messages).length;
        let toDeleteObj = Object.keys(messages).reverse()[messagesLength - 1];
        await remove(ref(db, `/${roomId}/messages/${toDeleteObj}`))
    },

    async testRemoveMessage(roomId, userId) {
        await remove(ref(db, `/${roomId}/messages/${userId}`))
    },

    async addReaction(roomId, userId, id, pcId, reactions) {
        let messages = await this.getMessage(roomId).then(res => res.val().messages);
        let messageId;
        Object.entries(messages).map(key => {
            if(key[1].id === id && key[1].userId === userId) return messageId = key[0];
        })

        await update(ref(db, `/${roomId}/messages/${messageId}/reactions`), {[pcId]: reactions})
    },
    getIP() {
        axios.get('https://api.ipify.org/?format=json').then(res => console.log(res.data))
    }
}