import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/components/template/user.model";
import * as L from "leaflet";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.css"],
})
export class PerfilComponent implements OnInit {
  userData: User | undefined;
  map: L.Map | undefined;
  latitude!: number;
  longitude!: number;
  mapInitialized = false;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.displayUserMap();
  }

  ngOnInit() {
    this.getUserCoordinates(history.state.data.userData.location).subscribe(
      (response: any) => {
        console.log(
          "🚀 ~ file: perfil.component.ts:34 ~ PerfilComponent ~ ngOnInit ~ response:",
          response
        );
        if (response && response.length > 0) {
          this.latitude = Number(response[0].lat);
          console.log(
            "🚀 ~ file: perfil.component.ts:32 ~ PerfilComponent ~ ngOnInit ~ latitude:",
            this.latitude
          );
          this.longitude = Number(response[0].lon);
          console.log(
            "🚀 ~ file: perfil.component.ts:38 ~ PerfilComponent ~ ngOnInit ~ longitude:",
            this.longitude
          );
          this.displayUserMap();
        }
      }
    );
  }
  getUserCoordinates(location: string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      location
    )}`;
    return this.http.get(url);
  }

  displayUserMap() {
    this.map = L.map("map").setView([this.latitude, this.longitude], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.map);

    const marker = L.marker([this.latitude, this.longitude]).addTo(this.map);
  }
}
