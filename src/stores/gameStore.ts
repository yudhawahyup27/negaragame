// src/stores/gameStore.ts
import { defineStore } from 'pinia';
import axios from 'axios';

export interface Game {
  id: number;
  name: string;
  background_image: string;
  released: string;
  rating: number;
}

export const useGameStore = defineStore('game', {
  state: () => ({
    games: [] as Game[],
    gameDetail: null as Game | null,
    favoriteGames: [] as Game[],
    searchQuery: '',
    page: 1,
    pageSize: 10,
    totalPages: 1,
    totalGames: 0,
  }),
  actions: {
    async fetchGames() {
      const url = this.searchQuery
        ? `https://api.rawg.io/api/games?search=${this.searchQuery}&key=8012431b99524792b2f8cf943b435a1a&page=${this.page}&page_size=${this.pageSize}`
        : `https://api.rawg.io/api/games?key=8012431b99524792b2f8cf943b435a1a&page=${this.page}&page_size=${this.pageSize}`;
      try {
        const response = await axios.get(url);
        this.games = response.data.results;
        this.totalGames = response.data.count; // Update total games
        this.totalPages = Math.ceil(this.totalGames / this.pageSize); // Calculate total pages
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    },
    async fetchGameDetail(id: number) {
      try {
        const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=8012431b99524792b2f8cf943b435a1a`);
        this.gameDetail = response.data;
      } catch (error) {
        console.error('Error fetching game detail:', error);
      }
    },
    addFavorite(game: Game) {
      if (!this.favoriteGames.find(fav => fav.id === game.id)) {
        this.favoriteGames.push(game);
        localStorage.setItem('favorites', JSON.stringify(this.favoriteGames));
      }
    },
    loadFavorites() {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        this.favoriteGames = JSON.parse(storedFavorites);
      }
    },
    removeFavorite(gameId: number) {
      this.favoriteGames = this.favoriteGames.filter(game => game.id !== gameId);
      localStorage.setItem('favorites', JSON.stringify(this.favoriteGames));
    },
    setSearchQuery(query: string) {
      this.searchQuery = query;
      this.page = 1;
      this.fetchGames();
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.fetchGames();
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchGames();
      }
    },
  },
});
