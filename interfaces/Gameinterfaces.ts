export interface Game {
    id: number;
    name: string;
    background_image: string;
    // Tambahkan properti lain yang diperlukan
  }
  
  export interface GameDetail extends Game {
    description: string;
    released: string;
    rating: number;
    // Tambahkan properti lain yang diperlukan
  }
  
  export interface GameStoreState {
    games: Game[];
    gameDetail: GameDetail | null;
    favorites: Game[];
    page: number;
    pageSize: number;
    searchQuery: string;
  }
  