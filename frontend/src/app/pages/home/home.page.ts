import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/domain/item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})


export class HomePage implements OnInit {

  items: Item[] = [];
  addForm!: FormGroup;
  displayedColumns: string[] = ['title', 'author', 'price', 'actions'];

  constructor(private formBuilder: FormBuilder, private itemService: ItemService) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      'title': ['', Validators.required],
      'author': ['', Validators.required],
      'price': ['', Validators.required]
    });
    this.fetchItems();
  }

  addItem(): void {
    if (this.addForm.valid) {
      this.itemService.add(this.addForm.value).subscribe({
        next: () => {
          this.fetchItems();
          this.addForm.reset();
        }
      })
    }
  }

  editItem(i: number): void {
    this.items[i].editing = true;
  }


  deleteItem(id: number) {
    this.itemService.delete(id).subscribe({
      next: () => {
        this.fetchItems();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  
  fetchItems(): void {
    this.itemService.getItems().subscribe(
      (data: Item[]) => {
        this.items = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  saveItem(index: number, id: number): void {
      const item = this.items[index];
      item.editing = false;
      this.itemService.update(id, item).subscribe({
        next: () => {
          this.fetchItems();
        },
        error: (error) => {
          console.log(error);
        }
      });
    } 
  }


