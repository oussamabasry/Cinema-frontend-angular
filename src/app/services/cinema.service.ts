import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  public host: string = "http://localhost:8082";

  constructor(private http: HttpClient) {
  }

  public getCities = () => {
    return this.http.get(this.host + "/cities");
  }
  public getCinemas = (city: any) => {
    return this.http.get(city._links.cinemas.href);
  }

  getRooms(cinema: any) {
    return this.http.get(cinema._links.rooms.href);
  }

  getProjections(room:any) {
    let url = room._links.movieProjections.href.replace("{?projection}","");
    return this.http.get(url+"?projection=p1")
  }

  getTicketsPlaces(proj: any) {
    let url = proj._links.tickets.href.replace("{?projection}","");
    return this.http.get(url+"?projection=ticketProj")
  }
}
