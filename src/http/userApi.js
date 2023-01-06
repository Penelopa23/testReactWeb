import {$host} from './index'

export const login = async (Id) => {
    const response = await $host.post('/auth', {Id})
    return response
}