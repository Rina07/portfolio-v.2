import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../shared/interfaces';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnInit {
    
    form: FormGroup;
    submitted = false;
    message: string;

    constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            if(params['loginAgain']) {
                this.message = 'Please log in again';
            } else if(params['authFailed']) {
                this.message = 'Authorization required';
            }
        })
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        })
    }

    submit() {
        console.log(this.form);
        if(this.form.invalid) {
            return;
        }

        this.submitted = true;

        const user: User = {
            email: this.form.value.email,
            password: this.form.value.password,
            returnSecureToken: true
        }
        this.auth.login(user).subscribe(() => {
            this.form.reset();
            this.router.navigate(['/login/dashboard']);
            this.submitted = false;
        }, () => {
            this.submitted = false;
        })
    }
}