export interface Bears {
  bears: number;
  increasePopulation: () => void;
  decreasePopulation: () => void;
  removeAllPopulation: () => void;
  updatePopulation: (newBears: number) => void;
}
