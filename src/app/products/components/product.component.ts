import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { FormComponent } from './form.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  products: Product[] = [];

  productSelected: Product = new Product();
  constructor(private service: ProductService){}

  ngOnInit(): void {
   this.service.findAll().subscribe(products=>this.products = products);
  }

  addProduct(product: Product){
    if(product.id > 0){
      this.service.update(product).subscribe(updateProduct =>{
        this.products = this.products.map(prod =>{
        if(prod.id == product.id){
          return {... updateProduct};
        }
          return prod;
        });
      });
      

    }else{
      //new product
      this.service.create(product).subscribe(newProduct =>{
        this.products = [... this.products, {... newProduct}];
      })
       
    }
    this.productSelected = new Product();
  }

  onUpdateProduct(productRow: Product){
    this.productSelected = {... productRow};
  }

  onRemoveProduct(id: number){
    this.service.remove(id).subscribe(()=>{
      this.products = this.products.filter(product => product.id != id);
    })
    
  }

}
