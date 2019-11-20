import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';

@Injectable()
export class FormCreatorFacade {
  form: FormGroup;

  constructor() {}

  /*
  * Set fields to the new FormGroup instance,
  * this method expect array of arrays,
  * first value is control name,
  * second value {string} or {object} with value and options,
  * third is an {array} of validation rules
  *
  * */
  setFields(fields): this {
    /* Clear form before set new set of fields */
    this.form = new FormGroup({});

    /* Add controls to the empty form */
    fields.forEach((field) => {
      const [name, value, validationRules, options = {}] = field;

      const transformRules = () => validationRules.map((strRule) => {
        if (strRule.match(':')) {
          const arr = strRule.split(':');
          return Validators[arr[0]](arr[1]);
        }
        return Validators[strRule];
      });

      this.form.addControl(name, new FormControl(value, { ...options },  validationRules && transformRules()));
    });
    return this;
  }

  build(): FormGroup {
    return this.form;
  }
}
