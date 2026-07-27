export const phoneNumber = "+1 (778) 214-5676";

// Strips out spaces, dashes, and parentheses while keeping the leading '+'
export const phoneTel = `tel:${phoneNumber.replace(/(?!^\+)\D/g, '')}`;