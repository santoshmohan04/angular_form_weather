import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  weatherApiUrl = environment.weatherApi;
  appId = environment.apikey;

  getWeatherData(city: string, country: string) {
    const apiUrl = this.weatherApiUrl;
    let qValue = city + ',' + country;
    const params = new HttpParams().set('q', qValue).set('APPID', this.appId);
    return this.http.get(apiUrl, { params }).pipe(
      map((res: any) => {
        // this.orgDetails.next(res.data);
        return res;
      }),
      catchError((error) => {
        throw new Error(error);
      })
    );
  }
}
