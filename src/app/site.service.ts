import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Site } from './site';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

    public getSites():Observable<Site[]>{
      return this.http.get<Site[]>(`${this.apiServerUrl}/sites`);
    }
    public addSites(sites:Site[]):Observable<Site[]>{
      return this.http.post<Site[]>(`${this.apiServerUrl}/addSites`,sites);
    }
    public addSite(site:Site):Observable<Site>{
      return this.http.post<Site>(`${this.apiServerUrl}/addSite`,site);
    }
    public updateSite(site:Site):Observable<Site>{
      return this.http.put<Site>(`${this.apiServerUrl}/updateSite`,site);
    }
    public deleteSite(id:number){
      return this.http.delete(`${this.apiServerUrl}/deleteSite/${id}`,{responseType: 'text'});
    }
}
