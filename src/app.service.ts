import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import * as Parser from 'rss-parser';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AppService {
  constructor(private httpService: HttpService ) {}
  
  searchItunes(searchValue: string) {
    try{ 
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(searchValue)}&entity=podcast`;
    return this.httpService.get(url).pipe(
      map(response => response.data.results.map((track: any) => ({
        collectionId: track.collectionId,
        trackName: track.trackName,
        artworkUrl30: track.artworkUrl30,
       })
      ))
    );
      }
      catch(error){
        return "Error searching a podcast";
      }
   }

  feedUrl1: string;
  async searchForEpisodes(id: string){
   
    const url = `https://itunes.apple.com/lookup?id=${encodeURIComponent(id)}`
    
    const parser = new Parser();

    try{
      const response = await firstValueFrom(this.httpService.get(url));
      if(response.data.results.length > 0){
        this.feedUrl1 = response.data.results[0].feedUrl;

        const feed = await parser.parseURL(this.feedUrl1);
        const episodes = feed.items.map(item => ({
          title: item.title,
          episodeGuid: item.guid ?? 'No ID', 
          audioUrl: item.enclosure?.url ?? 'No Audio File',
          imageUrl: item.itunes?.image ?? 'No Image', 
          episodeNumber: item.itunes?.episode ?? 'Unknown' 
        }));
        return episodes;
      }
      else {
        return "No feedUrl with that ID"
      }
    }
     catch(error){
      return "Error retrieving or parsing feed";
    }

   }
   
  }

