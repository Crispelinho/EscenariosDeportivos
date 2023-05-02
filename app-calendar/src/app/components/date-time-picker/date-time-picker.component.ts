import { Component, OnInit, Input, forwardRef, ViewChild, AfterViewInit, Injector } from "@angular/core";
import { NgbTimeStruct, NgbDateStruct, NgbPopoverConfig, NgbPopover, NgbDatepicker, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl, UntypedFormControl } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { DateTimeModel } from "./date-time.model";
import { noop } from "rxjs";
import { faCalendarWeek, faClock } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-date-time-picker",
  templateUrl: "./date-time-picker.component.html",
  styleUrls: ["./date-time-picker.component.scss"],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true
    }
  ]
})

export class DateTimePickerComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  public stringDateModel: string = new Date().toString();
  public faCalendarWeek = faCalendarWeek;
  public faClock = faClock;

  @Input() public dateString!: string;
  @Input() public inputDatetimeFormat = "M/d/yyyy H:mm:ss";
  @Input() public hourStep = 1;
  @Input() public minuteStep = 15;
  @Input() public secondStep = 30;
  @Input() public seconds = true;

  @Input() public disabled = false;

  public showTimePickerToggle = false;

  public datetime: DateTimeModel = new DateTimeModel();
  private firstTimeAssign = true;

  // @ViewChild(NgbDatepicker, { static: true })
  // private dp: NgbDatepicker;

  @ViewChild(NgbPopover, { static: true })
  private popover!: NgbPopover;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  public ngControl!: NgControl;

  constructor(private config: NgbPopoverConfig, private inj: Injector) {
    config.autoClose = "outside";
    config.placement = "auto";
  }

  ngOnInit(): void {
    this.ngControl = this.inj.get(NgControl);
  }

  ngAfterViewInit(): void {
    this.popover.hidden.subscribe($event => {
      this.showTimePickerToggle = false;
    });
  }

  writeValue(newModel: string) {
    if (newModel) {
      this.datetime = Object.assign(
        this.datetime,
        DateTimeModel.fromLocalString(newModel)
      );
      this.dateString = newModel;
      this.setDateStringModel();
    } else {
      this.datetime = new DateTimeModel();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleDateTimeState($event:any) {
    this.showTimePickerToggle = !this.showTimePickerToggle;
    $event.stopPropagation();
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange($event: any) {
    console.log('entre en onInputChange')
    const value = $event.target.value;
    const dt = DateTimeModel.fromLocalString(value);

    if (dt) {
      console.log('dt', dt);
      this.datetime = dt;
      this.setDateStringModel();
    } else if (value.trim() === "") {
      this.datetime = new DateTimeModel();
      this.dateString = "";
      console.log('this.dateString', this.dateString);
      this.onChange(this.dateString);
    } else {
      console.log('value', value);
      this.onChange(value);
    }
  }

  onDateChange($event: string | NgbDateStruct, dp: NgbDatepicker) {
    const date = new DateTimeModel($event);

    if (!date) {
      this.dateString = this.dateString;
      return;
    }

    if (!this.datetime) {
      this.datetime = date;
    }

    this.datetime.year = date.year;
    this.datetime.month = date.month;
    this.datetime.day = date.day;

    const adjustedDate = new Date(this.datetime.toString());
    if (this.datetime.timeZoneOffset !== adjustedDate.getTimezoneOffset()) {
      this.datetime.timeZoneOffset = adjustedDate.getTimezoneOffset();
    }

    this.setDateStringModel();
  }

  onTimeChange(event: NgbTimeStruct) {
    this.datetime.hour = event.hour;
    this.datetime.minute = event.minute;
    this.datetime.second = event.second;

    this.setDateStringModel();
  }

  setDateStringModel() {
    this.dateString = this.datetime.toString();
    if (!this.firstTimeAssign) {
      this.onChange(this.dateString);
    } else {
      // Skip very first assignment to null done by Angular
      if (this.dateString !== null) {
        this.firstTimeAssign = false;
      }
    }
  }

  inputBlur($event:any) {
    this.onTouched();
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
