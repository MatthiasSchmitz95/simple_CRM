import { Component, OnInit } from '@angular/core';
import { DarkmodeService } from '../services/darkmode.service';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.scss']
})
export class ExchangeRateComponent implements OnInit {
  constructor(public dm: DarkmodeService) { }
  currencies: any[] = [];
  amount=1;
  fromCurrency;
  toCurrency;
  calculatedNumber;


  exchangeRates: any; // Store fetched data here
  apiKey = 'e5384f1563bb3851027992564942709b';

async  ngOnInit() {
    const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_rG5jnwiey8UJpirK9Az11hOKXwhpGUzZvPcalROH`;

 await fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        this.exchangeRates = data;
        console.log(this.exchangeRates);
        this.pushCurrencies();
        this.toCurrency= this.currencies[8].name;
        this.fromCurrency = this.currencies[31].name;
        console.log(this.toCurrency,'tocurrnecy');
        console.log(this.fromCurrency,'fromCurrency');

      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
      });
      this.calculate();
  }

  pushCurrencies() {
    for (const currency in this.exchangeRates.data) {
      this.currencies.push({
        name: currency,
        value: this.exchangeRates.data[currency]
      });
    }
    console.log(this.currencies);
  }

  calculate() {
    const fromCurrencyObject = this.currencies.find(currency => currency.name === this.fromCurrency);
    const toCurrencyObject = this.currencies.find(currency => currency.name === this.toCurrency);
  

    if (fromCurrencyObject && toCurrencyObject) {
      // Perform the currency conversion here based on selected currencies and amount
      const fromRate = fromCurrencyObject.value;
      const toRate = toCurrencyObject.value;
  
      this.calculatedNumber = (this.amount / fromRate) * toRate;
    } else {
      
      this.calculatedNumber = NaN; // or another appropriate value or error handling
    }
  }
  

}
