import { Component, OnInit, Inject, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {ICranDataService} from '../icrandataservice';
import {CRAN_SERVICE_TOKEN} from '../cran-data.servicetoken';
import {NotificationService} from '../notification.service';
import {StatusMessageComponent} from '../status-message/status-message.component';
import {LanguageService} from '../language.service';
import {Text} from '../model/text';


@Component({
  selector: 'app-manage-text',
  templateUrl: './manage-text.component.html',
  styleUrls: ['./manage-text.component.css']
})
export class ManageTextComponent implements OnInit {

  private text: Text = new Text();
  public actionInProgress = false;
  @ViewChild('statusMessage') statusMessage: StatusMessageComponent;

  constructor(@Inject(CRAN_SERVICE_TOKEN) private cranDataService: ICranDataService,
  private router: Router,
  private activeRoute: ActivatedRoute,
  private notificationService: NotificationService,
  private ls: LanguageService) {
    this.activeRoute.paramMap.subscribe((params: ParamMap)  => {
      const id = params.get('id');
      this.handleRouteChanged(+id);
    });
  }

  ngOnInit() {
  }

  private async handleRouteChanged(id: number): Promise<void> {
    try {
      this.notificationService.emitLoading();
      this.text = await this.cranDataService.getTextDto(id);
      this.notificationService.emitDone();
    } catch (error) {
      this.notificationService.emitError(error);
    }
    this.actionInProgress = false;
  }

  private async save(): Promise<void> {
    this.actionInProgress = true;

      // save current question
      try {
        this.notificationService.emitLoading();
        if (this.text && this.text.id > 0) {
          await this.cranDataService.updateText(this.text);
          this.actionInProgress = false;
          this.statusMessage.showSaveSuccess();
        }
        this.notificationService.emitDone();
      } catch (error) {

        this.notificationService.emitError(error);
        this.actionInProgress = false;
      }
  }

}
