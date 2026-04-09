// 文章 API 地址常量
export const ARTICLE_URLS = {
   GET_ALL: '/article/get',
   GET_BY_ID: (id: number) => `/article/get/${id}`
} as const