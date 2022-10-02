import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		height: 300,
		width: '100%',
	},
}));

const data1 = {
	labels: [
		'Danceability',
		'Energy',
		'Acousticness',
		'Speechiness',
		'Instrumentalness',
		'Liveness',
		'Valence',
	],
	datasets: [
		{
			backgroundColor: [
				'rgba(255, 99, 132, 0.3)',
				'rgba(255, 159, 64, 0.3)',
				'rgba(255, 206, 86, 0.3)',
				'rgba(75, 192, 192, 0.3)',
				'rgba(54, 162, 235, 0.3)',
				'rgba(104, 132, 245, 0.3)',
				'rgba(153, 102, 255, 0.3)',
			],
			borderColor: [
				'rgba(255,99,132,1)',
				'rgba(255, 159, 64, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(104, 132, 245, 1)',
				'rgba(153, 102, 255, 1)',
			],
			borderWidth: 1,
			data: [],
		},
	],
};


const AudioFeaturesChart = props => {
	const classes = useStyles();
	data1.datasets[0].data = []; // Clear to avoid repeating data
	data1.labels.forEach(label => {
		data1.datasets[0].data.push(props.features[label.toLowerCase()]);
	});
    console.log(data1[0]);
	return (
		<div className={classes}>
            {data1?.length > 0 && (
                <Bar
				   options={{
					responsive: true,
					maintainAspectRatio: false,
					legend: {
						display: false,
					},
				   }}
                    data={{
                        datasets: [
                            {
                                data: data1,
                                backgroundColor: 'rgba(204, 16, 52, 0.5)',
                                borderColor: '#CC1034',
                            },
                        ],
                    }}
                />
            )}
        </div>
	);
};

export default AudioFeaturesChart;