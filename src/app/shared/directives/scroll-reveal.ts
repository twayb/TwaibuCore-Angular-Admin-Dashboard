import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]'
})
export class ScrollRevealDirective implements OnInit, OnDestroy {

 // Pass the visible class name e.g. "oas-visible" | "cp-visible" | "ts-visible"
  @Input() revealClass = 'visible';

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(this.revealClass);
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all .reveal elements inside this host
    const reveals = this.el.nativeElement.querySelectorAll('[class*="-reveal"]');
    reveals.forEach((el: Element) => this.observer.observe(el));
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

}
