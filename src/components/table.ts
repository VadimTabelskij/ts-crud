import countObjectProperties from '../helpers/count-object-properties';

type TablesRowData = {
  id: string,
  [key: string]: string,
};

export type TableProps<Type> = {
  title: string,
  columns: Omit<Type, 'id'>,
  rowsData: Type[],
  onDelete: (id: string) => void,
  onEdit: (id: string) => void,
};

class Table<Type extends TablesRowData> {
  private props: TableProps<Type>;

  private thead: HTMLTableSectionElement;

  private tbody: HTMLTableSectionElement;

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

  private initialize = (): void => {
    this.htmlElement.className = 'table table-striped order border p-3';
    this.htmlElement.append(
      this.thead,
      this.tbody,
    );
  };

  private checkColumns = (): void => {
    const { rowsData, columns } = this.props;

    if (this.props.rowsData.length === 0) return;
    const columnCount = countObjectProperties(columns) + 1;

    const columnsWithRowsData = rowsData.every((row) => {
      const rowCount = countObjectProperties(row);

      return rowCount === columnCount;
    });
    if (!columnsWithRowsData) {
      throw new Error('Nesutampa lentelės stulpelių skaičius su eilučių stulpelių skaičiumi');
    }
  };

  private renderHeadView = () => {
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

  private renderBodyView = () => {
    this.tbody.innerHTML = '';
    const rows = this.props.rowsData
      .map((rowData) => {
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.innerText = '🗙';
        deleteButton.addEventListener('click', () => this.props.onDelete(rowData.id));

        const updateButton = document.createElement('button');
        updateButton.className = 'btn btn-warning btn-sm';
        updateButton.innerText = '↻';

        const containerButton = document.createElement('div');
        containerButton.className = 'd-flex gap-2 justify-content-end';
        containerButton.append(updateButton, deleteButton);
        containerButton.addEventListener('click', () => this.props.onEdit(rowData.id));

        const td = document.createElement('td');
        td.append(containerButton);

        const tr = document.createElement('tr');
        tr.innerHTML = Object.keys(this.props.columns)
          .map((key) => `<td>${rowData[key]}</td>`)
          .join('');
        tr.append(td);

        return tr;
      });

    this.tbody.append(...rows);
  };

  private renderView = (): void => {
    this.renderHeadView();
    this.renderBodyView();
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
