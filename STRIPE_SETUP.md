# Stripe Integration Setup Guide

This guide will help you set up Stripe payments for the Balanced Body Tai Chi app.

## Prerequisites

- A Stripe account (sign up at https://stripe.com)
- Node.js and npm installed
- Netlify account (for serverless functions) or similar platform

## Step 1: Install Dependencies

```bash
npm install stripe @netlify/functions
```

## Step 2: Create Stripe Products and Prices

1. Log into your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Go to **Products** → **Add Product**
3. Create three subscription products:

### Beginner Level
- **Name**: Beginner Level
- **Price**: $9.99/month
- **Special Offer**: $1.99 for first 4 weeks
- Copy the **Price ID** (starts with `price_`)

### Intermediate Level
- **Name**: Intermediate Level
- **Price**: $8.99/month
- Copy the **Price ID**

### Expert Level
- **Name**: Expert Level
- **Price**: $12.99/month
- Copy the **Price ID**

## Step 3: Update Price IDs in Code

Update `src/data/subscriptionPlans.ts` with your actual Stripe Price IDs:

```typescript
{
  id: 'beginner',
  name: 'Beginner Level',
  price: 9.99,
  stripePriceId: 'price_1234567890abcdef', // Replace with your actual Price ID
  // ...
}
```

## Step 4: Set Environment Variables

Create a `.env` file in the project root:

```bash
# Stripe Keys (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
VITE_STRIPE_PUBLIC_KEY=pk_test_your_publishable_key_here

# Stripe Webhook Secret (get after creating webhook)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Site URL
URL=https://your-site.netlify.app
```

### Getting your API Keys:
1. Go to [Stripe Dashboard → Developers → API Keys](https://dashboard.stripe.com/apikeys)
2. Copy the **Publishable key** (starts with `pk_test_`)
3. Click **Reveal test key** to copy the **Secret key** (starts with `sk_test_`)

## Step 5: Deploy Serverless Functions

The project includes two serverless functions in `netlify/functions/`:

- **create-checkout-session.ts** - Creates Stripe Checkout sessions
- **stripe-webhook.ts** - Handles Stripe webhooks for payment events

### For Netlify:
1. Deploy your site to Netlify
2. The functions will automatically be deployed

### For other platforms:
You'll need to adapt the serverless functions to your platform's format.

## Step 6: Set Up Stripe Webhooks

1. Go to [Stripe Dashboard → Developers → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Set **Endpoint URL** to: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)
6. Add it to your environment variables as `STRIPE_WEBHOOK_SECRET`

## Step 7: Update Environment Variables in Netlify

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add all three environment variables:
   - `STRIPE_SECRET_KEY`
   - `VITE_STRIPE_PUBLIC_KEY`
   - `STRIPE_WEBHOOK_SECRET`

## Step 8: Test the Integration

### Test in Development:
```bash
npm run dev
```

1. Go through the quiz
2. Select a subscription plan
3. Click "Continue to Payment"
4. You'll be redirected to Stripe Checkout (in test mode)

### Test Cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Use any future date for expiry and any 3 digits for CVC

### Testing Webhooks Locally:
Install Stripe CLI: https://stripe.com/docs/stripe-cli

```bash
stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook
stripe trigger checkout.session.completed
```

## Step 9: Go Live

### Switch to Production:
1. Get your **live API keys** from Stripe Dashboard
2. Update environment variables with live keys (remove `test_` prefix)
3. Create live products and prices in Stripe
4. Update `stripePriceId` in code with live price IDs
5. Update webhook endpoint to use production URL

## Payment Flow

1. User completes quiz → Selects subscription plan
2. User clicks "Continue to Payment" → Frontend calls `/api/create-checkout-session`
3. Backend creates Stripe Checkout session → Returns session ID
4. Frontend redirects to Stripe Checkout → User enters payment details
5. Payment successful → Stripe redirects to success URL (`/dashboard`)
6. Stripe sends webhook event → Backend processes webhook
7. Backend grants user access → User can access premium features

## Troubleshooting

### "Failed to create checkout session"
- Check that `STRIPE_SECRET_KEY` is set correctly
- Verify the Price IDs in `subscriptionPlans.ts` match your Stripe products
- Check browser console and Netlify function logs for errors

### Webhook not receiving events
- Verify webhook URL is correct
- Check that `STRIPE_WEBHOOK_SECRET` is set
- Use Stripe CLI to test webhooks locally
- Check Stripe Dashboard → Webhooks for delivery status

### Payment succeeds but user doesn't get access
- Check webhook handler is processing `checkout.session.completed` event
- Verify webhook secret is correct
- Check Netlify function logs for errors

## Security Notes

- Never commit `.env` file to git (it's in `.gitignore`)
- Never expose `STRIPE_SECRET_KEY` in frontend code
- Always validate webhooks using the webhook secret
- Use HTTPS in production
- Implement proper authentication before granting access

## Additional Resources

- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Stripe Testing Cards](https://stripe.com/docs/testing)

## Support

If you encounter issues:
1. Check Stripe Dashboard → Logs for API errors
2. Check Netlify function logs for backend errors
3. Check browser console for frontend errors
4. Contact Stripe support for payment-specific issues
