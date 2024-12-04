'use client';
import { createChooseMetricsModel } from '../model/choose-metrics.model';
import { ChooseMetrics } from './choose-metrics';

type Props = {
  className?: string;
};

const chooseMetricsModel = createChooseMetricsModel();

export const Metrics = (props: Props) => {
  const { className } = props;
  return (
    <div className={className}>
      <ChooseMetrics model={chooseMetricsModel} />
    </div>
  );
};
