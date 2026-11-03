import {create} from 'zustand'
import axios from 'axios'

const base_URL = import.meta.env.VITE_BASE_URL

export const useChatStore = create((set) => ({
    messages: [],
    isLoading: false,

    fetchMessages: async () => {
        try {
            const res = await axios.get(base_URL + "api/messages/")
            set({messages: res.data.messages})
        } catch (error) {
            console.error("Failed to load all messages", error)
        }
    }
}))