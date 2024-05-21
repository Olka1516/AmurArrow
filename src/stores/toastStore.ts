import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

export const toastStore = defineStore('toastSender', () => {
  const { t } = useI18n()
  const toast = useToast()

  const sendSuccess = (message: string) => {
    toast.success(t(message))
  }

  const sendInfo = (message: string) => {
    toast.info(message)
  }

  const sendError = (message: string) => {
    toast.error(t(message))
  }

  const sendWarning = (message: string) => {
    toast.warning(message)
  }

  return {
    sendSuccess,
    sendInfo,
    sendError,
    sendWarning
  }
})
