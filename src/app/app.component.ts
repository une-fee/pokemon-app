import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  pokemonList: any[] = [];
  selectedPokemon: any;
  p: number=1;
  itemsPerPage: number=6;
  searchText: any;

  constructor(private http: HttpClient) {
    this.getPokemonList().subscribe((data: any) => {
      data.results.forEach((result: any) => {
        this.getPokemonDetails(result.url).subscribe((details: any) => {
          const pokemon = {
            name: details.name,
            imageUrl: details.sprites.front_default,
            height: details.height,
            weight: details.weight,
            abilities: details.abilities.map((ability: any) => ability.ability.name)
          };
          this.pokemonList.push(pokemon);
        });
      });
    });
  }

  getPokemonList(): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=1000`;
    return this.http.get(url);
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get(url);
  }

  showDetails(pokemon: any): void {
    this.selectedPokemon = pokemon;
  }
}