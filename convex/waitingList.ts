import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { WAITING_LIST_STATUS } from './constant';

export const getQueuePosition = query ({
    args: {
        eventId: v.id('events'),
        userId: v.string(),
    },
    handler: async(ctx, { eventId, userId }) => {
        // Getting entry for this specific user and event combination
        const entry = await ctx.db
            .query('waitingList')
            .withIndex('by_user_event', (q) => q.eq('userId', userId).eq('eventId', eventId))
            // filtering out expired tickets
            .filter((q) => q.neq(q.field('status'), WAITING_LIST_STATUS.EXPIRED))
            .first();

        if(!entry) return null;

        // Getting total number of people ahead in line
        const peopleAhead = await ctx.db
            .query('waitingList')
            .withIndex('by_event_status', (q) => q.eq('eventId', eventId))
            .filter((q) => 
                q.and(
                    // Getting all entries before this specific user's entry. 
                    // q is for each record in the query. 
                    // entry is for this specific user's entry
                    q.lt(q.field('_creationTime'), entry?._creationTime),
                    // Only getting entries that are either waiting or offered
                    q.or(
                        q.eq(q.field('status'), WAITING_LIST_STATUS.WAITING),
                        q.eq(q.field('status'), WAITING_LIST_STATUS.OFFERED)
                    )
                )
            )
            .collect()
            .then((entries) => entries.length)
        
        return { ...entry, position: peopleAhead + 1 }
    },
});