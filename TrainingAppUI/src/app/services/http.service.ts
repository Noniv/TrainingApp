import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Training } from '../models/training';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  trainingApi = '/api/trainings';

  constructor(private httpClient: HttpClient) {}

  createTraining(training: Training): Observable<Training> {
    return this.httpClient.post<Training>(this.trainingApi, training);
  }

  getTraining(): Observable<Training[]> {
    return this.httpClient.get<TrainingGetResponse>(`${this.trainingApi}/search/findAll`).pipe(
      map((response) => {
        return response._embedded.trainings;
      })
    );
  }

  getAverageDuration(): Observable<number> {
    return this.httpClient.get<number>(`${this.trainingApi}/search/averageDuration`).pipe(
      map((response) => {
        console.log(response)
        return response;
      })
    );
  }

  deleteTraining(id: number): Observable<Training> {
    const url = `${this.trainingApi}/${id}`;
    return this.httpClient.delete<Training>(url);
  }

  updateTraining(training: Training): Observable<Training> {
    const url = `${this.trainingApi}/${training.id}`;
    return this.httpClient.put<Training>(url, training);
  }
}

interface TrainingGetResponse {
  _embedded: {
    trainings: Training[];
  };
}
