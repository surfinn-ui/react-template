import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageHeaderView, IPageHeaderViewProps } from './PageHeaderView';

/**
 * Describe your component properties here
 */
export interface IPageHeaderProps {
  title: string;
  onBack?: () => void;
}

/**
 * Describe your component here
 */
export const PageHeader = observer(({ onBack, ...props }: IPageHeaderProps) => {
  const navigate = useNavigate();

  const handleOnBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const viewProps = useMemo<IPageHeaderViewProps>(
    () => ({
      onBack: handleOnBack,
      ...props,
    }),
    [props],
  );

  return <PageHeaderView {...viewProps} />;
});

PageHeader.displayName = 'PageHeader_Component';
