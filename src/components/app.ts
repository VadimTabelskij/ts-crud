import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import models from '../data/models';
import brands from '../data/brands';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);

    if (foundElement === null) { throw new Error(`Nerastas elementas su selektoriumi '${selector}'`); }
    if (!(foundElement instanceof HTMLElement)) {
      throw new Error('Turi egzistuoti HTML elementas');
    }

    this.htmlElement = foundElement;
    this.carsCollection = new CarsCollection({ cars, models, brands });
    console.log(this.carsCollection);
  }

  initialize = (): void => {
    this.htmlElement.innerHTML = 'Laukiu kol būsiu sukurtas';
  };
}

export default App;
