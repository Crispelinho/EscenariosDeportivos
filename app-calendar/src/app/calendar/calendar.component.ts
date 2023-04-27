import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/angular'; // useful for typechecking
import { icalendarApi } from './calendar';
import { CalendarService } from './services/calendar.service';
import {NgbModal, ModalDismissReasons, NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
/* import { MessageService } from '../message.service' */


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public calendarOptions: CalendarOptions = null;
  public closeResult:string = '';
  
  public array_tipo_id:Array<Object> = [
    {id: 1, nombre: "CC"},
    {id: 2, nombre: "TI"},
    {id: 3, nombre: "PA"}
  ];
  public configTipoId:Object = null;

  public array_sexo:Array<Object> = [
    {id: 1, nombre: "Masculino"},
    {id: 2, nombre: "Femenino"},
    {id: 3, nombre: "Otro"}
  ];
  public configSexo:Object = null;
  
  public array_tiposolicitante:Array<Object> = null;
  public configtiposolicitante:Object = null;
  
  public array_discapacidad:Array<Object> = null;
  public configdiscapacidad:Object = null;
  
  public array_escenario:Array<Object> = null;
  public configescenario:Object = null;

  public array_tipoevento:Array<Object> = null;
  public configtipoevento:Object = null;

  public array_actividaddeportiva:Array<Object> = null;
  public configactividaddeportiva:Object = null;

  public array_eventodeportivo:Array<Object> = null;
  public configeventodeportivo:Object = null;

  private hoy:string = this.formatDateDjango();
  private imgdefault:string = 'https://ec.europa.eu/eurostat/documents/6921402/9104237/Shutterstock_Lisa_Kolbasa.png/f988f8b6-4138-4a91-9761-885bacab0ce2?t=1533725002000';

  public formControlCalendar:UntypedFormGroup = new UntypedFormGroup({
    nombre: new UntypedFormControl('', Validators.compose([Validators.required])),
    cedula: new UntypedFormControl('', Validators.compose([Validators.required])),
    direccion: new UntypedFormControl('', Validators.compose([Validators.required])),
    barrio: new UntypedFormControl('', Validators.compose([Validators.required])),
    correo: new UntypedFormControl('', Validators.compose([Validators.required, Validators.email])),
    tipoidentificacion: new UntypedFormControl('', Validators.compose([Validators.required])),
    telefono: new UntypedFormControl('', Validators.compose([Validators.pattern('^[0-9]*$')])),
    sexo: new UntypedFormControl(null),
    adjuntocedula: new UntypedFormControl(this.imgdefault),
    adjuntorut: new UntypedFormControl(this.imgdefault),
    descripcion: new UntypedFormControl(null),
    fecha_inicio: new UntypedFormControl(this.hoy, {validators: [Validators.required, DateTimeValidator]}),
    fecha_vencimiento: new UntypedFormControl(this.hoy, {validators: [Validators.required, DateTimeValidator]}),
    estado: new UntypedFormControl(1, Validators.compose([Validators.required])),
    tiposolicitante: new UntypedFormControl(null, Validators.compose([Validators.required])),
    discapacidad: new UntypedFormControl(null, Validators.compose([Validators.required])),
    escenario: new UntypedFormControl(null, Validators.compose([Validators.required])),
    tipoevento: new UntypedFormControl(null, Validators.compose([Validators.required])),
    actividaddeportiva: new UntypedFormControl(null, Validators.compose([Validators.required])),
    eventodeportivo: new UntypedFormControl(null, Validators.compose([Validators.required])),
    check: new UntypedFormControl('', Validators.requiredTrue)
  }, { updateOn: 'change' });

  public hoveredDate: NgbDate | null = null;
  public fromDate: NgbDate;
  public toDate: NgbDate | null = null;
  private imgFormCurrent:string = '';
  
  constructor(
    private calendarService:CalendarService,
    private modalService: NgbModal,
    /* private messageService: MessageService, */
    private calendar: NgbCalendar
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {
    this.iniciarVariables();
    this.loadCalendar();
  }

  iniciarVariables(){
    this.configTipoId = {
      displayKey: 'nombre',
      height: '250px',
      placeholder: 'Tipo de identificacion',
      customComparator: () => {},
      moreText: 'more',
      noResultsFound: 'No se encontraron resultados',
      searchPlaceholder: 'Buscar...',
      searchOnKey: 'nombre',
      clearOnSelection: false
    };
    this.configSexo = {
      displayKey: 'nombre',
      height: '250px',
      placeholder: 'Genero',
      customComparator: () => {},
      moreText: 'more',
      noResultsFound: 'No se encontraron resultados',
      searchPlaceholder: 'Buscar...',
      searchOnKey: 'nombre',
      clearOnSelection: false
    };
    this.getTipoSolicitantes();
    this.getDiscapacidad();
    this.getEscenario();
    this.getTipoEvento();
    this.getActividadDeportiva();
    this.getEventoDeportivo();
  }

  getTipoSolicitantes(){
    this.array_tiposolicitante = null;
    this.configtiposolicitante = null;
    this.calendarService.getTipoSolicitantes()
    .subscribe((data:Array<object>) =>{
      this.array_tiposolicitante = data;
      this.configtiposolicitante = {
        displayKey: 'nombre',
        height: '250px',
        search: true,
        placeholder: 'Tipo de solicitante',
        customComparator: () => {},
        moreText: 'more',
        noResultsFound: 'No se encontraron resultados',
        searchPlaceholder: 'Buscar...',
        searchOnKey: 'nombre',
        clearOnSelection: false
      };
    });
  }

  getDiscapacidad(){
    this.array_discapacidad = null;
    this.configdiscapacidad = null;
    this.calendarService.getDiscapacidad()
    .subscribe((data:Array<object>) =>{
      this.array_discapacidad = data;
      this.configdiscapacidad = {
        displayKey: 'nombre',
        height: '250px',
        search: true,
        placeholder: 'Discapacidad',
        customComparator: () => {},
        moreText: 'more',
        noResultsFound: 'No se encontraron resultados',
        searchPlaceholder: 'Buscar...',
        searchOnKey: 'nombre',
        clearOnSelection: false
      };
    });
  }

  getEscenario(){
    this.array_escenario = null;
    this.configescenario = null;
    this.calendarService.getEscenario()
    .subscribe((data:Array<object>) =>{
      this.array_escenario = data;
      this.configescenario = {
        displayKey: 'nombre',
        height: '250px',
        search: true,
        placeholder: 'Escenario deportivo',
        customComparator: () => {},
        moreText: 'more',
        noResultsFound: 'No se encontraron resultados',
        searchPlaceholder: 'Buscar...',
        searchOnKey: 'nombre',
        clearOnSelection: false
      };
    });
  }

  getTipoEvento(){
    this.array_tipoevento = null;
    this.configtipoevento = null;
    this.calendarService.getTipoEvento()
    .subscribe((data:Array<object>) =>{
      this.array_tipoevento = data;
      this.configtipoevento = {
        displayKey: 'nombre',
        height: '250px',
        search: true,
        placeholder: 'Evento deportivo',
        customComparator: () => {},
        moreText: 'more',
        noResultsFound: 'No se encontraron resultados',
        searchPlaceholder: 'Buscar...',
        searchOnKey: 'nombre',
        clearOnSelection: false
      };
    });
  }

  getActividadDeportiva(){
    this.array_actividaddeportiva = null;
    this.configactividaddeportiva = null;
    this.calendarService.getActividadDeportiva()
    .subscribe((data:Array<object>) =>{
      this.array_actividaddeportiva = data;
      this.configactividaddeportiva = {
        displayKey: 'nombre',
        height: '250px',
        search: true,
        placeholder: 'Actividad deportiva',
        customComparator: () => {},
        moreText: 'more',
        noResultsFound: 'No se encontraron resultados',
        searchPlaceholder: 'Buscar...',
        searchOnKey: 'nombre',
        clearOnSelection: false
      };
    });
  }

  getEventoDeportivo(){
    this.array_eventodeportivo = null;
    this.configeventodeportivo = null;
    this.calendarService.getEventoDeportivo()
    .subscribe((data:Array<object>) =>{
      this.array_eventodeportivo = data;
      this.configeventodeportivo = {
        displayKey: 'nombre',
        height: '250px',
        search: true,
        placeholder: 'Regimen',
        customComparator: () => {},
        moreText: 'more',
        noResultsFound: 'No se encontraron resultados',
        searchPlaceholder: 'Buscar...',
        searchOnKey: 'nombre',
        clearOnSelection: false
      };
    });
  }

  loadCalendar(){
    this.calendarService.getEvents()
    .subscribe((data:Array<icalendarApi>) =>{
      data.map(item=>{
        item.start = item.fecha_inicio;
        item.end = item.fecha_vencimiento;
        item.title = item.nombre;
        return item;
      })
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this), // bind is important!
        events: data
      };
    });
  }

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  enviarEvento(){
    if(this.formControlCalendar.invalid){
      return alert('Completar todos los campos');
    }
    
    let dataenviar = this.formControlCalendar.getRawValue();

    if(!dataenviar.check) return alert('Por favor acepta las políticas de tratamiento de datos.');

    dataenviar.tipoidentificacion = dataenviar.tipoidentificacion.nombre;
    dataenviar.sexo = dataenviar.sexo.nombre;
    dataenviar.tiposolicitante = dataenviar.tiposolicitante.id;
    dataenviar.discapacidad = dataenviar.discapacidad.id;
    dataenviar.escenario = dataenviar.escenario.id;
    dataenviar.tipoevento = dataenviar.tipoevento.id;
    dataenviar.actividaddeportiva = dataenviar.actividaddeportiva.id;
    dataenviar.eventodeportivo = dataenviar.eventodeportivo.id;
    dataenviar.adjuntocedula != this.imgdefault ? dataenviar.adjuntocedula : null;
    dataenviar.adjuntorut != this.imgdefault ? dataenviar.adjuntorut : null;

    this.calendarService.setEvent(dataenviar)
    .subscribe(request => {
      this.loadCalendar();
    });
    return alert('SOLICITUD DE PRERESERVA REALIZADA CON  ÉXITO CONSULTE EN 15 DIAS HÁBILES CON SU NÚMERO DE CEDULA.');
    /* this.messageService.openSnackBar(`SOLICITUD DE PRERESERVA REALIZADA CON  ÉXITO CONSULTE EN 15 DIAS HÁBILES CON SU NÚMERO DE CEDULA.`, `Aceptar`); */
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result
    .then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  handleInputChange(e, form:string) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.imgFormCurrent = form;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.formControlCalendar.get(`${this.imgFormCurrent}`).setValue(reader.result);
    this.formControlCalendar.get(`${this.imgFormCurrent}`).updateValueAndValidity();
  }

  formatDateDjango() {
    let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    let fecha = [year, month, day].join('-');
    return fecha+'T'+d.toTimeString().split(' ')[0]+'.'+d.getMilliseconds()
  }

}

export const DateTimeValidator = (fc: UntypedFormControl) => {
  const date = new Date(fc.value);
  const isValid = !isNaN(date.valueOf());
  return isValid ? null : {
      isValid: {
          valid: false
      }
  };
};
