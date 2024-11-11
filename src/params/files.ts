import { allowed } from '$lib/constants'

export const match = (param) => new RegExp(`\\.(${allowed.join('|')})$`, 'i').test(param)
