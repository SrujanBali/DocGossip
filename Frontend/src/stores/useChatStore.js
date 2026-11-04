import {create} from 'zustand'
import axios from 'axios'

const base_URL = import.meta.env.VITE_BASE_URL

export const useChatStore = create((set) => ({
    messages: [],
    isLoading: false,

    fetchMessages: async (chatID) => {
        try {
            set({isLoading: true})
            const res = await axios.get(`${base_URL}/api/messages/${chatID}`)
            console.log(res.data.messages)
            set({messages: res.data.messages, isLoading: false})
        } catch (error) {
            console.error(`Failed to load messsage by ID:- ${chatID} Error:-  `, error)
            set({isLoading: false})
        }
    }
}))