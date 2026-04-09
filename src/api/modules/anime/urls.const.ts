// 动漫 API 地址常量
export const ANIME_URLS = {
   GET_ALL: '/anime/get',
   GET_RANDOM:'/anime/get/random',//随机获取
   GET_LATEST:'/anime/get/latest',//最新作品
   GET_UPCOMING:'/anime/get/upcoming',
   GET_BY_ID: (id: number) => `/anime/get/${id}`  // 详情页
} as const