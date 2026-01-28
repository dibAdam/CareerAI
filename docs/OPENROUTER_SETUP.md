# 🤖 OpenRouter Setup Guide

## Why OpenRouter?

OpenRouter gives you access to **multiple AI models** through a single API:
- ✅ **Claude 3.5 Sonnet** - Best quality (recommended)
- ✅ **GPT-4 Turbo** - Great alternative
- ✅ **Gemini Pro** - Free tier available
- ✅ **Llama 3.1** - Open source option
- ✅ **30+ other models** - Choose what fits your needs

**Benefits:**
- Pay-as-you-go pricing
- No subscriptions required
- Switch models anytime
- Competitive pricing
- Free credits to start

## Step 1: Create OpenRouter Account

1. Go to [https://openrouter.ai](https://openrouter.ai)
2. Click **"Sign In"** (top right)
3. Sign in with Google, GitHub, or email
4. You'll get **$1 free credit** to start!

## Step 2: Get Your API Key

1. Go to [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Click **"Create Key"**
3. Give it a name (e.g., "Nextrova")
4. Click **"Create"**
5. **Copy the key** (starts with `sk-or-v1-`)
6. **Save it securely** - you won't see it again!

## Step 3: Add to Environment Variables

1. Open your `.env.local` file
2. Add your OpenRouter API key:

```env
OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
```

3. (Optional) Choose a specific model:

```env
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
```

## Step 4: Choose Your Model

### Recommended Models

#### 🏆 **Best Quality** - Claude 3.5 Sonnet
```env
OPENROUTER_MODEL=anthropic/claude-3.5-sonnet
```
- **Cost**: ~$0.015 per analysis
- **Quality**: Excellent
- **Speed**: Fast
- **Best for**: Production use

#### ⚡ **Fast & Cheap** - Claude 3 Haiku
```env
OPENROUTER_MODEL=anthropic/claude-3-haiku
```
- **Cost**: ~$0.001 per analysis
- **Quality**: Good
- **Speed**: Very fast
- **Best for**: High volume, testing

#### 🆓 **Free Tier** - Gemini Pro 1.5
```env
OPENROUTER_MODEL=google/gemini-pro-1.5
```
- **Cost**: Free tier available
- **Quality**: Good
- **Speed**: Fast
- **Best for**: Development, testing

#### 🔓 **Open Source** - Llama 3.1 70B
```env
OPENROUTER_MODEL=meta-llama/llama-3.1-70b-instruct
```
- **Cost**: ~$0.004 per analysis
- **Quality**: Good
- **Speed**: Fast
- **Best for**: Privacy-conscious users

### All Available Models

See the full list at: [https://openrouter.ai/models](https://openrouter.ai/models)

Popular options:
- `openai/gpt-4-turbo` - GPT-4 Turbo
- `openai/gpt-3.5-turbo` - Cheapest OpenAI model
- `anthropic/claude-3-opus` - Highest quality Claude
- `google/gemini-pro` - Google's model
- `mistralai/mistral-large` - Mistral's best model

## Step 5: Test Your Setup

1. Restart your development server:
```bash
npm run dev
```

2. Go to [http://localhost:3000/analyze](http://localhost:3000/analyze)

3. Test with sample data:

**Job Description:**
```
Senior Software Engineer at TechCorp
Requirements: Python, React, AWS, 5+ years experience
```

**CV Text:**
```
John Doe - Software Engineer
Skills: Python, JavaScript, React, Node.js, AWS
Experience: 6 years in web development
```

4. Click "Analyze CV"

5. If successful, you'll see the results page!

## Pricing Comparison

### Per Analysis Cost Estimate

| Model | Cost per Analysis | Quality | Speed |
|-------|------------------|---------|-------|
| Claude 3.5 Sonnet | ~$0.015 | ⭐⭐⭐⭐⭐ | ⚡⚡⚡⚡ |
| Claude 3 Haiku | ~$0.001 | ⭐⭐⭐⭐ | ⚡⚡⚡⚡⚡ |
| GPT-4 Turbo | ~$0.020 | ⭐⭐⭐⭐⭐ | ⚡⚡⚡ |
| GPT-3.5 Turbo | ~$0.002 | ⭐⭐⭐ | ⚡⚡⚡⚡⚡ |
| Gemini Pro 1.5 | Free tier | ⭐⭐⭐⭐ | ⚡⚡⚡⚡ |
| Llama 3.1 70B | ~$0.004 | ⭐⭐⭐⭐ | ⚡⚡⚡⚡ |

### Monthly Cost Estimates

**100 analyses/month:**
- Claude 3.5 Sonnet: ~$1.50
- Claude 3 Haiku: ~$0.10
- GPT-4 Turbo: ~$2.00
- Gemini Pro: Free

**1,000 analyses/month:**
- Claude 3.5 Sonnet: ~$15
- Claude 3 Haiku: ~$1
- GPT-4 Turbo: ~$20
- Gemini Pro: Free (with limits)

## Monitoring Usage

1. Go to [https://openrouter.ai/activity](https://openrouter.ai/activity)
2. See your:
   - Total requests
   - Cost per request
   - Total spend
   - Model usage breakdown

## Adding Credits

1. Go to [https://openrouter.ai/credits](https://openrouter.ai/credits)
2. Click **"Add Credits"**
3. Choose amount ($5, $10, $25, $50, etc.)
4. Pay with credit card
5. Credits never expire!

**Recommended starting amount**: $10 (enough for 600+ analyses with Claude 3.5)

## Troubleshooting

### Error: "Invalid API key"
- Check your key starts with `sk-or-v1-`
- Verify no extra spaces in `.env.local`
- Make sure you copied the full key

### Error: "Insufficient credits"
- Add credits at [https://openrouter.ai/credits](https://openrouter.ai/credits)
- Check your balance at [https://openrouter.ai/activity](https://openrouter.ai/activity)

### Error: "Model not found"
- Check model name is correct
- See available models: [https://openrouter.ai/models](https://openrouter.ai/models)
- Try a different model

### Error: "Rate limit exceeded"
- You're making too many requests
- Wait a few minutes
- Consider upgrading your account

### Response is not JSON
- Some models may not support JSON mode
- The code handles this automatically
- Try a different model if issues persist

## Advanced Configuration

### Custom Model Parameters

You can modify the model parameters in `lib/aiAnalyze.ts`:

```typescript
const response = await openrouter.chat.completions.create({
    model: MODEL,
    temperature: 0.3,  // Lower = more consistent (0-1)
    max_tokens: 4000,  // Maximum response length
    top_p: 1,          // Nucleus sampling (0-1)
});
```

### Using Multiple Models

You can switch models based on use case:

```typescript
// In lib/aiAnalyze.ts
const MODEL = process.env.NODE_ENV === 'production'
    ? 'anthropic/claude-3.5-sonnet'  // Production: best quality
    : 'anthropic/claude-3-haiku';     // Development: fast & cheap
```

### Fallback Models

Implement fallback if primary model fails:

```typescript
const MODELS = [
    'anthropic/claude-3.5-sonnet',
    'openai/gpt-4-turbo',
    'google/gemini-pro-1.5'
];

// Try each model until one succeeds
for (const model of MODELS) {
    try {
        return await analyzeWithModel(model);
    } catch (error) {
        continue;
    }
}
```

## Best Practices

1. **Start with free tier** (Gemini Pro) for testing
2. **Use Claude 3 Haiku** for development
3. **Use Claude 3.5 Sonnet** for production
4. **Monitor your usage** regularly
5. **Set up alerts** for high usage
6. **Cache results** to avoid duplicate analyses
7. **Implement rate limiting** to control costs

## Security

- ✅ Never commit `.env.local` to Git
- ✅ Use environment variables
- ✅ Rotate API keys periodically
- ✅ Monitor for unusual activity
- ✅ Set spending limits if available

## Support

- **OpenRouter Docs**: [https://openrouter.ai/docs](https://openrouter.ai/docs)
- **Discord Community**: [https://discord.gg/openrouter](https://discord.gg/openrouter)
- **Email Support**: support@openrouter.ai

---

**You're all set!** 🎉 Your app now uses OpenRouter with access to 30+ AI models!
