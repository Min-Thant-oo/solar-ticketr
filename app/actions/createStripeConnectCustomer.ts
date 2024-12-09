'use server';

import { auth } from '@clerk/nextjs/server';
import { api } from '@/convex/_generated/api';
import { ConvexHttpClient } from 'convex/browser';
import { stripe } from '@/lib/stripe';

if(!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error('NEXT_PUBLIC_CONVEX_URL is not set');
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function createStripeConnectCustomer() {
    const { userId } = await auth();

    if(!userId) {
        throw new Error('Not authenticated');
    }

    // Checking if user already has a connect account
    const existingStripeConnectId = await convex.query(
        api.users.getUsersStripeConnectId, { userId }
    );

    if(existingStripeConnectId) {
        return { account: existingStripeConnectId };
    }

    // Create new connect account if there is no existing account
    const account = await stripe.accounts.create({
        type: 'express',
        capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
        },
    });

    // Update the database in user table with stripe connect id
    await convex.mutation(api.users.updateOrCreateUserStripeConnectId, {
        userId, 
        stripeConnectId: account.id,
    });

    return { account: account.id };
}