declare module 'botid/server' {
  export type BotIdVerification = {
    isBot: boolean
  }

  export function checkBotId(): Promise<BotIdVerification>
}

declare module 'botid/client/core' {
  export type BotIdProtectRule = {
    path: string
    method?: string
  }

  export type InitBotIdOptions = {
    protect?: BotIdProtectRule[]
  }

  export function initBotId(options?: InitBotIdOptions): void
}
