import { ModalView } from '../../../common/components/Themed';
import { LayoutRectangle, StyleSheet, View } from 'react-native';

import {
  ThonburiBold,
  ThonburiLight,
} from '../../../common/components/StyledText';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveUser } from '../../../app/appSlice';
import { ExpHistoryRecord, LevelExpParams } from '../../../app/types';
import { getLevelExpParams, getSortedExpHistory } from '../queries';
import { VictoryBar, VictoryAxis, VictoryChart } from 'victory-native';
import Colors from '../../../common/constants/Colors';
import useColorScheme from '../../../common/hooks/useColorScheme';
import { selectExpHistory, setExpHistory } from '../homeSlice';

type ChartDataObject = {
  x: number;
  y: number;
  fill: string;
};

type ChartData = {
  data: Array<ChartDataObject>;
  maxY: number;
  minY: number;
  tickValues: Array<string>;
};

// Change this to set maximum amount of days of history to show in chart
const MAX_HISTORY_DAYS = 20;

const intialChartData: ChartData = {
  data: Array.apply(MAX_HISTORY_DAYS).map((v, i) => {
    return {
      x: i,
      y: 0,
      fill: '#fff',
    };
  }),
  maxY: 0,
  minY: 0,
  tickValues: [],
};

export function ExpHistoryChart() {
  const [showChart, setShowChart] = useState<boolean>(false);
  const [expParams, setExpParams] = useState<LevelExpParams | null>(null);
  const [chartContainerLayout, setChartContainerLayout] =
    useState<LayoutRectangle | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(intialChartData);

  const dispatch = useDispatch();
  const activeUser = useSelector(selectActiveUser);
  const expHistory = useSelector(selectExpHistory);
  const theme = useColorScheme();

  useEffect(() => {
    if (activeUser) {
      getLevelExpParams(activeUser.level + 1)
        .then((params) => {
          setExpParams(params);
        })
        .catch((err) => {
          console.log(err);
        });
      getSortedExpHistory(MAX_HISTORY_DAYS)
        .then((records) => {
          dispatch(setExpHistory(records));
          setChartData(calculateChartDate(records));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [activeUser]);

  const calculateChartDate = (records: Array<ExpHistoryRecord>) => {
    let data: Array<ChartDataObject> = [];
    let tickValues: Array<string> = [];
    let max: number = 0;
    let min: number = Infinity;

    records.forEach((record, i) => {
      if (record.expChange > max) {
        max = record.expChange;
      }
      if (record.expChange < min) {
        min = record.expChange;
      }
      data.push({
        x: i + 1,
        y: record.expChange,
        fill:
          record.expChange > 0 ? Colors.common.richGreen : Colors.common.red,
      });
      tickValues.push(
        `${new Date(record.timestamp).getMonth() + 1}-${new Date(
          record.timestamp
        ).getDate()}`
      );
    });

    return {
      data: data,
      maxY: max,
      minY: min,
      tickValues: tickValues,
    };
  };

  useEffect(() => {
    if (expHistory && expParams) {
      setShowChart(true);
    }
  }, [expHistory, expParams, chartContainerLayout]);

  return (
    <ModalView style={styles.container}>
      {showChart && (
        <>
          <View style={styles.title}>
            <ThonburiBold>Daily Experience Summary</ThonburiBold>
          </View>
          {chartData && (
            <View
              style={styles.chart}
              onLayout={(event) => {
                setChartContainerLayout(event.nativeEvent.layout);
              }}
            >
              <VictoryChart
                domain={{
                  x: [0, MAX_HISTORY_DAYS + 1],
                  y: [chartData.minY, chartData.maxY],
                }}
                padding={10}
                height={chartContainerLayout?.height}
                width={chartContainerLayout?.width}
              >
                <VictoryBar
                  barWidth={7}
                  alignment="middle"
                  cornerRadius={{ topLeft: 4, topRight: 4 }}
                  data={chartData.data}
                  style={{
                    data: {
                      fill: ({ datum }) => datum.fill,
                    },
                  }}
                  animate={{
                    onEnter: {
                      duration: 1000,
                    },
                  }}
                />
                <VictoryAxis
                  tickCount={MAX_HISTORY_DAYS + 2}
                  tickValues={chartData.tickValues}
                  tickFormat={(t, i, ticks) => {
                    if (i !== 0 && i !== ticks.length - 1) {
                      return '';
                    } else {
                      return t;
                    }
                  }}
                  invertAxis
                  style={{
                    axis: {
                      stroke: Colors[theme].text,
                      strokeWidth: 2,
                    },
                    tickLabels: {
                      fill: Colors[theme].text,
                    },
                  }}
                />
              </VictoryChart>
            </View>
          )}

          <View style={styles.subTitle}>
            <ThonburiLight style={{ fontSize: 12 }}>
              {expParams &&
                activeUser &&
                expParams?.expNeeded -
                  activeUser?.exp +
                  ' to lvl ' +
                  expParams.level}
            </ThonburiLight>
          </View>
        </>
      )}
    </ModalView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    padding: 5,
    paddingHorizontal: 10,
  },
  chart: {
    height: '80%',
    width: '100%',
    overflow: 'hidden',
  },
  title: {
    width: '100%',
    height: '10%',
  },
  subTitle: {
    width: '100%',
    height: '10%',
    alignItems: 'flex-end',
  },
});
