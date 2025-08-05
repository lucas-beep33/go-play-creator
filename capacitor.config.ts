import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5d3bbae247ae408ab10710890d397c58',
  appName: 'Jogo da Memória',
  webDir: 'dist',
  server: {
    url: 'https://5d3bbae2-47ae-408a-b107-10890d397c58.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  },
  ios: {
    contentInset: 'automatic'
  }
};

export default config;