import { observable } from 'mobx';
import { IStateTreeNode } from 'mobx-state-tree';

/**
 * The pagination interface.
 */
export interface IPagination {
  page: number;
  size: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

/**
 * The default pagination.
 */
const defaultPagination: IPagination = {
  page: 1,
  size: 10,
  numberOfElements: 0,
  totalElements: 0,
  totalPages: 0,
  first: true,
  last: true,
};

/**
 *
 *
 * @param instance
 * @returns
 */
export const withPagination = <T extends IStateTreeNode>(instance: T) => {
  const pagination = observable.box<IPagination>({ ...defaultPagination });

  return {
    views: {
      /**
       * Returns the observable pagination.
       */
      get pagination() {
        return pagination;
      },

      /**
       * Returns the observable pagination snapshot.
       */
      get paginationSnapshot() {
        return pagination.get();
      },

      /**
       * Returns the current page.
       */
      get page() {
        return pagination.get().page;
      },

      /**
       * Returns the current size.
       */
      get size() {
        return pagination.get().size;
      },

      /**
       * Returns the current number of elements.
       */
      get numberOfElements() {
        return pagination.get().numberOfElements;
      },

      /**
       * Returns the current total elements.
       */
      get totalElements() {
        return pagination.get().totalElements;
      },

      /**
       * Returns the current total pages.
       */
      get totalPages() {
        return pagination.get().totalPages;
      },

      /**
       * Returns true if the current page is the first page.
       */
      get first() {
        return pagination.get().first;
      },

      /**
       * Returns true if the current page is the last page.
       */
      get last() {
        return pagination.get().last;
      },
    },

    actions: {
      /**
       * Initializes the pagination.
       */
      initializePagination() {
        pagination.set({ ...defaultPagination });
      },

      /**
       * Sets the pagination.
       * @param newPagination
       */
      pagination(newPagination?: Partial<IPagination>) {
        pagination.set({ ...defaultPagination, ...newPagination });
      },

      /**
       * Sets the pagination page.
       * @param page
       */
      page(page: number) {
        pagination.set({ ...pagination.get(), page });
      },

      /**
       * Sets the pagination size.
       * @param size
       */
      size(size: number) {
        pagination.set({ ...pagination.get(), size });
      },

      /**
       * Sets the pagination number of elements.
       * @param numberOfElements
       */
      numberOfElements(numberOfElements: number) {
        pagination.set({ ...pagination.get(), numberOfElements });
      },

      /**
       * Sets the pagination total elements.
       * @param totalElements
       */
      totalElements(totalElements: number) {
        pagination.set({ ...pagination.get(), totalElements });
      },

      /**
       * Sets the pagination total pages.
       * @param totalPages
       */
      totalPages(totalPages: number) {
        pagination.set({ ...pagination.get(), totalPages });
      },

      /**
       * Sets the pagination first.
       * @param first
       */
      first(first: boolean) {
        pagination.set({ ...pagination.get(), first });
      },

      /**
       * Sets the pagination last.
       * @param last
       */
      last(last: boolean) {
        pagination.set({ ...pagination.get(), last });
      },
    },
  };
};
