import icons from '../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  //
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Pagation helper shortcut
    const next = +1;
    const back = -1;
    const _generateMarkupButton = (acc, curPage) => {
      return `<button data-goto="${
        curPage + acc
      }" class="btn--inline pagination__btn--${acc === +1 ? 'next' : 'prev'}">
      ${
        acc === +1 ? `<span>Page ${curPage + acc}</span>` : ''
      }<svg class="search__icon"><use href="${icons}#icon-arrow-${
        acc === +1 ? 'right' : 'left'
      }"></use>
      </svg>
      ${acc === -1 ? `<span>Page ${curPage + acc}</span>` : ''}</button>
      `;
    };

    //Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return _generateMarkupButton(next, curPage);
    }

    //Last Page
    if (curPage === numPages && numPages > 1) {
      return _generateMarkupButton(back, curPage);
    }
    //Other Page
    if (curPage < numPages) {
      return [
        _generateMarkupButton(back, curPage),
        _generateMarkupButton(next, curPage),
      ];
    }
    //Page 1, an there are NO other pages
    return '';
  }
}

export default new PaginationView();
