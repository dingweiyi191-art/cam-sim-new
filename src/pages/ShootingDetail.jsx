import { useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

/* ===== 场景基准参数（按图片URL匹配） ===== */
const SCENE_BASELINES = [
  { key: 'AB6AXuCODuJgVNhTYY_cC', aperture: 'f/8.0', shutter: '1/250', iso: 200 },
  { key: 'AB6AXuBKYlMDMDNvxqz7', aperture: 'f/2.8', shutter: '1/60', iso: 3200 },
  { key: 'AP1WRLvKLO10VwzUudAL', aperture: 'f/11', shutter: '1/500', iso: 100 },
  { key: 'AB6AXuCpZOZSASA0zZNew', aperture: 'f/4.0', shutter: '1/30', iso: 1600 },
  { key: 'AB6AXuDusnyFAh4Ttqry', aperture: 'f/5.6', shutter: '1/125', iso: 400 },
  { key: 'AB6AXuCw6BzCUR-OmfXt', aperture: 'f/2.8', shutter: '1/250', iso: 200 },
  { key: 'AB6AXuBvvfJtxk4OaEpl', aperture: 'f/8.0', shutter: '1/500', iso: 100 },
  { key: 'AB6AXuCmeqkxSDAH6rTV', aperture: 'f/11', shutter: '1/15', iso: 200 },
  { key: 'AB6AXuD5tyG9mela-cP6', aperture: 'f/5.6', shutter: '1/125', iso: 400 },
];
const DEFAULT_BASELINE = { aperture: 'f/8.0', shutter: '1/250', iso: 200 };

/* ===== 辅助函数 ===== */
function fStopToNum(fs) {
  return parseFloat(String(fs).replace('f/', '')) || 8;
}
function shutterToSec(s) {
  if (!s) return 1 / 250;
  if (s.includes('/')) {
    const [, denom] = s.split('/');
    return 1 / parseFloat(denom);
  }
  return parseFloat(s.replace('s', '')) || 1;
}
function isoToNum(i) {
  const n = parseInt(String(i), 10);
  return isNaN(n) ? (String(i).includes('HI') ? 12800 : 200) : n;
}
/** 计算曝光值 EV = log2(N²/t) - log2(ISO/100) */
function calcEV(aperture, shutter, iso) {
  const N = fStopToNum(aperture);
  const t = shutterToSec(shutter);
  const S = isoToNum(iso);
  return Math.log2((N * N) / t) - Math.log2(S / 100);
}

/** 光圈→DOF虚化: f值越小 blur越大 */
function apertureToBlur(fStop) {
  return Math.max(0, (8 - fStop) * 0.6);
}
/** 快门→运动模糊: 越慢 blur越大 */
function shutterToMotion(shutter) {
  const sec = shutterToSec(shutter);
  return Math.max(0, (sec - 1 / 500) * 80);
}
/** ISO→噪点: ISO越高 noise越重 */
function isoToNoise(iso) {
  const n = isoToNum(iso);
  return Math.min(1, Math.max(0, (n - 100) / 6300));
}

function findBaseline(imgUrl) {
  if (!imgUrl) return DEFAULT_BASELINE;
  for (const b of SCENE_BASELINES) {
    if (imgUrl.includes(b.key)) return b;
  }
  return DEFAULT_BASELINE;
}

export default function ShootingDetail() {
  const navigate = useNavigate();
  const viewfinderRef = useRef(null);
  const noiseRef = useRef(null);
  const [searchParams] = useSearchParams();
  const defaultImg =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCODuJgVNhTYY_cC-FC7m3uX-BGrzeTncslRDAHeV3NgllcIDoMTxaf67mM7081fLSFb9aM7_x-srna3UrVc3K4nHiI0lsc4jfGkEAc86EOzBrJHnFkKzjjn__sz5goS8WLX3P0j_PxMIt4I8B72C64dJliL_NTPxejtTkorEiANT62M_atVtG2mTgpshhARYGYyaFXc902OVMNKdL3R1yL3HRks5X8Lvc0_kclHOkHBoAH1vqruGAnVQ';
  const sceneImg = searchParams.get('img') || defaultImg;
  const baseline = findBaseline(sceneImg);

  /* 实时效果状态 */
  const [blurPx, setBlurPx] = useState(0);
  const [motionPx, setMotionPx] = useState(0);
  const [noiseOpacity, setNoiseOpacity] = useState(0);
  const [brightness, setBrightness] = useState(1);
  const [warning, setWarning] = useState(null);

  /* 读取当前三要素值并更新效果 */
  const updateEffects = useCallback(() => {
    const aEl = document.getElementById('val-aperture');
    const sEl = document.getElementById('val-shutter');
    const iEl = document.getElementById('val-iso');
    const aperture = aEl?.textContent || 'f/2.8';
    const shutter = sEl?.textContent || '1/250';
    const iso = iEl?.textContent || '100';

    const f = fStopToNum(aperture);
    setBlurPx(apertureToBlur(f));
    setMotionPx(shutterToMotion(shutter));
    setNoiseOpacity(isoToNoise(iso));

    /* 曝光检测 */
    const currentEV = calcEV(aperture, shutter, iso);
    const baseEV = calcEV(baseline.aperture, baseline.shutter, String(baseline.iso));
    const diff = currentEV - baseEV;
    if (diff > 1.8) {
      setWarning('⚠ 当前参数曝光过量，画面高光细节丢失');
    } else if (diff < -1.8) {
      setWarning('⚠ 当前参数曝光不足，画面暗部细节丢失');
    } else {
      setWarning(null);
    }
    /* 亮度微调 */
    setBrightness(1 + Math.max(-0.4, Math.min(0.4, -diff * 0.12)));
  }, [baseline]);

  useEffect(() => {
    /* 初始效果 */
    updateEffects();

    const sliders = {
      aperture: { el: document.getElementById('slider-aperture'), val: document.getElementById('val-aperture'), steps: ['f/1.8', 'f/2.0', 'f/2.8', 'f/4.0', 'f/5.6', 'f/8.0', 'f/11', 'f/16', 'f/22', 'f/32'] },
      shutter: { el: document.getElementById('slider-shutter'), val: document.getElementById('val-shutter'), steps: ['1/4000', '1/2000', '1/1000', '1/500', '1/250', '1/125', '1/60', '1/30', '1s', '30s'] },
      iso: { el: document.getElementById('slider-iso'), val: document.getElementById('val-iso'), steps: ['100', '200', '400', '800', '1600', '3200', '6400', '12800', 'HI-1', 'HI-2'] },
    };
    Object.keys(sliders).forEach((key) => {
      const s = sliders[key];
      if (!s.el) return;
      const handler = () => {
        const index = s.el.value - 1;
        s.val.innerText = s.steps[index];
        s.val.classList.add('scale-110');
        setTimeout(() => s.val.classList.remove('scale-110'), 100);
        updateEffects();
      };
      s.el.addEventListener('input', handler);
    });

    /* 快门闪光效果 */
    const shutterBtn = document.querySelector('button.bg-tertiary, button[class*="bg-tertiary"]');
    const vf = viewfinderRef.current;
    const clickHandler = () => {
      if (!vf) return;
      const flash = document.createElement('div');
      flash.className = 'absolute inset-0 bg-white z-[100] pointer-events-none opacity-0';
      flash.style.transition = 'opacity 0.05s ease-out';
      vf.appendChild(flash);
      flash.style.opacity = '1';
      setTimeout(() => {
        flash.style.transition = 'opacity 0.5s ease-in';
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 500);
      }, 50);
    };
    if (shutterBtn) shutterBtn.addEventListener('click', clickHandler);

    return () => {
      if (shutterBtn) shutterBtn.removeEventListener('click', clickHandler);
    };
  }, [updateEffects]);

  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; background: #fbfbe3; }
        .page-wrapper {
          width: 1440px; max-width: 96vw; margin: 2px auto; padding: 2px;
          display: flex; flex-direction: column;
          transform: scale(0.98); transform-origin: top 0;
          height: calc(100vh - 4px); box-sizing: border-box;
          overflow: hidden;
        }
        .pixelated { image-rendering: pixelated; image-rendering: crisp-edges; }
        .scanline {
          background: repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px);
        }
        .scale-110 { transform: scale(1.1); }
        @keyframes flicker {
          0%,100% { opacity: 1; }
          50% { opacity: 0.97; }
        }
        .flicker-anim { animation: flicker 0.15s infinite; }
      `}</style>

      <div className="page-wrapper overflow-x-hidden bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b-4 border-on-surface bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between px-gutter py-0">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-[32px] text-primary-container">camera</span>
              <h1 className="font-headline-md text-tertiary">CAM-SIM 8-BIT</h1>
            </div>
            <nav className="hidden gap-margin-md md:flex items-center">
              <a className="font-headline-md text-primary border-b-4 border-primary transition-colors hover:text-tertiary" href="#">模拟器</a>
            </nav>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/scene-simulator')}
                className="border-2 border-on-surface bg-surface px-2 py-0 font-label-caps text-on-surface transition-all hover:bg-primary-container hover:text-on-primary-container active:translate-x-0.5 active:translate-y-0.5"
              >
                ↩ 退出
              </button>
              <div className="mr-2 hidden flex-col items-end sm:flex">
                <span className="font-label-caps text-[10px] text-primary">操作员_01</span>
                <span className="font-label-caps text-[8px] text-on-surface-variant">5级摄影师</span>
              </div>
              <button className="material-symbols-outlined text-primary active:translate-x-0.5 active:translate-y-0.5">circle</button>
            </div>
          </div>
        </header>

        {/* Body */}
        <main className="flex w-full flex-col overflow-hidden md:flex-row gap-1" style={{ flex: 1, height: '100%' }}>
          {/* Left: Viewfinder */}
          <section ref={viewfinderRef} className="relative flex items-center justify-center overflow-hidden border-r-4 border-on-surface bg-on-surface max-md:h-[614px]" style={{ width: '55%', height: '100%' }}>
            {/* HUD overlay */}
            <div className="pointer-events-none absolute inset-gutter z-10 border-2 border-surface/30">
              <div className="absolute left-0 top-0 h-8 w-8 border-l-4 border-t-4 border-primary"></div>
              <div className="absolute right-0 top-0 h-8 w-8 border-r-4 border-t-4 border-primary"></div>
              <div className="absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4 border-primary"></div>
              <div className="absolute bottom-0 right-0 h-8 w-8 border-b-4 border-r-4 border-primary"></div>
              <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-primary/50">
                <div className="h-2 w-2 bg-primary"></div>
              </div>
              <div className="absolute left-6 top-4 flex flex-col gap-1 font-label-caps text-surface">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 animate-pulse rounded-full bg-error"></span>
                  录制中 [00:42]
                </div>
                <div className="text-[10px]">任务: 公园之日</div>
              </div>
              <div className="absolute bottom-4 left-6 flex gap-4 font-label-caps text-surface">
                <div className="border-2 border-surface/20 bg-on-surface/80 px-2" id="hud-aperture">F/2.8</div>
                <div className="border-2 border-surface/20 bg-on-surface/80 px-2" id="hud-shutter">1/250</div>
                <div className="border-2 border-surface/20 bg-on-surface/80 px-2" id="hud-iso">ISO 100</div>
              </div>
              <div className="pointer-events-auto absolute left-1/2 top-8 -translate-x-1/2 text-center">
                <h3 className="font-headline-md text-surface drop-shadow-md">模拟拍摄详情</h3>
              </div>
            </div>

            {/* Scene image + real-time filters */}
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
              <img
                className="pixelated h-full w-full max-w-full object-cover"
                alt="场景取景画面"
                src={sceneImg}
                style={{
                  filter: `blur(${blurPx}px) brightness(${brightness})`,
                  transition: 'filter 0.15s ease-out',
                }}
              />
              {/* Motion blur overlay */}
              {motionPx > 0.5 && (
                <div
                  className="absolute inset-0 pointer-events-none z-1"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, rgba(27,29,14,${Math.min(0.6, motionPx / 40)}) 50%, transparent 100%)`,
                    filter: `blur(${motionPx / 4}px)`,
                    opacity: Math.min(1, motionPx / 20),
                  }}
                />
              )}
              {/* ISO Noise overlay */}
              <div
                ref={noiseRef}
                className="absolute inset-0 z-2 pointer-events-none"
                style={{
                  opacity: noiseOpacity,
                  backgroundImage: `radial-gradient(rgba(255,255,255,0.6) 1px, transparent 0)`,
                  backgroundSize: `${Math.max(2, 10 - noiseOpacity * 8)}px ${Math.max(2, 10 - noiseOpacity * 8)}px`,
                  transition: 'opacity 0.15s ease-out',
                }}
              />
              <div className="flicker-anim scanline absolute inset-0 z-3"></div>
            </div>
          </section>

          {/* Right: Control Panel + Exposure Warning */}
          <aside className="relative flex flex-col overflow-hidden border-t-4 bg-surface-container md:border-t-0" style={{ width: '45%', height: '100%' }}>
            {/* Exposure Warning Banner */}
            {warning && (
              <div className="flex-shrink-0 mx-3 mt-2 border-2 border-on-surface px-2 py-0.5 text-center font-label-caps animate-pulse"
                style={{
                  backgroundColor: warning.includes('过量') ? '#ffdad6' : '#ffdbd1',
                  color: warning.includes('过量') ? '#ba1a1a' : '#b12d00',
                }}
              >
                {warning}
              </div>
            )}

            {/* Title */}
            <div className="flex items-center justify-between flex-shrink-0 px-3 pt-2 pb-1">
              <h2 className="font-headline-md text-on-surface">手动控制</h2>
              <span className="material-symbols-outlined text-secondary">tune</span>
            </div>

            {/* Aperture Slider */}
            <div className="flex flex-col" style={{ padding: '6px 20px' }}>
              <div className="flex items-end justify-between mb-0.5">
                <label className="border-x-2 border-t-2 border-on-surface bg-surface-container-highest px-2 font-label-caps text-on-surface-variant">光圈</label>
                <span className="font-headline-md text-primary" id="val-aperture">f/2.8</span>
              </div>
              <div className="relative border-2 border-on-surface bg-surface p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <input className="slider-pixel h-2 w-full cursor-pointer appearance-none bg-on-surface" style={{ accentColor: '#8bac0f' }} id="slider-aperture" type="range" min="1" max="10" defaultValue="3" />
                <div className="mt-1 flex justify-between font-label-caps text-[10px] text-on-surface-variant">
                  <span>F/1.8</span><span>F/22</span>
                </div>
              </div>
            </div>

            {/* Shutter Slider */}
            <div className="flex flex-col" style={{ padding: '6px 20px' }}>
              <div className="flex items-end justify-between mb-0.5">
                <label className="border-x-2 border-t-2 border-on-surface bg-surface-container-highest px-2 font-label-caps text-on-surface-variant">快门速度</label>
                <span className="font-headline-md text-primary" id="val-shutter">1/250</span>
              </div>
              <div className="relative border-2 border-on-surface bg-surface p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <input className="h-2 w-full cursor-pointer appearance-none bg-on-surface" style={{ accentColor: '#8bac0f' }} id="slider-shutter" type="range" min="1" max="10" defaultValue="5" />
                <div className="mt-1 flex justify-between font-label-caps text-[10px] text-on-surface-variant">
                  <span>1/4000</span><span>30s</span>
                </div>
              </div>
            </div>

            {/* ISO Slider */}
            <div className="flex flex-col" style={{ padding: '6px 20px' }}>
              <div className="flex items-end justify-between mb-0.5">
                <label className="border-x-2 border-t-2 border-on-surface bg-surface-container-highest px-2 font-label-caps text-on-surface-variant">感光度</label>
                <span className="font-headline-md text-primary" id="val-iso">100</span>
              </div>
              <div className="relative border-2 border-on-surface bg-surface p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <input className="h-2 w-full cursor-pointer appearance-none bg-on-surface" style={{ accentColor: '#8bac0f' }} id="slider-iso" type="range" min="1" max="10" defaultValue="1" />
                <div className="mt-1 flex justify-between font-label-caps text-[10px] text-on-surface-variant">
                  <span>100</span><span>6400</span>
                </div>
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Metering */}
            <div className="flex-shrink-0 flex flex-col gap-1 border-4 border-double border-surface-variant bg-on-surface p-2 text-surface mx-3 my-1">
              <div className="flex justify-between font-label-caps text-[10px]">
                <span>曝光补偿</span>
                <span className="text-primary-fixed">基准: {baseline.aperture} {baseline.shutter} ISO {baseline.iso}</span>
              </div>
              <div className="flex h-4 gap-0.5">
                <div className="h-full w-full bg-primary-container"></div>
                <div className="h-full w-full bg-primary-container"></div>
                <div className="h-full w-full bg-primary-container"></div>
                <div className="h-full w-full bg-primary-container"></div>
                <div className="h-full w-full bg-primary-container opacity-50"></div>
                <div className="h-full w-full bg-surface opacity-10"></div>
                <div className="h-full w-full bg-surface opacity-10"></div>
                <div className="h-full w-full bg-surface opacity-10"></div>
              </div>
            </div>

            {/* Shutter Button */}
            <button className="flex-shrink-0 group flex w-full items-center justify-center gap-4 border-4 border-on-surface bg-tertiary py-3 font-headline-lg text-surface shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-75 hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-2 active:translate-y-2 active:shadow-none">
              <span className="material-symbols-outlined text-[28px]">circle</span>
              击发快门
            </button>
          </aside>
        </main>

        {/* Footer */}
        <footer className="mt-auto w-full border-t-2 border-primary bg-on-surface py-0 text-surface">
          <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-1 px-gutter md:flex-row md:justify-between">
            <span className="font-label-caps text-primary-fixed">©1989 PIXEL-OPTICS SYSTEMS. 保留所有权利。</span>
            <div className="flex gap-margin-sm font-body-sm text-surface-variant">
              <a className="underline transition-all hover:text-secondary-fixed" href="#">隐私政策.EXE</a>
              <a className="underline transition-all hover:text-secondary-fixed" href="#">条款.BAT</a>
              <a className="underline transition-all hover:text-secondary-fixed" href="#">联系我们.SYS</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
