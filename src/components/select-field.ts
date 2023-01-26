type OptionType = {
  title: string,
  value: string,
};

export type SelectFieldProps = {
  name?: string,
  labelText: string,
  onChange?: (newValue: string) => void,
  options: OptionType[],
  value?: string,
};

class SelectField {
  private props: SelectFieldProps;

  private static UNIQ_ID = 0 as const;

  private htmlSelectElement: HTMLSelectElement;

  private htmlLabelElement: HTMLLabelElement;

  public htmlElement: HTMLDivElement;

  public constructor(props: SelectFieldProps) {
    this.props = props;

    SelectField.UNIQ_ID += 1;
    this.htmlElement = document.createElement('div');
    this.htmlSelectElement = document.createElement('select');
    this.htmlLabelElement = document.createElement('label');

    this.initialize();
    this.renderView();
  }

  private initialize = (): void => {
    const elementId = `select-${SelectField.UNIQ_ID}`;

    this.htmlLabelElement.setAttribute('for', elementId);

    this.htmlSelectElement.className = 'form-select';
    this.htmlSelectElement.id = elementId;

    this.htmlElement.className = 'form-group';
    this.htmlElement.append(
      this.htmlLabelElement,
      this.htmlSelectElement,
    );
  };

  private renderSelectOptions = (): void => {
    const { options, value } = this.props;

    const optionsHtmlElements = options.map((option) => {
      const element = document.createElement('option');
      element.innerHTML = option.title;
      element.value = option.value;
      element.selected = option.value === value;

      return element;
    });

    this.htmlSelectElement.innerHTML = '';
    this.htmlSelectElement.append(...optionsHtmlElements);
  };

  private renderView = (): void => {
    const { labelText, onChange, name } = this.props;

    this.htmlLabelElement.innerHTML = labelText;
    if (onChange) {
      this.htmlSelectElement.addEventListener('change', () => onChange(this.htmlSelectElement.value));
    }
    if (name) {
      this.htmlSelectElement.name = name;
    }
    this.renderSelectOptions();
  };

  public updateProps = (newProps: Partial<SelectFieldProps>): void => {
    this.props = {
      ...this.props,
      ...newProps,
    };

    this.renderView();
  };
}

export default SelectField;
