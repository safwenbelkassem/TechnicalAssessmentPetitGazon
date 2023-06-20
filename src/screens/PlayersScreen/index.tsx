import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  TextInput,
} from 'react-native'

import {useDispatch, useSelector} from 'react-redux'
import normalize from '../../config/helpers/normalize'
import returnPostion from '../../config/helpers/position'
import {PoolPlayer, PoolPlayersResponse} from '../../store/App/actions'
import {getListOfPlayersAction} from '../../store/App/index'

const PlayersScreen = (props: any) => {
  const dispatch = useDispatch()
  const {players} = useSelector((state: PoolPlayersResponse) => state.app)
  const [searchedPlayer, setSearchedPlayer] = React.useState<[PoolPlayer?]>([])
  const [searchedText, setSearchedText] = React.useState<string>('')

  const renderItem = (item: PoolPlayer) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          props.navigation.navigate('DetailsPlayer', {
            item: item,
          })
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: normalize(10),
        }}
      >
        <View style={{flex: 1, paddingStart: normalize(20)}}>
          <Text style={{fontSize: normalize(12), color: 'black'}}>
            {item.firstName + ' ' + item.lastName}
          </Text>
        </View>
        <View style={{width: normalize(70), alignItems: 'center'}}>
          <Text style={{fontSize: normalize(12), color: 'black'}}>
            {returnPostion(item?.ultraPosition)?.position}
          </Text>
        </View>
        <View style={{width: normalize(70), alignItems: 'center'}}>
          <Text style={{fontSize: normalize(12), color: 'black'}}>
            {item.quotation}
          </Text>
        </View>
      </TouchableOpacity>
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
        }}
      >
        <View style={{flex: 1, paddingStart: normalize(20)}}>
          <Text style={{fontSize: normalize(12), color: 'grey'}}>{'Nom'}</Text>
        </View>
        <View style={{width: normalize(70), alignItems: 'center'}}>
          <Text style={{fontSize: normalize(12), color: 'grey'}}>
            {'Position'}
          </Text>
        </View>
        <View style={{width: normalize(70), alignItems: 'center'}}>
          <Text style={{fontSize: normalize(12), color: 'grey'}}>
            {'Quotation'}
          </Text>
        </View>
      </View>
    )
  }

  useEffect(() => {
    dispatch(
      getListOfPlayersAction({
        onSuccess: () => {},
        onFailure: () => {},
      }),
    )
  }, [])

  return (
    <>
      <TextInput
        style={{
          height: normalize(40),
          margin: normalize(12),
          padding: normalize(10),
          borderWidth: normalize(1),
          borderRadius: normalize(10),
          borderColor: '#D3D3D3',
        }}
        placeholder={'Chercher'}
        onChangeText={(text: string) => {
          let filtred = players.filter((player: PoolPlayer) => {
            return (
              player?.firstName
                ?.toLocaleUpperCase()
                .includes(text.toUpperCase()) ||
              player?.lastName
                ?.toLocaleUpperCase()
                .includes(text.toUpperCase()) ||
              returnPostion(player?.ultraPosition)
                ?.position.toUpperCase()
                .includes(text.toUpperCase()) ||
              returnPostion(player?.ultraPosition)
                ?.longPosition.toUpperCase()
                .includes(text.toUpperCase())
            )
          })
          setSearchedText(text)
          setSearchedPlayer(filtred)
        }}
        // value={searchedText}
      ></TextInput>
      <FlatList
        style={{backgroundColor: 'white'}}
        data={
          searchedPlayer.length > 0 || searchedText.length > 0
            ? searchedPlayer
            : players
        }
        ListHeaderComponent={() => renderHeader()}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item.id}
      />
    </>
  )
}

export default PlayersScreen
