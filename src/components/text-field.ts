export type TextFieldProps = {
  labelText: string;
  name: string,
  value?: string,
};

class TextField {
  private props: TextFieldProps;

  private static uniqID: number = 0;

  private id: string;

  private label: HTMLLabelElement;

  private input: HTMLInputElement;

  public htmlElement: HTMLDivElement;

  public constructor(props: TextFieldProps) {
    this.props = props;

    TextField.uniqID += 1;
    this.id = `TextField_${TextField.uniqID}`;

    this.htmlElement = document.createElement('div');
    this.label = document.createElement('label');
    this.input = document.createElement('input');

    this.intialize();
    this.renderView();
  }

  private intialize = () => {
    this.label.htmlFor = this.id;
    this.label.className = 'form-label';

    this.input.id = this.id;
    this.input.className = 'form-control';

    this.htmlElement.append(
      this.label,
      this.input,
    );
  };

  private renderView = () => {
    this.label.innerText = this.props.labelText;
    this.input.name = this.props.name;
  };

  public updateProps = (props: Partial<TextFieldProps>) => {
    this.props = {
      ...this.props,
      ...props,
    };

    this.renderView();
  };
}

export default TextField;
