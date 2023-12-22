import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HighlightDirective } from './highlight.directive';
import { PreventLinkDirective } from './prevent-link.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HighlightDirective, PreventLinkDirective],
  template: `
    <h1>Decouverte des directives d'attributs</h1>
    <p highlight bg-color="blue" default-color="orange">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, molestiae fugiat eum enim iure placeat obcaecati ex velit amet nulla! Fugit sint earum unde dolorum voluptates commodi laudantium a dolores.</p>
    <p highlight>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, molestiae fugiat eum enim iure placeat obcaecati ex velit amet nulla! Fugit sint earum unde dolorum voluptates commodi laudantium a dolores.</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus, molestiae fugiat eum enim iure placeat obcaecati ex velit amet nulla! Fugit sint earum unde dolorum voluptates commodi laudantium a dolores.</p>
    <a href="https://exemple.com" no-open>Cliquez ici</a>
`,
  styles: []
})
export class AppComponent {}
