import { OnInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from '../../login/shared/interfaces';
import { ItemsService } from '../../shared/items.service';
import { ScrollerService } from '../../shared/scroller.service';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  faLinkedinIn = faLinkedinIn;
  faGithub = faGithub;
  form: FormGroup;

  constructor(
    private itemsService: ItemsService,
    private scrollerService: ScrollerService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required),
    });
  }

  submit() {
    if (this.form.valid) {
      const formMessage: Message = {
        name: this.form.value.name,
        email: this.form.value.email,
        message: this.form.value.message,
      };

      this.itemsService.createMessage(formMessage).subscribe(() => {
        this.form.reset();
      });
    }
  }

  onClickScroll(elementId: string): void {
    this.scrollerService.onClickScroll(elementId);
  }
}
