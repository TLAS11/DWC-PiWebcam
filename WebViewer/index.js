'use strict'

import i18n from '../../i18n'
//import Vue from 'vue';

import { registerRoute } from '../../routes';
import { registerPluginContextMenuItem, ContextMenuType } from '../index.js';
import WebViewer from './WebViewer.vue';
//import ColorPicker from './ColorPicker.vue';

//Vue.component('webviewer-color-picker', ColorPicker);

registerRoute(WebViewer, {
  Job: {
    WebViewer: {
      icon: 'mdi-webcam',
      caption: 'plugins.webViewer.caption',
      path: '/Job/WebViewer',
    },
  },
});

registerPluginContextMenuItem(() => i18n.t('plugins.webViewer.title'), '/Job/WebViewer', 'mdi-webcam', 'view-3d-model', ContextMenuType.JobFileList);
