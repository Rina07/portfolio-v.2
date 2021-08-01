import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ItemsService } from 'src/app/shared/items.service';
import { Item } from '../shared/interfaces';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit, OnDestroy {

  form: FormGroup;
  item: Item;
  submitted = false;
  uSub: Subscription;

  constructor(private route: ActivatedRoute, private itemsService: ItemsService) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.itemsService.getById(params['id'])
      })
    ).subscribe((item: Item) => {
      this.item = item;
      this.form = new FormGroup({
        name: new FormControl(item.name, Validators.required),
        description: new FormControl(item.description, Validators.required),
        link: new FormControl(item.link, Validators.required),
        source: new FormControl(item.source, Validators.required),
        techs: new FormArray([]),
        photo: new FormControl(item.photo)
      })
    })
  }

  get techs() {
    return this.form.get('techs') as FormArray;
  }
  
  addTechs() {
    setTimeout(() => this.techs.push(new FormControl('')));
  }

  submit() {
    if (this.form.valid) {
      this.submitted = true;

      this.uSub = this.itemsService.update({
        id: this.item.id,
        name: this.form.value.name,
        description: this.form.value.description,
        link: this.form.value.link,
        source: this.form.value.source,
        techs: this.form.value.techs,
        photo: this.form.value.photo
      }).subscribe(() => {
        this.submitted = false;
      })
    }
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }
}
