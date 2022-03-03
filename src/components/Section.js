export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

// Принимает DOM-элемент и добавляет его.
  addItem(element) {
    this._containerSelector.prepend(element);
  };

// Отрисовка всех элементов.
  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element);
    })
  };
};
