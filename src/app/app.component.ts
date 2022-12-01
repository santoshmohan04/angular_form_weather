import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../environments/environment';
import { ApiService } from './apiservice.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  iconurl: string;
  weatherData: any;
  weatherForm: FormGroup;
  currentDate = new Date().toLocaleTimeString();
  temperature: any;
  temp_max: any;
  temp_min: any;
  wind_speed: any;
  sunrise: any;
  sunset: any;

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit() {
    this.weatherForm = this.fb.group({
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  onSubmit(form: FormGroup) {
    if (form.invalid) return;
    let city = form.value.city;
    let country = form.value.country;
    this.apiService.getWeatherData(city, country).subscribe({
      next: (res: any) => {
        if (res) {
          this.weatherData = res;
          this.iconurl =
            environment.iconurl + this.weatherData.weather[0].icon + '.png';
          this.temperature = Math.floor(this.weatherData.main.temp - 273.15);
          this.temp_max = Math.floor(this.weatherData.main.temp_max - 273.15);
          this.temp_min = Math.floor(this.weatherData.main.temp_min - 273.15);
          this.wind_speed = Math.floor((this.weatherData.wind.speed * 18) / 5);
          this.sunrise = new Date(
            this.weatherData.sys.sunrise * 1000
          ).toLocaleTimeString();
          this.sunset = new Date(
            this.weatherData.sys.sunset * 1000
          ).toLocaleTimeString();
          form.reset();
        }
      },
      error: (err: any) => {
        console.log('error >>> ', err);
      },
    });
  }
}
