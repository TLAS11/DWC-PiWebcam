'use strict'

import i18n from '../../i18n'
//import Vue from 'vue';

import { registerRoute } from '../../routes';
import { registerPluginContextMenuItem, ContextMenuType } from '../index.js';
import PiWebcam from './PiWebcam.vue';

registerRoute(PiWebcam, {
  Job: {
    PiWebcam: {
      icon: 'mdi-webcam',
      caption: 'Pi Webcam',
      path: '/Job/PiWebcam',
    },
  },
});

registerPluginContextMenuItem(() => i18n.t('PiWebcam.PiWebcam.title'), '/Job/PiWebcam', 'mdi-webcam', 'view-3d-model', ContextMenuType.JobFileList);
