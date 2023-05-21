import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/domain/item';
import { ItemService } from 'src/app/services/item.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss']
})
export class ViewPage implements OnInit {
  item: any = {};

  constructor(private itemService: ItemService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.fetchItem(parseInt(id)) ;
    }
  }

  fetchItem(id: number) {
    this.itemService.getItem(id).subscribe(
      (response: Item) => {
        this.item = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}