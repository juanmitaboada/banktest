import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of} from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// General options for everybody
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class UserService {

    // URL to user
    private usersUrl = 'api/users';

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    // It will make log easier
    log (message: string) {
        this.messageService.add('UserService: ' + message);
    }

    // Get an user
    getUser(id: number): Observable<User> {
        // Prepare variables
        const url = `${this.usersUrl}/${id}`;
        this.messageService.add(`UserService: fetched user id=${id}`);

        // Send the request
        return this.http.get<User>(url).pipe(                       // Get -> GET
            tap(_ => this.log(`fetched user id=${id}`)),            // LOG
            catchError(this.handleError<User>(`getUser id=${id}`))  // Catch errors
        );
    }

    // Get the list of users
    getUsers(): Observable<User[]> {
        // Send the requet
        return this.http.get<User[]>(this.usersUrl)             // List -> GET
            .pipe (
                tap( users => this.log(`fetched users`)),       // LOG
                catchError(this.handleError('getUsers', []))    // Catch errors
            );
    }

    // Add a new user
    addUser(user: User): Observable<User> {
        // Send the request
        return this.http.post<User>(this.usersUrl, user, httpOptions).pipe( // Add -> POST
            tap((user:User) => this.log(`added user w/ id=${user.id}`)),    // LOG
            catchError(this.handleError<User>('addUser')),                  // Catch errors
        );
    }

    // Update existing user
    updateUser(user: User): Observable<User> {
        // Send the request
        return this.http.put(this.usersUrl, user, httpOptions).pipe(    // Update -> PUT
            tap(_ => this.log(`updated user id=${user.id}`)),           // LOG
            catchError(this.handleError<any>(`updateUser`))             // Catch errors
        );
    }

    // Delete existing user
    deleteUser(user: User | number): Observable<User> {
        // Prepare variables
        const id = typeof user === 'number' ? user: user.id;
        const url = `${this.usersUrl}/${id}`;

        // Send the request
        return this.http.delete(url, httpOptions).pipe(         // Delete -> DELETE
            tap(_ => this.log(`delete user id=${id}`)),         // LOG
            catchError(this.handleError<any>('deleteUser'))     // Catch errors
        );
    }

    /**
        * Handle Http operation that failed.
        * Let the app continue.
        * @param operation - name of the operation that failed
        * @param result - optional value to return as the observable result
    */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
     
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
     
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
     
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
