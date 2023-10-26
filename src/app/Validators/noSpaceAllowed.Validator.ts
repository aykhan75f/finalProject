import { AbstractControl, Form, FormControl, ValidationErrors } from "@angular/forms";

export class CustomValidators{
    static noSpaceAllowed(control: FormControl)
    {
        if(control.value != null && control.value.indexOf(' ') != -1)
        {
            return {noSpaceAllowed: true}
        }
        return null;
    }
    static passwordPattern(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&-]).{8,}$/.test(value) && value)  
        {
            return { invalidPasswordPattern: true };
        }
        return null;
      }
}