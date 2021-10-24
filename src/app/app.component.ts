import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { fetchingData } from './fetchingData';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'validate-number';
  number: any;
  countryCode: string;
  codes = [];
  displayError = true;
  verifNumber: boolean;
  verifChar:boolean;
  response: any;
  emptyNumber: boolean;
  emptySelect: boolean;
  constructor(private validate: fetchingData,private http: HttpClient) {}

  verify()
  {
    if(this.number==null){// if the field number phone is empty
      this.emptyNumber=true;
    }
    if(this.countryCode==null){// if the country code is not selected
      this.emptySelect=true;
    }
    if (!this.wrongNumber()) //if the phone number is not wrong verifies 
                             //if the phone number matches the country code or not
    {
      this.validate
        .validateNumber(this.number, this.countryCode)
        .subscribe((data) => {
          data['valid'] == true
            ? (this.verifNumber = true)
            : (this.verifNumber = false);

          this.response = data;
          if(data['valid'] == true)
            {this.countryCode=null;
            this.number=null;
            }
        });
    }
  }

  getAlpha2Codes() //collecte all the country codes in the list codes
  {
    this.validate.getCodes().subscribe((data) => {
      for (let key in data) {
        this.codes.push(key);
      }
    });
  }

  wrongNumber() //return true if the field phone number contains any caracter other then
                // the space or numbers 
                //else returns false
  {
   for(let i in this.number){
      if(!Number(this.number[i]) && this.number[i]!=' ' && this.number[i]!=0){
        return true;
      }
    }
    return false;
  }
}
