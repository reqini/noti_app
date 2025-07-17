import { Journalist } from '../../../contexts/GlobalContext';

export interface JournalistCardProps {
  journalist: Journalist;
  onPress: () => void;
} 