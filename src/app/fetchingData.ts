import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class fetchingData {
  constructor(private http: HttpClient) {}
  validateNumber(number: number, countryCode: string) //sending params to the url to get the data 
  {
    const params = {};
    params['number'] = number;
    params['country_code'] = countryCode;
    params['format']=1;
    const url='https://apilayer.net/api/validate?access_key=eb588dbf70cb81df1c8d374269db9d18';
    return this.http.get(url,{ params });
  }

  getCodes()//get the countries with their information
  { const url='https://apilayer.net/api/countries?access_key=eb588dbf70cb81df1c8d374269db9d18';
    return this.http.get(url);
  }
}
