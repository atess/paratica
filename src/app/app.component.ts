import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AppInitService} from "./services/app-init.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "./services/auth.service";
import {GeckoService} from "./services/gecko.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'Paratica';
  serverStatus: boolean = false;
  dialogRef: MatDialogRef<any, any> | undefined;
  @ViewChild('offlineDialog') offlineDialog: TemplateRef<any> | undefined;

  constructor(private appInitService: AppInitService,
              public authService: AuthService,
              private cd: ChangeDetectorRef,
              private dialogService: MatDialog) {
  }

  ngOnInit() {
    // Sunucu yanit vermiyorsa ekranda hata gosterilir.
    this.appInitService.serverStatus$.subscribe(serverStatus => {
      this.serverStatus = serverStatus;
      this.cd.detectChanges();
    });

    this.appInitService.isConnected$.subscribe((isConnected) => {
      // Internet baglantisi kesilirse dialog icerisinde kullanici bilgilendirilir
      if (!isConnected && this.offlineDialog) {
        this.dialogRef = this.dialogService.open(this.offlineDialog, {
          maxWidth: '94%',
          width: '400px',
          disableClose: true,
        });
      } else if (this.dialogRef) {
        // Internet baglantisi geri geldiginde dialog otomatik olarak kapatilir.
        this.dialogRef.close();
      }
    });
  }
}
