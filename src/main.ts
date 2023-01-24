import App from './components/app';
import cars from './data/cars';
import models from './data/models';
import brands from './data/brands';

import CarsCollection from './helpers/cars-collection';

const app = new App('#root');
app.initialize();

const carsCollection = new CarsCollection({ cars, brands, models });

console.log(carsCollection);
