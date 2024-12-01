import { Doc } from './_generated/dataModel';

// With as const
// Type is { 
//   readonly WAITING: "waiting", 
//   readonly OFFERED: "offered" 
// }

// Without as const
// Type is { 
//     WAITING: string, 
//     OFFERED: string 
// }

// Time constants in milliseconds
export const DURATIONS = {
    TICKET_OFFER: 30 * 60 * 1000, // 30 minutes (Minumum Stripe allows for checkout expiry)
} as const;

// Status types for better type safety
export const WAITING_LIST_STATUS: Record<string, Doc<'waitingList'>['status']> = {
        WAITING: 'waiting',
        OFFERED: 'offered',
        PURCHASED: 'purchased',
        EXPIRED: 'expired',
} as const;

export const TICKET_STATUS: Record<string, Doc<"tickets">["status"]> = {
    VALID: 'valid',
    USED: 'used',
    REFUNDED: 'refunded',
    CANCELLED: 'cancelled',
} as const; 