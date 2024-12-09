'use server';

import { ConvexHttpClient } from "convex/browser";
import { auth } from '@clerk/nextjs/server';
import { getUsersStripeConnectId } from '../convex/users';
import { api } from "@/convex/_generated/api";

if(!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error('NEXT_PUBLIC_CONVEX_URL is not set');
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function getStripeConnectAccount() {
    const { userId } = await auth();

    if(!userId) {
        throw new Error('Not authenticated');
    }

    const stripeConnectId = await convex.query(
        api.users.getUsersStripeConnectId, { userId },
    );

    return {
        stripeConnectId: stripeConnectId || null,
    }
}