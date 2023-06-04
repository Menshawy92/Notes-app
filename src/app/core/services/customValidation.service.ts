import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class CustomValidationService {
    lessThanToday(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const today = new Date();
            const selectedDate = new Date(control.value);
            if (selectedDate < today) {
                return { lessThanToday: true };
            }
            return null;
        };
    }
}
