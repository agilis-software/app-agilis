import { defineStore } from 'pinia'
import type { ManagerOptions, Socket, SocketOptions } from 'socket.io-client'
import { io } from 'socket.io-client'
import { socketUrl } from '~/config/env'

type SocketConnectionOpts = Partial<ManagerOptions & SocketOptions> & {
  auth: { token: string }
}

interface State {
  socket: Socket | null
  connected: boolean
}

const useSocketStore = defineStore('socket', {
  state: (): State => ({
    socket: null,
    connected: false,
  }),

  actions: {
    connect(options: SocketConnectionOpts) {
      if (this.socket != null)
        return

      this.socket = io(socketUrl, {
        ...options,
      })

      this.socket.on('connect', () => {
        this.connected = true
      })

      this.socket.on('disconnect', () => {
        this.connected = false
      })
    },

    disconnect() {
      if (this.socket) {
        this.socket.disconnect()
        this.socket = null
      }
    },

    listen(event: string, callback: (message: any) => void) {
      if (this.socket) {
        this.socket.on(event, callback)
      }
    },
  },
})

export { useSocketStore }
