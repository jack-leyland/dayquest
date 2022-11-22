import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import MainScreenLayout from '../../../common/components/MainScreenLayout';
import { ExpHistoryChart } from '../components/ExpHistoryChart';
import FlavorText from '../components/FlavorText';
import { UserSnapshotBox } from '../components/UserSnapshotBox';

export default function HomeScreen() {
  return (
    <MainScreenLayout>
      <FlavorText />
      <UserSnapshotBox />
      <ExpHistoryChart />
    </MainScreenLayout>
  );
}

const styles = StyleSheet.create({});
