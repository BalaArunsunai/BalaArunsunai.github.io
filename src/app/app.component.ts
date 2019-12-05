import {Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bankingapp';
  displayedColumns = ['bank_name', 'branch', 'ifsc'];
  dataSource: MatTableDataSource<any>
  
  @ViewChild (MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild (MatSort , {static: true}) sort: MatSort;
  constructor( private http: HttpClient) {
    // Create 100 users
    // const users: UserData[] = [];
    // for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }

    // Assign the data to the data source for the table to render
    var item
    this.http.get("https://vast-shore-74260.herokuapp.com/banks?city=MADURAI").subscribe(data => {
      console.log("data", data)
      item = data
      this.dataSource = new MatTableDataSource(item);
    })
    // this.dataSource = new MatTableDataSource();
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngOnInit(){

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
