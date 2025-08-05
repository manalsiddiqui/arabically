import { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, isRTL } = req.body

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' })
  }

  try {
    const systemMessage = {
      role: 'system' as const,
      content: isRTL 
        ? `أنت مساعد ذكي متخصص في تدريس اللغة العربية. تساعد المعلمين في تطوير خطط الدروس وتقديم اقتراحات تعليمية مبتكرة.

يجب أن تقدم:
1. نصائح عملية وقابلة للتطبيق لتدريس العربية
2. اقتراحات أنشطة مناسبة للأعمار المختلفة
3. طرق تقييم فعالة
4. حلول للتحديات التعليمية الشائعة
5. إرشادات لتكييف المحتوى حسب مستوى الطلاب

اجعل إجاباتك مفيدة ومشجعة وعملية. استخدم اللغة العربية في ردودك.`
        : `You are an expert Arabic language teaching assistant. You help teachers develop lesson plans and provide innovative teaching suggestions.

You should provide:
1. Practical, actionable advice for teaching Arabic
2. Age-appropriate activity suggestions
3. Effective assessment methods
4. Solutions to common teaching challenges
5. Guidance for adapting content to student levels

Make your responses helpful, encouraging, and practical. Focus on proven pedagogical methods for Arabic as a second language.`
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        systemMessage,
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const aiResponse = response.choices[0].message.content

    if (!aiResponse) {
      return res.status(500).json({ error: 'Failed to generate response' })
    }

    res.status(200).json({ response: aiResponse })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
} 