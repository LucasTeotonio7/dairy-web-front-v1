import { FormGroup } from '@angular/forms';

export function PasswordMatchValidator(formGroup: FormGroup) {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirm_password')?.value;

  return password === confirmPassword ? null : { mismatch: true };
}
