import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { ITableData } from './model/user';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  userList: ITableData[] = [];
  filteredUserList: ITableData[] = [];
  searchTerm: string = '';
  sortColumn: keyof ITableData = 'firstname';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.apiService.getData()
      .pipe(
        map(response => {
          this.userList = response;
          this.filteredUserList = this.userList;
        }),
        catchError(error => {
          console.error('Error al obtener la lista de usuarios:', error);
          throw error;
        })
      )
      .subscribe();
  }

  applyFiltersAndSorting(): void {
    this.filteredUserList = this.userList.filter(
      (user) => {
        console.log('user: ', user)
        user.firstname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.surname.toLowerCase().includes(this.searchTerm.toLowerCase())
      }
    );

    this.sortUsers();
  }

  onSearchTermChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFiltersAndSorting();
  }

  onSortChange(event: {
    sortColumn: keyof ITableData;
    sortDirection: 'asc' | 'desc';
  }): void {
    this.sortColumn = event.sortColumn;
    this.sortDirection = event.sortDirection;
    this.sortUsers();
  }

  sortUsers(): void {
    this.filteredUserList.sort((a, b) => {
      const aValue = a[this.sortColumn];
      const bValue = b[this.sortColumn];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }
}
