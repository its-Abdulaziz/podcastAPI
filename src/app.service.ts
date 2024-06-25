import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService ) {}
  
  searchItunes(searchValue: string) {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(searchValue)}&entity=podcast`;

  
    return this.httpService.get(url).pipe(
      map(response => response.data.results.map((track: any) => ({
        collectionId: track.collectionId,
        trackName: track.trackName,
        artworkUrl30: track.artworkUrl30
      })
      ))
    );
   }
  }

