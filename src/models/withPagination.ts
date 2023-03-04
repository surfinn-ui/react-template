import { observable } from 'mobx';
import { IStateTreeNode } from 'mobx-state-tree';

export interface IPagination {
  page: number;
  size: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

const defaultPagination: IPagination = {
  page: 1,
  size: 10,
  numberOfElements: 0,
  totalElements: 0,
  totalPages: 0,
  first: true,
  last: true,
};

export const withPagination = <T extends IStateTreeNode>(_store: T) => {
  const pagination = observable.box<IPagination>({ ...defaultPagination });

  return {
    views: {
      get observablePagination() {
        return pagination;
      },
      get pagination() {
        return pagination.get();
      },
      get page() {
        return pagination.get().page;
      },
      get size() {
        return pagination.get().size;
      },
      get numberOfElements() {
        return pagination.get().numberOfElements;
      },
      get totalElements() {
        return pagination.get().totalElements;
      },
      get totalPages() {
        return pagination.get().totalPages;
      },
      get first() {
        return pagination.get().first;
      },
      get last() {
        return pagination.get().last;
      },
    },

    actions: {
      initPagination() {
        pagination.set({ ...defaultPagination });
      },
      setPagination(newPagination?: Partial<IPagination>) {
        pagination.set({ ...defaultPagination, ...newPagination });
      },
      setPage(page: number) {
        pagination.set({ ...pagination.get(), page });
      },
    },
  };
};
