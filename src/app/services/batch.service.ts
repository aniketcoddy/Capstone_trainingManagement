import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  private apiUrl = ' http://localhost:5092/api/batches'; // Update with your actual Batch API URL

  constructor(private http: HttpClient) { } 

  getBatches(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
console.log(BatchService,"checking");
