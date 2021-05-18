import { Component,OnInit } from '@angular/core';
import { Site } from './site';
import { SiteService } from './site.service';
import { HttpErrorResponse } from '@angular/common/http'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public sites: Site[] = [];
  public editSite: Site | undefined;
  constructor(private siteService:SiteService){

  }
  ngOnInit(): void {
    this.getSites();
  }
  public getSites():void{
    this.siteService.getSites().subscribe(
      (response:Site[])=>{
        this.sites=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  public onOpenModal( mode:string,site?: Site):void{
    console.log('clicked');
    const container=document.getElementById('main-container');
    const button= document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if (mode=='add'){
      button.setAttribute('data-target','#addModal');

    }
    if (mode=='edit'){
      this.editSite=site;
      button.setAttribute('data-target','#editModal');

    }
    if (mode=='delete'){
      this.editSite=site;
      button.setAttribute('data-target','#deleteModal');

    }
    if (mode=='consult'){
      this.editSite=site;
      button.setAttribute('data-target','#consultModal');

    }
    container?.appendChild(button);
    button.click();
  }

  public onEditSite(site:Site):void  {
    this.siteService.updateSite(site).subscribe(
      (response: Site) => {
        console.log(response);
        this.getSites();

      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );

  }
  public onAddSite(addForm:NgForm):void  {
    document.getElementById("addClose")?.click();
    console.log(addForm.value);
    this.siteService.addSite(addForm.value).subscribe(
      (response: Site) => {
        console.log(response);
        this.getSites();
        addForm.reset();

      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    );

  }
  public onDeleteSite(id:number):void  {
    document.getElementById("deleteClose")?.click();
    this.siteService.deleteSite(id).subscribe(
      (response: string) => {
        console.log(response);
        this.getSites();

      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );


  }
  public onConsultSite(addForm:NgForm):void  {

  }


}
