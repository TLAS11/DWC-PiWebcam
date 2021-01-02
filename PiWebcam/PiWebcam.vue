<style scoped>

.btn-toggle {
	flex-direction: column;
}

.primary-container {
	position: relative;
	width: 100%;
	height: 100%;
	background-color: green;
}

.v-input--checkbox {
	margin: 0;
	padding: 0;
}

.v-input--switch {
	margin: 0;
	padding: 0;
}
.viewer-box {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: yellow;
}

.full-screen {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 10;
}

.full-screen-icon {
	height: 40px;
	width: 40px;
}

.drawer-zindex {
	z-index: 20;
}
.button-container {
	position: absolute;
	bottom: 0px;
	left: 0px;
	-webkit-transition-duration: 0.3s;
	-moz-transition-duration: 0.3s;
	-o-transition-duration: 0.3s;
	transition-duration: 0.3s;
	width: 100%;
	height: 40px;
	padding: 5px;
}
.button-play {
	position: absolute;
	left: 5px;
	-webkit-transition-duration: 0.3s;
	-moz-transition-duration: 0.3s;
	-o-transition-duration: 0.3s;
	transition-duration: 0.3s;
}

.button-settings {
	position: absolute;
	right: 50px;
	-webkit-transition-duration: 0.3s;
	-moz-transition-duration: 0.3s;
	-o-transition-duration: 0.3s;
	transition-duration: 0.3s;
}

.button-maximize {
	position: absolute;
	right: 5px;
	-webkit-transition-duration: 0.3s;
	-moz-transition-duration: 0.3s;
	-o-transition-duration: 0.3s;
	transition-duration: 0.3s;
}
.top-left-panel {
	position: absolute;
	z-index: 1;
	top: 5px;
	left: 5px;
}
#top-left-panel .v-card {
	background: rgb(255 255 255 / 0.9);
}
.top-right-panel {
	position: absolute;
	z-index: 1;
	top: 5px;
	right: 5px;
}
#top-right-panel .v-card {
	background: rgb(255 255 255 / 0.9);
}
.bottom-left-panel {
	position: absolute;
	z-index: 1;
	bottom: 55px;
	left: 5px;
}
#bottom-left-panel .v-card {
	background: rgb(255 255 255 / 0.9);
}
.bottom-right-panel {
	position: absolute;
	z-index: 1;
	bottom: 55px;
	right: 5px;
}
#bottom-right-panel .v-card {
	background: rgb(255 255 255 / 0.9);
}
.button-container-drawer {
	left: 355px;
}

.emergency-button-placement {
	position: absolute;
	top: 14px;
	right: 16px;
	z-index: 999;
}
.viewer-box >>> #scene-explorer-host {
	position: absolute !important;
	left: calc(100% - 605px);
	width: 300px;
	top: 0px;
	z-index: 50 !important;
}


img {
	max-width: 100%;
	max-height: 100%;
}

.img-container {
	overflow: hidden;
}

.flip-x {
	-moz-transform: scaleX(-1);
	-o-transform: scaleX(-1);
	-webkit-transform: scaleX(-1);
	transform: scaleX(-1);
	filter: FlipH;
	-ms-filter: "FlipH";
}

.flip-y {
	-moz-transform: scaleY(-1);
	-o-transform: scaleY(-1);
	-webkit-transform: scaleY(-1);
	transform: scaleY(-1);
	filter: FlipV;
	-ms-filter: "FlipV";
}

.rotate-90 {
	transform: rotate(90deg);
	-ms-transform: rotate(90deg);
	-moz-transform: rotate(90deg);
	-webkit-transform: rotate(90deg);
	-o-transform: rotate(90deg);
}

.rotate-180 {
	transform: rotate(180deg);
	-ms-transform: rotate(180deg);
	-moz-transform: rotate(180deg);
	-webkit-transform: rotate(180deg);
	-o-transform: rotate(180deg);
}

