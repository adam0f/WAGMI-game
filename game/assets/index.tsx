export interface Asset {
  key: string;
  src: string;
  type: 'IMAGE' | 'SVG' | 'SPRITESHEET' | 'AUDIO' | 'TILEMAP_TILES' | 'TILEMAP_MAP';
  data?: {
    frameWidth?: number;
    frameHeight?: number;
  };
}

export interface SpritesheetAsset extends Asset {
  type: 'SPRITESHEET';
  data: {
    frameWidth: number;
    frameHeight: number;
  };
}

export const BG = 'bg';
export const FULLSCREEN = 'fullscreen';
export const LEFT_CHEVRON = 'left_chevron';
export const CLICK = 'click';
export const LOWER_BELT = 'lowerBelt';
export const FOOD_DUMMY = 'dummyArt'
export const TRASH = 'trash'


// Save all in game assets in the public folder
export const assets: Array<Asset | SpritesheetAsset> = [
  {
    key: BG,
    src: 'assets/images/bg.png',
    type: 'IMAGE',
  },
  {
    key: LEFT_CHEVRON,
    src: 'assets/icons/chevron_left.svg',
    type: 'SVG',
  },
  {
    key: CLICK,
    src: 'assets/sounds/click.mp3',
    type: 'AUDIO',
  },
  {
    key: LOWER_BELT,
    src: 'assets/images/lowerBelt.png',
    type: 'SPRITESHEET',
    data: {
      frameHeight: 775,
      frameWidth: 4800,
    }
  },
  {
    key: FOOD_DUMMY,
    src: 'assets/images/art.png',
    type: 'SPRITESHEET',
    data: {
     frameHeight: 320,
      frameWidth: 290,
    }
  },
  {
    key: TRASH,
    src: 'assets/sounds/trash.wav',
    type: 'AUDIO',
  },
];
