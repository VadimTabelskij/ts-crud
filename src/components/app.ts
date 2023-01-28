import Table from './table';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import CarsCollection, { CarProps } from '../helpers/cars-collection';
import stringifyProps, { StringifyObjectProps } from '../helpers/stingify-props';
import type CarJoined from '../types/car-joined';
import SelectField from './select-field';
import CarForm, { Values } from './car-form';

const ALL_CAR_TITLE = 'Visi automobiliai' as const;
const ALL_BRAND_TITLE = 'Markė' as const;
const ALL_BRAND_ID = '-1' as const;

class App {
  private carsCollection: CarsCollection;

  private selectedBrandId: null | string;

  private editedCarId: string | null;

  private brandSelect: SelectField;

  private carTable: Table<StringifyObjectProps<CarJoined>>;

  private carForm: CarForm;

  private htmlElement: HTMLElement;

  public constructor(selector: string) {
    const foundElement = document.querySelector<HTMLElement>(selector);
    if (foundElement === null) throw new Error(`Nerastas elementas su selektoriumi '${selector}'`);
    if (!(foundElement instanceof HTMLElement)) throw new Error('Turi egzistuoti HTML elementas');

    this.htmlElement = foundElement;

    this.selectedBrandId = null;

    this.editedCarId = null;

    this.carsCollection = new CarsCollection({ cars, models, brands });

    this.carTable = new Table({
      title: ALL_CAR_TITLE,
      columns: {
        brand: ALL_BRAND_TITLE,
        model: 'Modelis',
        price: 'Kaina',
        year: 'Metai',
      },
      rowsData: this.carsCollection.all.map(stringifyProps),
      onDelete: this.handleCarDelete,
      onEdit: this.handleCarEdit,
      editedCarId: this.editedCarId,
    });

    this.brandSelect = new SelectField({
      labelText: ALL_BRAND_TITLE,
      options: [
        { title: ALL_CAR_TITLE, value: ALL_BRAND_ID },
        ...brands.map(({ id, title }) => ({ title, value: id })),
      ],
      onChange: this.handleBrandChange,
    });

    const initialBrandId = brands[0].id;
    this.carForm = new CarForm({
      title: 'Sukurkite naują automobilį',
      submitBtnText: 'Sukurti',
      values: {
        brand: initialBrandId,
        model: models.filter((m) => m.brandId === initialBrandId)[0].id,
        price: '0',
        year: '2000',
      },
      onSubmit: this.handleCarCreate,
    });
  }

  private handleBrandChange = (brandId: string) => {
    const brand = brands.find((newBrand) => newBrand.id === brandId);
    this.selectedBrandId = brand ? brandId : null;

    this.update();
  };

  private handleCarDelete = (carId: string) => {
    this.carsCollection.deleteCarById(carId);

    this.update();
  };

  private handleCarEdit = (carId: string) => {
    this.editedCarId = carId === this.editedCarId ? null : carId;
    this.update();
  };

  private handleCarCreate = ({
    brand, model, price, year,
  }: Values): void => {
    const carProps: CarProps = {
      brandId: brand,
      modelId: model,
      price: Number(price),
      year: Number(year),
    };

    this.carsCollection.add(carProps);

    this.update();
  };

  private update = () => {
    const { selectedBrandId, carsCollection } = this;

    if (selectedBrandId === null) {
      this.carTable.updateProps({
        title: ALL_CAR_TITLE,
        rowsData: carsCollection.all.map(stringifyProps),
        editedCarId: this.editedCarId,
      });
    } else {
      const brand = brands.find((carBrand) => carBrand.id === selectedBrandId);
      if (brand === undefined) throw new Error(`Pasirinkta neegzistuojanti ${ALL_BRAND_TITLE}`);

      this.carTable.updateProps({
        title: `${brand.title} markės automobiliai`,
        rowsData: carsCollection.getByBrandId(selectedBrandId).map(stringifyProps),
        editedCarId: this.editedCarId,
      });
    }
  };

  public initialize = (): void => {
    const uxContainer = document.createElement('div');
    uxContainer.className = 'd-flex gap-4 align-items-start';
    uxContainer.append(
      this.carTable.htmlElement,
      this.carForm.htmlElement,
    );

    const container = document.createElement('div');
    container.className = 'container my-4 d-flex flex-column gap-4';
    container.append(
      this.brandSelect.htmlElement,
      uxContainer,
    );

    this.htmlElement.append(container);
  };
}

export default App;
