import { Component, Input, OnChanges } from '@angular/core';
import { ITableData } from 'src/app/model/user';

type columns = 'firstname' | 'surname' | 'username' | 'email';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() sortColumn: columns = 'firstname';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';
  @Input() data: ITableData[] = [];

  ngOnChanges(): void {
    this.sortData();
  }

  private sortData(): void {
    // @TODO
    // console.log('Table data: ', this.data)
  }

  sortTable(sortColumn: columns): void {
    if (this.sortColumn === sortColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = sortColumn;
      this.sortDirection = 'asc';
    }

    this.sortData();
  }
}
