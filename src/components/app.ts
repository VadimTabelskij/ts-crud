import Table from './table';

import SelectField from './select-field';

import CarsCollection from '../helpers/cars-collection';
import stringifyProps from '../helpers/stingify-object';

import cars from '../data/cars';
import models from '../data/models';
import brands from '../data/brands';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  private brandSelect: SelectField;

  constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);

    if (foundElement === null) { throw new Error(`Nerastas elementas su selektoriumi '${selector}'`); }
    if (!(foundElement instanceof HTMLElement)) {
      throw new Error('Turi egzistuoti HTML elementas');
    }

    this.htmlElement = foundElement;
    this.carsCollection = new CarsCollection({ cars, models, brands });

    this.brandSelect = new SelectField({
      labelText: 'Markė',
      options: brands.map(({ id, title }) => ({ title, value: id })),
    });
  }

  initialize = (): void => {
    const carTableInfo = new Table({
      title: 'Visi automobiliai',
      columns: {
        id: 'Id',
        brand: 'Markė',
        model: 'Modelis',
        price: 'Kaina',
        year: 'Metai',
      },
      rowsData: this.carsCollection.all.map(stringifyProps),
    });

    const container = document.createElement('div');
    container.className = 'container my-5';
    container.append(this.brandSelect.htmlElement, carTableInfo.htmlElement);

    this.htmlElement.append(container);
  };
}
export default App;
