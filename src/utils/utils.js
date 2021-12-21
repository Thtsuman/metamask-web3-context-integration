export function formatAddress(address = '', length = 'short') {
    if (address && length === 'short') {
        address = address.substring(0, 6) + '...' + address.substring(address.length - 4, address.length)
        return address
    } else if (address && length === 'long') {
        address = address.substring(0, 12) + '...' + address.substring(address.length - 8, address.length)
        return address
    } else {
        return null
    }
}

export function formatCurrency(amount, decimals = 2) {
    if (!isNaN(amount)) {
        const formatter = new Intl.NumberFormat(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });

        return formatter.format(amount)
    } else {
        return 0
    }
}

export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
}

export default formatAddress