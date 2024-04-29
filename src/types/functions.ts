import type { FavoritePost } from "./posts"

export interface FavoritesF {
  allFavorites: FavoritePost[]
  getFromStorage: () => void
  updateStorage: (temp: FavoritePost) => void
}

export interface FavoritesChange {
  isFavoritesChanged: boolean
  updateFavoritesStatus: () => void
}
