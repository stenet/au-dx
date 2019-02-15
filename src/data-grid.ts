import { autoinject } from "aurelia-framework";

@autoinject
export class DataGrid {
  constructor() { }

  dataGridOptions: DevExpress.ui.dxDataGridOptions = {
    columns: [{ 
      dataField: "name", 
      caption: "Name" 
    }, { 
      dataField: "number", 
      caption: "Number", 
      cellTemplate: (cellElement: HTMLElement, cellInfo) => {
        cellElement.innerHTML = cellInfo.value;

        if (cellInfo.value % 2 == 0) {
          cellElement.style.backgroundColor = "#2980B9";
          cellElement.style.color = "white";
        }
      }
    }, { 
      dataField: "date", 
      caption: "Date" 
    }],
    dataSource: this.createData(),
    height: "25vh",
    scrolling: {
      mode: "virtual"
    }
  };

  private createData(): any[] {
    const data = [];

    for (let i = 0; i < 150000; i++) {
      data.push({
        name: "MyName".concat(i.toString()),
        number: i,
        date: new Date()
      });
    }

    return data;
  }
}