import { observable } from 'mobx';
import { IStateTreeNode } from 'mobx-state-tree';

export interface IPagination {
  currentPage: number;
  totalPages: number;
  rowCount: number;
  totalCount: number;
}

export const withPagination = <T extends IStateTreeNode>(_store: T) => {
  const pagination = observable.box<IPagination>({
    currentPage: 1,
    totalPages: 1,
    rowCount: 0,
    totalCount: 0,
  });

  return {
    views: {
      get pagination() {
        return pagination.get();
      },
    },

    actions: {
      setPagination(newPagination?: IPagination) {
        if (newPagination){
          pagination.set(newPagination);
        } else {
          pagination.set({
            currentPage: 1,
            totalPages: 1,
            rowCount: 0,
            totalCount: 0,
          });
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
