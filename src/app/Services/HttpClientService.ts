import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()

export class HttpClientService {

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  private httpUrl = environment.apiUrl;

  get token() {
    return this.authService.getToken();
  }

  httpGet(category: string = '', id: string = ''): Observable<{}> {
    if (category) {
      if (id) {
        return this.http.get<{}>(`${this.httpUrl}/${category}/${id}/${this.token}`)
          .pipe(catchError(err => this.errorHandler(err)));
      } else {
        return this.http.get<{}[]>(`${this.httpUrl}/${category}/${this.token}`)
          .pipe(catchError(err => this.errorHandler(err)));
      }
    } else {
      return this.http.get<{}[]>(`${this.httpUrl}/category/${this.token}`)
        .pipe(catchError(err => this.errorHandler(err)));
    }
  }

  getUser(): Observable<{}> {
    return this.http.get<{}>(`${this.httpUrl}/user/${this.token}`)
      .pipe(catchError(err => this.errorHandler(err)));
  }

  userUpdate(user): Observable<{}> {
    return this.http.put<{}>(`${this.httpUrl}/user/${this.token}`, user)
      .pipe(catchError(err => this.errorHandler(err)));
  }

  newRecord(category: string, data): Observable<{}> {
    return this.http.post(`${this.httpUrl}/${category}/${this.token}`, data)
      .pipe(catchError(err => this.errorHandler(err)));
  }

  delRecord(category: string, id: string): Observable<{}> {
    return this.http.delete(`${this.httpUrl}/${category}/${id}/${this.token}`)
      .pipe(catchError(err => this.errorHandler(err)));
  }

  update(category: string, id: string, data): Observable<{}> {
    return this.http.put(`${this.httpUrl}/${category}/${id}/${this.token}`, data)
      .pipe(catchError(err => this.errorHandler(err)));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }
}
