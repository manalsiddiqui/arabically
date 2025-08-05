import { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { 
    message, 
    lessonPlanId, 
    lessonContent, 
    lessonTitle, 
    ageGroup, 
    subject, 
    isRTL 
  } = req.body

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' })
  }

  if (!lessonContent || !lessonTitle) {
    return res.status(400).json({ error: 'Lesson content and title are required' })
  }

  try {
    const systemMessage = {
      role: 'system' as const,
      content: isRTL
        ? `أنت هدايا، مساعد ذكي متخصص في تدريس اللغة العربية. تم تدريبك من قبل فريق من المعلمين الخبراء على مدار عام كامل لتفهم احتياجات المعلمين بعمق.

**تخصصك:**
- متوافق مع الإطار الأوروبي المرجعي المشترك للغات (CEFR) 
- خبير في التعلم القائم على اللعب الموجه (Guided Play)
- متخصص في معايير التدريس المبكر والتطوير الطبيعي
- مدرب لإنتاج مواد تعليمية جاهزة للاستخدام

**معلومات الدرس الحالي:**
- العنوان: ${lessonTitle}
- المحتوى: ${lessonContent}
${ageGroup ? `- الفئة العمرية: ${ageGroup} سنوات` : ''}
${subject ? `- الموضوع: ${subject}` : ''}

**مبادئك التوجيهية:**
1. ركز فقط على محتوى هذا الدرس المحدد
2. طبق مبادئ CEFR في تقييم المستوى واقتراح التطوير
3. ادمج أنشطة التعلم القائم على اللعب الموجه
4. قدم مواد جاهزة للاستخدام (أنشطة، تقييمات، ألعاب)
5. راعي التطوير الطبيعي للأطفال والتعلم القائم على الطبيعة
6. اقترح طرق تقييم مناسبة للفئة العمرية

**أسلوبك:**
- عملي ومباشر
- مبني على خبرة المعلمين الذين دربوك
- يوفر الوقت بمواد جاهزة للتطبيق
- مشجع وداعم للمعلم

استخدم اللغة العربية في ردودك وقدم نصائح عملية مبنية على الدرس المرفوع.`
        : `You are HedAia, a specialized AI assistant for Arabic language teaching. You have been trained by a team of expert teachers over a full year to deeply understand teachers' needs.

**Your Specialization:**
- Aligned with the Common European Framework of Reference for Languages (CEFR)
- Expert in Guided Play learning approach
- Specialist in early years teaching standards and nature-based development
- Trained to produce ready-to-use teaching materials

**Current Lesson Information:**
- Title: ${lessonTitle}
- Content: ${lessonContent}
${ageGroup ? `- Age Group: ${ageGroup} years` : ''}
${subject ? `- Subject: ${subject}` : ''}

**Your Guiding Principles:**
1. Focus only on this specific lesson content
2. Apply CEFR principles in level assessment and development suggestions
3. Integrate guided play learning activities
4. Provide ready-to-use materials (activities, assessments, games)
5. Consider natural child development and nature-based learning
6. Suggest age-appropriate assessment methods

**Your Style:**
- Practical and direct
- Based on the expertise of teachers who trained you
- Time-saving with ready-to-implement materials
- Encouraging and supportive to teachers

Unlike general AI tools, you are specifically designed for Arabic teachers. Provide practical advice based on the uploaded lesson content, incorporating CEFR levels and guided play methodology.`
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        systemMessage,
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 1200,
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