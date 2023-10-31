import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/product';
import { Category } from '../interface/category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  token = localStorage.getItem('access_token');
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/product');
  }
  getOne(id: number): Observable<Product> {
    const url = `http://localhost:3000/product/${+id}`;
    return this.http.get<Product>(url, { headers: this.headers });
  }

  update(id: number, product: Product): Observable<Product> {
    const url = `http://localhost:3000/product/${+id}`;
    return this.http.patch<Product>(url, product, { headers: this.headers });
  }
  getAllCategories(): Observable<Category[]> {
    const url = 'http://localhost:3000/category';
    return this.http.get<Category[]>(url, { headers: this.headers });
  }
  delete(id: number): Observable<void> {
    const url = `http://localhost:3000/product/${+id}`;
    return this.http.delete<void>(url, { headers: this.headers });
  }
  create(product: Product): Observable<Product> {
    const url = 'http://localhost:3000/product';
    return this.http.post<Product>(url, product, { headers: this.headers });
  }
}
