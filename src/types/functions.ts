import type { FavoritePost } from "./user"

export interface FavoritesF {
  allFavorites: FavoritePost[]
  getFromStorage: () => void
  updateStorage: (temp: FavoritePost) => void
}

export interface FavoritesChange {
  isFavoritesChanged: boolean
  updateFavoritesStatus: () => void
}
