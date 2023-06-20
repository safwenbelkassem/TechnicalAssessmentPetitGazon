import React, {useEffect, useState} from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  ScrollView,
} from 'react-native'

import {useDispatch, useSelector} from 'react-redux'
import normalize from '../../config/helpers/normalize'
import returnPosition from '../../config/helpers/position'
import {
  ChampionshipClub,
  ChampionshipClubs,
  ChampionshipPlayerDetails,
  Match,
  PlayerStats,
  PoolPlayer,
} from '../../store/App/actions'
import {getPlayerByIdAction} from '../../store/App/index'

const DetailsPlayer = (props: any) => {
  const dispatch = useDispatch()
  const [player, setPlayer] = React.useState<PoolPlayer>(null)
  const {clubs} = useSelector((state: ChampionshipClubs) => state.app)
  const [playerClub, setPlayerClub] = React.useState<ChampionshipClub>(null)
  const [matches, setMatches] = React.useState<Match>(null)

  useEffect(() => {
    const playerId: string = props.route.params.item.id
    dispatch(
      getPlayerByIdAction({
        playerId,
        onSuccess: (result: PlayerStats) => {
          const championships: ChampionshipPlayerDetails = Object.values(
            result?.championships,
          )[0]
          setPlayer(result)
          setMatches(championships.total.matches)
        },
        onFailure: () => {},
      }),
    )

    setPlayerClub(
      clubs.filter((club: any) => club.id == props.route.params.item.clubId)[0],
    )
  }, [])

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
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: normalize(12), color: 'grey'}}>
            {'Domicile'}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: normalize(12), color: 'grey'}}>
            {'Extérieur'}
          </Text>
        </View>
      </View>
    )
  }
  const renderItem = (item: Match) => {
    const awayClub: ChampionshipClub = clubs.filter(
      (club: ChampionshipClub) => club.id == item.away.clubId,
    )[0]
    const homeClub: ChampionshipClub = clubs.filter(
      (club: ChampionshipClub) => club.id == item.home.clubId,
    )[0]

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: normalize(10),
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              fontSize: normalize(12),
              fontWeight: '500',
              color:
                item.home.score > item.away.score
                  ? 'green'
                  : item.home.score == item.away.score
                  ? '#FADA5E'
                  : 'red',
            }}
          >
            {homeClub.shortName}
          </Text>
          <Image
            source={{
              uri: homeClub.defaultJerseyUrl,
            }}
            style={{
              height: normalize(30),
              width: normalize(30),
            }}
          ></Image>
          <Text style={{fontSize: normalize(15), fontWeight: 'bold'}}>
            {item.home.score}
          </Text>
        </View>
        <View>
          <Text style={{fontSize: normalize(15)}}>{'|'}</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}
        >
          <Text style={{fontSize: normalize(15), fontWeight: 'bold'}}>
            {item.away.score}
          </Text>
          <Image
            source={{
              uri: awayClub.defaultJerseyUrl,
            }}
            style={{
              height: normalize(30),
              width: normalize(30),
            }}
          ></Image>
          <Text
            style={{
              fontSize: normalize(12),
              fontWeight: '500',
              color:
                item.away.score > item.home.score
                  ? 'green'
                  : item.home.score == item.away.score
                  ? '#FADA5E'
                  : 'red',
            }}
          >
            {awayClub.shortName}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white', paddingTop: normalize(40)}}
    >
      <Image
        source={{uri: playerClub?.defaultJerseyUrl}}
        style={{
          height: normalize(150),
          width: normalize(150),
          alignSelf: 'center',
          marginBottom: normalize(20),
        }}
      ></Image>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: normalize(26), fontWeight: 'bold'}}>
          {props.route.params.item.firstName +
            ' ' +
            props.route.params.item.lastName}
        </Text>
        <Text
          style={{
            fontSize: normalize(20),
            fontWeight: '400',
            marginTop: normalize(5),
          }}
        >
          {playerClub?.name['fr-FR']}
        </Text>
        <Text
          style={{
            fontSize: normalize(16),
            color: 'grey',
            marginTop: normalize(5),
          }}
        >
          {returnPosition(player?.ultraPosition)?.longPosition}
        </Text>
      </View>
      <FlatList
        scrollEnabled={false}
        style={{marginTop: normalize(30)}}
        data={matches}
        ListHeaderComponent={() => renderHeader()}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item =>
          (item['home'].clubId + item['away'].clubId).toString()
        }
      />
    </ScrollView>
  )
}

export default DetailsPlayer
