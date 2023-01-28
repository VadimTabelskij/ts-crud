import { v4 as createId } from 'uuid';
import type Car from '../types/car';
import type Model from '../types/model';
import type Brand from '../types/brand';
import type CarJoined from '../types/car-joined';

type CarsCollectionProps = {
  cars: Car[],
  brands: Brand[],
  models: Model[],
};

export type CarProps = {
  brandId: string,
  modelId: string,
  price: number,
  year: number
};

class CarsCollection {
  public constructor(private props: CarsCollectionProps) { }

  private joinCar = ({ modelId, ...car }: Car) => {
    const { brands, models } = this.props;

    const carModel = models.find((model) => model.id === modelId);
    const carBrand = brands.find((brand) => brand.id === carModel?.brandId);

    return {
      ...car,
      brand: (carBrand && carBrand.title) ?? 'Brand not found.',
      model: (carModel && carModel.title) ?? 'Model not found.',
    };
  };

  public get all(): CarJoined[] {
    return this.props.cars.map(this.joinCar);
  }

  public getByBrandId = (brandId: string): CarJoined[] => {
    const { cars, models } = this.props;

    const brandModelsIds = models
      .filter((model) => model.brandId === brandId)
      .map((model) => model.id);

    const brandByCars = cars
      .filter((car) => brandModelsIds.includes(car.modelId))
      .map(this.joinCar);

    return brandByCars;
  };

  public deleteCarById = (carId: string): void => {
    this.props.cars = this.props.cars.filter((car) => car.id !== carId);
  };

  public add = ({ modelId, brandId, ...carProps }: CarProps): void => {
    const { models, brands, cars } = this.props;
    const model = models.find((newModel) => newModel.id === modelId);
    const brand = brands.find((newBrand) => newBrand.id === brandId);

    if (!model || !brand) {
      throw new Error('Netinkami duomenys sukurti automobilį');
    }

    const newCar: Car = {
      id: createId(),
      ...carProps,
      modelId,
    };

    cars.push(newCar);
  };

  public carUpdate = (carId: string, { brandId, modelId, ...props }: CarProps) => {
    const { cars, models, brands } = this.props;

    const updatedCarIndex = cars.findIndex((newCar) => newCar.id === carId);
    if (updatedCarIndex === -1) {
      throw new Error(`Atnaujinimo klaida: nerasta mašina su id: '${carId}'`);
    }

    const model = models.find((newModel) => newModel.id === modelId);
    if (!model) {
      throw new Error(`Atnaujinimo klaida: nerastas mašinos modelis su id: '${modelId}'`);
    }

    const brand = brands.find((newBrand) => newBrand.id === brandId);
    if (!brand) {
      throw new Error(`Atnaujinimo klaida: nerasta mašinos markė su id: '${brandId}'`);
    }

    const updatedCar: Car = {
      ...cars[updatedCarIndex],
      ...props,
      modelId,
    };
    this.props.cars.splice(updatedCarIndex, 1, updatedCar);
  };
}

export default CarsCollection;
