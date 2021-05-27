import {Component, OnInit} from '@angular/core';
import {CinemaService} from "../services/cinema.service";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  public cities: any;
  public cinemas: any;
  public rooms: any;
  public currentCity: any;
  public currentCinema: any;
  public url = 'http://localhost:8082/imageMovie/2';
  public currentProjection: any;

  constructor(public cinemaService: CinemaService) {
  }

  ngOnInit(): void {
    this.cinemaService.getCities().subscribe(data => {
      this.cities = data;
      const firstCity = this.cities._embedded.cities[0];
      this.currentCity = firstCity;
      this.onGetCinemas(firstCity);
    }, err => {
      console.log(err);
    })
  }

  init():void{
    this.cinemas = undefined;
    this.rooms=undefined;
    this.currentCinema= undefined;
    this.currentProjection=undefined;
  }

  onGetCinemas = (city: any) => {
    this.init();
    this.currentCity = city;
    this.cinemaService.getCinemas(city).subscribe(data => {
      this.cinemas = data;
    }, err => {
      console.log(err);
    })
  }

  onGetRooms(cinema: any) {
    this.currentCinema = cinema;
    this.cinemaService.getRooms(cinema).subscribe(data => {
      this.rooms = data;
      this.rooms._embedded.rooms.forEach((room: any) => {
        this.cinemaService.getProjections(room).subscribe((data: any) => {
          room.projections = data;
        }, (err: any) => {
          console.log(err);
        })
      });
    }, err => {
      console.log(err);
    })
  }

  onGetTicketsPlaces(proj: any) {
    this.currentProjection = proj;
    console.log(this.currentProjection.tickets)
    this.cinemaService.getTicketsPlaces(proj).subscribe((data: any) => {
      this.currentProjection.tickets = data;
    }, (err: any) => {
      console.log(err);
    })
  }
}
