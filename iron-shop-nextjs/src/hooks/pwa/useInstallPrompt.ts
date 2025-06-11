'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface InstallPromptState {
  isInstallable: boolean;
  isInstalled: boolean;
  showPrompt: boolean;
  platform: string | null;
}

export function useInstallPrompt() {
  const [state, setState] = useState<InstallPromptState>({
    isInstallable: false,
    isInstalled: false,
    showPrompt: false,
    platform: null,
  });

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (window.navigator as any).standalone === true;
    const isInstalled = isStandalone || isIOSStandalone;

    setState(prev => ({ ...prev, isInstalled }));

    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase();
    let platform = null;
    
    if (/android/.test(userAgent)) {
      platform = 'android';
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
      platform = 'ios';
    } else if (/windows/.test(userAgent)) {
      platform = 'windows';
    } else if (/mac/.test(userAgent)) {
      platform = 'mac';
    }

    setState(prev => ({ ...prev, platform }));

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      
      setState(prev => ({
        ...prev,
        isInstallable: true,
        showPrompt: !isInstalled,
      }));

      console.log('Install prompt available');
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      console.log('App installed');
      setState(prev => ({
        ...prev,
        isInstalled: true,
        showPrompt: false,
        isInstallable: false,
      }));
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) {
      console.warn('Install prompt not available');
      return null;
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      console.log('User choice:', choiceResult.outcome);
      
      if (choiceResult.outcome === 'accepted') {
        setState(prev => ({ ...prev, showPrompt: false }));
      }

      setDeferredPrompt(null);
      return choiceResult.outcome;
    } catch (error) {
      console.error('Error showing install prompt:', error);
      return null;
    }
  };

  const dismissPrompt = () => {
    setState(prev => ({ ...prev, showPrompt: false }));
    
    // Remember dismissal for this session
    sessionStorage.setItem('install-prompt-dismissed', 'true');
  };

  const canPromptInstall = () => {
    // Check if prompt was dismissed in this session
    const dismissed = sessionStorage.getItem('install-prompt-dismissed');
    return state.isInstallable && !state.isInstalled && !dismissed;
  };

  const getInstallInstructions = () => {
    switch (state.platform) {
      case 'ios':
        return {
          title: 'ホーム画面に追加',
          steps: [
            'Safariの共有ボタン (□↗) をタップ',
            '「ホーム画面に追加」を選択',
            '「追加」をタップして完了',
          ],
        };
      case 'android':
        return {
          title: 'ホーム画面に追加',
          steps: [
            'ブラウザのメニュー (⋮) をタップ',
            '「ホーム画面に追加」を選択',
            '「追加」をタップして完了',
          ],
        };
      default:
        return {
          title: 'アプリをインストール',
          steps: [
            'ブラウザのインストールプロンプトを確認',
            '「インストール」をクリック',
            'インストール完了を待つ',
          ],
        };
    }
  };

  return {
    ...state,
    promptInstall,
    dismissPrompt,
    canPromptInstall: canPromptInstall(),
    getInstallInstructions,
  };
}

export default useInstallPrompt;