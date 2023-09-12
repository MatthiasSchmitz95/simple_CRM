import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { DarkmodeService } from '../services/darkmode.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  constructor(public crud: CrudService, public dm: DarkmodeService) { }
  API = 'https://api.marketaux.com/v1/news/all?symbols=TSLA%2CAMZN%2CMSFT&filter_entities=true&language=en&api_token=R1NZTVitjIglabSIYEixMuffgJ7M4jv0bzipO3rP'
  news;
  savedNews;

  ngOnInit(): void {
    this.crud.getNews().subscribe((response => {
      this.savedNews = response;
      this.savedNews=this.savedNews.news.data;
      
    }));
   
    
  }
  getNews() {
    fetch(this.API)
      .then(response => response.json())
      .then(data => {
        this.news = data;

      })
      .then(() => {
        this.crud.saveNews(this.news);
      })
  }
}
