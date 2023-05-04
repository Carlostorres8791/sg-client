import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "rxjs";
import { AlertService } from 'src/app/services/alert/alert.service';
import { ProductService } from 'src/app/services/product/product.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { productModel } from 'src/app/models/product/productModel';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products?: productModel[];
  subscription: Subscription[] = [];
  productForm: FormGroup;
  user_id: string | null = localStorage.getItem("user_id");
  updateState: boolean = false;

  constructor(
    private modalService: NgbModal,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) {
      this.productForm = this.formBuilder.group({
        id: [],
        name: ['', Validators.required],
        price: ['', Validators.required],
        createdbyid: [this.user_id]
      })
    }

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngOnDestroy():void{
    this.subscription.forEach(sub =>{
      sub.unsubscribe();
    });
  }

  get controls() {
    return this.productForm.controls;
  }

  getAllProducts(): void {
    let sub = this.productService.getAll().subscribe(products => this.products = products);
    this.subscription.push(sub);
  }

  saveProduct(): void {
    this.productService.saveProduct(this.productForm.value).subscribe(_ => {
      this.closeModal();
      this.getAllProducts();
      this.alertService.successAlert("El registro se almaceno con exito..!!")
    }
    )
  }

  onUpdateOrSave(content: any, product?: productModel): void {
    if (product) {
      this.updateState = true;
      this.transformData(product);
    } else {
      this.updateState = false;
      this.productForm.reset();
      this.productForm.controls['createdbyid'].setValue(this.user_id); 
    }
    this.openModal(content);
  }

  updateProduct(): void {
    let product = this.productForm.value;
      const sub$ = this.productService.updateProduct(product.id, product).subscribe(
        _ => {
          this.closeModal();
          this.getAllProducts();
          this.productForm.reset();
          this.updateState = false;
          this.alertService.successAlert("El registro se actualizo con exito..!!");
        })
  }

  deleteProduct(productId?: number) {
    if (productId) {
      this.productService.deleteById(productId).subscribe(
        _ => {
          this.getAllProducts();
          this.alertService.successAlert("Se registro se elimino con exito..!!");
        })
    }
  }

  transformData(product: productModel): void {
    this.productForm.setValue({
      id: product.id,
      name: product.name,
      price: product.price,
      createdbyid: product.createdbyid,
    })
  }

  openModal(content: any) {
		this.modalService.open(content, { size: 'lg' });
	}

  closeModal() {
    this.modalService.dismissAll();
    this.updateState = false;
  }

}
