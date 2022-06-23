import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, FlatList, Touchable, TouchableOpacity } from 'react-native'
import { getApi } from '../../Network';
import ImageView from '../imageView';
import * as env from '../../../env'

export default function MainComponent() {

    const [searchText, setSearchText] = useState('');
    const [imageData, setImageData] = useState([]);
    const [page, setPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false)
    const [modalItem, setModalItem] = useState()

    useEffect(() => {
        if (searchText.length > 2) {
            callSearchApi()
        } else {
            setImageData([])
        }
    }, [searchText])

    useEffect(() => {
        if (page > 1)
            callSearchApi()
    }, [page])

    const callSearchApi = async () => {
        let params = {
            method: "flickr.photos.search",
            api_key: env.FLICKR_KEY,
            text: searchText,
            format: "json",
            nojsoncallback: page
        }
        try {
            let res = await getApi('services/rest/?', params)
            if (res.stat === 'ok') {
                setImageData(prev => [...prev, ...res.photos?.photo])

            }
        } catch (error) {
            console.log('error: ', error);
        }
    }

    const onChangeText = (text) => {
        setSearchText(text)
    }

    const renderCustomItem = (item, index) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setModalVisible(true); setModalItem(item) }}>
                    <Text style={{ marginHorizontal: 10 }}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const loadMoreData = () => {
        setPage(page + 1)
    }

    return (
        <View style={{ marginHorizontal: 10, marginTop: 10, flex: 1 }}>
            <TextInput
                placeholder={"Type Here.."}
                value={searchText}
                onChangeText={text => onChangeText(text)}
                style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 5, paddingLeft: 10, flex: 0 }}
            />
            {imageData.length > 0 ? <FlatList
                style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 2, marginTop: 4, flex: 1 }}
                data={imageData}
                renderItem={({ item, index }) => renderCustomItem(item, index)}
                ItemSeparatorComponent={() => {
                    return <View style={{ height: 1, backgroundColor: 'grey' }} />
                }}
                keyExtractor={item => item.id + "page:" + page}
                // onEndReachedThreshold={0}
                onEndReached={() => loadMoreData()}
            /> : null}

            {modalVisible && <ImageView
                visible={modalVisible}
                item={modalItem}
                hideModal={(val) => setModalVisible(val)}
            />}
        </View>
    )
}
