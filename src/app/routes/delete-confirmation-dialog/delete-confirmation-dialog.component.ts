import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  template: `
    <div class="dialog-content">
      <h2>Confirmer la suppression</h2>
      <p>Voulez-vous vraiment supprimer cette personne ?</p>
      <div class="dialog-actions">
        <button mat-button (click)="onCancel()">Annuler</button>
        <button mat-raised-button color="warn" (click)="onConfirm()">Supprimer</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-content { text-align: center; }
    .dialog-actions { display: flex; justify-content: space-around; margin-top: 20px; }
  `]
})
export class DeleteConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
