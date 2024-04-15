import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './services/api.service';
import { ITableData } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  public userList: ITableData[] = [];
  public filteredUserList: ITableData[] = [];

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

  public onSearchTermChange(searchTerm: string): void {
    this.filteredUserList = this.userList.filter(
      (user) =>
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.surname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
