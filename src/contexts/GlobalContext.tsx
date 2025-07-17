import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
export interface Journalist {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  image: string;
  journalistId: number;
  journalist: Journalist;
  publishedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  favorites: number[]; // Array of news IDs
}

interface GlobalState {
  news: News[];
  journalists: Journalist[];
  user: User | null;
  favorites: News[];
  loading: boolean;
  error: string | null;
}

type GlobalAction =
  | { type: 'SET_NEWS'; payload: News[] }
  | { type: 'SET_JOURNALISTS'; payload: Journalist[] }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_FAVORITE'; payload: number }
  | { type: 'REMOVE_FAVORITE'; payload: number }
  | { type: 'SET_FAVORITES'; payload: News[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: GlobalState = {
  news: [],
  journalists: [],
  user: null,
  favorites: [],
  loading: false,
  error: null,
};

const globalReducer = (state: GlobalState, action: GlobalAction): GlobalState => {
  switch (action.type) {
    case 'SET_NEWS':
      return { ...state, news: action.payload };
    case 'SET_JOURNALISTS':
      return { ...state, journalists: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_FAVORITE':
      const newFavorites = [...state.favorites];
      const newsToAdd = state.news.find(n => n.id === action.payload);
      if (newsToAdd && !newFavorites.find(f => f.id === action.payload)) {
        newFavorites.push(newsToAdd);
      }
      return { ...state, favorites: newFavorites };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(f => f.id !== action.payload),
      };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

interface GlobalContextType {
  state: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
  addFavorite: (newsId: number) => void;
  removeFavorite: (newsId: number) => void;
  isFavorite: (newsId: number) => boolean;
  loadFavorites: () => Promise<void>;
  saveFavorites: () => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const addFavorite = (newsId: number) => {
    dispatch({ type: 'ADD_FAVORITE', payload: newsId });
  };

  const removeFavorite = (newsId: number) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: newsId });
  };

  const isFavorite = (newsId: number): boolean => {
    return state.favorites.some(f => f.id === newsId);
  };

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        const favoritesData: News[] = JSON.parse(storedFavorites);
        dispatch({ type: 'SET_FAVORITES', payload: favoritesData });
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async () => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  // Save favorites whenever they change
  useEffect(() => {
    if (state.favorites.length > 0 || state.favorites.length === 0) {
      saveFavorites();
    }
  }, [state.favorites]);

  // Load favorites on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
        addFavorite,
        removeFavorite,
        isFavorite,
        loadFavorites,
        saveFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}; 