import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../components/template/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  users: any[] = [];
  baseUrl = "https://api.github.com/users/";
  private readonly localStorageKey = "users";

  constructor(private httpClient: HttpClient) {}

  public getUsers(user: string): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + user);
  }
  public searchUsers(username: string) {
    const url = `https://api.github.com/search/users?q=${encodeURIComponent(
      username
    )}`;
    this.httpClient.get(url).subscribe((response: any) => {
      this.users = response.items;
    });
  }
}
