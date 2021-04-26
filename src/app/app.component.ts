import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comic } from './Comic';
import { ComicService } from './comic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
title: String = "";
public comics:Comic[];
public editComic: Comic;
  public deleteComic: Comic;
constructor(private comicService:ComicService) { }

ngOnInit(){
  this.getComics();
}


public getComics(): void {
  this.comicService.getComics().subscribe(
    (response: Comic[]) => {
      this.comics = response;
      console.log(this.comics);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
public onAddComic(addForm: NgForm): void {
  document.getElementById('add-comic-form').click();
  this.comicService.addComic(addForm.value).subscribe(
    (response: Comic) => {
      console.log(response);
      this.getComics();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  );
}

public onUpdateComic(comic: Comic): void {
  this.comicService.updateComic(comic).subscribe(
    (response: Comic) => {
      console.log(response);
      this.getComics();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onDeleteComic(comicId: number): void {
  this.comicService.deleteComic(comicId).subscribe(
    (response: void) => {
      console.log(response);
      this.getComics();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public searchComics(key: string): void {
  console.log(key);
  const results: Comic[] = [];
  for (const comic of this.comics) {
    if (comic.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
    || comic.author.toLowerCase().indexOf(key.toLowerCase()) !== -1)
    {
      results.push(comic);
    }
  }
  this.comics = results;
  if (results.length === 0 || !key) {
    this.getComics();
  }
}

public onOpenModal(comic: Comic, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addComicModal');
  }
  if (mode === 'edit') {
    this.editComic = comic;
    button.setAttribute('data-target', '#updateComicModal');
  }
  if (mode === 'delete') {
    this.deleteComic = comic;
    button.setAttribute('data-target', '#deleteComicModal');
  }
  container.appendChild(button);
  button.click();
}


}
