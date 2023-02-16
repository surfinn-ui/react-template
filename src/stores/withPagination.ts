import { observable } from 'mobx';
import { IStateTreeNode } from 'mobx-state-tree';

export interface IPagination {
  currentPage: number;
  totalPages: number;
  rowCount: number;
  totalCount: number;
}

const defaultPagination: IPagination = {
  currentPage: 1,
  totalPages: 0,
  rowCount: 10,
  totalCount: 0,
};

export const withPagination = <T extends IStateTreeNode>(_store: T) => {
  const pagination = observable.box<IPagination>({ ...defaultPagination });

  return {
    views: {
      get pagination() {
        return pagination.get();
      },
    },

    actions: {
      setPagination(newPagination?: IPagination) {
        if (newPagination) {
          pagination.set(newPagination);
        } else {
          pagination.set({ ...defaultPagination });
        }
      },
      updatePagination(newPagination: Partial<IPagination>) {
        pagination.set({
          ...pagination.get(),
          ...newPagination,
        });
      },
    },
  };
};
