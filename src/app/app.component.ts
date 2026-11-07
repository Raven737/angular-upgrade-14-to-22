import { Component } from '@angular/core';
import { VERSION } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatListItemIcon, MatListItemTitle, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
      RouterLink, RouterLinkActive, RouterOutlet, MatToolbar, MatSidenavContainer, MatSidenav,
      MatSidenavContent, MatNavList, MatListItem, MatListItemIcon, MatListItemTitle, MatIcon
    ]
})
export class AppComponent {
  title = 'Team Tasks';
  angularVersion = VERSION.full;
}
