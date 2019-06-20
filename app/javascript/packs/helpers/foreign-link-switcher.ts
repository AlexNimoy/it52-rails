export class ForeignLinkSwitcher {
  private static instance: ForeignLinkSwitcher;
  private static initPage = location.href;

  foreignLinkCheckbox   = document.getElementById('has_foreign_link')       as HTMLInputElement
  foreignLinkSwitchedEl = document.getElementById('event_foreign_link_box') as HTMLDivElement
  foreignLinkInput      = document.getElementById('event_foreign_link')     as HTMLInputElement

  static init() {
      if (!ForeignLinkSwitcher.instance || ForeignLinkSwitcher.initPage != location.href ) {
          ForeignLinkSwitcher.initPage = location.href;
          ForeignLinkSwitcher.instance = new ForeignLinkSwitcher();
      }
      return ForeignLinkSwitcher.instance;
  }

  get isChecked(): boolean {
    return this.foreignLinkCheckbox.checked
  }

  private constructor() {
    if (this.isChecked) this.foreignLinkSwitchedEl.classList.remove('hidden')
    this.bindEvents()
  }

  bindEvents() {
    this.foreignLinkCheckbox.addEventListener('change', (_event) => {
      this.foreignLinkSwitchedEl.classList.toggle('hidden')
      if (!this.isChecked) {
        this.foreignLinkInput.value = ''
        this.foreignLinkInput.setAttribute('disable', 'disabled')
      } else {
        this.foreignLinkInput.removeAttribute('disabled');
      }
    })

    document.addEventListener('turbolinks:request-start', (_e) => ForeignLinkSwitcher.initPage = null)
  }
}
