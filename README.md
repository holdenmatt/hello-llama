This is a simple open source chat bot, built with:
- [Llama 3.1 405B](https://llama.meta.com/docs/overview)
- [Groq](https://wow.groq.com/now-available-on-groq-the-largest-and-most-capable-openly-available-foundation-model-to-date-llama-3-1-405b/)
- The [Vercel AI SDK](https://sdk.vercel.ai/docs/guides/llama-3_1)
- [NextJS](https://nextjs.org/), [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

In the project root, create a `.env.local` file and add your Groq API key:
```
GROQ_API_KEY=XXXXXX
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

(Remember to add GROQ_API_KEY as an environment variable)
