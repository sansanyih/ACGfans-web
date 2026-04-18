export const VIDEO_URLS = {
   GET_ALL: '/video/get',
   GET_BY_ID: (id: number) => `/video/get/${id}`
} as const