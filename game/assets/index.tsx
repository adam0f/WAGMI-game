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
export const YELLOW_DUMMY = 'dummyYellow'
export const RED_DUMMY = 'dummyRed'
export const CUSTOMER_COMMONROFL = 'commonRofl'
export const MCWAGIE_COUNTER = 'mcwagieCounter'
export const FRYER = 'fryer'
export const PREP = 'prep'
export const DRINK = 'drink'


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
      frameWidth: 9600,
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
    key: YELLOW_DUMMY,
    src: 'assets/images/artYellow.png',
    type: 'SPRITESHEET',
    data: {
     frameHeight: 320,
      frameWidth: 290,
    }
  },
    {
      key: RED_DUMMY,
      src: 'assets/images/artRed.png',
      type: 'SPRITESHEET',
      data: {
       frameHeight: 320,
        frameWidth: 290,
      },
    },
  {
    key: TRASH,
    src: 'assets/sounds/trash.wav',
    type: 'AUDIO',
  },
  {
    key: CUSTOMER_COMMONROFL,
    src: 'assets/images/commonRofl.png',
    type: 'SPRITESHEET',
    data: {
      frameHeight: 256,
      frameWidth: 230,
    }
  },
  {
    key: MCWAGIE_COUNTER,
    src: 'assets/images/mcwagieCounter.png',
    type: 'SPRITESHEET',
    data: {
      frameHeight: 128,
      frameWidth: 350,
    }
  },
  {
    key: FRYER,
    src: 'assets/images/fryer.png',
    type: 'SPRITESHEET',
    data: {
     frameHeight: 1150,
      frameWidth: 1280,
    }
  },
  {
    key: PREP,
    src: 'assets/images/prep.png',
    type: 'SPRITESHEET',
    data: {
     frameHeight: 1120,
      frameWidth: 1280,
    }
  },
  {
    key: DRINK,
    src: 'assets/images/drink.png',
    type: 'SPRITESHEET',
    data: {
     frameHeight: 1130,
      frameWidth: 740,
    }
  },
];
