import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { ModalView } from '../../../common/components/Themed';
import Colors from '../../../common/constants/Colors';
import { AppState, selectActiveUser } from '../../../app/appSlice';
import {
  ThonburiRegular,
  ThonburiBold,
} from '../../../common/components/StyledText';
import { BottomTabParamList } from '../../../common/navigation/types';
import { useEffect, useState } from 'react';

export function UserSnapshotBox() {
  const activeUser: AppState['activeUser'] = useSelector(selectActiveUser);
  const navigation: NavigationProp<BottomTabParamList> = useNavigation();
  if (!activeUser) {
    return null;
  } else {
    return (
      <TouchableOpacity
        onPressOut={() => {
          navigation.navigate('Stats');
        }}
      >
        <ModalView style={styles.container}>
          <View style={styles.content}>
            <View style={styles.profilePicture}></View>
            <View style={styles.textBox}>
              <ThonburiRegular numberOfLines={1} ellipsizeMode={'tail'}>
                {activeUser?.username}
              </ThonburiRegular>
            </View>
            <View style={styles.levelBox}>
              <View style={styles.level}>
                <ThonburiRegular>lvl</ThonburiRegular>
              </View>
              <View style={styles.level}>
                <ThonburiBold
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={{ fontSize: 33, color: Colors.common.richGreen }}
                >
                  {activeUser?.level}
                </ThonburiBold>
              </View>
            </View>
          </View>
        </ModalView>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    borderRadius: 16,
    padding: 10,
    marginBottom: 10,
  },
  content: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textBox: {
    height: '100%',
    justifyContent: 'center',
    flexGrow: 1,
    flex: 1,
    overflow: 'hidden',
    marginRight: 10,
  },
  profilePicture: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.common.brightYellow,
    backgroundColor: Colors.common.richGreen,
  },
  levelBox: {
    height: '100%',
    flexDirection: 'row',
  },
  level: {
    height: '100%',
    flexDirection: 'column-reverse',
  },
});
