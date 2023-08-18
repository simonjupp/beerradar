import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import {useParams} from "react-router-dom";
import {Alert} from "@mui/material";

import { loadTastingData} from '../LocalStorage';


const BeerRadar = ( {beer } ) => {

    const { beerId } = useParams();
    let bid = beer._id ? beer._id : beerId;

    ChartJS.register(
        RadialLinearScale,
        PointElement,
        LineElement,
        Filler,
        Tooltip,
        Legend
    );

    const test_data = {
        labels: [],
        datasets: [
            {
                label: 'No tasting yet',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const [data, setData] = useState(test_data);

    useEffect(() => {
        const loadedData = loadTastingData(bid);
        let userTastingData = [];
        if (loadedData) {
            userTastingData = loadedData.tastingResults;

        }
        fetch(process.env.REACT_APP_API_BASE_URL+'/api/beers/'+bid+'/averageRatings' )
            .then((response) => response.json())
            .then((data) => {

                if (data.length > 0 )    {

                    let labels = [];
                    let averageRatings = [];
                    let userRatings = [];

                    for (let i = 0; i < data.length; i++) {
                        labels.push(data[i].questionDetails.flavor);
                        averageRatings.push(data[i].averageRating);

                        if (userTastingData.length > 0) {
                            let obj = userTastingData.find(o => o.question === data[i].questionDetails._id);
                            userRatings.push(obj.rating);
                        }

                    }
                    let radar_data = {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Average tasting',
                                data: averageRatings,
                                backgroundColor: 'rgba(203,255,99,0.2)',
                                borderColor: 'rgb(159,255,99)',
                                borderWidth: 1,
                            },
                        ],
                    }

                    if (userTastingData) {
                        console.log('userTastingData' +  JSON.stringify(userTastingData))

                        radar_data.datasets.unshift(
                            {
                                label: 'Your tasting',
                                data: userRatings,
                                backgroundColor: 'rgba(99,208,255,0.2)',
                                borderColor: 'rgb(99,143,255)',
                                borderWidth: 1,
                            })

                    }
                    setData(radar_data)
                } else {
                    setData(undefined)

                }

            });
    }, []);




    return (

        <div>
            {data ? (

                <Radar data={data} />

            ) :
                <div style={{ marginTop: '16px' }}>
                    <Alert severity="info">No tasting info for this beer yet!</Alert>
                </div>
            }
        </div>
    );
};


export default BeerRadar;

