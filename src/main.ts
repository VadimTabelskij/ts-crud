// import App from './components/app';
import CarsCollection from './helpers/cars-collection';
import cars from './data/cars';
import brands from './data/brands';
import models from './data/models';

const carsCollection = new CarsCollection({
  cars,
  brands,
  models,
});

console.log(carsCollection);
//  Viena apjungta mašina
console.log(carsCollection.joinCar(cars[0]));
//  Gauti visas mašinas
console.log(carsCollection.all);

// const app = new App('#root');
// app.initialize();
