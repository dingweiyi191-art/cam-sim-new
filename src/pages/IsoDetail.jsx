import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 感光度知识详情 — 三级详情页（左侧260px侧边栏）
 */
export default function IsoDetail() {
  const navigate = useNavigate();

  useEffect(() => {
    const slider = document.getElementById('iso-slider');
    const display = document.getElementById('iso-value-display');
    const noiseLayer = document.getElementById('noise-layer');
    if (!slider) return;

    const handler = (e) => {
      const val = e.target.value;
      display.innerText = `ISO ${val}`;
      const opacity = (val - 100) / 12800;
      noiseLayer.style.opacity = opacity;
      if (val > 800) {
        noiseLayer.style.backgroundImage = `radial-gradient(rgba(255,255,255,${opacity}) 1px, transparent 0)`;
        noiseLayer.style.backgroundSize = `${Math.max(2, 8 - val / 2000)}px ${Math.max(2, 8 - val / 2000)}px`;
      } else {
        noiseLayer.style.backgroundImage = 'none';
      }
    };
    slider.addEventListener('input', handler);
    return () => slider.removeEventListener('input', handler);
  }, []);

  return (
    <>
      <style>{`
        html, body { margin: 0; padding: 0; background: #fbfbe3; }
        .page-wrapper {
          width: 1440px; max-width: 96vw; margin: 2px auto; padding: 2px;
          display: flex; flex-direction: column;
          transform: scale(0.96); transform-origin: top center;
          height: fit-content; box-sizing: border-box;
          max-height: calc(100vh - 6px); overflow: hidden;
        }
        .brutal-border { border: 2px solid #1b1d0e; }
        .brutal-shadow { box-shadow: 4px 4px 0px 0px rgba(0,0,0,1); }
        .brutal-shadow-sm { box-shadow: 2px 2px 0px 0px rgba(0,0,0,1); }
        .pixel-dither {
          background-image: radial-gradient(circle, #1b1d0e 1px, transparent 1px);
          background-size: 3px 3px;
        }
      `}</style>

      <div className="page-wrapper overflow-hidden bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 flex w-full flex-shrink-0 items-center justify-between border-b-2 border-on-surface bg-surface shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{ padding: '0 80px', height: '30px' }}>
          <div className="font-headline-lg uppercase tracking-widest text-primary">PHOTO_SIM_V1.0</div>
          <nav className="hidden gap-6 md:flex">
            <a className="px-2 font-headline-md text-on-surface-variant hover:bg-surface-variant" href="#">SIMULATOR</a>
            <a className="px-2 font-headline-md text-on-surface-variant hover:bg-surface-variant" href="#">GALLERY</a>
            <a className="border-b-4 border-primary pb-0.5 font-headline-md text-primary" href="#">GUIDE</a>
          </nav>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/knowledge-hub')}
              className="border-2 border-on-surface bg-surface px-2 py-0 font-label-caps text-on-surface transition-all hover:bg-primary-container hover:text-on-primary-container active:translate-x-0.5 active:translate-y-0.5"
            >
              ← 退出
            </button>
          </div>
        </header>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden gap-0">
          {/* Sidebar 260px */}
          <aside className="flex h-full w-[240px] flex-shrink-0 flex-col gap-1 border-r-2 border-on-surface bg-surface-container py-2 pl-2 pr-0">
            <div className="brutal-border mb-2 bg-surface-container-low p-2">
              <div className="font-headline-md text-on-surface">OPERATOR_01</div>
              <div className="font-body-sm text-primary">SYSTEM_ACTIVE</div>
            </div>
            <div className="flex flex-col gap-1">
              <button className="brutal-border flex items-center gap-2 bg-surface p-2 font-body-lg uppercase text-on-surface-variant transition-all hover:bg-surface-variant">
                <span className="material-symbols-outlined">exposure</span> APERTURE
              </button>
              <button className="brutal-border flex items-center gap-2 bg-surface p-2 font-body-lg uppercase text-on-surface-variant transition-all hover:bg-surface-variant">
                <span className="material-symbols-outlined">shutter_speed</span> SHUTTER
              </button>
              <button className="flex items-center gap-2 border-2 border-on-surface bg-primary-container p-2 font-body-lg uppercase text-on-primary-container shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span className="material-symbols-outlined">iso</span> ISO
              </button>
              <button className="brutal-border flex items-center gap-2 bg-surface p-2 font-body-lg uppercase text-on-surface-variant transition-all hover:bg-surface-variant">
                <span className="material-symbols-outlined">center_focus_strong</span> FOCUS
              </button>
            </div>
            <div className="mt-auto flex flex-col gap-1">
              <button className="brutal-border brutal-shadow bg-primary p-2 font-headline-md text-white uppercase btn-interact">
                INITIATE_CAPTURE
              </button>
              <div className="mt-1 flex justify-between border-t-2 border-on-surface pt-1 px-1">
                <span className="material-symbols-outlined text-on-surface-variant">logout</span>
                <span className="material-symbols-outlined text-on-surface-variant">terminal</span>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-grow overflow-hidden bg-background pt-2 pr-2 pb-2 pl-0">
            <div style={{ maxWidth: '1000px' }}>
              {/* Title */}
              <div className="mb-2 flex items-center gap-3 border-b-4 border-on-surface pb-2">
                <div className="brutal-border brutal-shadow-sm flex h-10 w-10 flex-shrink-0 items-center justify-center bg-primary">
                  <span className="material-symbols-outlined text-2xl text-white" style={{ fontVariationSettings: "'FILL' 1" }}>iso</span>
                </div>
                <h1 className="font-headline-lg text-on-surface">ISO 与画质 // ISO &amp; QUALITY</h1>
              </div>

              {/* What is ISO */}
              <section className="mb-2">
                <div className="brutal-border mb-1 inline-block bg-secondary-container px-3 py-0.5 font-headline-md text-secondary">什么是 ISO?</div>
                <div className="brutal-border brutal-shadow bg-surface p-3">
                  <p className="font-body-lg leading-relaxed text-on-surface">
                    ISO 代表相机传感器对光线的敏感度。ISO 越高，传感器对光线越敏感，画面越亮；ISO 越低，传感器越不敏感，画面越暗。
                  </p>
                </div>
              </section>

              {/* Comparison */}
              <section className="mb-2 grid grid-cols-1 gap-1 md:grid-cols-2">
                {[
                  { label: 'PREVIEW_01: LOW_ISO_STABILITY', iso: 'ISO 100', isoColor: 'bg-primary', title: '低 ISO (100-400)', titleColor: 'text-primary', desc: '画面纯净，噪点极少，适合光线充足的场景。', img: '/tutorial/ISO_LOW_01.png', bg: 'bg-surface-dim' },
                  { label: 'PREVIEW_02: HIGH_ISO_NOISE', iso: 'ISO 6400', isoColor: 'bg-tertiary', title: '高 ISO (3200+)', titleColor: 'text-tertiary', desc: '噪点明显增多，仅在极端暗光环境下使用。', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDarYP1BHhz978fqbTEzAX4bvu9Qez8VAkOjwXnmcrKvAuq7VQoqWCyTA2_g45eT0DdsXE9zU1E8ypelR8O51FDUnYUy3QMAM4t4ORacBsHXZJYyVtI1qEkgvtghGQ63IfmA0tbzeMoH9FrZxniul8pnw7zH5uYMBonaZlnDy5batZSrs-U7_jwlW1kzQMnrD3KmknemeqaZo0jHh9QJNXz-AGDV1gcetoRiynnJDLT0BhG62f5I_6YGQ', bg: 'bg-inverse-surface', noisy: true },
                ].map((card, i) => (
                  <div key={i} className="brutal-border brutal-shadow flex flex-col bg-surface">
                    <div className="border-b-2 border-on-surface bg-surface-variant p-1.5 font-label-caps">{card.label}</div>
                    <div className={`relative overflow-hidden ${card.bg}`} style={{ height: '140px' }}>
                      <img className={`h-full w-full max-w-full object-cover ${card.noisy ? 'opacity-80' : ''}`} alt={card.iso} src={card.img} />
                      <div className={`absolute bottom-1 left-1 px-2 font-body-sm text-white brutal-border ${card.isoColor}`}>{card.iso}</div>
                      {card.noisy && <div className="pointer-events-none absolute inset-0 pixel-dither opacity-40"></div>}
                    </div>
                    <div className="space-y-1 p-2">
                      <h3 className={`font-headline-md ${card.titleColor}`}>{card.title}</h3>
                      <p className="font-body-sm">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </section>

              {/* ISO / Noise Relationship */}
              <section className="mb-2">
                <div className="brutal-border mb-1 inline-block bg-surface-container-highest px-3 py-0.5 font-headline-md text-on-surface">ISO 与噪点的关系</div>
                <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
                  {[
                    { label: 'CLEAN_SIGNAL', range: '100-400', desc: '适合户外、阳光充足。', border: 'border-l-primary', color: 'text-primary' },
                    { label: 'MID_GRAIN', range: '800-1600', desc: '适合室内、阴天拍摄。', border: 'border-l-secondary', color: 'text-secondary' },
                    { label: 'CRITICAL_NOISE', range: '3200+', desc: '极端暗光，牺牲画质。', border: 'border-l-tertiary', color: 'text-tertiary' },
                  ].map((item, i) => (
                    <div key={i} className={`brutal-border bg-surface-container-low p-2 border-l-8 ${item.border}`}>
                      <div className={`mb-0.5 font-label-caps ${item.color}`}>{item.label}</div>
                      <div className="font-body-lg font-bold">{item.range}</div>
                      <div className="mt-1 font-body-sm opacity-70">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Principle */}
              <section className="mb-2">
                <div className="brutal-border mb-1 inline-block bg-primary-container px-3 py-0.5 font-headline-md text-on-primary-container">ISO 使用原则</div>
                <div className="brutal-border brutal-shadow relative overflow-hidden bg-surface p-4">
                  <div className="absolute right-0 top-0 bg-on-surface p-1.5 font-label-caps text-surface">CORE_LOGIC_01</div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined flex-shrink-0 text-4xl text-primary">priority_high</span>
                    <div className="space-y-2">
                      <p className="font-headline-md leading-tight text-on-surface">在保证安全快门的前提下，尽量使用最低的 ISO 以获得最佳画质。</p>
                      <p className="font-body-lg text-on-surface-variant">只有在光线不足且无法使用三脚架时才提高 ISO。</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Noise Simulator */}
              <section className="brutal-border brutal-shadow-sm mb-2 bg-surface-dim p-2">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-label-caps">LIVE_NOISE_EMULATION</span>
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-pulse bg-primary"></div>
                    <div className="h-2 w-2 bg-secondary"></div>
                    <div className="h-2 w-2 bg-tertiary"></div>
                  </div>
                </div>
                <div id="noise-preview" className="brutal-border relative flex h-24 items-center justify-center overflow-hidden bg-black">
                  <div id="noise-layer" className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"></div>
                  <span id="iso-value-display" className="z-10 font-headline-md text-white">ISO 100</span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="flex-shrink-0 font-body-sm">ISO SLIDER</span>
                  <input id="iso-slider" className="brutal-border h-2 flex-1 appearance-none bg-surface" style={{ accentColor: '#516600' }} type="range" min="100" max="12800" step="100" defaultValue="100" />
                </div>
              </section>
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="flex w-full flex-shrink-0 items-center justify-between border-t-2 border-on-surface bg-surface-dim py-0.5" style={{ padding: '0 80px' }}>
          <div className="font-label-caps uppercase text-on-surface">©198X BIT_SENSING_CORP</div>
          <div className="flex gap-6">
            <a className="font-body-sm text-on-surface-variant transition-colors duration-100 hover:text-primary" href="#">PRIVACY.SYS</a>
            <a className="font-body-sm text-on-surface-variant transition-colors duration-100 hover:text-primary" href="#">LICENSE.TXT</a>
            <a className="font-body-sm text-on-surface-variant transition-colors duration-100 hover:text-primary" href="#">RECOVERY</a>
          </div>
        </footer>
      </div>
    </>
  );
}
