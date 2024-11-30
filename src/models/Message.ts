export interface MessageParticipant {
  id: number
  name: string
  birth_date: string
  avatar_url: string
}

export interface Message {
  id: number
  content: string
  sender: MessageParticipant
  receiver: MessageParticipant
  created_at: string
}
