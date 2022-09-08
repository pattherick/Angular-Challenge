import { Component, Input } from '@angular/core';
import { IPreparedIFhirPatient, IPreparedIFhirPractitioner } from '@red-probeaufgabe/types';

@Component({
  selector: 'app-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss'],
})
export class DetailCardComponent {
  @Input() item: IPreparedIFhirPatient | IPreparedIFhirPractitioner;

  get isPatient() {
    return this.item && this.item.resourceType === 'Patient';
  }
}
