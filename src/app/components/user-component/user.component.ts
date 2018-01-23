import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';



@Component({
    moduleId: module.id,
    selector: 'user',
    templateUrl: 'user.component.html',
    styleUrls: ['user.component.css']
})

export class UserComponent {
    userList: any;
    brand: any;
    CurrentPageValue = 1;
    selectedValue = 10;

    isDesc: boolean = false;
    column: string;
    direction: number;

    constructor(private _userService: UserService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.route.params.subscribe((params: any) => {
            this.brand = params.brand;
            this.getUsers();
        });
    }

    // get users data
    getUsers() {
        this._userService.getUsers(this.brand).subscribe(res => {
            this.userList = res.data;
            console.log(' this.userList vvvvvvvvvv', this.userList)
        });
    }

    // sorting function
    sort(property) {
        this.isDesc = !this.isDesc;   // change the direction
        this.column = property;
        this.direction = this.isDesc ? 1 : -1;
    }
}

