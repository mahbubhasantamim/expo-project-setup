export const UrlUtils = {
    getSearchParamFromURL: (url: string, param: string) => {
        const include = url.includes(param)

        if (!include) {
            return null
        }

        const params = url.split(/([&,?,=])/)
        const index = params.indexOf(param)
        const value = params[index + 2]
        return value
    },
}
