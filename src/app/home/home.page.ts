import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  songs = [
    {
      title: "Balada Vibra Pop",
      image: "https://images.unsplash.com/photo-16https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fes%2Fs%2Ffotos%2Fdisco&psig=AOvVaw2s9DQdtlFBv5_k6ujSmR-6&ust=1753755846795000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKjLrty_3o4DFQAAAAAdAAAAABAE05902711622-cfb43c4437f5?auto=format&fit=crop&w=800&q=80",
      description: "Una balada pop con sentimiento, perfecta para relajarse.",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      title: "Jazz de Medianoche",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fes%2Fs%2Ffotos%2Fdisco&psig=AOvVaw2s9DQdtlFBv5_k6ujSmR-6&ust=1753755846795000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKjLrty_3o4DFQAAAAAdAAAAABAE",
      description: "Sax suavemente resonante bajo la luna de la ciudad.",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      title: "Electrónica Festival",
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fes%2Fs%2Ffotos%2Fdisco&psig=AOvVaw2s9DQdtlFBv5_k6ujSmR-6&ust=1753755846795000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKjLrty_3o4DFQAAAAAdAAAAABAE",
      description: "Beats vibrantes que incendian la pista de baile.",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
      title: "Rock Vintage Clásico",
      image: "https://images.unsplash.com/photo-1508973377907-043f7f73e0b2?auto=format&fit=crop&w=800&q=80",
      description: "Guitarras eléctricas llenas de nostalgia y fuerza.",
      preview: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    }
  ];

  currentAudio: HTMLAudioElement | null = null;
  isPlaying: boolean = false;
  currentUrl: string = '';

  playSong(previewUrl: string) {
    // Si ya se está reproduciendo la misma canción, alternar pausa/reproducir
    if (this.currentAudio && this.currentUrl === previewUrl) {
      if (this.isPlaying) {
        this.currentAudio.pause();
      } else {
        this.currentAudio.play().catch(error => console.error("Error al reproducir:", error));
      }
      this.isPlaying = !this.isPlaying;
      return;
    }

    // Si es una nueva canción, detener la actual
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }

    // Reproducir nueva canción
    this.currentAudio = new Audio(previewUrl);
    this.currentUrl = previewUrl;
    this.isPlaying = true;
    this.currentAudio.play().catch(error => console.error("Error al reproducir:", error));
  }


  pauseSong() {
  if (this.currentAudio) {
    this.currentAudio.pause();
    this.isPlaying = false;
  }
}




}
