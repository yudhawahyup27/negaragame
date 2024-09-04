// import { defineStore } from 'pinia'
// import axios from 'axios'

interface Game {
  id: number;
  name: string;
  background_image: string;
  description_raw: string;
}

// export const useGameStore = defineStore('gameStore', {
//   state: () => ({
//     games: [] as Game[],
//     favorites: [] as Game[],
//     currentPage: 1,
//     pageSize: 10,
//     totalGames: 0,
//     searchQuery: '',
//   }),
//   actions: {
//     async fetchGames() {
//       const { currentPage, pageSize, searchQuery } = this
//       const apiKey = import.meta.env.VITE_RAWG_API_KEY
//       const endpoint = `https://api.rawg.io/api/games?page=${currentPage}&page_size=${pageSize}&search=${searchQuery}&key=${apiKey}`
//       const response = await axios.get(endpoint)
//       this.games = response.data.result
//       this.totalGames = response.data.count
//     },
//     async searchGames(query: string) {
//       this.searchQuery = query
//       this.currentPage = 1
//       await this.fetchGames()
//     },
//     async changePage(page: number) {
//       this.currentPage = page
//       await this.fetchGames()
//     },

//     addToFavorites(game: Game) {
//       this.favorites.push(game)
//     },
//     removeFromFavorites(gameId: number) {
//       this.favorites = this.favorites.filter(game => game.id !== gameId)
//     },
//   },
//   getters: {
//     getGames: (state) => state.games,
//     getFavorites: (state) => state.favorites,
//     totalPages: (state) => Math.ceil(state.totalGames / state.pageSize),
//   },
// })
// import { defineStore } from 'pinia';
// import axios from 'axios';

// export const useGamesStore = defineStore('games', {
//   state: () => ({
//     games: [],
//     searchQuery: '',
//     currentPage: 1,
//     pageSize: 10,
//     totalGames: 0,
//   }),
//   actions: {
//     async fetchGames(page = 1, query = '') {
//       try {
//         const response = await axios.get(
//           `https://api.rawg.io/api/games?page=${page}&page_size=${this.pageSize}&search=${query}&key=8012431b99524792b2f8cf943b435a1a`
//         );
//         this.games = response.data.results;
//         this.totalGames = response.data.count;
//         this.currentPage = page;
//         this.searchQuery = query;
//       } catch (error) {
//         console.error('Error fetching games:', error);
//       }
//     },
//   },
// });
import { defineStore } from 'pinia';
import axios from 'axios';


export interface GameDetail extends Game {
  description: string;
  released: string;
  rating: number;
 
}

export interface GameStoreState {
  games: Game[];
  gameDetail: GameDetail | null;
  favorites: Game[];
  page: number;
  pageSize: number;
  searchQuery: string;
}

export const useGameStore = defineStore('game', {
  state: (): GameStoreState => ({
    games: [],
    gameDetail: null,
    favorites: [],
    page: 1,
    pageSize: 10,
    searchQuery: '',
  }),
  actions: {
    async fetchGames() {
      const apiKey = "8012431b99524792b2f8cf943b435a1a"
      let endpoint = `https://api.rawg.io/api/games?key=${apiKey}&page=${this.page}&page_size=${this.pageSize}`;
      if (this.searchQuery) {
        endpoint = `https://api.rawg.io/api/games?search=${this.searchQuery}&key=${apiKey}&page=${this.page}&page_size=${this.pageSize}`;
      }
      const response = await axios.get(endpoint);
      this.games = response.data.results as Game[];
    },
    setSearchQuery(query: string) {
      this.searchQuery = query;
      this.page = 1;
      this.fetchGames();
    },
    async fetchGameDetail(id: string) {
     const apiKey = "8012431b99524792b2f8cf943b435a1a"
      const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
      this.gameDetail = response.data as GameDetail;
    },
    addFavorite(game: Game) {
      if (!this.favorites.find(fav => fav.id === game.id)) {
        this.favorites.push(game);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      }
    },
    loadFavorites() {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites) as Game[];
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchGames();
      }
    },
    nextPage() {
      this.page++;
      this.fetchGames();
    },
  },
});
