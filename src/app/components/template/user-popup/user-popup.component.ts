import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-user-popup",
  templateUrl: "./user-popup.component.html",
  styleUrls: ["./user-popup.component.css"],
})
export class UserPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
