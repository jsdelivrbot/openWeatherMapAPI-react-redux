import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from '../chart';
import GoogleMap from '../google_map';

class WeatherList extends Component {

	renderWeather(cityData){

		const temps = cityData.list.map(weather => weather.main.temp);
		const pressure = cityData.list.map(weather => weather.main.pressure);
		const humidity = cityData.list.map(weather => weather.main.humidity);
		const { lon, lat } = cityData.city.coord;
		// console.log(temps)

		return(
			<tr key={cityData.city.id}>
				<td>
					<GoogleMap lon={lon} lat={lat} />
				</td>
				<td>
					<Chart data={temps} color="black" units="K"/>
				</td>
				<td>
					<Chart data={pressure} color="blue" units="hPa"/>
				</td>
				<td>
					<Chart data={humidity} color="red" units="%"/>
				</td>
			</tr>
		)
	}

	render(){
		return(
			<table className="table table-hover">
				<thead>
					<tr>
						<th>City</th>
						<th>Temperature (K)</th>
						<th>Pressure (hPa)</th>
						<th>Humidity (%)</th>
					</tr>
				</thead>
				<tbody>
					{this.props.weather.map(this.renderWeather)}
				</tbody>
			</table>
		)
	}
}

function mapStateToProps(state){
	return { weather: state.weather };
}

export default connect(mapStateToProps)(WeatherList);