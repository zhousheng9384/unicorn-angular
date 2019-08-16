import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  unicorns: any = [];
  dateUrl:string='http://49.234.230.70:3000/unicorns';
  queryUrl:string='http://49.234.230.70:3000/unicorns/ByteDance';

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
        }
      },
      (error) => {
        console.log('网络连接无响应。。。');
      }
    );
  }

  //获取数据
  getUnicornsList() {
    return this.http.get<any>(this.dateUrl);
  }

  
}
