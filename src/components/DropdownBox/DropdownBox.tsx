import React, { useEffect, useState } from 'react'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Input, Space } from 'antd';
import "./DropdownBox.scss"
import formulaApi from '../../apis/apis';
import * as publicConstant from "../../constants/public"

interface Props {
    getData: any,
    getDrivers: any,
    races: any,
    searchType: string
}

const DropdownBox = (props: Props) => {
    const [seasons, setSeasons] = useState([])
    const [dataChoosed, setDataChoosed] = useState({
        season: publicConstant.SEASON,
        round: publicConstant.ROUND
    })

    useEffect(() => {
        const getSeasons = async () => {
            try {
                const response = await formulaApi.getSeasons();

                const arr = response.data.MRData.SeasonTable.Seasons.reverse().map((season: any) => season.season)

                setSeasons(arr);
            } catch (error) { }
        };

        getSeasons();
    }, [])

    const handleMenuSeasonClick = (event: any) => {
        const selectedData = event.key;

        changeData(selectedData, "season");
    };

    const handleRoundInputChange = (value: string) => {
        const selectedData = value === '' ? publicConstant.ROUND : value;

        changeData(selectedData, "round");
    };

    const changeData = (selectedData: string, type: string) => {
        console.log('Selected data:', selectedData);

        switch (type) {
            case "season":
                setDataChoosed({ ...dataChoosed, season: selectedData })
                break;
            case "round":
                setDataChoosed({ ...dataChoosed, round: selectedData })
                break;
            default: break
        }
    };

    const items: MenuProps['items'] = seasons.map((season) => (
        {
            label: `${season}`,
            key: `${season}`,
        }
    ))

    const handleSearch = () => {
        switch (props.searchType) {
            case "results":
                props.getData(dataChoosed)
                break
            case "rounds":
                props.getData(dataChoosed)
                break
            case "drivers":
                props.getDrivers(dataChoosed)
                break
            default:
                break
        }    
    }

    return (
        <div className='searchArea'>
            <Space direction='vertical'>
                <Space direction='vertical'>
                    <div>
                        {props.searchType === "results" ? "RESULTS:" : props.searchType === "drivers" ? "DRIVERS:" : "ROUNDS:"}
                    </div>
                    <Space className='res'>
                        <Space className='res2'>
                            <div>Season/Year:</div>
                            <Dropdown menu={{ items: items, onClick: handleMenuSeasonClick }} trigger={['click']}>
                                <a href="_javascript:void(0)" onClick={(e) => e.preventDefault()} style={{ color: "white" }}>
                                    <Button>
                                        <Space>
                                            {dataChoosed.season}
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </a>
                            </Dropdown>
                        </Space>

                        {
                            props.searchType === "rounds" ? null :
                            <Space>
                                <div>Round:</div>
                                <Input min={1} placeholder='Number only' type='number' onChange={(e) => handleRoundInputChange(e.target.value)} value={dataChoosed.round === "all" ? '' : dataChoosed.round} />
                            </Space>
                        }

                        <Button onClick={() => handleSearch()}>
                            Search
                        </Button>
                    </Space>
                </Space>
            </Space>

        </div>
    )
}

export default DropdownBox