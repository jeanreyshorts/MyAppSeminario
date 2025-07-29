import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface Song {
  title: string;
  image: string;
  description: string;
  preview: string;
  artistId: number;
}

interface Artist {
  id: number;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  // Lista de artistas
  artists: Artist[] = [
    { id: 1, name: 'Artista Uno' },
    { id: 2, name: 'Artista Dos' },
    { id: 3, name: 'Artista Tres' }
  ];

  // Canciones con referencia a artistaId
  songs: Song[] = [
    {
      title: "Balada Vibra Pop",
      image: "https://images.unsplash.com/photo-1508973377907-043f7f73e0b2?auto=format&fit=crop&w=800&q=80",
      description: "Una balada pop con sentimiento, perfecta para relajarse.",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      artistId: 1
    },
    {
      title: "Jazz de Medianoche",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      description: "Sax suavemente resonante bajo la luna de la ciudad.",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      artistId: 2
    },
    {
      title: "Electrónica Festival",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      description: "Beats vibrantes que incendian la pista de baile.",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      artistId: 3
    },
    {
      title: "Rock Vintage Clásico",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
      description: "Guitarras eléctricas llenas de nostalgia y fuerza.",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      artistId: 1
    }
  ];

  selectedArtistId: number | null = null; // null = todos

  currentAudio: HTMLAudioElement | null = null;
  isPlaying: boolean = false;
  currentUrl: string = '';

  // Filtra canciones según artista seleccionado o muestra todas si es null
  get filteredSongs(): Song[] {
    if (this.selectedArtistId === null) {
      return this.songs;
    }
    return this.songs.filter(s => s.artistId === this.selectedArtistId);
  }

  // Cambiar artista seleccionado
  selectArtist(artistId: number | null) {
    this.selectedArtistId = artistId;
    // Al cambiar artista, detener audio si hay alguno reproduciéndose
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.isPlaying = false;
      this.currentUrl = '';
    }
  }

  playSong(previewUrl: string) {
    if (this.currentAudio && this.currentUrl === previewUrl) {
      if (this.isPlaying) {
        this.currentAudio.pause();
        this.isPlaying = false;
      } else {
        this.currentAudio.play().catch(err => console.error('Error al reproducir:', err));
        this.isPlaying = true;
      }
    } else {
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      }
      this.currentAudio = new Audio(previewUrl);
      this.currentUrl = previewUrl;
      this.isPlaying = true;
      this.currentAudio.play().catch(err => console.error('Error al reproducir:', err));
    }
  }

  pauseSong() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.isPlaying = false;
    }
  }
}