.rotate-270 {
	transform: rotate(270deg);
	-ms-transform: rotate(270deg);
	-moz-transform: rotate(270deg);
	-webkit-transform: rotate(270deg);
	-o-transform: rotate(270deg);
}
</style>
<template>
	<div ref="primarycontainer" class="primary-container mt-2" v-resize="resize">
        <div :class="{ 'full-screen': fullscreen }" class="viewer-box" id="sizeReference">
            <div class="emergency-button-placement" v-show="fullscreen">
                <code-btn :code="'M112\nM999'" :log="false" color="red" :title="$t('button.emergencyStop.title')"><v-icon>mdi-flash</v-icon></code-btn>
            </div>
			<v-card style="height: 100%; width: 100%;">
				<div class="outer-element" style="display: table; float: none; height: 100%; width: 100%; background: black;">
					<div class="inner-element" style="display: table-cell; vertical-align: middle; text-align: center;">
						<img v-if="webcamURL" :aspect-ratio="16/9" id="mjpeg_dest" @click="drawer = false" src="" class="" style="width:100%; margin-top: 5px;">
						<div v-else @click="drawer = false" style="height: 100%; width: 100%; color: white;">Please Provide a webcamURL to start stream...</div>
					</div>
				</div>
			</v-card>
            <div id="stream-controls" class="button-container">
                <v-btn class="full-screen-icon button-maximize" small @click="toggleFullScreen" :title="PiWebcam.fullScreenText">
                    <v-icon>{{ fullscreen ? 'mdi-window-restore' : 'mdi-window-maximize' }}</v-icon>
                </v-btn>
                
                <v-btn small class="toggle-menu-button-close button-settings" @click="drawer = !drawer" :title="PiWebcam.settingsText">
					<v-icon>mdi-cog</v-icon>
				</v-btn>

				<v-btn small v-if="paused" @click="startLiveStream" class="toggle-menu-button-close button-play" :title="PiWebcam.startLiveStream.caption">
					<v-icon>mdi-play</v-icon>
				</v-btn>
				<v-btn small v-if="!paused"  @click="pauseLiveStream" class="toggle-menu-button-close button-play" :title="PiWebcam.pauseLiveStream.caption">
					<v-icon>mdi-pause</v-icon>
				</v-btn>
			</div>
			<div id="top-left-panel" class="top-left-panel">
				<div class="component">
					<template v-for="(child, index) in getComponents('topLeft')">
						<component v-bind:is="child" :key="child.name" :id="child.name + index + 'topLeft'" style="margin: 5px;"></component>
					</template>
				</div>
			</div>
			<div id="top-right-panel" class="top-right-panel">
				<div class="component">
					<template v-for="(child, index) in getComponents('topRight')">
						<component v-bind:is="child" :key="child.name" :id="child.name + index + 'topRight'" style="margin: 5px;"></component>
					</template>
				</div>
			</div>
			<div id="bottom-left-panel" class="bottom-left-panel">
				<div class="component">
					<template v-for="(child, index) in getComponents('bottomLeft')">
						<component v-bind:is="child" :key="child.name" :id="child.name + index + 'bottomLeft'" style="margin: 5px;"></component>
					</template>
				</div>
			</div>
			<div id="bottom-right-panel" class="bottom-right-panel">
				<div class="component">
					<template v-for="(child, index) in getComponents('bottomRight')" style="">
						<component v-bind:is="child" :key="child.name" :id="child.name + index + 'bottomRight'" style="margin: 5px;"></component>
					</template>
				</div>
			</div>
			
            <v-navigation-drawer v-model="drawer" :permanent="drawer" absolute width="350px">
				<v-card outlined>
					<v-card-title class="pb-0">
						{{panel.settingsWebcam.caption}}
					</v-card-title>
					<v-card>
						<v-btn @click="startLiveStream" block :title="PiWebcam.startLiveStream.caption">
							<v-icon class="mr-2">mdi-play</v-icon>
							{{ PiWebcam.startLiveStream.title }}
						</v-btn>
						<v-btn @click="pauseLiveStream" block :title="PiWebcam.pauseLiveStream.caption">
							<v-icon class="mr-2">mdi-pause</v-icon>
							{{ PiWebcam.pauseLiveStream.title }}
						</v-btn>
						<v-btn @click="endLiveStream" block :title="PiWebcam.endLiveStream.caption">
							<v-icon class="mr-2">mdi-stop</v-icon>
							{{ PiWebcam.endLiveStream.title }}
						</v-btn>
					</v-card>
				</v-card>
                <v-expansion-panels>
					<v-expansion-panel @click="scrollIntoView">
                        <v-expansion-panel-header :title="PiWebcam.timeLapse.title">
                            <v-icon class="mr-2">mdi-cog-outline</v-icon>
                            <strong>{{PiWebcam.settings.title}}</strong>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content eager>
							<v-row>
								<v-col cols="12" md="12">
									<v-text-field v-model="webcamURL" :label="panel.settingsWebcam.webcamURL" hide-details></v-text-field>
								</v-col>
								<v-col cols="12" md="6">
									<v-select v-model="webcamRotation" :items="rotationItems" :label="panel.settingsWebcam.webcamRotation" hide-details></v-select>
								</v-col>
								<v-col cols="12" md="6">
									<v-select v-model="webcamFlip" :items="flipItems" :label="panel.settingsWebcam.webcamFlip" hide-details></v-select>
								</v-col>
							</v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel @click="scrollIntoView">
                        <v-expansion-panel-header :title="PiWebcam.overlays.title">
                            <v-icon class="mr-2">mdi-picture-in-picture-top-right</v-icon>
                            <strong>{{PiWebcam.overlays.caption}}</strong>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content eager>
							<v-row>
								<v-col cols="12" md="4">
									<v-select v-model="selectedPanel" :items="PiWebcam.overlays.selectedPanelOptions" :label="PiWebcam.overlays.selectedPanel" hide-details></v-select>
								</v-col>
								<v-col cols="12" md="6">
									<v-select v-model="selectedComponent" :items="PiWebcam.overlays.selectedComponentOptions" :label="PiWebcam.overlays.selectedComponent" hide-details></v-select>
								</v-col>
								<v-col cols="12" md="2" style="margin-top: 20px;">
									<v-btn small @click="addComponentsToPanel(selectedPanel, selectedComponent)" class="toggle-menu-button-close" :title="PiWebcam.overlays.addComponent">
										<v-icon>mdi-plus</v-icon>
									</v-btn>
								</v-col>
							</v-row>
							<v-switch v-for="(child, index) in getComponents('topRight')" v-bind:key="'remove: ' + child.name + index + 'topRight'" @click="removeComponentFromPanel(PiWebcam.topRight, child)" :label="getTextForComponent('topRight',child)" hide-details class="mt-0 mb-3" :input-value="defaultVSwitch"></v-switch>
							<v-switch v-for="(child, index) in getComponents('topLeft')" v-bind:key="'remove: ' + child.name + index + 'topLeft'" @click="removeComponentFromPanel(PiWebcam.topLeft, child)" :label="getTextForComponent('topLeft',child)" hide-details class="mt-0 mb-3" :input-value="defaultVSwitch"></v-switch>
							<v-switch v-for="(child, index) in getComponents('bottomRight')" v-bind:key="'remove: ' + child.name + index + 'bottomRight'" @click="removeComponentFromPanel(PiWebcam.bottomRight, child)" :label="getTextForComponent('bottomRight',child)" hide-details class="mt-0 mb-3" :input-value="defaultVSwitch"></v-switch>
							<v-switch v-for="(child, index) in getComponents('bottomLeft')" v-bind:key="'remove: ' + child.name + index + 'bottomLeft'" @click="removeComponentFromPanel(PiWebcam.bottomLeft, child)" :label="getTextForComponent('bottomLeft',child)" hide-details class="mt-0 mb-3" :input-value="defaultVSwitch"></v-switch>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
					<v-expansion-panel @click="scrollIntoView">
                        <v-expansion-panel-header :title="PiWebcam.timeLapse.title">
                            <v-icon class="mr-2">mdi-camera-timer</v-icon>
                            <strong>{{PiWebcam.timeLapse.title}}</strong>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content eager>
							<v-switch v-model="savedSettings.timeLapseByZOn" :label="PiWebcam.timeLapseByZimage" hide-details class="mt-0 mb-3"></v-switch>
							<v-switch v-model="savedSettings.timeLapseOn" :label="PiWebcam.timeLapseByTime" hide-details class="mt-0 mb-3"></v-switch>
							<v-text-field v-model="savedSettings.timeLapseInterval" :label="PiWebcam.timeLapseByTimeValue" hide-details></v-text-field>
							<v-btn @click="openSaveFileDownloads" style="margin-top: 15px;">
								<v-icon class="ml-2">mdi-download</v-icon>
								<span class="ml-2">Open Files</span>
							</v-btn>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-navigation-drawer>
        </div>
    </div>
