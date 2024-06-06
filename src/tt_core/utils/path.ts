
export function getPathComponents(path: string) {
    return path.split('/').filter(e => e.length > 0)
}
export function getLastPathComponent(path: string) {
    const arr = getPathComponents(path)
    if (arr.length > 0) {
        return arr[arr.length - 1]
    }
    return null
}
export function checkOrAddStartString(text: string, chars: string) {
    let t = text
    if (!t.startsWith(chars)) {
        t = chars + t
    }
    return t
}
export function checkOrAddEndString(text: string, chars: string) {
    let t = text
    if (!t.endsWith(chars)) {
        t = t + chars
    }
    return t
}
export function checkOrRemoveStartString(text: string, chars: string) {
    let t = text
    if (t.startsWith(chars)) {
        t = t.slice(chars.length)
    }
    return t
}
export function checkOrRemoveEndString(text: string, chars: string) {
    let t = text
    if (t.endsWith(chars)) {
        t = t.slice(0, -1 * chars.length)
    }
    return t
}
export function checkSamePath(a: string, b: string) {
    if (a == b) {
        return true
    }
    return checkOrRemoveEndString(checkOrRemoveStartString(a, '/'), '/') == checkOrRemoveEndString(checkOrRemoveStartString(b, '/'), '/')
}
export function pathJoin(...args: string[]) {
    let t = ''
    for (let i = 0; i < args.length; i++) {
        let t1 = checkOrAddStartString(args[i], '/')
        t1 = checkOrRemoveEndString(t1, '/')
        t += t1
    }
    return t
}




