import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormField,
  debounce,
  email,
  form,
  maxLength,
  minLength,
  pattern,
  required,
} from '@angular/forms/signals';

// Interface para el modelo del formulario
interface ContactData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  contactPreference: string;
  terms: boolean;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormField],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  // Signal para el modelo del formulario
  readonly contactModel = signal<ContactData>({
    name: 'Pepe Luis',
    email: 'pepe@gmail.com',
    phone: '+34 600 000 000',
    subject: 'Otros',
    message: 'Hola me llamo Pepe Luis',
    contactPreference: 'email',
    terms: true,
  });

  // Signal Forms con validaciones
  readonly contactForm = form(this.contactModel, (schemaPath) => {
    // Validación para nombre
    debounce(schemaPath.name, 300);
    required(schemaPath.name, { message: 'El nombre es obligatorio' });
    minLength(schemaPath.name, 3, { message: 'El nombre debe tener al menos 3 caracteres' });
    maxLength(schemaPath.name, 100, { message: 'El nombre no puede exceder 100 caracteres' });
    pattern(schemaPath.name, /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
      message: 'El nombre solo puede contener letras y espacios',
    });

    // Validación para email
    debounce(schemaPath.email, 500);
    required(schemaPath.email, { message: 'El correo electrónico es obligatorio' });
    email(schemaPath.email, { message: 'Ingresa un correo electrónico válido' });
    maxLength(schemaPath.email, 255, { message: 'El correo no puede exceder 255 caracteres' });
    pattern(schemaPath.email, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Ingresa un correo electrónico válido',
    });

    // Validación para teléfono (opcional)
    maxLength(schemaPath.phone, 20, { message: 'El teléfono no puede exceder 20 caracteres' });
    pattern(schemaPath.phone, /^\+?[1-9]\d{1,14}$|^\+?[1-9][\d\s\-()]{7,20}$/, {
      message: 'Ingresa un número de teléfono válido',
    });

    // Validación para asunto
    required(schemaPath.subject, { message: 'Debes seleccionar un asunto' });

    // Validación para mensaje
    debounce(schemaPath.message, 300);
    required(schemaPath.message, { message: 'El mensaje es obligatorio' });
    minLength(schemaPath.message, 10, { message: 'El mensaje debe tener al menos 10 caracteres' });
    maxLength(schemaPath.message, 1000, { message: 'El mensaje no puede exceder 1000 caracteres' });

    // Validación para preferencia de contacto
    required(schemaPath.contactPreference, {
      message: 'Debes seleccionar una preferencia de contacto',
    });

    // Validación para términos
    // Para checkboxes booleanos, usamos validación personalizada
  });

  // Signals para el estado del formulario
  readonly isSubmitting = signal(false);
  readonly showSuccess = signal(false);
  readonly formSubmitted = signal(false);

  constructor() {
    // Signal Forms maneja la validación en tiempo real automáticamente
  }

  /**
   * Validación personalizada para términos y condiciones
   */
  private validateTerms(): boolean {
    return this.contactModel().terms;
  }

  /**
   * Obtener mensaje de error para un campo específico usando Signal Forms
   */
  getErrorMessage(fieldName: keyof ContactData): string | null {
    const field = this.contactForm[fieldName]();

    if (!field || (!this.formSubmitted() && !field.touched())) {
      return null;
    }

    const errors = field.errors();
    if (!errors || errors.length === 0) {
      return null;
    }

    // Retornar el primer error encontrado
    return errors[0].message ?? null;
  }

  /**
   * Validación personalizada para términos
   */
  getTermsError(): string | null {
    if (!this.contactModel().terms && this.formSubmitted()) {
      return 'Debes aceptar los términos y condiciones';
    }
    return null;
  }

  /**
   * Verificar si hay errores en el formulario usando Signal Forms
   */
  get hasErrors(): boolean {
    const fields = ['name', 'email', 'phone', 'subject', 'message', 'contactPreference'] as const;

    return (
      fields.some((fieldName) => {
        const field = this.contactForm[fieldName]();
        // Si el formulario fue enviado, verificar validez sin importar si fue touched
        // Si no fue enviado, solo verificar si fue touched y es inválido
        return this.formSubmitted() ? !field.valid() : !field.valid() && field.touched();
      }) ||
      (!this.contactModel().terms && this.formSubmitted())
    );
  }

  /**
   * Verificar si el formulario es válido para habilitar el botón de envío (validación en tiempo real)
   */
  get isFormInvalid(): boolean {
    return !this.isFormValid();
  }

  /**
   * Contar errores en el formulario usando Signal Forms
   */
  get errorCount(): number {
    const fields = ['name', 'email', 'phone', 'subject', 'message', 'contactPreference'] as const;
    let count = 0;

    fields.forEach((fieldName) => {
      const field = this.contactForm[fieldName]();
      if (!field.valid() && (this.formSubmitted() || field.touched())) {
        count++;
      }
    });

    if (!this.contactModel().terms && this.formSubmitted()) {
      count++;
    }

    return count;
  }

  /**
   * Obtener todos los mensajes de error usando Signal Forms
   */
  getAllErrors(): string[] {
    const errors: string[] = [];
    const fields = ['name', 'email', 'phone', 'subject', 'message', 'contactPreference'] as const;

    fields.forEach((fieldName) => {
      const error = this.getErrorMessage(fieldName);
      if (error) {
        const fieldLabel = this.getFieldLabel(fieldName);
        errors.push(`${fieldLabel}: ${error}`);
      }
    });

    const termsError = this.getTermsError();
    if (termsError) {
      errors.push(`Términos y condiciones: ${termsError}`);
    }

    return errors;
  }

  /**
   * Obtener nombre legible del campo
   */
  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      name: 'Nombre',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      subject: 'Asunto',
      message: 'Mensaje',
      contactPreference: 'Preferencia de contacto',
      terms: 'Términos y condiciones',
    };

    return labels[fieldName] || fieldName;
  }

  /**
   * Enviar formulario usando Signal Forms
   */
  onSubmit(event: Event) {
    event.preventDefault();
    this.formSubmitted.set(true);

    // Verificar si el formulario es válido
    if (!this.isFormValid()) {
      // Enfocar el primer campo con error
      this.focusFirstError();
      this.isSubmitting.set(false);
      return;
    }

    this.isSubmitting.set(true);

    // Simular envío del formulario
    this.simulateFormSubmission(
      () => {
        // Callback cuando se completa el envío
        this.showSuccess.set(true);
        this.isSubmitting.set(false);

        // Resetear formulario después de 3 segundos
        setTimeout(() => {
          this.resetForm();
          this.showSuccess.set(false);
        }, 3000);
      },
      (error) => {
        // Callback de error
        console.error('Error al enviar formulario:', error);
        this.isSubmitting.set(false);
        // Aquí podrías mostrar un mensaje de error general
      },
    );
  }

  /**
   * Verificar si el formulario es válido usando Signal Forms
   */
  private isFormValid(): boolean {
    const fields = ['name', 'email', 'phone', 'subject', 'message', 'contactPreference'] as const;

    const allFieldsValid = fields.every((fieldName) => {
      const field = this.contactForm[fieldName]();
      return field.valid();
    });

    return allFieldsValid && this.contactModel().terms;
  }

  /**
   * Simular envío del formulario
   */
  private simulateFormSubmission(onSuccess: () => void, onError: (error: Error) => void): void {
    void onError;
    setTimeout(() => {
      // Simular éxito (en un caso real, aquí harías la llamada HTTP)
      // Para demostración, simulamos éxito siempre
      onSuccess();

      // Si quisieras simular un error, podrías hacer:
      // const shouldFail = Math.random() > 0.8;
      // if (shouldFail) {
      //   onError(new Error('Error de conexión'));
      // } else {
      //   onSuccess();
      // }
    }, 2000);
  }

  /**
   * Resetear formulario usando Signal Forms
   */
  resetForm(): void {
    // Resetear el modelo a valores por defecto
    this.contactModel.set({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      contactPreference: 'email',
      terms: false,
    });

    this.formSubmitted.set(false);
    this.showSuccess.set(false);
    this.isSubmitting.set(false);
  }

  /**
   * Enfocar el primer campo con error usando Signal Forms
   */
  private focusFirstError(): void {
    const fields = ['name', 'email', 'phone', 'subject', 'message', 'contactPreference'] as const;

    const firstInvalidField = fields.find((fieldName) => {
      const field = this.contactForm[fieldName]();
      return !field.valid();
    });

    if (firstInvalidField) {
      const element = document.getElementById(firstInvalidField);
      if (element) {
        element.focus();
      }
    } else if (!this.contactModel().terms) {
      // Enfocar los términos si no están aceptados
      const termsElement = document.getElementById('terms');
      if (termsElement) {
        termsElement.focus();
      }
    }
  }

  /**
   * Obtener estadísticas del formulario para accesibilidad usando Signal Forms
   */
  getFormStats(): {
    totalFields: number;
    requiredFields: number;
    optionalFields: number;
    validFields: number;
    invalidFields: number;
  } {
    const fields = ['name', 'email', 'phone', 'subject', 'message', 'contactPreference'] as const;
    const totalFields = fields.length + 1; // +1 por términos

    const requiredFields = 6; // name, email, subject, message, contactPreference, terms
    let validFields = 0;
    let invalidFields = 0;

    fields.forEach((fieldName) => {
      const field = this.contactForm[fieldName]();
      if (this.formSubmitted()) {
        if (field.valid()) {
          validFields++;
        } else {
          invalidFields++;
        }
      }
    });

    // Validar términos
    if (this.formSubmitted()) {
      if (this.contactModel().terms) {
        validFields++;
      } else {
        invalidFields++;
      }
    }

    return {
      totalFields,
      requiredFields,
      optionalFields: totalFields - requiredFields,
      validFields,
      invalidFields,
    };
  }
}
