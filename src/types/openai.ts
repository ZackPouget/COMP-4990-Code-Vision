import OpenAI from "openai"

export type Message = {
    role: "user" | "assistant"
    content: string
}