import { useToast } from 'vue-toastification'

type NotifyType = 'success' | 'error' | 'info' | 'warning'

const toast = useToast()

export function notify(message: string, type: NotifyType = 'success') {
  toast[type](message)
}
