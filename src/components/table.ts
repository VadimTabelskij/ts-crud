import countObjectProperties from '../helpers/count-object-properties';

type TablesRowData = {
  id: string,
  [key: string]: string,
};

export type TableProps<Type> = {
  title: string,
  columns: Type,
  rowsData: Type[],
  onDelete: (id: string) => void,
};

class Table<Type extends TablesRowData> {
  private props: TableProps<Type>;

  private tbody: HTMLTableSectionElement;

  private thead: HTMLTableSectionElement;

  public htmlElement: HTMLTableElement;

  public constructor(props: TableProps<Type>) {
    this.props = props;

    this.checkColumns();

    this.htmlElement = document.createElement('table');
    this.thead = document.createElement('thead');
    this.tbody = document.createElement('tbody');

    this.initialize();
    this.renderView();
  }

  private checkColumns = (): void => {
    const { rowsData, columns } = this.props;

    if (this.props.rowsData.length === 0) return;
    const columnCount = countObjectProperties(columns);

    const columnsWithRowsData = rowsData.every((row) => {
      const rowCount = countObjectProperties(row);

      return rowCount === columnCount;
    });
    if (!columnsWithRowsData) {
      throw new Error('Nesutampa lentelės stulpelių skaičius su eilučių stulpelių skaičiumi');
    }
  };

  private initialize = (): void => {
    this.htmlElement.className = 'table table-striped order border p-3';
    this.htmlElement.append(
      this.thead,
      this.tbody,
    );
  };

  private renderView = (): void => {
    this.renderHead();
    this.renderBody();
  };

  private renderHead = () => {
    const thElementsString = Object.values(this.props.columns)
      .map((columnName) => `<th>${columnName}</th>`)
      .join('');

    const columnCount = thElementsString.length;

    this.thead.innerHTML = `
      <tr class="text-center h3">
        <th colspan="${columnCount}">${this.props.title}</th>
      </tr>
      <tr>
        ${thElementsString}
        <th></th>
      </tr>
    `;
  };

  private renderBody = () => {
    this.tbody.innerHTML = '';
    const rows = this.props.rowsData
      .map((rowData) => {
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.innerText = '❌';
        deleteButton.addEventListener('click', () => this.props.onDelete(rowData.id));

        const td = document.createElement('td');
        td.append(deleteButton);

        const tr = document.createElement('tr');
        tr.innerHTML = Object.keys(this.props.columns)
          .map((key) => `<td>${rowData[key]}</td>`)
          .join('');
        tr.append(td);

        return tr;
      });

    this.tbody.append(...rows);
  };

  public updateProps = (newProps: Partial<TableProps<Type>>): void => {
    this.props = {
      ...this.props,
      ...newProps,
    };

    this.renderView();
  };
}

export default Table;
