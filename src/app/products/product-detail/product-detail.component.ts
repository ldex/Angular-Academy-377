import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  //product: Product;
  product$: Observable<Product>;

  deleteProduct(id: number) {
    this
      .productService
      .deleteProduct(id)
      .subscribe(
        () => {
          console.log('Product deleted on the server.');
          this.productService.initProducts();
          this.router.navigateByUrl('/products');
        }
      )
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    let id = activatedRoute.snapshot.params.id;
    this.product$ = productService.getProductById(id);

    //productService.getProductById(id).subscribe(data => this.product = data)

  }

}
