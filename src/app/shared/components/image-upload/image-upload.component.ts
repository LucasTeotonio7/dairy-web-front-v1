import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  @Input() image: string = '';
  @Output() imageFileChange: EventEmitter<File> = new EventEmitter<File>();

  displaySelectedImage(event: Event, elementId: string): void {
    const selectedImage = document.getElementById(elementId) as HTMLImageElement;
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>): void => {
        selectedImage.src = e.target?.result as string;
      };

      reader.readAsDataURL(fileInput.files[0]);
      this.imageFileChange.emit(fileInput.files[0]);
    }
  }

  validateUploadImage(event: any): void {
    const inputFile = event.target as HTMLInputElement;
    const file = inputFile.files && inputFile.files[0];
    const availableTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
    if (!(file && availableTypes.includes(file.type))) {
      inputFile.value = '';
      alert('Por favor, selecione apenas arquivos de imagem (JPEG, PNG, SVG, WEBP).');
    }
  } 

}
