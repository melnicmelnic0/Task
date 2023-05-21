import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../domain/item';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl = 'http://localhost:8080/api';
 
  constructor(private httpClient: HttpClient) { }

  getItems() {
    return this.httpClient.get<Array<Item>>(`${this.baseUrl}/items`).pipe(
      map(response => response)
    );
  }

  add(item: Item) {
    return this.httpClient.post<Item>(`${this.baseUrl}/add`, item);
  }

  getItem(id: number) {
    return this.httpClient.get<Item>(`${this.baseUrl}/get/${id}`).pipe(
      map(response => response)
    );
  }

  update(id:number,item: Item) {
    return this.httpClient.put<Item>(`${this.baseUrl}/edit/${id}`, item);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
}
