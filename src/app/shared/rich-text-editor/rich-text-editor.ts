import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export type ToolbarPreset = 'minimal' | 'standard' | 'full';

export const TOOLBAR_PRESETS: Record<ToolbarPreset, any[]> = {
  minimal: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean']
  ],
  standard: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    ['link', 'image'],
    ['clean']
  ],
  full: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean']
  ]
};
@Component({
  selector: 'app-rich-text-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rich-text-editor.html',
  styleUrl: './rich-text-editor.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true
    }
  ]
})

export class RichTextEditorComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

  @ViewChild('editorContainer') editorContainer!: ElementRef;
  @ViewChild('toolbarContainer') toolbarContainer!: ElementRef;
  @ViewChild('attachInput') attachInput!: ElementRef;

  // ── INPUTS ──
  @Input() placeholder   = 'Write something...';
  @Input() minHeight     = 200;
  @Input() maxHeight     = 400;
  @Input() toolbar: ToolbarPreset | any[] = 'standard';
  @Input() formControl?: FormControl;
  @Input() readOnly      = false;
  @Input() label         = '';
  @Input() required      = false;

  // ── OUTPUTS ──
  @Output() valueChange  = new EventEmitter<string>();
  @Output() editorReady  = new EventEmitter<any>();
  @Output() editorFocus  = new EventEmitter<void>();
  @Output() editorBlur   = new EventEmitter<void>();

  private quill: any = null;
  private value     = '';
  isFocused         = false;
  myContent          = '';

  // ── ControlValueAccessor ──
  private onChange: (val: string) => void = () => {};
  private onTouched: () => void           = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initQuill();
  }

  ngOnDestroy() {
    this.quill = null;
  }

  private getToolbarConfig(): any[] {
    if (Array.isArray(this.toolbar)) return this.toolbar;
    return TOOLBAR_PRESETS[this.toolbar as ToolbarPreset] ?? TOOLBAR_PRESETS.standard;
  }

  private initQuill() {
    if (typeof window === 'undefined' || !(window as any).Quill) {
      setTimeout(() => this.initQuill(), 200);
      return;
    }

    const Quill = (window as any).Quill;

    this.quill = new Quill(this.editorContainer.nativeElement, {
      theme:       'snow',
      placeholder: this.placeholder,
      readOnly:    this.readOnly,
      modules: {
        toolbar: this.toolbarContainer.nativeElement
      }
    });

    // Set initial value
    if (this.value) {
      this.quill.root.innerHTML = this.value;
    }

    // Listen for changes
    this.quill.on('text-change', () => {
      const html = this.quill.root.innerHTML === '<p><br></p>' ? '' : this.quill.root.innerHTML;
      this.value = html;
      this.onChange(html);
      this.valueChange.emit(html);
      this.cdr.markForCheck();
    });

    // Focus/blur events
    this.quill.on('selection-change', (range: any) => {
      if (range) {
        this.isFocused = true;
        this.editorFocus.emit();
      } else {
        this.isFocused = false;
        this.onTouched();
        this.editorBlur.emit();
      }
      this.cdr.markForCheck();
    });

    // Subscribe to formControl changes
    if (this.formControl) {
      this.formControl.valueChanges.subscribe(val => {
        if (val !== this.quill.root.innerHTML) {
          this.quill.root.innerHTML = val ?? '';
        }
      });
    }

    this.editorReady.emit(this.quill);
    this.cdr.markForCheck();
  }

 private setupQuill() {
  const Quill = (window as any).Quill;

  this.quill = new Quill(this.editorContainer.nativeElement, {
    theme:       'snow',
    placeholder: this.placeholder,
    readOnly:    this.readOnly,
    modules: {
      toolbar: this.toolbarContainer.nativeElement
    }
  });

  if (this.value) {
    this.quill.root.innerHTML = this.value;
  }

  this.quill.on('text-change', () => {
    const html = this.quill.root.innerHTML === '<p><br></p>' ? '' : this.quill.root.innerHTML;
    this.value = html;
    this.onChange(html);
    this.valueChange.emit(html);
    this.cdr.markForCheck();
  });

  this.quill.on('selection-change', (range: any) => {
    if (range) {
      this.isFocused = true;
      this.editorFocus.emit();
    } else {
      this.isFocused = false;
      this.onTouched();
      this.editorBlur.emit();
    }
    this.cdr.markForCheck();
  });

  if (this.formControl) {
    this.formControl.valueChanges.subscribe(val => {
      if (val !== this.quill.root.innerHTML) {
        this.quill.root.innerHTML = val ?? '';
      }
    });
  }

  this.editorReady.emit(this.quill);
  this.cdr.markForCheck();
}

  // ── ControlValueAccessor methods ──
  writeValue(value: string): void {
    this.value = value ?? '';
    if (this.quill) {
      const current = this.quill.root.innerHTML;
      if (current !== this.value) {
        this.quill.root.innerHTML = this.value;
      }
    }
  }

  registerOnChange(fn: (val: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void           { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    if (this.quill) {
      this.quill.enable(!isDisabled);
    }
  }

  // ── Public API ──
  getValue(): string    { return this.quill?.root.innerHTML ?? ''; }
  clear(): void         { if (this.quill) { this.quill.setText(''); } }
  focus(): void         { this.quill?.focus(); }
  getQuill(): any       { return this.quill; }

  getToolbarItems(): any[] { return this.getToolbarConfig(); }
  isFullPreset(): boolean  { return this.toolbar === 'full'; }
  isMinimalPreset(): boolean { return this.toolbar === 'minimal'; }
}
