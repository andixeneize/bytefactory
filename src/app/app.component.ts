import { Component, OnInit  } from '@angular/core';
import { ApiService } from './services/api.service';
import { ITableData } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  constructor(private apiService: ApiService) {}
  
  public users: ITableData[] = []

  ngOnInit(): void {
    this.apiService.getData().subscribe((data) => { 
      console.log('Data: ', data)
      this.users = data
     })
  }
}

