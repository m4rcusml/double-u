import { Badge } from '@/components/ui/badge'
import { SendHorizonal } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Limpar mensagem de erro após 5 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    setError(null)

    try {
      // Chamada à API - enviando apenas a mensagem como string
      // Usando URL completa para garantir comunicação direta
      const response = await axios.post(
        'http://localhost:5000/api/chat',
        { message: userMessage.content },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      // Adicionar resposta do bot
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.reply,
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
    } catch (err: any) {
      console.error('Erro ao enviar mensagem:', err)
      
      // Exibir mensagem de erro
      setError(err.response?.data?.error || err.message || 'Erro ao processar sua mensagem')
      
      // Adicionar mensagem de erro como mensagem do bot
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Desculpe, estou enfrentando dificuldades técnicas. Por favor, tente novamente mais tarde.',
        isUser: false,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const hasMessages = messages.length > 0

  return (
    <section className='flex flex-col h-full overflow-y-hidden'>
      {/* Mensagem de erro */}
      {error && (
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
          <span className='block sm:inline'>{error}</span>
        </div>
      )}
      
      {hasMessages ? (
        <div className='flex-1 overflow-y-auto p-4'>
          <div className='max-w-3xl mx-auto space-y-4'>
            {messages.map((message) => (
              <Message
                key={message.id}
                content={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}

            {isLoading && (
              <div className='flex justify-start'>
                <div className='bg-muted text-muted-foreground p-4 rounded-lg max-w-xs'>
                  <div className='flex items-center space-x-2'>
                    <div className='flex space-x-1'>
                      <div className='w-2 h-2 bg-current rounded-full animate-bounce'></div>
                      <div className='w-2 h-2 bg-current rounded-full animate-bounce' style={{ animationDelay: '0.1s' }}></div>
                      <div className='w-2 h-2 bg-current rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className='text-sm'>Digitando...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      ) : (
        <div className='flex-1 flex flex-col items-center justify-center p-4'>
          <h1 className='text-2xl font-bold mb-4'>Como podemos te ajudar?</h1>
          <div className='flex gap-2 mb-8'>
            <Badge
              variant='secondary'
              className='cursor-pointer hover:bg-secondary/80'
              onClick={() => setInputValue('Gostaria de falar com um consultor')}
            >
              Fale com um consultor
            </Badge>
            <Badge
              variant='secondary'
              className='cursor-pointer hover:bg-secondary/80'
              onClick={() => setInputValue('Preciso de ajuda com documentos')}
            >
              Documentos
            </Badge>
          </div>
          <p className='text-muted-foreground text-center max-w-md'>
            Digite sua mensagem abaixo para começar a conversa.
          </p>
        </div >
      )}

      {/* Input de Mensagem */}
      <div className='bg-muted border-t border-muted p-4'>
        <div className='max-w-3xl mx-auto flex items-center gap-2'>
          <input
            ref={inputRef}
            type='text'
            placeholder='Escreva aqui'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className='w-full py-2 px-4 bg-background rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50'
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className='cursor-pointer hover:bg-muted-foreground/10 p-2 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <SendHorizonal size={28} />
          </button>
        </div>
      </div>
    </section >
  )
}

function Message({ content, isUser, timestamp }: { content: string; isUser: boolean; timestamp: Date }) {
  const messageClass = isUser
    ? 'bg-primary text-primary-foreground ml-auto'
    : 'bg-muted text-muted-foreground mr-auto'

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`px-4 py-2 rounded-lg max-w-xs sm:max-w-md lg:max-w-lg ${messageClass}`}>
        <p className='text-sm sm:text-base whitespace-pre-wrap break-words'>
          {content}
        </p>
        <p className={`text-xs mt-1 opacity-70 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(timestamp)}
        </p>
      </div>
    </div>
  )
}