</template>

<script>
'use strict'

import { mapState, mapMutations } from 'vuex'
import RestConnector from '../../store/machine/connector/RestConnector.js'
import  { localStorageSupported, getLocalSetting, setLocalSetting } from '../../utils/localStorage.js'

//import Vue from 'vue'

//import toolsPanel from '../../components/panels/ToolsPanel.vue'
//import jobEstimationsPanel from '../../components/panels/JobEstimationsPanel.vue'
//import jobControlPanel from '../../components/panels/JobControlPanel.vue'
//import layerChart from '../../components/charts/LayerChart.vue'
//import temperatureChart from '../../components/charts/TemperatureChart.vue'

export default {
	data: () => ({
		drawer: false,
		backgroundColor: '#000000FF',
		loading: false,
		testData: '',
		fullscreen: false,
		paused: true,
		defaultVSwitch: true,
		
		// settings
		webcam:  {
			embedded : false,
			url : '',
			liveUrl : ''
		},

		savedSettings : {
			timeLapseOn : false,
			timeLapseByZOn : false,
			timeLapseInterval : 60,
			webcamURL : "",
			panels : {
				topRight: [],
				topLeft: [],
				bottomRight: [],
				bottomLeft: []
			}
		},
		
		// overlays
		panels: {
			topRight: [],
			topLeft: [],
			bottomRight: [],
			bottomLeft: []
		},
		selectedPanel: "",
		selectedComponent: "",

		displayProgress: true,
		displayLayersProgress: true,
		displayTools: true,
		displaySensors: true,

		timeLapseByZimage: false,
		timeLapseByTime : true,
		timeLapseInterval: 60,
		timeLapseActive: false,
		timeLapseByImageActive:  false,

		rotationItems: [
				{ text: '0°', value: 0 },
				{ text: '90°', value: 90 },
				{ text: '180°', value: 180 },
				{ text: '270°', value: 270 }
			],
		panel: {
			settingsWebcam: {
				caption: 'Webcam',
				webcamURL: 'Webcam URL (optional)',
				webcamUpdateInterval: 'Webcam update interval ({0})',
				webcamLiveURL: 'URL to open when Webcam image is clicked (optional)',
				webcamFix: 'Do not append extra HTTP qualifier when reloading images',
				webcamRotation: 'Rotate webcam image',
				webcamFlip: 'Flip webcam image',
				flipNone: 'None',
				flipX: 'Flip X',
				flipY: 'Flip Y',
				flipBoth: 'Flip both'
			}
		},
		PiWebcam: {
			caption: 'Pi Webcam Viewer',
			title: 'Webcam Interface',
			fullscreen: 'Full Screen',
			fullScreenText: 'View in Full Screen',
			settingsText: 'Open Settings Panel',
			startLiveStream: {
				caption : 'Begin stream from the web camera',
				title : 'Start Stream'
			},
			pauseLiveStream: {
				caption : 'Pause camera stream from the web camera',
				title : 'Pause Stream'
			},
			endLiveStream: {
				caption : 'Closes the stream from the web camera',
				title : 'End Stream'
			},
			overlays: {
				caption : 'Enable Overlays',
				title : 'Overlays',
				selectedPanel: "Overlay Area",
				selectedComponent: "Component to display",
				selectedPanelOptions: ["Top Left","Top Right", "Bottom Left", "Bottom Right"],
				selectedComponentOptions: ["Tool Panel","Job Estimations Panel", "Job Control Panel", "Layer Chart", "Temperature Chart"]
			},
			// make sure these match the above values
			topLeft: "Top Left",
			topRight: "Top Right",
			bottomLeft: "Bottom Left",
			bottomRight: "Bottom Right",
			toolPanel:"Tool Panel",
			jobEstimationsPanel: "Job Estimations Panel",
			jobControlPanel: "Job Control Panel",
			layerChart: "Layer Chart",
			temperatureChart: "Temperature Chart",

			displayProgress: 'Show Display Progress',
			displayLayersProgress: 'Show Layer Progress',
			displayTools: 'Display Tool Status',
			displaySensors: 'Display Extra Sensors',
			showConfiguration: 'Show Viewer Configuration',
			settings: {
				caption : 'Settings for the webcam image',
				title : 'Settings'
			},
			timeLapse: {
				caption : 'Capture timelapse using the web interface',
				title : 'Timelapse'
			},
			timeLapseByZimage: 'Capture Timelapse By Z-height',
			timeLapseByTime: 'Capture Timelapse By Time Interval',
			timeLapseByTimeValue: 'Timelapse Interval (seconds)',
			webcamTimelapseSaveFilename: 'Save Filename',
		},
	}),
	computed: {
		...mapState('machine/model', ['job','settings']),
		flipItems() {
			return [
				{ text: this.$t('panel.settingsWebcam.flipNone'), value: 'none' },
				{ text: this.$t('panel.settingsWebcam.flipX'), value: 'x' },
				{ text: this.$t('panel.settingsWebcam.flipY'), value: 'y' },
				{ text: this.$t('panel.settingsWebcam.flipBoth'), value: 'both' }
			];
		},
		webcamURL: {
			get() { return this.savedSettings.webcamURL; }, 
			set(value) { 
				this.savedSettings.webcamURL = value;
				this.update({ webcam: { url: value } }); 
			}
		},
		webcamRotation: {
			get() { return this.panel.settingsWebcam.rotation; },
			set(value) {
				RestConnector.request('POST', this.webcamURL + '/cmd_pipe.php?cmd=ro%20' + value);
				this.update({ webcam: { rotation: value } });
			}
		},
		webcamFlip: {
			get() { return this.panel.settingsWebcam.flip; },
			set(value) {
				if (value == "none") {
					RestConnector.request('POST', this.webcamURL + '/cmd_pipe.php?cmd=fl%20' + "0");
				}
				else if (value == "x") {
					RestConnector.request('POST', this.webcamURL + '/cmd_pipe.php?cmd=fl%20' + "1");
				}
				else if (value == "y") {
					RestConnector.request('POST', this.webcamURL + '/cmd_pipe.php?cmd=fl%20' + "2");
				}
				else if (value == "both") {
					RestConnector.request('POST', this.webcamURL + '/cmd_pipe.php?cmd=fl%20' + "3");
				}
				this.update({ webcam: { flip: value } });
			}
		}
	},
	methods: {
		...mapMutations('settings', ['update']),
		scrollIntoView(event) {
			setTimeout(() => {
				event.target.scrollIntoView(true);
			}, 250);
		},
		toggleFullScreen() {
			this.fullscreen = !this.fullscreen;
			this.$nextTick(() => {
				console.log('resize');
				//viewer.resize();
			});
		},
		startLiveStream () {
			var mjpeg_img = document.getElementById("mjpeg_dest");
			mjpeg_img.src = this.webcamURL +"/cam_pic_new.php?time=" + new Date().getTime() + "&pDelay=" + 40000;
			this.paused = false;
		},
		endLiveStream() {
			var mjpeg_img = document.getElementById("mjpeg_dest");
			mjpeg_img.src = "";
			this.paused = true;
		},
		pauseLiveStream() {
			var mjpeg_img = document.getElementById("mjpeg_dest");
			mjpeg_img.src = this.webcamURL +"/cam_pic.php?time=" + new Date().getTime() + "&pDelay=" + 40000;
			this.paused = true;
		},
		resize() {
			this.$refs.primarycontainer.style.height = window.innerHeight - document.getElementById('global-container').clientHeight - document.getElementsByClassName('v-toolbar__content')[0].clientHeight - 22 + 'px';
			var maxHeight = document.getElementById('sizeReference').clientHeight;
			var maxWidth = document.getElementById('sizeReference').clientWidth; // from image aspect ratio
			if (document.getElementById('mjpeg_dest') && document.getElementById('mjpeg_dest').style) { // wrap for resize before img dom element init
				if (maxHeight * 16/9 < maxWidth) { // height limiting
					document.getElementById('mjpeg_dest').style.height = "100%";
					document.getElementById('mjpeg_dest').style.width = "";
				}
				else { // width limiting
					document.getElementById('mjpeg_dest').style.height = "";
					document.getElementById('mjpeg_dest').style.width = "100%";
				}
			}
		},
		addComponentsToPanel(panelName, componentName) {
			var panelsObject = [];
			if (panelName == this.PiWebcam.topLeft) {
				panelsObject = this.panels.topLeft;
			}
			else if (panelName ==  this.PiWebcam.topRight) {
				panelsObject = this.panels.topRight;
			}
			else if (panelName ==  this.PiWebcam.bottomLeft) {
				panelsObject = this.panels.bottomLeft;
			}
			else if (panelName ==  this.PiWebcam.bottomRight) {
				panelsObject = this.panels.bottomRight;
			}
			var componentToAdd = undefined
			if (componentName == this.PiWebcam.toolPanel) {
				componentToAdd = 'tools-panel';//toolsPanel;
			}
			else if(componentName == this.PiWebcam.jobEstimationsPanel) {
				componentToAdd = 'job-estimations-panel';//jobEstimationsPanel;
			}
			else if(componentName == this.PiWebcam.jobControlPanel) {
				componentToAdd = 'job-control-panel';//jobControlPanel;
			}
			else if(componentName == this.PiWebcam.layerChart) {
				componentToAdd = 'layer-chart';//layerChart;
			}
			else if(componentName == this.PiWebcam.temperatureChart) {
				componentToAdd = 'temperature-chart';//temperatureChart;
			}
			// check if panel object already exists in panel...
			for (var i = 0; i < panelsObject.length; i++) {
				if (panelsObject[i] == componentToAdd) {
					alert("Error, this component already exists here!");
					return;
				}
			}
			// add panel object
			panelsObject.push(componentToAdd);
			// save settings
			this.saveSettings();
		},
		removeComponentFromPanel(panelName, componentName) {
			var panelsObject = [];
			if (panelName == this.PiWebcam.topLeft) {
				panelsObject = this.panels.topLeft;
			}
			else if (panelName ==  this.PiWebcam.topRight) {
				panelsObject = this.panels.topRight;
			}
			else if (panelName ==  this.PiWebcam.bottomLeft) {
				panelsObject = this.panels.bottomLeft;
			}
			else if (panelName ==  this.PiWebcam.bottomRight) {
				panelsObject = this.panels.bottomRight;
			}
			var componentToRemove =componentName;
			// check if panel object already exists in panel...
			for (var i = panelsObject.length-1; i >= 0; i--) {
				if (panelsObject[i] == componentToRemove) {
					panelsObject.splice(i,1);
					this.defaultVSwitch = true;
					return;
				}
			}
			// save settings
			this.saveSettings();
		},
		getTextForComponent(panel,child) {
			switch(child) {
				case "tools-panel":
					return "Remove Tools Panel (" + this.PiWebcam[panel] + ")";
				case "job-estimations-panel":
					return "Remove Job Estimation Panel (" + this.PiWebcam[panel] + ")";
				case "job-control-panel":
					return "Remove Job Control Panel (" + this.PiWebcam[panel] + ")";
				case "layer-chart":
					return "Remove Layer Chart (" + this.PiWebcam[panel] + ")";
				case "temperature-chart":
					return "Remove Temperature Chart (" + this.PiWebcam[panel] + ")";
				default:
					// code block
			}
		},
		getComponents(panelName) {

			let returnComponents = [];
			var componentsArray = [];
			if (panelName == "topLeft") {
				componentsArray = this.panels.topLeft;
			}
			else if (panelName == "topRight") {
				componentsArray = this.panels.topRight;
			}
			else if (panelName == "bottomLeft") {
				componentsArray = this.panels.bottomLeft;
			}
			else if (panelName == "bottomRight") {
				componentsArray = this.panels.bottomRight;
			}

			for (var i = 0; i < componentsArray.length; i++) {
				//let ComponentClass = Vue.extend(componentsArray[i]);
				//let instance = new ComponentClass({});
				//returnComponents.push(instance);
				returnComponents.push(componentsArray[i]);
			}
			return returnComponents
		},
		startTimeLapse() {
			RestConnector.request('POST', this.savedSettings.webcamURL + '/cmd_pipe.php?cmd=tl%20' + "1");
			this.savedSettings.timeLapseOn = true;
			this.timeLapseActive = true;
			this.saveSettings();
		},
		endTimeLapse() {
			RestConnector.request('POST', this.savedSettings.webcamURL + '/cmd_pipe.php?cmd=tl%20' + "0");
			this.savedSettings.timeLapseOn = false;
			this.timeLapseActive = false;
			this.saveSettings();
		},
		updateTimeLapseInterval(valueInSeconds) {
			if (isNaN(valueInSeconds)) {
				alert('Invalid interval detected, please enter this number in seconds');
			}
			if (valueInSeconds > 3200) {
				alert('Maximum interval is 3200 seconds, please select a value less than this...');
			}

			// save to settings
			this.savedSettings.timeLapseInterval = valueInSeconds;
			this.saveSettings();

			// convert to seconds * 10 (this is what the raspberry pi interface uses...)
			var sendValue = valueInSeconds * 10;
			RestConnector.request('POST', this.savedSettings.webcamURL + '/cmd_pipe.php?cmd=tv%20' + Math.round(sendValue).toString());
		},
		takeImage() {
			RestConnector.request('POST', this.savedSettings.webcamURL + '/cmd_pipe.php?cmd=im');
		},
		setupTimeLapseOnZ() {
			this.savedSettings.timeLapseByZOn = true;
			this.timeLapseByImageActive = true;
			this.saveSettings();
		},
		endTimeLapseOnZ() {
			this.savedSettings.timeLapseByZOn = false;
			this.timeLapseByImageActive = false;
			this.saveSettings();
		},
		openSaveFileDownloads() {
			var win = window.open(this.savedSettings.webcamURL + "/preview.php", '_blank');
			win.focus();
		},
		queryCameraSettings () {
			var promise = RestConnector.request('GET', this.savedSettings.webcamURL + '/status_mjpeg.php?last=');
			promise.then( function success(response) {
				if (response == "timelapse") {
					this.timeLapseActive = true;
					this.savedSettings.timeLapseOn = true;
				}
				setTimeout(function() {
					this.queryCameraSettings ();
				},1000)
			},
			function failure(error) {
				console.log('Camera Settings error! ' + error);
				this.queryCameraSettings ();
			});
		},
		getSettings() {
			if (localStorageSupported) {
				var receivedSettings = getLocalSetting('PiWebcamPlugin');
				if (receivedSettings && receivedSettings != '') {
					var JSONsettings = JSON.parse(receivedSettings);
					if (JSONsettings) {
						this.savedSettings = JSONsettings;
						if (JSONsettings.panels && JSONsettings.panels.topRight) {
							this.panels = JSONsettings.panels; // maintain bindings
						}
						if (Object.keys(JSONsettings).indexOf('timeLapseOn') != -1) {
							this.timeLapseOn = JSONsettings['timeLapseOn']; 
						}
						if (Object.keys(JSONsettings).indexOf('timeLapseByZOn') != -1) {
							this.timeLapseByZOn = JSONsettings['timeLapseByZOn']; 
						}
						if (JSONsettings.timeLapseInterval && JSONsettings.timeLapseInterval != "") {
							if (JSONsettings.timeLapseInterval > 3200000) {
								alert('error, invalid timelapse interval detected!');
							}
							this.timeLapseInterval = JSONsettings['timeLapseInterval']; 
						}
						if (JSONsettings.webcamURL && JSONsettings.webcamURL != "") {
							this.savedSettings.webcamURL = JSONsettings['webcamURL']; 
						}
					}
					
				}
			}
		},
		saveSettings() {
			var settingsString = JSON.stringify(this.savedSettings);
			setLocalSetting('PiWebcamPlugin', settingsString);
		}
	},
	watch: {
		'job.layers'() {
			if (this.timeLapseByImageActive) {
				this.takeImage();
			}
		},
		'savedSettings': {
			handler: function (val, oldVal) {
				console.log('settings updated: ' + val + "old value: " + oldVal);
				this.saveSettings();
			},
			deep: true
		},
		'savedSettings.timeLapseInterval': {
			handler: function (val, oldVal) {
				if (val != oldVal) {
					console.log('settings updated: ' + val + " old value: " + oldVal);
					this.updateTimeLapseInterval(val);
				}
			}
		},
		'savedSettings.timeLapseOn': {
			handler: function (val, oldVal) {
				if (val != oldVal) {
					console.log('time lapse stared / stopped: ' + val + " old value: " + oldVal);
					if (val == true) {
						this.startTimeLapse();
					}
					else {
						this.endTimeLapse();
					}
				}
			}
		},
		'savedSettings.timeLapseByZOn': {
			handler: function (val, oldVal) {
				if (val != oldVal) {
					console.log('time lapse Z stared / stopped: ' + val + " old value: " + oldVal);
					if (val == true) {
						this.setupTimeLapseOnZ();
					}
					else {
						this.endTimeLapseOnZ();
					}
				}
				
			}
		}
		
	},
	mounted() {
		// get the plugin settings
		this.getSettings();
	}
}
</script>