import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoHeight]'
})
export class AutoHeightDirective {

  @Input() setMaxHeight: boolean;

  constructor(private el: ElementRef) {
    this.updateContainerOnViewChangeHeight();
  }

  updateContainerOnViewChangeHeight(): void {
    setTimeout(() => this.updateContainerHeight(), 10);
    window.onresize = () => {
      setTimeout(() => this.updateContainerHeight(), 10);
    };
  }

  updateContainerHeight(): void {
    const screenHeight = window.innerHeight;

    let headerHeight = document.querySelector('header .cclHeader').clientHeight;
    if (headerHeight < 50) {
      headerHeight = 115;
    }

    const breadcrumb = document.querySelector('#content .cclBreadcrumb');
    let breadcrumbHeight = 0;
    if (breadcrumb) {
      const breadcrumbStyle = window.getComputedStyle(breadcrumb);
      breadcrumbHeight = breadcrumb.clientHeight +
        parseFloat(breadcrumbStyle.borderTopWidth) +
        parseFloat(breadcrumbStyle.borderBottomWidth);
    }

    if (!breadcrumbHeight) {
      breadcrumbHeight = 0;
    }

    let footerHeight = document.querySelector('footer .cclFooter').clientHeight;
    if (!footerHeight) {
      footerHeight = 0;
    }

    const contentHeight = screenHeight - (headerHeight + breadcrumbHeight + footerHeight);
    if (this.setMaxHeight) {
      this.el.nativeElement.style.maxHeight = contentHeight + 'px';
    }
    this.el.nativeElement.style.minHeight = contentHeight + 'px';

    // const wrappers = document.querySelectorAll('.contentWrapper') as HTMLCollectionOf<HTMLElement>;
    // Array.from(wrappers).forEach((ele, index) => {
    //   ele.style.minHeight = (contentHeight) + 'px';
    // });
  }
}
