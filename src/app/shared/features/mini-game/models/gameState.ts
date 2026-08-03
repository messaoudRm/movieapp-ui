export type TileType = 'VIDE' | 'MUR' | 'POINT' | 'PORTE' | 'BONUS';
export type EntityType = 'PACMAN' | 'FANTOME' | 'POMME_VIOLETTE' | 'POMME_ORANGE' | 'POMME_VERTE';
export type GameStatus = 'EN_ATTENTE' | 'EN_COURS' | 'GAME_OVER' | 'VICTOIRE';
export type Direction = 'AUCUNE' | 'DROITE' | 'GAUCHE' | 'HAUT' | 'BAS';

export interface PositionDTO {
  x: number;
  y: number;
}

export interface EntityDTO {
  type: EntityType;
  position: PositionDTO;
  couleur: string;
  etat: string;
  actif: boolean;
}

export interface MapDTO {
  tuiles: TileType[][];
  largeur: number;
  hauteur: number;
}

export interface GameState {
  carte: MapDTO;
  pacman: EntityDTO;
  direction: Direction;
  fantomes: EntityDTO[];
  pommes: EntityDTO[];
  score: number;
  vies: number;
  statut: GameStatus;
  tempsEcoule: number;
}
