
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    base: '/',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'react-hook-form@7.55.0': 'react-hook-form',
        'figma:asset/f16eef0e0e528b1962c0c1ddc5df66168c443641.png': path.resolve(__dirname, './src/assets/f16eef0e0e528b1962c0c1ddc5df66168c443641.png'),
        'figma:asset/d684a6309c36018af7ce5c96c4bd646b41735b7d.png': path.resolve(__dirname, './src/assets/d684a6309c36018af7ce5c96c4bd646b41735b7d.png'),
        'figma:asset/cda60901ac6608e0ad7887feebfcd90ea0e8fcf3.png': path.resolve(__dirname, './src/assets/cda60901ac6608e0ad7887feebfcd90ea0e8fcf3.png'),
        'figma:asset/cacc7d0542330c66e3ec96e4dd0de6bf4fa060f6.png': path.resolve(__dirname, './src/assets/cacc7d0542330c66e3ec96e4dd0de6bf4fa060f6.png'),
        'figma:asset/c448b27b0a7e484978529def6d6f246f89740e41.png': path.resolve(__dirname, './src/assets/c448b27b0a7e484978529def6d6f246f89740e41.png'),
        'figma:asset/c1d2c612d843b4c2a52b444dd36c1ec08c96acfb.png': path.resolve(__dirname, './src/assets/c1d2c612d843b4c2a52b444dd36c1ec08c96acfb.png'),
        'figma:asset/be94c795e47e163b36f54ba54c2c113c526f6ff7.png': path.resolve(__dirname, './src/assets/be94c795e47e163b36f54ba54c2c113c526f6ff7.png'),
        'figma:asset/bdfdca5e8aad2eb5af6b4d53ea9f269eb3174fad.png': path.resolve(__dirname, './src/assets/bdfdca5e8aad2eb5af6b4d53ea9f269eb3174fad.png'),
        'figma:asset/b5fa201d71345eb914606ab574ca22d67a72b3ad.png': path.resolve(__dirname, './src/assets/b5fa201d71345eb914606ab574ca22d67a72b3ad.png'),
        'figma:asset/92fcfbb984f6e93f08a4cb7245793aee6da28572.png': path.resolve(__dirname, './src/assets/92fcfbb984f6e93f08a4cb7245793aee6da28572.png'),
        'figma:asset/90a00775e33ba29c9556fc4fc8df503ab2fd88bb.png': path.resolve(__dirname, './src/assets/90a00775e33ba29c9556fc4fc8df503ab2fd88bb.png'),
        'figma:asset/8122462b9b5d7e43dc35c62c9070ae47675970d0.png': path.resolve(__dirname, './src/assets/8122462b9b5d7e43dc35c62c9070ae47675970d0.png'),
        'figma:asset/5b6627d12f65b44f23bdd2c38b35d9d19f1ed4d4.png': path.resolve(__dirname, './src/assets/5b6627d12f65b44f23bdd2c38b35d9d19f1ed4d4.png'),
        'figma:asset/5684026f9695cc12d49831fdcceef17ef52864ad.png': path.resolve(__dirname, './src/assets/5684026f9695cc12d49831fdcceef17ef52864ad.png'),
        'figma:asset/4f91cbb0b0e9249ab48623392782fe2e6bc168a2.png': path.resolve(__dirname, './src/assets/4f91cbb0b0e9249ab48623392782fe2e6bc168a2.png'),
        'figma:asset/458e7c46acdaa9d934cfb9933aca1833056fbf77.png': path.resolve(__dirname, './src/assets/458e7c46acdaa9d934cfb9933aca1833056fbf77.png'),
        'figma:asset/427333929426c2690fc4a7b05bb2728c71b5b4ab.png': path.resolve(__dirname, './src/assets/427333929426c2690fc4a7b05bb2728c71b5b4ab.png'),
        'figma:asset/2d730b41dab0c9b9877a156bdbc4f6cd6cf7df35.png': path.resolve(__dirname, './src/assets/2d730b41dab0c9b9877a156bdbc4f6cd6cf7df35.png'),
        'figma:asset/20a4b296375d7afd4769e114f8a0d90e5f615fd3.png': path.resolve(__dirname, './src/assets/20a4b296375d7afd4769e114f8a0d90e5f615fd3.png'),
        'figma:asset/10765297fbadc1fb8ba88fe4b5534af78789f947.png': path.resolve(__dirname, './src/assets/10765297fbadc1fb8ba88fe4b5534af78789f947.png'),
        'figma:asset/1001b5b28cbe32a697b72730d41d41973e1da3f2.png': path.resolve(__dirname, './src/assets/1001b5b28cbe32a697b72730d41d41973e1da3f2.png'),
        'figma:asset/0c1e9899896b786103246b29b6b25c9fbfdc5fa9.png': path.resolve(__dirname, './src/assets/0c1e9899896b786103246b29b6b25c9fbfdc5fa9.png'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });