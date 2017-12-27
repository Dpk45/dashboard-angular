import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service"



@Component({
    moduleId: module.id,
    selector: "user",
    templateUrl: "user.component.html",
    styleUrls:["user.component.css"]
})

export class UserComponent{
    userList: any;
    user: any;
    orders: any;
    isSingleUser: boolean;
    isEditUser: boolean;
    brand: any;
    p: number = 1;
    selectedValue = 10;
    constructor(private _userService:UserService,  private route: ActivatedRoute, private router: Router){
        
    }

    ngOnInit(){
         this.route.params.subscribe((params:any) => {
            this.brand = params.brand
            this.getUsers();
            console.log(" this.brand vvvvvvvvvv",  this.brand)
        });

        
    }

    getUsers(){
        this._userService.getUsers(this.brand).subscribe(res => {
                this.userList = res.data;

                console.log(" this.userList vvvvvvvvvv",  this.userList)
        })
        // console.log("selectedValue", this.selectedValue)
    }

     getUserByEmail(email){
          this._userService.getUserByEmail(email, this.brand).subscribe(user => {
            // console.log("<<<<<<<<<<< user data by email >>>>>>>>>", user)
            this.user = user;
            this.isSingleUser = true;
            console.log("user data by email >>>>>>>>>", user)
        })

        this._userService.getUserOrders(email, this.brand).subscribe( res=>{
             console.log("<<<<<<<<<<< getUserOrders by email >>>>>>>>>", res)
            this.orders = res
        })
    }
    

    editUser(email){
        this.isSingleUser = false;
        this.isEditUser = true
    }

    cancel(){
        this.isEditUser = false;
        this.isSingleUser = true;
    }

    updateUser(data){
        console.log("inside update user function...............", data)
        this._userService.updateUser(data.email, this.brand, data).subscribe( res => {
            console.log("user upsdated successfully ......", res);
            this.isEditUser = false;
            this.isSingleUser = true;

        })
    }

    resetPassword(email){
        console.log("inside resetPassword function...............")
        this._userService.resetPassword(email,this.brand).subscribe( res=>{
            console.log("resetPassword link sent successfully ......", res);
            this.isEditUser = false;
            this.isSingleUser = true;
        })
    }

}

