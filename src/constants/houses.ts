export interface House {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    text?: string;
  };
}

export const HOUSES: Record<string, House> = {
  gryffindor: {
    id: 'gryffindor',
    name: 'Gryffindor',
    colors: {
      primary: '#740001', 
      secondary: '#D3A625',
      text: '#333333'
    }
  },
  slytherin: {
    id: 'slytherin',
    name: 'Slytherin',
    colors: {
      primary: '#2a623d',
      secondary: '#5d5d5d',
      text: '#333333'
    }  
  },
  hufflepuff: {
    id: 'hufflepuff',
    name: 'Hufflepuff',
    colors: {
      primary: '#ecb939',
      secondary: '#372e29',
      text: '#333333'
    }
  },
  ravenclaw: {
    id: 'ravenclaw',
    name: 'Ravenclaw',
    colors: {
      primary: '#000A90', 
      secondary: '#946B2D', 
      text: '#333333'
    }
  },
};

export const HOUSES_ARRAY = Object.values(HOUSES);