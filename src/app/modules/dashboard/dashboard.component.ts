import { Component, OnInit } from '@angular/core';
import { IHeader } from '../../core/interfaces/Data/header.interface';
import { HelpersService } from '../../core/services/helpers/helpers.service';
import { StatesService } from '../../core/services/states/states.service';
import { header } from './constants';
import { DataService } from '../../core/services/data/data.service';
import { IUser } from '../../core/interfaces/others/user.interface';
import { CacheService } from '../../core/services/cache/cache.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  isLoading = true;
  errorView = false;
  emptyView = false;
  stopLoading = false;
  dashboardHeader: IHeader = header;
  itemsPerPage!: number ;
  itemsPerPageList = [6,12,18]; // this should be dynamic
  searchText: string = '';
  currentPage: number = 1;
  totalItems!: number ; // Assuming total items count is 60
  pages!: number[];
  skip = 0;
  users:IUser[ ] = [];
  searchedUser !: IUser;
  searchActive = false;
  constructor(
    private helpers: HelpersService,
    private states: StatesService,
    private data: DataService,
    private cacheService:CacheService
  ) {
  }

  ngOnInit(): void {
    this.updatePagination();
    this.getData();
  }

  getEndpoint(): string {
    let endpoint = `/users?page=${this.skip}`;
    if (this.itemsPerPage) endpoint += `&per_page=${this.itemsPerPage}`
    if (this.searchText) endpoint += `&id=${this.searchText}`
    return endpoint;
  }

  getData(ev?: any):void {
    this.isLoading = true;
    this.data.getData(this.getEndpoint()).subscribe({
      next: (res) => {
        // if there  is no search, the res.data is the users array, but if there is search, it's the searched user object
        if (Array.isArray(res.data)) {
          this.totalItems = res.total;
          this.pages = res.total_pages;
          this.itemsPerPage = res.per_page;
          this.updatePagination();
          // Case where res.data is an array of users
          this.users = this.skip ? this.users.concat(res.data) : res.data;
        } else {
          // Case where res.data is a single user object
          this.users = [res.data];
        }
        this.users[0]?.id? this.showContentView(ev) : this.showEmptyView(ev);
        this.stopLoading = res.length !== 6;
      },
      error: (err) => {
        console.log(err);
        this.showContentView(ev);
      },
    })
  }

  updatePagination() : void {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  changeItemsPerPage(ev: any): void {
    this.users = [];
    this.itemsPerPage = Number(ev.target.value);
    this.currentPage = 1; // Reset to first page
    this.updatePagination();
    this.getData(); // Fetch new data based on items per page
  }
  navigate(page: string, dir: string): void {
    this.helpers.navigate(page, dir);
    this.states.setActiveRoute(page);
  }

  viewUser(page:string, dir:string, user: IUser,): void {
    this.data.setBody(user);
    this.helpers.navigate(page, dir);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.users = [];
      this.currentPage--;
      this.skip = this.currentPage;
      this.getData(); // Fetch new data for the previous page
    } else {
      return; // Return early if at the beginning
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.users = [];
      this.currentPage++;
      this.skip = this.currentPage;
      this.getData(); // Fetch new data for the next page
    } else {
      return; // Return early if at the end
    }
  }

  goToPage(page: number): void {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (page < 1 || page > totalPages) {
      return; // Return early if page number is invalid
    }
    this.users = [];
    this.currentPage = page;
    this.skip = page;
    this.getData();
  }

  getLastPathSegment(url: string): string {
    const segments = url.split('/');
    return segments[segments.length - 1];
  }

  handleSearchInput(){
    this.currentPage = 1; // Reset to first page
    this.updatePagination();
    this.users = [];
    this.getData();
  }

  ////////////////////////////////////////////////////////////////////////

  loadMore(ev: any): void {
    this.skip += 20;
    console.log('triggered');
    setTimeout(() => {
      ev.target.complete();
    }, 1000);
  }

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////// Handle Views ////////////////////////////////

  // #############################################################
  showContentView(ev?: any): void {
    this.isLoading = false;
    this.errorView = false;
    this.emptyView = false;
    this.stopLoading = true;
    if (ev) ev.target.complete();
  }
  // #############################################################
  showErrorView(ev?: any): void {
    this.isLoading = false;
    this.errorView = true;
    this.emptyView = false;
    this.stopLoading = true;
    if (ev) ev.target.complete();
  }
  // #############################################################
  showEmptyView(ev?: any): void {
    this.isLoading = false;
    this.errorView = false;
    this.emptyView = true;
    this.stopLoading = true;
    if (ev) ev.target.complete();
  }
  //  #############################################################;
}
