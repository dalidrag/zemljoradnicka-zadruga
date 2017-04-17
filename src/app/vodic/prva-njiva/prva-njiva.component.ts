import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VodicActionCreators } from '../../Redux/action-creators/vodic.action-creators';

import { ModalPopupService } from '../../deljeno/modal-popup.service';

@Component({
  selector: 'app-prva-njiva',
  templateUrl: './prva-njiva.component.html',
  styleUrls: ['./prva-njiva.component.css']
})
export class PrvaNjivaComponent implements OnInit {

  constructor(private vodicActionCreators: VodicActionCreators, private modalPopupService: ModalPopupService, private router: Router) { }

  ngOnInit() {
  	this.modalPopupService.open();
    this.modalPopupService.insertHTML(`<p>Хајде да пронађемо вашу прву њиву!</p>`);
    this.vodicActionCreators.gMapsZoom();
  }

  njivaDodata(dodata: boolean) {
  	if (dodata)
      this.router.navigate(['/kontrolna-tabla'], { queryParams: { vodic: 'true' } });
  }

}
