import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HttpService } from './services/http.service';
import { Training } from './models/training';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  trainingFormGroup!: FormGroup;
  trainings: Training[] = [];
  isEditMode = false;
  averageDuration = 0;

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.trainingFormGroup = this.formBuilder.group({
      id: [''],
      date: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      calories: ['', Validators.required],
    });
    this.getTraining();
    this.getAverageDuration();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }

  getTraining() {
    this.httpService.getTraining().subscribe((data) => {
      this.trainings = data;
    });
  }

  getAverageDuration() {
    this.httpService.getAverageDuration().subscribe((data) => {
      this.averageDuration = data;
    });
  }

  deleteTraining(id: number | undefined) {
    if (id) {
      this.httpService.deleteTraining(id).subscribe((data) => {
        this.getTraining();
        this.getAverageDuration();
        this.openSnackBar("Usunięto trening")
      });
    }
  }

  handleUpdateTraining(training: Training) {
    this.isEditMode = true;
    this.trainingFormGroup.setValue(training);
  }

  updateTraining() {
    const formValue: Training = this.trainingFormGroup.value;

    this.httpService.updateTraining(formValue).subscribe((data) => {
      this.trainingFormGroup.reset();
      this.isEditMode = false;
      this.openSnackBar("Zaktualizowano trening")
      this.getTraining();
      this.getAverageDuration();
    });
  }

  onSubmit() {
    if (this.trainingFormGroup.invalid) {
      return;
    }
    if (this.isEditMode) {
      this.updateTraining();
    } else {
      const formValue: Training = this.trainingFormGroup.value;
      const trainingRequest: Training = {
        date: formValue.date,
        description: formValue?.description,
        duration: formValue?.duration,
        calories: formValue?.calories,
      };
      this.httpService.createTraining(trainingRequest).subscribe((data) => {
        this.getTraining();
        this.getAverageDuration();
        this.openSnackBar("Dodano trening")
      });
    }
  }
}
