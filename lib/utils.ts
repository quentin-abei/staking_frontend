import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatBalance = (balance: string): string => {
    // Parsing balance string to a numerical value
    const numericBalance = parseFloat(balance);

    if (isNaN(numericBalance)) {
        return 'Invalid balance';
    }

    if (numericBalance >= 1000000 && numericBalance < 1000000000) {
        return (numericBalance / 1000000).toFixed(2) + ' million';
    } else if (numericBalance >= 1000000000 && numericBalance < 1000000000000) {
        return (numericBalance / 1000000000).toFixed(2) + ' billion';
    } else if (numericBalance >= 1000000000000) {
        return (numericBalance / 1000000000000).toFixed(2) + ' trillion';
    } else {
        return numericBalance.toString();
    }
};

// export const formatTime = (durationInSeconds: string): string => {
//     const duration = parseInt(durationInSeconds, 10);
//     if (isNaN(duration)) {
//         return 'Invalid duration';
//     }

//     const days = Math.floor(duration / (3600 * 24));
//     const hours = Math.floor((duration % (3600 * 24)) / 3600);
//     const minutes = Math.floor((duration % 3600) / 60);
//     const seconds = duration % 60;

//     const parts: string[] = [];
//     if (days > 0) {
//         parts.push(`${days} day${days !== 1 ? 's' : ''}`);
//     }
//     if (hours > 0) {
//         parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
//     }
//     if (minutes > 0) {
//         parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
//     }
//     if (seconds > 0) {
//         parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
//     }

//     return parts.join(', ');
// };

export const formatTime = (durationInSeconds: number): string => {
    if (isNaN(durationInSeconds)) {
        return 'Invalid duration';
    }

    const days = Math.floor(durationInSeconds / (3600 * 24));
    const hours = Math.floor((durationInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    const parts: string[] = [];
    if (days > 0) {
        parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    }
    if (hours > 0) {
        parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    }
    if (minutes > 0) {
        parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    }
    if (seconds > 0) {
        parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
    }

    return parts.join(', ');
};
