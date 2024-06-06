

export function formatTimestamp(timestamp: number, format = 'YYYY-MM-DD HH:mm:ss'): string {
    const date = new Date(timestamp)
    return formatDate(date, format)
}

export function formatDate(date: Date, format = 'YYYY-MM-DD HH:mm:ss'): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const str = format
        .replace('YYYY', year.toString())
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds)
    return str
}