import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getUserById = query({
    args: { userId: v.string() },
    handler: async (ctx, { userId }) => {
        const user = await ctx.db
            .query('users')
            .withIndex('by_user_id', (q) => q.eq('userId', userId))
            .first();
        
        return user;
    }
})

export const updateUser = mutation({
    args: {
        userId: v.string(),
        name: v.string(),
        email: v.string(),
    },
    handler: async (ctx, {userId, name, email}) => {
        // Checking if user exists
        const existingUser = await ctx.db
            .query('users')
            .withIndex('by_user_id', (q) => q.eq('userId', userId))  // by using 'by_user_id' index name defined in schema.ts
            .first();

        if(existingUser) {
            // Updating existing user
            await ctx.db.patch(existingUser._id, {
                name,
                email
            });
            return existingUser._id;
        }

        // Creating new user
        const newUserId = await ctx.db.insert('users', {
            userId,
            name,
            email,
            stripeConnectId: undefined,
        });

        return newUserId;
    }
})