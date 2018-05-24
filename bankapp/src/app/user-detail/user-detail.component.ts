import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

    @Input() user: User;
    private user_error: string;
    private iban_error: string;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.getUser();
    }

    getUser(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        this.userService.getUser(id).subscribe(user => this.user = user);
    }

    save(): void {
        // Reset errors
        this.user_error = null;
        this.iban_error = null;

        // Keepgoing flag to control fields
        var keepgoing = true;

        // User can not be empty
        if (!this.user.username) {
            keepgoing = false;
        }

        if (!this.user.password) {
            delete(this.user.password);
        }

        // Check IBAN
        if (keepgoing && this.user.iban) {
            keepgoing = false;
            if (this.isValidIBANNumber(this.user.iban)) {
                keepgoing = true;
            } else {
                this.iban_error = "IBAN is not valid";
            }
        }

        // Do the rest of the job
        if (keepgoing) {
            this.userService.updateUser(this.user)
                .subscribe(() => this.goBack());
        }
    }

    goBack(): void {
        this.location.back();
    }


    // === IBAN VALIDATION === ==========================================
    // I got IBAN validation from: https://gist.github.com/Bloggerschmidt/8bfeb84eeecd8b41b42c89ff26f5aa01
    //this.validIBAN('DE89 3704 0044 0532 0130 00');
    //validIBAN(iban) {
    //    // valid == 1
    //    // invalid != 1
    //    console.log(this.isValidIBANNumber(iban));
    //}

    private isValidIBANNumber(input) {
        let CODE_LENGTHS = {
            AD: 24, AE: 23, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29,
            CH: 21, CR: 21, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, ES: 24,
            FI: 18, FO: 18, FR: 27, GB: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21,
            HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28,
            LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27,
            MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29,
            RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24, SM: 27, TN: 24, TR: 26
        };

        let iban = input.toUpperCase().replace(/[^A-Z0-9]/g, ''), 
                code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/),
                digits;

        if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
            return false;
        }

        digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter) {
            return letter.charCodeAt(0) - 55;
        });

        return this.mod97(digits);
    }

    private mod97(string) {
        let checksum = string.slice(0, 2), fragment;

        for (let offset = 2; offset < string.length; offset += 7) {
            fragment = checksum + string.substring(offset, offset + 7);
            checksum = parseInt(fragment, 10) % 97;
        }

        return checksum;
    }
}
