import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Item } from '../shared/interfaces';
import {ItemsService} from '../../shared/items.service';


@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  form: FormGroup;
  
  public uploadFile(event) {   
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload =  () => {    
    
    this.form.patchValue({
      photo: reader.result
    });
    this.form.get('photo').updateValueAndValidity()
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
  
  TechTags: Array<any> = [
    { name: 'HTML', value: 'HTML' },
    { name: 'CSS', value: 'CSS' },
    { name: 'Javascript', value: 'Javascript' },
    { name: 'Webpack', value: 'Webpack' },
    { name: 'Babel', value: 'Babel' },
    { name: 'Angular', value: 'Angular' },
    { name: 'Node.js', value: 'Node.js' },
    { name: 'React', value: 'React' },
    { name: 'Redux', value: 'Redux' }
  ];

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      link: new FormControl('', Validators.required),
      source: new FormControl('', Validators.required),
      techs: new FormArray([], Validators.required),
      photo: new FormControl(null)      
    })
  }

  resetTechs() {
    this.TechTags.forEach((techTag) => {
      techTag.checked = false;
    })
  }

  onCheckboxChange(e) {
    const techs: FormArray = this.form.get('techs') as FormArray;

    if(e.target.checked) {
      techs.push(new FormControl(e.target.value));      
    } else {
      let i: number = 0;
      techs.controls.forEach((item: FormControl) => {
        if(item.value === e.target.value) {
          techs.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submit() {
    if(this.form.valid) {
            
      const item: Item = {
        name: this.form.value.name,
        description: this.form.value.description,
        link: this.form.value.link,
        source: this.form.value.source,
        techs: this.form.value.techs,
        photo: this.form.value.photo 
       }
      
      this.itemsService.create(item).subscribe(() => {
        
        (this.form.get('techs') as FormArray).clear();
        this.form.reset();        
      })           
    }       
  }
}
