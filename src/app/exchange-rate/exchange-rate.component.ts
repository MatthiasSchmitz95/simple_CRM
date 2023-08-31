import { Component, OnInit } from '@angular/core';
import { DarkmodeService } from '../services/darkmode.service';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent implements OnInit{
  constructor(public dm:DarkmodeService){}
  currencies: any[] = [];

  exchangeRates: any; // Store fetched data here
  apiKey = 'e5384f1563bb3851027992564942709b';

  ngOnInit() {
    const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_rG5jnwiey8UJpirK9Az11hOKXwhpGUzZvPcalROH`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        this.exchangeRates = data;
        console.log(this.exchangeRates);
        this.pushCurrencies();

      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
      });
  }

  pushCurrencies(){
    for (const currency in this.exchangeRates.data) {
      this.currencies.push({
        name: currency,
        value: this.exchangeRates.data[currency]
      });
    }
    console.log(this.currencies);
  }

}
