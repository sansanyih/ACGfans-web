// 声优角色类型
export interface Character {
   name: string
   voiceActor: string
}

// 评论类型
export interface Comment {
   id: number
   user: string
   content: string
   date: string
}

// 动漫基础数据类型（列表用）
export interface AnimeItem {
   id: number
   title: string           // 日文标题
   chineseTitle: string    // 中文标题
   image: string           // 图片URL
   description: string     // 简短描述
}

// 动漫详情类型（详情页用）
export interface AnimeDetail extends AnimeItem {
   introduction: string    // 详细介绍
   studio: string          // 制作公司
   tags: string[]          // 标签
   episodes: number        // 集数
   startDate: string       // 开播日期
   broadcastDay: string    // 更新星期
   originalWork: string    // 原作
   director: string        // 监督
   script: string          // 脚本
   storyboard: string      // 分镜
   performance: string     // 演出
   music: string           // 音乐
   characterDesign: string // 人物设计
   seriesComposition: string      // 系列构成
   artDirector: string     // 美术监督
   colorDesign: string     // 色彩设计
   chiefAnimationDirector: string  // 总作画监督
   characters: Character[] // 角色列表
   officialWebsite: string // 官网
   comments: Comment[]     // 评论列表
}

export type AnimeListResponse = AnimeItem[]