import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import StatisticOne from '../components/home/StatisticOne';
import StatisticTwo from '../components/home/StatisticTwo';
import StatisticThree from '../components/home/StatisticThree';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Statistic 1',
    children: <StatisticOne />,
  },
  {
    key: '2',
    label: 'Statistic 2',
    children:<StatisticTwo />,
  },
  {
    key: '3',
    label: 'Statistic 3',
    children: <StatisticThree />,
  },
];

const HomePage: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default HomePage;