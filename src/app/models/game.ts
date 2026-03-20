export interface Game {

  id: number
  appName: string
  gameTitle: string   // rehne do (backend compatible)

  bonus: string       // rehne do (convert kar lenge)
  image: string
  keywords: string    // ignore kar sakte ho

  downloadLink: string
  category: string

  rating: number
  downloads: number
  popular: boolean

  slug?: string       // 👈 optional bana do (SEO ke liye)

}