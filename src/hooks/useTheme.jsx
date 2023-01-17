const useTheme = (theme) => {
    const backgroundColorOpacity = `var(--background-color-opacity-${theme}`
    const backgroundColor = `var(--background-color-${theme})`
    const backgroundBody = `var(--background-body-${theme})`
    const borderColorOpacity = `var(--border-color-opacity-${theme})`
    const borderColorButton = `var(--border-color-button-${theme})`
    const borderColor = `var(--border-color-${theme})`
    const fontColor = `var(--font-color-${theme})`

    localStorage.setItem('app-theme', theme)

    document.body.style.setProperty('--background-color-opacity', backgroundColorOpacity)
    document.body.style.setProperty('--background-color', backgroundColor)
    document.body.style.setProperty('--background-body', backgroundBody)
    document.body.style.setProperty('--border-color-opacity', borderColorOpacity)
    document.body.style.setProperty('--border-color-button', borderColorButton)
    document.body.style.setProperty('--border-color', borderColor)
    document.body.style.setProperty('--font-color', fontColor)
}

export default useTheme