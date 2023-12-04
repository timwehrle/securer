// ======================= //
// ====== SANITIZER ====== //
// ======================= //

export const sanitize = (value, options = { trim: true, escapeHtml: true, allFalse: false }) => {
    let sanitizedValue = value;
    if (typeof value === 'string') {
        if (options.allFalse) {
            options.trim = false;
            options.escapeHtml = false;
        }
        if (options.trim) {
            sanitizedValue = sanitizedValue.trim();
        }
        if (options.escapeHtml) {
            sanitizedValue = escapeHtml(sanitizedValue);
        }
    }

    return sanitizedValue;
}

const escapeHtml = (value) => {
    return value.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};