import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  product: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams['id'];
    this.productService.getOne(id).subscribe(
      (product) => {
        this.product = product;
      },
      (error) => {
        console.error('Erreur lors de la récupération du produit:', error);
      }
    );
  }

  onDelete() {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      const id = this.route.snapshot.queryParams['id'];
      this.productService.delete(id).subscribe(
        () => {
          alert('Produit supprimé avec succès');
          this.router.navigate(['/product']);
        },
        (error) => {
          if (error.status === 401) {
            alert("Vous n'avez pas la permission de supprimer ce produit !");
          }
          this.router.navigate(['/product']);
        }
      );
    }
  }
}
