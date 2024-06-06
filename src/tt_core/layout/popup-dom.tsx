export function createPopupDom() {
    const div = document.createElement('div')
    const container = document.getElementById('tt-popup-container')!

    console.log(container)
    container.appendChild(div)
    return div
}

