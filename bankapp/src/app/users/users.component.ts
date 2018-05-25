import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    public selecteduser: User;

    // Declare structure holder
    users: User[];

    // Get a list of users
    getUsers(): void {
        this.userService.getUsers().subscribe(
            users => this.users = users
        );
    }

    // Add a new user
    add(username:string):void {
        username = username.trim().toLowerCase();
        if (username) {
            this.userService.addUser({username} as User)
            .subscribe(user => {
                console.log(user);
                this.users.push(user);
            });
        }
    }

    delete(user:User): void {
        this.users = this.users.filter(h => h !== user);
        this.userService.deleteUser(user).subscribe();
    }

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.getUsers();
    }

}
