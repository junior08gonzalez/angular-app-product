import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private product: Product[]=[
    {
      id:1,
      name:"Laptop",
      description:"Macbook",
      price:1000
    },
    {
      id:2,
      name:"Mouse",
      description:"Red Dragon gamer",
      price:300
    },
  ];

   private url: string = "http://localhost:8080/products";


  constructor(private http: HttpClient) { }

  findAll(): Observable<Product[]>{
    // return of(this.product);
    return this.http.get(this.url).pipe(
      map((response: any) =>response._embedded.products as Product[],
      )
    );
  }

  create(product: Product): Observable<Product>{
    console.log("method create");
    console.log(product);
    return this.http.post<Product>(this.url,
      {"name":product.name,"description":product.description,"price":product.price});
  }

   update(product: Product): Observable<Product>{
    return this.http.put<Product>(`${this.url}/${product.id}`,product);
  }

  remove(id: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${id}`)
  }
}
