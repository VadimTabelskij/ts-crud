type RowData = {
  id: string;
  [key: string]: string;
};

 type TableProps<Type> = {
   title: string;
   columns: Type;
   rowsData: Type[];
 };

class Table<Type extends RowData> {
  private props: TableProps<Type>;

  private tbody: HTMLTableSectionElement;

  private thead: HTMLTableSectionElement;

  public htmlElement: HTMLTableElement;

  public constructor(props: TableProps<Type>) {
    this.props = props;
    this.htmlElement = document.createElement('table');
    this.thead = document.createElement('thead');
    this.tbody = document.createElement('tbody');

    this.initialize();
  }
}

export default Table;
