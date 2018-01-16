import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service"



@Component({
    moduleId: module.id,
    selector: "user",
    templateUrl: "user.component.html",
    styleUrls: ["user.component.css"]
})

export class UserComponent {
    userList: any;
    brand: any;
    p: number = 1;
    selectedValue = 10;
    constructor(private _userService: UserService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.route.params.subscribe((params: any) => {
            this.brand = params.brand
            this.getUsers();
            console.log(" this.brand vvvvvvvvvv", this.brand)
        });


    }

    getUsers() {
        this._userService.getUsers(this.brand).subscribe(res => {
            this.userList = res.data;

            console.log(" this.userList vvvvvvvvvv", this.userList)
        })
    }
}

