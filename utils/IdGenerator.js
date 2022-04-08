export const IdGenerator =  (customString = "", length = 16) => {
    let result = '';
    for (const char of customString) {
        let resCode = char.charCodeAt() * Math.trunc(Math.random() * 1e10)
        resCode = Math.trunc(resCode)
        result += resCode.toString(16)
        return result.slice(0, length)
    }
    return result.slice(0, length)
}
