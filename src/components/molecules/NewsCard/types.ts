import { News } from '../../../contexts/GlobalContext';

export interface NewsCardProps {
  news: News;
  onPress: () => void;
} 