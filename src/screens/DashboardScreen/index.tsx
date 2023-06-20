import React, {useContext, useEffect, useState} from 'react'
import {View, TouchableOpacity, Text, Image, FlatList} from 'react-native'

import {useDispatch, useSelector} from 'react-redux'
import normalize from '../../config/helpers/normalize'
import {ChampionshipClub} from '../../store/App/actions'
import {getListOfClubAction} from '../../store/App/index'

const DashboardScreen = ({}) => {
  const dispatch = useDispatch()
  const {clubs} = useSelector((state: ChampionshipClub) => state.app)

  const renderItem = (item: ChampionshipClub) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: normalize(10),
          paddingStart: normalize(20),
        }}
      >
        <View
          style={{
            width: normalize(40),
          }}
        >
          <Text style={{fontSize: normalize(10)}}>{item.shortName} </Text>
        </View>
        <View
          style={{
            width: normalize(60),
            alignItems: 'center',
          }}
        >
          <Image
            source={{uri: item.defaultJerseyUrl}}
            style={{height: normalize(40), width: normalize(40)}}
          ></Image>
        </View>
        <View style={{flex: 1, paddingStart: normalize(30)}}>
          <Text style={{fontSize: normalize(16)}}>{item.name['fr-FR']} </Text>
        </View>
      </View>
    )
  }
  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: normalize(10),
          backgroundColor: '#F5F5F5',
          paddingStart: normalize(20),
        }}
      >
        <View
          style={{
            width: normalize(40),
          }}
        ></View>
        <View
          style={{
            width: normalize(60),
            alignItems: 'center',
          }}
        >
          <Text style={{fontSize: normalize(12), color: 'grey'}}>{'Tenu'}</Text>
        </View>
        <View style={{flex: 1, paddingStart: normalize(30)}}>
          <Text style={{fontSize: normalize(12), color: 'grey'}}>{'Nom'}</Text>
        </View>
      </View>
    )
  }

  useEffect(() => {
    dispatch(
      getListOfClubAction({
        onSuccess: () => {},
        onFailure: () => {},
      }),
    )
  }, [])

  return (
    <FlatList
      ListHeaderComponent={() => renderHeader()}
      style={{backgroundColor: 'white'}}
      data={clubs}
      renderItem={({item}) => renderItem(item)}
      keyExtractor={item => item.id}
    />
  )
}

export default DashboardScreen
