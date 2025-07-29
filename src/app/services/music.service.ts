import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Song {
  title: string;
  image: string;
  description: string;
  preview: string;
  artist: string;
}

export interface Artist {
  name: string;
  photo: string;
  bio: string;
}

export interface MusicData {
  songs: Song[];
  artists: Artist[];
}

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private jsonUrl = '/assets/music.json';

  constructor(private http: HttpClient) {}

  getMusicData(): Observable<MusicData> {
    return this.http.get<MusicData>(this.jsonUrl);
  }
}
