import {NextResponse} from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) // Create stripe object. Contains API key 
const formatAmountForStripe = (amount) => {
    return Math.round(amount * 100)
}
export async function POST(req) {
    // Partial of ./pages/api/checkout_sessions/index.ts
// ...
// Create Checkout Sessions from body params.

const body = await req.json(); // Assume the request body contains the amount.
const amount = body.amount;  // Ensure that the amount is passed in the request body.
    const params= {
        mode: 'subscription', // subscription model
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    amount: formatAmountForStripe(amount, CURRENCY),
                    currency: 'usd',
                    product_data: {
                        name: 'Pro Subscription',

                    },
                    unit_amount: formatAmountForStripe(10), // 10 dollars
                    recurring: {
                        interval: "month",
                        interval_count: 1
                    }
                },
                quantity: 1
            },
        ],
        success_url: `${req.headers.get(
            'origin',
        )}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get(
            'origin',
        )}/result?session_id={CHECKOUT_SESSION_ID}`,
    }


    const checkoutSession =
        await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, {
        status: 200
    })
// ...
}