import { request } from "../../axios"



export const http = (store: any) => (next: any) => async (action: any) => {
    if (action.payload && action.payload.url) {
        const { method, url, params, body, header } = action.payload

        let config: any = {
            method,
            url,
            params
        }

        body && (config = { ...config, data: body })
        header && (config = { ...config, headers: header })



        // multipart queries
        if (header && header['Content-Type'] === 'multipart/form-data') {
            const bodyFormData = new FormData()

            Object.keys(body).map((key) => {
                bodyFormData.append(key, body[key])
            })


            config = { ...config, data: bodyFormData }
        }
        try {
            action.result = await request(config)
        } catch (error) {
            action.error = error
        }
    }


    return next(action)
}
