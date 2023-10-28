import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEndpoint } from '../constants/endpoint';
import { ICommonResponse } from 'src/app/core/models/auth.model';
import { IUser } from 'server/src/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<ICommonResponse<IUser[]>> {
    return this.http.get(UserEndpoint.getAllUser, { withCredentials: true });
  }
}
