import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  private apiUrl = 'http://localhost:5158/api/batches';

  constructor(private http: HttpClient) { }

  getBatches(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBatch(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addBatch(batch: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, batch);
  }

  updateBatch(id: number, batch: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, batch);
  }

  deleteBatch(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
