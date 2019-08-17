import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dateUrl:string='http://49.234.230.70:3000/unicorns';
  queryUrl:string='http://49.234.230.70:3000/unicorns/ByteDance';
  unicorns: any = [];
  unicornsOfDisplayData: any = [];

  sortName: string | null = null;
  sortValue: string | null = null;
  searchValue: string = '';
  listOfSearchName: string[] = [];

  countryFilter: any = [
    { text: 'AUS', value: 'AUS' },
    { text: 'BRA', value: 'BRA' },
    { text: 'CAN', value: 'CAN' },
    { text: 'CHE', value: 'CHE' },
    { text: 'CHN', value: 'CHN' },
    { text: 'COL', value: 'COL' },
    { text: 'DEU', value: 'DEU' },
    { text: 'ESP', value: 'ESP' },
    { text: 'EST', value: 'EST' },
    { text: 'FIN', value: 'FIN' },
    { text: 'FRA', value: 'FRA' },
    { text: 'GBR', value: 'GBR' },
    { text: 'HKG', value: 'HKG' },
    { text: 'IDN', value: 'IDN' },
    { text: 'IND', value: 'IND' },
    { text: 'IRL', value: 'IRL' },
    { text: 'ISR', value: 'ISR' },
    { text: 'JPN', value: 'JPN' },
    { text: 'JPY', value: 'JPY' },
    { text: 'KOR', value: 'KOR' },
    { text: 'LUX', value: 'LUX' },
    { text: 'NLD', value: 'NLD' },
    { text: 'SGP', value: 'SGP' },
    { text: 'SWE', value: 'SWE' },
    { text: 'USA', value: 'USA' },
  ];

  constructor(private http:HttpClient) {
    this.initUnicornsList();
  }

  initUnicornsList() {
    const obsData = this.getUnicornsList();
    obsData.subscribe(
      (data) => {
        this.unicorns = [];
        if (data) {
          this.unicorns=data.entities;
          this.unicornsOfDisplayData = [
            ...this.unicorns
          ];
        }
      },
      (error) => {
        console.log('网络连接无响应。。。');
      }
    );
  }

  sort(sort: { key: string; value: string }): void {//排序
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }

  filter(listOfSearchName: string[]): void {//选择过滤
    this.listOfSearchName = listOfSearchName;
    this.search();
  }

  search(): void {
    /** filter data **/
    const filterFunc = (item: { name: string; country: string; }) =>
      item.name.indexOf(this.searchValue) !== -1 && 
      (this.listOfSearchName.length ? this.listOfSearchName.some(country => item.country.indexOf(country) !== -1) : true);
    const data = this.unicorns.filter(item => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.unicornsOfDisplayData = data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName!] > b[this.sortName!] ? 1: -1
          : b[this.sortName!] > a[this.sortName!] ? 1: -1
      );
    } else {
      this.unicornsOfDisplayData = data;
    }
  }

  resetName(): void {
    this.searchValue = '';
    this.search();
  }


  //获取数据
  getUnicornsList() {
    return this.http.get<any>(this.dateUrl);
  }

  
}
