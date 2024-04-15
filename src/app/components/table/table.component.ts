import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ITableData } from 'src/app/model/user';

type columns = 'firstname' | 'surname' | 'username' | 'email';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnChanges {
  @Input() sortColumn: keyof ITableData = 'firstname';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';
  @Input() data: ITableData[] = [];
  @Output() sortChange: EventEmitter<{
    sortColumn: keyof ITableData;
    sortDirection: 'asc' | 'desc';
  }> = new EventEmitter<{
    sortColumn: keyof ITableData;
    sortDirection: 'asc' | 'desc';
  }>();

  ngOnChanges(): void {
    this.sortData();
  }

  private sortData(): void {
    this.sortChange.emit({
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection,
    });
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
